#!/bin/sh

echo "deploy"

echo "clean webroot..."
for d in /var/www/analogstudios/*/ ; do
  sudo rm -rvf "$d"
  echo
done

echo "deploy to webroot..."
sudo cp -rvf dest/* /var/www/analogstudios/