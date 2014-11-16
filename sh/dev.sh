#!/bin/sh

echo "executing dev script"

echo "show environment..."

echo "node version"
node --version

echo "npm version"
npm --version

echo "bower version"
bower --version

echo  "grunt version"
grunt --version

echo "git version"
git --version

echo "get dependencies..."
rm -rf node_modules/
rm -rf bower_components

bower cache clean

npm install
bower install
bower update

echo "build..."
grunt build

echo "deploy"
echo "clean webroot..."
sudo rm -rvf /var/www/html/analogstudios.net/*

echo "deploy to webroot..."
sudo cp -rvf dest/* /var/www/html/analogstudios.net/