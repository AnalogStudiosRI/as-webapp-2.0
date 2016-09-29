# Analog Studios 2.0
This is the front end application for the analogstudios.net 2.0 website redesign.  The webapp will allow users to view
events for artists and the studio, browse artists and events, listen to music and consumer other digital media, and
ideally participate through online social networks.  There is back end API application project as well.

## Tooling
The following tools are used in the application

- [Node][] - 4.4.x as the local development environment
- [NPM][] - 3.8.x package manager for node modules
- [Angular 2][] (rc5) - as the Front-End framework
- [TypeScript][] - superset of JavaScript for writing application code
- [Webpack][] - Module loader / bundler, primary build tool
- [Karma][] - task runner for unit testing
- [Jasmine 2.x][] - testing framework
- [LESS][] - CSS preprocessor
- [Bootstrap 4][] (alpha) - Mobile first CSS framework


[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Angular 2]: https://angular.io/
[TypeScript]: https://www.typescriptlang.org/
[Webpack]: https://webpack.github.io/
[Karma]: https://karma-runner.github.io/1.0/index.html
[Jasmine]: http://jasmine.github.io/
[LESS]: http://lesscss.org/
[Bootstrap 4]: https://v4-alpha.getbootstrap.com/

## Links
* Repository (Bitbucket)- https://bitbucket.org/thegreenhouse/as-webapp-2.0
* Documentation (Confluence) - https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Website
* Issue Tracker (JIRA) - https://thegreenhouse.atlassian.net/secure/RapidBoard.jspa?rapidView=2
* Jenkins - http://thegreenhouse.io:8080/
* Development Environment - http://analogstudios.thegreenhouse.io/
* Production Enviornment - http://www.analogstudios.net/

## Project Setup
*Note*: It is recommended that a Javascript based IDE is used, like [Webstorm][],
as they have a lot of the code quality and syntax tooling supported as plugins, often times right out of the box.

Recommended plugins to have are:
- Git (can show changed lines in the gutter when viewing a file)
- EditorConfig
- gitignore
- LESS
- TypeScript

[Webstorm]: https://www.jetbrains.com/webstorm/

### Vagrant
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

1. If you don't already have it, download and install NodeJS 4.x (comes with NPM).

2. This project favors version 3.x or higher, so make sure you have the latest by updating it after installing Node by running 

```
$ npm install -g npm@3.8.8
```

3. Now install the build and application dependencies by running

```
$ npm install 
$ npm run install:typings
```

## Project Layout
An overview of important files and configurations for the applications

* _src_ - application code
* _src/components/_ - resusable UI features
* _src/services/_ -  APIs for handling  backend REST APIs or browser APIs, non UI related "helpers"
* _src/view/_ -  routable states ("pages")
* _src/index.html_ - main layout of the application
* _src/main.ts_ - main entry way into the application and Angular "bootstrapper" (@NgModule)
* _src/polyfills.ts_ - collection of polyfills needed by the application
* _src/routes.ts_ - routes for the application, maps to different views
* _src/vendor.ts_ - vendor files from _node_modules_
* _karma.conf.js_ - karma configuration file
* _package.json_ - NPM dependency configuration file, for build related dependencies and runnable scripts
* _tsconfig.json_ - TypeScript compiler configuration file
* _tslint.json_ - configuration rules for [TSLint][]
* _typings.json_ - Type Definitions configuration, for prividing _.d.ts_ files for the TypeScript compiler
* _webpack.config.common.js_ - webpack config for managing shared webpack configurations
* _webpack.config.dev.js_ - webpack config for local development
* _webpack.config.prod.js_ - webpack config for production builds

[TSLint]: http://palantir.github.io/tslint/

## Tasks
This project uses Webpack as the build tool, called via NPM scripts.  All available tasks are in the `scripts`
section of _package.json_

To "force" which build environment you want a command to run against, export either production or development ENV variables, eg

```
 $ export NODE_ENV=production|development npm run <task>
 ```


### Development
This will start up a Node (Express) server which watches for changes and "redeploys" as needed.

```
$ npm run develop
```

See it in a browser by opening up

```
http://localhost:6789/
```

### Production
This is the production build task for the project.  It is used prior to deploying to an environment and bundles the
application for production.

```
$ npm run build
```

## Continuous Integration
There is a convenience task called `ci` for continuous integration environments, which builds and runs tests.  This is
recommended for all non-local environments

```
$ npm run ci
```


###
To serve a production build locally (not test), like for a demo, run:

```
$ npm run demo
```

**Note: it is recommended you run this command from the master branch or a tag.  By Default this proxies to dev.**


## Testing
To run unit tests locally using Karma, run 

```
$ npm run test:unit
```


## Dependency Management
There are two types of dependencies tracked in the application

#### Node Modules
Build packages (like Webpack) are installed through NPM into _package.json_, using
 
```
$ npm install <package-name>  --save-dev
```

Dependencies for the application (like Angular) are installed by running 

```
$ npm install <some-package> --save
```

#### TypeScript Typings
Typescript definitation are either managed by the Typings binary into _typings.json_.  Install new typings using 

```
$ ./node_modules/.bin/typings <typing-name> --save
```

example installing globally and form definitely typed (not NPM)

```
./node_modules/.bin/typings install dt~karma-jasmine --save --global
```


## Continuous Integration
Three builds are for the project in [Jenkins][], to support automated continues integration, deployment, and delivery.
Each job uses a specific version controlled shell script for use in Jenkins.

* CI - Watches for PRs in Bitbucket, and runs the production build and generates analysis and reporting.
* DEV - The CI task, but in addition deploys to dev upon success
* RELEASE (TODO) - To release the application

[Jenkins]: http://www.thegreenhouse.io:8080/

## Release Procedure
See documentation [here][]

[here]: https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Release+Management#ReleaseManagement-UI(StaticFrontend)

## AWS Info
### S3 Buckets

* hosted - hosted.analogstudios.net.s3-website-us-east-1.amazonaws.com
* webapp - webapp.analogstudios.net.s3-website-us-east-1.amazonaws.com

### CloudFront Distributions
* hosted - d34k5cjnk2rcze.cloudfront.net
* webapp - d3cpag05e1ba19.cloudfront.net