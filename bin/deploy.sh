#!/bin/sh

echo "deploying to dev"

echo "clean webroot for webapp..."
sudo rm -fv /var/www/analogstudios/html/*.html
sudo rm -fv /var/www/analogstudios/html/*.js
sudo rm -fv /var/www/analogstudios/html/*.map
sudo rm -fv /var/www/analogstudios/html/*.jpg
sudo rm -rfv /var/www/analogstudios/assets/**/*

echo "deploy to webroot..."
sudo cp -rvf build/* /var/www/analogstudios/html/