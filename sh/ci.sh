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
rm -rvf node_modules/
npm install

rm -rvf bower_components
#//XXX TODO install bower on Jenkins
#bower install

echo "build..."
grunt build