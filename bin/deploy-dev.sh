#!/bin/sh

echo "deploying to dev"

echo "clean webroot..."
for d in /var/www/analogstudios/html/*/ ; do
  sudo rm -rvf "$d"
  echo
done

echo "deploy to webroot..."
sudo cp -rvf dest/* /var/www/analogstudios/html