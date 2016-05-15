#!/bin/sh

echo "executing build.sh..."

echo "show environment..."

echo "node version"
node --version

echo "npm version"
npm --version

echo "git version"
git --version

echo "clear existing dependencies..."
rm -rf node_modules/ > /dev/null 2>&1
rm -rf bower_components > /dev/null 2>&1

echo "clearing NPM caches..."
npm cache clean

echo "installing project dependencie"
echo "installing NPM packages"
npm install

echo "gulp version"
./node_modules/.bin/gulp --version

echo "bower version"
./node_modules/.bin/bower --version

echo "clearning bower cache..."
./node_modules/.bin/bower cache clean

echo "installing Bower dependencies..."
./node_modules/.bin/bower install

echo "running gulp build..."
./node_modules/.bin/gulp build --production