rm -rf build
pnpm run build
rm dist.zip
zip -r dist.zip dist
scp dist.zip aman@racknerd:~/devtools
