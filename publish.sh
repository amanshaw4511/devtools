rm -rf build
npm run build
rm dist.zip
zip -r dist.zip dist
scp dist.zip aman@107.174.121.104:~/
