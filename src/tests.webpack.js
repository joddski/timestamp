// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

import 'angular';
import 'angular-mocks/angular-mocks'; // eslint-disable-line import/no-extraneous-dependencies

global.componentHandler = false; // needed due to MDL

const testsContext = require.context('.', true, /.spec$/);
testsContext.keys().forEach(testsContext);
