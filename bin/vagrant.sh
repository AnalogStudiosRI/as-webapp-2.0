#! /usr/bin/env bash

echo -e "*** Starting installation... ***"

echo -e "*** Updating packages ***"
apt-get -qq update

echo -e "*** Installing base packages ***"
apt-get -y install vim curl git libfontconfig > /dev/null 2>&1
apt-get update

echo -e "*** Installing Node and NPM ***"
# remove existing nodejs install
#apt-get remove --purge node
#apt-get remove --purge nodejs

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs
apt-get install --yes build-essential
#apt-get install -y npm

#apt-get -y -qq install build-essential nodejs-legacy npm
#npm install -g gulp@3.8.11 gulp-cli@0.3.0 bower@1.6.5

echo "node -v"
node -v
#echo "npm -v"
#npm -v
#echo "bower -v"
#bower -v
#echo "gulp -v"
#gulp -v

#echo -e "*** Installing Project Dependencies ***"
#cd /vagrant

#rm -rf node_modules > /dev/null 2>&1
#rm -rf bower_components > /dev/null 2>&1

#if [ ! -d /vagrant/node_modules ]; then
#npm install
#fi

#if [ ! -d /vagrant/bower_components ]; then
#bower install
#fi