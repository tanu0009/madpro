const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  // Use web-entry.js as the entry point for web
  env.entryFile = './web-entry.js';
  
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      mode: 'development',
    },
    argv
  );

  // Customize the config before returning it
  config.resolve.extensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.ts', '.tsx', '.js', '.jsx', '.json'];

  // Add aliases for problematic modules
  config.resolve.alias = {
    ...config.resolve.alias,
    'uuid': path.resolve(__dirname, 'mocks/uuid.js'),
    'crypto': path.resolve(__dirname, 'mocks/crypto.js')
  };

  // Add fallbacks for native modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'expo-font': false,
    'react-native-safe-area-context': false,
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'buffer': require.resolve('buffer/'),
    'process': require.resolve('process/browser'),
    'path': require.resolve('path-browserify'),
    'fs': false,
    'os': require.resolve('os-browserify/browser')
  };

  // Add a plugin to provide mocks for native modules
  config.plugins.push(
    new webpack.DefinePlugin({
      'global.ExpoFontLoader': JSON.stringify({
        loadAsync: function() { return Promise.resolve(); }
      }),
    }),
    // Provide Buffer and process for web
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  );
  
  // Fix for webpack-dev-server compatibility issue
  if (config.devServer) {
    // Remove the problematic _assetEmittingPreviousFiles property if it exists
    delete config.devServer._assetEmittingPreviousFiles;
  }

  // Ensure proper handling of ES6 syntax
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  });
  
  // Add a specific rule for .web.js files
  config.module.rules.push({
    test: /\.web\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  });

  return config;
};