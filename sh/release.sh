#!/bin/sh

echo "exectuing release script for as-webapp-2.0 tag {{tag}}, deploying to environment {{env}}"

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

#npm install
#bower install

echo "build..."

# grunt build

echo "deploy"
echo "clean webroot for {{env}}..."
#sudo rm -rvf /var/www/html/analogstudios.net/*

echo "deploy to webroot for {{env}}..."
#sudo cp -rvf dest/* /var/www/html/analogstudios.net/