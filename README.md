# Analog Studios - as-webapp-2.0 - Project

New front end comoponent for the 2.0 analogstudios.net website redesign.

## Install

1. Make sure you have [node][] and [bower][] installed. Then,
```
npm install && bower install
```
[node]: http://nodejs.org/
[bower]: http://bower.io/
2. Add these entries to your hosts file
```
127.0.0.1       local.analogstudios.thegreenhouse.io
127.0.0.1       local.analogstudios.api.thegreenhouse.io
```
3. Add the [EditorConfig][] plugin to your IDE

[EditorConfig]: http://editorconfig.org/

## Documentation can be found here
https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Website

## Build
The repo for this project is git@thegreenhouse.io:repositories/analogstudios/as-webapp-2.0.git

### Tasks
#### development
This will start up a node server with all files deployed and watches for changes and "redeploys" as needed.  This is t
he default task and primary task of the development workflow.
```
$ grunt dev
```

#### building
This is the build task for the project.
```
$ grunt build
```

#### show
```
$ grunt show
```
To preview the build locally against dev

## Pages Templating
The [Assemble][] grunt task will be leveraged to support assembly of the pages using handlebars syntax.  All players
and docs will have a page-name.json file to easily manage page specific dependencies.

```
{
  "name": "Home Page",
  "title": "Home Page",  //used for the _< title>Analog Studios : Music and Recordings - {{title}}</ title>_ tag
  "id": "home page",  //used as a CSS id for the wrapping content container
  "app": "home-page" //used to bootstrap angular
  "ctrl": "HomeCtrl" //used to define the controller name
  "stylesheets": [
    { "src" : "/pages/home/home.css" }
  ],
  "scripts": [
    { "src" : "/pages/home/home.js" }
  ]
}
```

[Assemble]: http://assemble.io/

## Dependencies
As many dependencies as possible will be managed through npm and bower, using globals.json as the internal application
dependency manager.

## Continuous Integration
Three builds are for the project in Jenkins, to support automated continues integration, deployment, and delivery.
Each job uses a specific version controlled shell script for use in Jenkins.

* CI - Watches all branches, and builds the app to run linting and testing and does analysis and reporting.
* DEV - The CI task, but deploys to dev upon success
* RELEASE - To release a specific version of the application to a specific environment

## Release Management
//XXX
