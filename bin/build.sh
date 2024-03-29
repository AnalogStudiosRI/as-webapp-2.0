#!/bin/sh

echo "executing build.sh..."

echo "node version"
node --version

echo "npm version"
npm --version

echo "yarn version"
yarn --version

echo "clear existing dependencies..."
rm -rf node_modules/ > /dev/null 2>&1

echo "installing packages"
yarn install

echo "running the build..."
yarn run ci