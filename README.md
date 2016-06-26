###### Analog Studios 2.0
This is the front end component for the analogstudios.net 2.0 website redesign.

## Tooling
The following tools are used in the application

- [Node][] 4.4.x as the local development environment
- [NPM][]  3.8.x package manager for node modules
- [Gulp][] JavaScript based task runner
- [Angular ][] as the Front-End framework
- [TypeScript][] - superset of JavaScript for writing application code
- [SystemJS][] - ES7 (TBD) universal module loader
- [JSPM][] - client side package manager and JavaScript bundler
- [Karma][] and [Mocha][] for unit testing
- [Protractor][] for E2E testing Angular apps


[Node]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[JSPM]: http://jspm.io/
[Gulp]: http://gulpjs.com/
[Angular 2]: https://angular.io/
[TypeScript]: https://www.typescriptlang.org/
[SystemJS]: https://github.com/systemjs/systemjs
[JSPM]: http://jspm.io/
[Karma]: http://karma-runner.github.io/
[Mocha]: http://mochajs.org/
[Protractor]: https://angular.github.io/protractor/


## Project Setup
TODO
*Note*: It is recommended that for UI development, a Javascript based IDE is used, like [Webstorm][],
as they have a lot of the code quality and syntax tooling supported as plugins, often times right out of the box.
Recommended plugins to have are:
- Git (can show changed lines in the gutter when viewing a file)
- EditorConfig
- JSCS
- JSHint
- gitignore
- LESS

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

3. Now install the build and application dependencies for the front end project `npm install && npm run install:jspm`

4. TODO


## Documentation
https://thegreenhouse.atlassian.net/wiki/display/ASWEB/Website

### Tasks

### Development
TOOD
This will start up a node server with all files deployed and watches for changes and "redeploys" as needed.  This is the
default task and primary task of the development workflow.

```
$ gulp build --local
```

See it in a browser by opening up

```
http://local.analogstudios.thegreenhouse.io:6789/#home
```

### Building
TODO
This is the build task for the project.

```
$ gulp build --production build
```

### Showing a production build
TODO
To previews the production build locally against dev

```
$ grunt build --production --show
```

## Project Layout
An overview of important files and configurations for the applications

* _src_ - application code
* _src/assets/_ - common / misc assets (xml, .json, images, etc) for the application (TODO bundle with each component??)
* _src/components/_ - reusable angular modules grouped by role (view, component, bootstrap)
* _src/index.html_ - main layout of the application
* _src/main.ts_ - main entry way into the application and Angular bootstrapper
* _config.js_ - SystemJS config file and frontend dependency graph / loader, managed by JSPM
* _package.json_ - NPM dependency configuration file, for build related dependencies
* _tsconfig.json_ - TypeScript compiler configuration
* _typings.json_ - Type Definitions configuration, for prividing _.d.ts_ files for the TypeScript compiler

## Testing
TOOD
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


TODO
1. ~~systemjs~~
2. ~~typescript~~
3. ~~IDE autocomplete~~
4. get bootstrap.ts working / migrate modules/bootstrap, typings
5. migrate view
6. migrate components
7. JSPM integration
8. build dev / prod (NPM scripts)
9. Update README installation (note have to install jspm packages with `npm install --save-dev` to satisfy Webstorm resolution)
10. unit testing


`./node_modules/.bin/typings install dt~core-js --save --global`

```
System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "angular2": "npm:angular2@2.0.0-beta.17",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.6",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:angular2@2.0.0-beta.17": {
      "reflect-metadata": "npm:reflect-metadata@0.1.2",
      "rxjs": "npm:rxjs@5.0.0-beta.9",
      "zone.js": "npm:zone.js@0.6.12"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:reflect-metadata@0.1.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.0.0-beta.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:zone.js@0.6.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
```