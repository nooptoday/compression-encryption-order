const http = require('http');
const crypto = require("crypto");
const zlib = require('zlib');

function encrypt(data, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return cipher.update(data, 'utf-8') + cipher.final('utf-8');
}

function compress(data) {
    return zlib.brotliCompressSync(data)
}

function request(url) {
    return new Promise((resolve, reject) => {
        http.get(url, response => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve({url, data}));
            response.on('error', reject)
        });
    })
}

async function compare() {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16)


    const small = await request('http://jsonplaceholder.typicode.com/albums?userId=1');
    const medium = await request('http://jsonplaceholder.typicode.com/albums');
    const big = await request('http://jsonplaceholder.typicode.com/photos');

    const results = [small, medium, big].map(({data, url}) => {
        const payloadSizes = {
            original: data.length,
            compressFirst: encrypt(compress(data), key, iv).length,
            encryptFirst: compress(encrypt(data, key, iv)).length,
        };

        console.log(`
        [      resource ] ${url}
        [      original ] ${payloadSizes.original}
        [ compressFirst ] ${payloadSizes.compressFirst}
        [  encryptFirst ] ${payloadSizes.encryptFirst}
        [    difference ] ${payloadSizes.encryptFirst - payloadSizes.compressFirst}
        [  % difference ] ${(100 * (payloadSizes.encryptFirst - payloadSizes.compressFirst) / payloadSizes.encryptFirst).toFixed(2)} reduction
        `)
    })
}

compare();