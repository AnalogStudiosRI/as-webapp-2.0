#!/bin/sh

echo "executing dev script"


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

npm install

#//XXX TODO install bower on Jenkins
#bower install

echo "build..."
grunt build

echo "deploy"
echo "clean webroot..."
sudo rm -rvf /var/www/html/analogstudios.net/*

echo "deploy to webroot..."
sudo cp -rvf dest/* /var/www/html/analogstudios.net/