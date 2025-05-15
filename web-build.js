#!/usr/bin/env node

/**
 * Simple script to build a web version without Expo's web features
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create web directory if it doesn't exist
const webDir = path.join(__dirname, 'web-build');
if (!fs.existsSync(webDir)) {
  fs.mkdirSync(webDir, { recursive: true });
}

// Create a simple HTML file that loads React and our app
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HerSafe - Women's Safety App</title>
  <style>
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: #f5f5f5;
    }
    .spinner {
      width: 40px;
      height: 40px;
      margin-bottom: 20px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #d81b60;
      animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
  <!-- Load React and React DOM from CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <!-- Load React Native Web from CDN -->
  <script crossorigin src="https://unpkg.com/react-native-web@0.19.0/dist/index.js"></script>
  <!-- Load Babel for JSX -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root">
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading HerSafe App...</p>
    </div>
  </div>
  
  <!-- Load our app component -->
  <script type="text/babel">
    // Create a simple entry point that uses our App component
    const { useState, useEffect } = React;
    const { View, Text, StyleSheet, TouchableOpacity, ScrollView } = ReactNativeWeb;
    
    // Import App.web.js component
    fetch('app.js')
      .then(response => response.text())
      .then(code => {
        // Execute the code
        eval(code);
        
        // Render the App component to the root element
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(App));
      })
      .catch(error => {
        console.error('Error loading app:', error);
        document.getElementById('root').innerHTML = 
          '<div style="padding: 20px; color: red;">Error loading app: ' + error.message + '</div>';
      });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(webDir, 'index.html'), htmlContent);

// Copy App.web.js to the web build directory as app.js
const appWebJsPath = path.join(__dirname, 'App.web.js');
if (fs.existsSync(appWebJsPath)) {
  const appWebJsContent = fs.readFileSync(appWebJsPath, 'utf8');
  fs.writeFileSync(path.join(webDir, 'app.js'), appWebJsContent);
  console.log('Copied App.web.js to web-build/app.js');
} else {
  console.error('App.web.js not found!');
}

console.log('Created web build at', webDir);
console.log('To serve the web build, run:');
console.log('npx http-server web-build -p 8090');
