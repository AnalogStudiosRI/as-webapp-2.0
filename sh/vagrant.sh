#! /usr/bin/env bash

echo -e "*** Starting installation... ***"

echo -e "*** Updating packages ***"
apt-get -qq update

echo -e "*** Installing base packages ***"
apt-get -y install vim curl git > /dev/null 2>&1
apt-get update

#echo -e "*** Adding custom repo for packages ***"
#add-apt-repository ppa:chris-lea/node.js
#apt-get update

echo -e "*** Installing Node and NPM ***"
apt-get -y -qq install build-essential nodejs-legacy npm

echo "node -v"
node -v
echo "npm -v"
npm -v

sudo npm install -g grunt-cli bower
echo "bower -v"
bower -v

echo -e "*** Installing Project Dependencies (if needed) ***"
if [ ! -d /vagrant/node_modules ]; then
  npm install
fi

if [ ! -d /vagrant/bower_components ]; then
  bower install
fi