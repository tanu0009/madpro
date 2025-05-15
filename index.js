// Import mocks first to handle native module issues
require('./mocks');

var expo = require('expo');
var App = require('./App').default;

console.log('Starting app with mocks loaded');

expo.registerRootComponent(App);
