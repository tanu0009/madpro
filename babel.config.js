module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
      '@babel/preset-env'  // Add preset-env for better browser compatibility
    ],
    plugins: [
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-runtime',  // Add this to handle async/await and other modern features
      // Fix loose mode warnings
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      // Add a plugin to handle platform-specific code
      ['module-resolver', {
        alias: {
          // For web platform, provide mock implementations
          ...(process.env.EXPO_PUBLIC_PLATFORM === 'web' ? {
            'expo-font': './mocks.js',
            'crypto': './mocks/crypto.js',
            'uuid': './mocks/uuid.js'
          } : {})
        }
      }]
    ]
  };
};
