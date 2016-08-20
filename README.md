###### Analog Studios 2.0
This is the front end component for the analogstudios.net 2.0 website redesign.

## Tooling
The following tools are used in the application

- [Node][] 4.4.x as the local development environment
- [NPM][]  3.8.x package manager for node modules
- [Gulp][] JavaScript based task runner
- [Angular 2][] as the Front-End framework
- [TypeScript][] - superset of JavaScript for writing application code
- [SystemJS][] - ES7 (TBD) universal module loader


[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Gulp]: http://gulpjs.com/
[Angular 2]: https://angular.io/
[TypeScript]: https://www.typescriptlang.org/
[SystemJS]: https://github.com/systemjs/systemjs

## Project Setup
TODO
*Note*: It is recommended that a Javascript based IDE is used, like [Webstorm][],
as they have a lot of the code quality and syntax tooling supported as plugins, often times right out of the box.
Recommended plugins to have are:
- Git (can show changed lines in the gutter when viewing a file)
- EditorConfig
- JSCS
- JSHint
- gitignore
- LESS
- TypeScript

[Webstorm]: https://www.jetbrains.com/webstorm/

### Vagrant (Recommended)
TODO
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

1. If you don't already have it, download and install NodeJS 4.x (which comes with NPM).

2. This project favors version 3.x or higher, so make sure you have the latest by updating it after install Node `npm install -g npm@3.8.8`

3. Now install the build and application dependencies for the front end project `npm install && npm run install:tpyings`

4. TODO


## Documentation
https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Website

## Project Layout
An overview of important files and configurations for the applications

* _src_ - application code
* _src/components/_ - resusable UI features
* _src/services/_ -  APIs for handling with backend REST API or browser APIs
* _src/view/_ -  routable states, "pages"
* _src/main.ts_ - main entry way into the application and Angular bootstrapper
* _src/routes.ts_ - routes for the application, maps to different views
* _index.html_ - main layout of the application //TODO
* _system.config.js_ - SystemJS config file and frontend dependency graph / loader, managed by JSPM
* _package.json_ - NPM dependency configuration file, for build related dependencies
* _tsconfig.json_ - TypeScript compiler configuration
* _typings.json_ - Type Definitions configuration, for prividing _.d.ts_ files for the TypeScript compiler

### Tasks

### Development
This will start up a node server with all files deployed and watches for changes and "redeploys" as needed.  This is the
default task and primary task of the development workflow.

```
$ npm run develop
```

See it in a browser by opening up

```
http://localhost:6789/
```

### Building
This is the build task for the project.  It is used prior to deploying an environment.

```
$ npm run tsc
```

### Showing a production build
TODO

## Dependency Management
There are three types of dependencies tracked in the application

### Node Modules
Build packages are installed through NPM into _package.json_, using `npm install <package-name>`  --save-dev

### TypeScript Typings
All dependencies are either managed by Typings through _typings.json_.  Install new typings using `./node_modules/.bin/typings install <typing-name> --save`

### JSPM Packages
TODO
//Client-side libraries (like Angular) are managed through JSPM by using _package.json_ .  Install new packages usings `.node`


## Testing
TODO

## Continuous Integration
Three builds are for the project in [Jenkins][], to support automated continues integration, deployment, and delivery.
Each job uses a specific version controlled shell script for use in Jenkins.

* CI - Watches all branches, and builds the app to run linting and testing and does analysis and reporting.
* DEV - The CI task, but in addition deploys to dev upon success
* RELEASE - To release the application

[Jenkins]: http://www.thegreenhouse.io:8080/

## Release Procedure
See documentation posted [here][]

[here]: https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Release+Management#ReleaseManagement-UI(StaticFrontend)


TODO
1. ~~systemjs~~
2. ~~typescript~~
3. ~~IDE autocomplete~~
4. ~~get bootstrap.ts working / migrate modules/bootstrap, typings~~
5. migrate view / components
6. Gulp integration  ???
8. JSPM integration  ???
8. build dev / prod (NPM scripts) - Webpack??
9. Update README installation (note have to install jspm packages with `npm install --save-dev` to satisfy Webstorm resolution)
10. unit testing
11. document server setup (eg. `{fallback: 'index.html')` in gulp-webserver
12. ~folder organization (services directory?)~
13. ~Track TODOs~