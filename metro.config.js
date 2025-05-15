// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add additional file extensions for TypeScript and web
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json', 'web.js', 'web.jsx', 'web.ts', 'web.tsx'];

// Add assetExts for web files
config.resolver.assetExts = [...config.resolver.assetExts, 'html', 'css'];

// Add support for web-specific modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
};

// Ensure we can resolve mocks for web
config.watchFolders = [
  ...config.watchFolders || [],
  path.resolve(__dirname, 'mocks')
];

module.exports = config;
