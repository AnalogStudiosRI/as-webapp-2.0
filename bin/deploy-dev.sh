#!/bin/sh

echo "deploying to dev"

echo "clean webroot..."
for d in /var/www/analogstudios/html/*/ ; do
  sudo rm -rvf "$d"
  echo
done

echo "deploy to webroot..."
sudo cp -vf index.html /var/www/analogstudios/html/
sudo cp -rvf src/ /var/www/analogstudios/html/
sudo cp -rvf node_modules/ /var/www/analogstudios/html/
sudo cp -vf systemJS.config.js /var/www/analogstudios/html/systemjs.config.js