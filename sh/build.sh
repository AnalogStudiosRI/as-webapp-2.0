#!/bin/sh

echo "executing ci.sh..."

echo "show environment..."

echo "node version"
node --version

echo "npm version"
npm --version

echo  "gulp version"
gulp --version

echo "bower version"
bower --version

echo "git version"
git --version

echo "get dependencies..."
rm -rf node_modules/
rm -rf bower_components

echo "cleaning dependency caches..."
npm cache clean
bower cache clean

echo "installing dependencies..."
npm install
bower install

echo "build..."
gulp build --production