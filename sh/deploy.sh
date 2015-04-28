#!/bin/sh

echo "deploy"
echo "clean webroot..."
sudo rm -rvf /var/www/analogstudios/*

echo "deploy to webroot..."
sudo cp -rvf dest/* /var/www/analogstudios/