#! /usr/bin/env bash

echo -e "*** Starting installation... ***"

echo -e "*** Updating packages ***"
apt-get -qq update

echo -e "*** Installing base packages ***"
apt-get -y install vim curl git libfontconfig > /dev/null 2>&1
apt-get update

echo -e "*** Installing Node and NPM ***"
apt-get -y -qq install build-essential nodejs-legacy npm

sudo npm install -g grunt-cli@0.1.13 bower@1.3.12 npm@2.1.12

echo "bower -v"
bower -v
echo "node -v"
node -v
echo "npm -v"
npm -v
echo "grunt -v"
grunt -v

echo -e "*** Installing Project Dependencies (if needed) ***"
if [ ! -d /vagrant/node_modules ]; then
  npm install
fi

if [ ! -d /vagrant/bower_components ]; then
  bower install
fi