#!/bin/sh

echo "executing ci.sh..."

echo "show environment..."

echo "node version"
node --version

echo "npm version"
npm --version

echo  "grunt version"
grunt --version

echo "bower version"
bower --version

echo "git version"
git --version

echo "get dependencies..."
rm -rf node_modules/
rm -rf bower_components

npm install
bower install

echo "build..."
grunt build