#!/usr/bin/env bash

version=$1

cd dest/

tar -cvzf as-webapp-$version.tar.gz .

cd ../