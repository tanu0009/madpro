# HerSafe - Women's Safety Web Application

## Overview
HerSafe is a women's safety web application designed to provide essential safety features including emergency SOS, location tracking, and safety tips. This application was built with multiple deployment options to ensure compatibility across different environments.

## Features
- **Emergency SOS Button**: Quickly activate an emergency mode that can alert contacts
- **Location Tracking**: Get and share your current location using browser geolocation
- **Emergency Contacts Management**: Add and manage emergency contacts
- **Safety Tips**: Access important safety information and advice
- **Multi-screen Navigation**: Simple and intuitive navigation between different features

## Technical Details
This application has multiple deployment options:

### 1. Expo React Native (Mobile & Web)
- Built with Expo and React Native
- TypeScript support
- Native mobile capabilities
- Web compatibility with polyfills

### 2. Custom Webpack Build (Web Only)
- React and React Native Web
- Custom webpack configuration
- Pure JavaScript implementation
- No native dependencies

### 3. Simple Static Web Build
- Pure HTML/JS/CSS implementation
- No build tools required for deployment
- CDN-based React and React Native Web
- Babel for JSX transformation

## Getting Started

### Prerequisites
- Node.js and npm

### Installation
```bash
npm install
```

### Running the Application

#### Expo Development (Mobile & Web)
```bash
npm start         # Run on all platforms
npm run ios       # Run on iOS simulator
npm run android   # Run on Android device/emulator
npm run web-expo  # Run Expo web version (port 19009)
```

#### Custom Webpack Development (Web Only)
```bash
npm run custom-web
```
This will start the development server at http://localhost:9004

#### Simple Static Web Version
```bash
npm run web-simple
```
This will build and serve a static version at http://localhost:8091

#### Production Build (Web Only)
```bash
npm run build
```
This creates optimized files in the `dist` directory for deployment.

## Project Structure
- `App.tsx`: Main Expo application entry point
- `screens.js`: Screen components for the application
- `simple-web-app.js`: Custom webpack version entry point
- `App.web.js`: Web-specific implementation
- `custom-webpack.config.js`: Custom webpack configuration
- `web-build.js`: Static web build generator
- `mocks/`: Mock implementations for native modules
- `polyfills.js`: Browser compatibility polyfills

## Troubleshooting

### Expo Web Issues
If you encounter issues with Expo web, such as 'Cannot find native module ExpoFontLoader' or other compatibility errors, try the following:

1. Use the custom webpack version: `npm run custom-web`
2. Use the simple static web version: `npm run web-simple`
3. Update the babel.config.js and metro.config.js files

### Port Conflicts
If you encounter port conflicts, you can modify the port numbers in:
- `package.json` for npm scripts
- `custom-webpack.config.js` for the webpack dev server

## License
This project is licensed under the MIT License.

## Acknowledgements
This project demonstrates multiple approaches to building and deploying a React/React Native application for web, addressing common challenges with native dependencies and cross-platform compatibility.
