// Import mocks first before anything else
import './mocks';

// Web-specific entry point
import { registerRootComponent } from 'expo';
import App from './App';

// Register the root component
registerRootComponent(App);
