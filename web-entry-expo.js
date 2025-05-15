// Import polyfills and mocks first
import './polyfills';
import './mocks';

// Ensure ExpoFontLoader is available
if (typeof window !== 'undefined' && !window.ExpoFontLoader) {
  window.ExpoFontLoader = {
    loadAsync: function() { return Promise.resolve(); }
  };
}

// Import the registerRootComponent function from expo
import { registerRootComponent } from 'expo';

// Import the App component
import App from './App';

// Register the App component as the root component
registerRootComponent(App);
