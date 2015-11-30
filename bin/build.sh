#!/bin/sh

echo "executing build.sh..."

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
rm -rf node_modules/ > /dev/null 2>&1
rm -rf bower_components > /dev/null 2>&1

echo "cleaning dependency caches..."
npm cache clean
bower cache clean

echo "installing dependencies..."
npm install
bower install

echo "build..."
gulp build --production