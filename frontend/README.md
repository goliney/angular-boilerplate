# angular-boilerplate
Boilerplate project for angularjs/bower/grunt

Inspired by:
 * https://github.com/ngbp/ngbp
 * https://github.com/johnpapa/angularjs-styleguide

Install
-------

All of the following commands have to be executed from `frontend` folder.

In order to be able to install all necessary packages, we need [npm](https://www.npmjs.com/), which comes with
[node.js](https://nodejs.org/). To verify `npm` is installed, run:

```
npm -v
```

In case `npm` is not installed, you may use this
[installing Node.js and updating npm](https://docs.npmjs.com/getting-started/installing-node).

Now you can install `bower` and `grunt` and `karma`:

```
sudo npm -g install grunt-cli karma bower
```

Build
-----

Install npm modules:

```
npm install
```

As a result, `node_modules` folder will appear. It will contain plugins, that may be used by task runner `grunt`.
You may find full list of modules at [package.json](package.json).

Install bower-components:

```
bower install
```

As a result, `vendor` folder will appear. It will contain components needed by the app.

Some of the used components:

1. [angular](https://angularjs.org/)
2. [lodash](https://lodash.com/)
3. [angular-ui-router](https://github.com/angular-ui/ui-router)
4. [angular-resource](https://docs.angularjs.org/api/ngResource)

Full list of used components you may find at [bower.json](bower.json). To include component into the app, you have to
include path to it at [build.config.js](build.config.js) at the `vendor_files` object.

You can build project now:

```
grunt
```

It`s a shortcut for `grunt build` and `grunt compile`. Two folders will appear:

1. `build` - version for development. All sources are not minified and not concatenated. Easy to debug
2. `bin` - version for deploy. Optimised for production

Develop
-------

All sources are located at [src](src/). Files at `build` and `bin` folders are generated automatically and should not be
edited directly.

To make changes at `src` folder reflect dynamically at `build` folder on the fly, without necessity run `grunt build`
each time file is edited, use:

```
grunt watch
```

To know, how app build process is going, read comments at [Gruntfile.js](Gruntfile.js).

To know more about project structure, see https://github.com/ngbp/ngbp.

To know more about code style-guide, used here, see https://github.com/johnpapa/angularjs-styleguide.
