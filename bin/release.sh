#!/bin/sh
# assumes build task has been run
# expects proper environments to be exported

#TODO get tag for display
echo "running release script for as-webapp-$TAG"
node ./bin/release.js