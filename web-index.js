// Import polyfills and mocks first
import './polyfills';
import './mocks';

// Web-specific entry point
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';

// Import the web-specific App component
import App from './App.web.js';

console.log('Loading App for web');

// Set up the root element for web
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  if (rootTag) {
    rootTag.style.height = '100%';
  }
}

// Mock crypto for web
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  if (!window.crypto) {
    window.crypto = {
      getRandomValues: function(array) {
        for (var i = 0; i < array.length; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
        return array;
      },
      randomUUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    };
  }
}

// Mock ExpoFontLoader for web
if (Platform.OS === 'web') {
  // This prevents the ExpoFontLoader error
  global.ExpoFontLoader = {
    loadAsync: function() { return Promise.resolve(); }
  };
}

registerRootComponent(App);
