// Import polyfills first
require('./polyfills');

// Basic web entry point with no modern syntax
var React = require('react');
var ReactDOM = require('react-dom');

// Import the web-specific App component
var App = require('./App.web.js').default;

// Mock ExpoFontLoader globally
if (typeof window !== 'undefined') {
  window.ExpoFontLoader = {
    loadAsync: function() { return Promise.resolve(); }
  };
}

// Mock other native modules that might be used
if (typeof window !== 'undefined') {
  window.ExponentConstants = {
    statusBarHeight: 0,
    deviceId: 'web',
    installationId: 'web'
  };
}

// Mount the app
function startApp() {
  var appContainer = document.getElementById('root');
  if (appContainer) {
    ReactDOM.render(React.createElement(App), appContainer);
  }
}

// Start when DOM is ready
if (document.readyState === 'complete') {
  startApp();
} else {
  document.addEventListener('DOMContentLoaded', startApp);
}
