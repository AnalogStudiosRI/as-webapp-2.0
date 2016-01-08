# Analog Studios 2.0
This is the front end component for the analogstudios.net 2.0 website redesign.

## Tooling
The following tools are used in the application

- [Node][] as the local development environment
- [NPM][] / [Bower][] as the dependency managers
- [Gulp][] as the task runner
- [Angular][] as the framework (1.4.x)
- [Karma][] and [Mocha][] for unit testing
- [Protractor][] for E2E testing Angular apps


[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Bower]: http://bower.io/
[Gulp]: http://gulpjs.com/
[Angular]: https://angularjs.org/
[Karma]: http://karma-runner.github.io/
[Mocha]: http://mochajs.org/
[Protractor]: https://angular.github.io/protractor/


## Project Setup

*Note*: It is recommended that for UI development, a Javascript based IDE is used, like [Webstorm][] or [Sublime Text 2][],
as they have a lot of the code quality and syntax tooling supported as plugins, often times right out of the box.
Recommended plugins to have are:
- Git (can show changed lines in the gutter when viewing a file)
- EditorConfig
- JSCS
- JSHint
- gitignore
- LESS

Edit your _etc/hosts_ file by adding this entry `127.0.0.1      local.analogstudios.thegreenhouse.io`

### Vagrant (Recommended)
This project uses Vagrant to provision Virtual Machines for use with development.  It is very easy to use

First, install the following

- [Vagrant][] for replicating production environments locally for development.  Version 1.7.4 required
- [VirtualBox][] the tool used by Vagrant to spin up the local VM.  Version >= 5.x required.  Make sure to download
guest additions as well.
- [Vagrant Manager][] an OSX GUI tool for managing Vagrant instances (optional)


1. Vagrant Up
```
vagrant up
```
2. SSH into the VM
```
vagrant ssh
```

3. Change into your workspace
```
cd /vagrant
```

[Vagrant]: http://www.vagrantup.com/
[VirtualBox]: http://www.virtualbox.org/
[Vagrant Manager]: http://vagrantmanager.com/

### Manual

1. If you don't already have it, download and install NodeJS (which comes with NPM).

2. This project favors version 2.x or higher, so make sure you have the latest by updating it after install Node `npm install -g npm`

3. Install Gulp and Bower (globally is recommended, in which case you might need to use `sudo`) `npm install -g gulp bower`

4. Now install the build and application dependencies for the front end project `npm install && bower install`

5. Edit your _etc/hosts_ file by adding this entry `127.0.0.1      local.analogstudios.thegreenhouse.io`


## Documentation
https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Website

## Build

### Tasks
#### development
This will start up a node server with all files deployed and watches for changes and "redeploys" as needed.  This is the
default task and primary task of the development workflow.

```
$ gulp build --local
```

See it in a browser by opening up

```
http://local.analogstudios.thegreenhouse.io:6789/#home
```

#### building
This is the build task for the project.

```
$ gulp build --production build
```

#### showing a production build
To previews the production build locally against dev

```
$ grunt build --production --show
```

## Project Layout
TBD as the final form of 1p-frontend-new is not certain yet.  Expected structure

* _pipelines_ - gulp tasks organized by responsibility
* _src_ - application code
* _src/assets/_ - common / misc assets (xml, .json, images, etc) for the application
* _src/layouts_ - templatable page layouts
* _src/less/_ - application styles / styleguide
* _src/modules/_ - reusable angular modules grouped by role (view, component, bootstrap)

## Testing
TDD is supported for development

`gulp test:tdd`

## Continuous Integration
Three builds are for the project in Jenkins, to support automated continues integration, deployment, and delivery.
Each job uses a specific version controlled shell script for use in Jenkins.

* CI - Watches all branches, and builds the app to run linting and testing and does analysis and reporting.
* DEV - The CI task, but in addition deploys to dev upon success
* RELEASE - To release the application

## Release Procedure
See documentation posted [here][]

[here]: https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Release+Management#ReleaseManagement-UI(StaticFrontend)