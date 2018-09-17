#!/bin/bash

set -e
set -x

rm -rf node_modules
yarn install --production --ignore-engines --pure-lockfile

NODE_ENV=production yarn build
mkdir dist

cp -rf node_modules dist/lib
cp -rf .next/ dist/app
cp -rf config dist/

echo '{
  "engines": {
    "node": "10.x.x",
    "npm": "6.1.x"
  }
}' > dist/package.json
pushd dist; ln -s ../node_modules ./lib && zip -r dist.zip *; popd
