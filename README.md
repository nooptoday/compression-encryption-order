# compression-encryption-order

A small example repository to compare final data sizes when using encryption and compression together.

- compressFirst -> Sample data is compressed first and then encrypted,
- encryptFirst -> Sample data is encrypted first and then compressed

## Results

```
[      resource ] http://jsonplaceholder.typicode.com/albums?userId=1
[      original ] 816
[  encryptFirst ] 746
[ compressFirst ] 244
[  % difference ] 67.29 reduction


[      resource ] http://jsonplaceholder.typicode.com/albums
[      original ] 9333
[  encryptFirst ] 7472
[ compressFirst ] 1723
[  % difference ] 76.94 reduction


[      resource ] http://jsonplaceholder.typicode.com/photos
[      original ] 1071472
[  encryptFirst ] 820717
[ compressFirst ] 98447
[  % difference ] 88.00 reduction
```

Original blog post: [Noop Today - Reduce Network Usage - With This 1 Simple Trick!](https://nooptoday.com/reduce-network-usage-with-simple-trick/)
