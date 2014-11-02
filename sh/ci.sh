#!/bin/sh

echo "executing ci.sh..."

echo "show environment..."

echo "node version"
node --version

echo "npm version"
npm --version

echo  "grunt version"
grunt --version

echo "git version"
git --version


echo "get dependencies..."
rm -rf node_modules/
rm -rf bower_components

npm install

#//XXX TODO install bower on Jenkins
#bower install

echo "build..."
grunt build