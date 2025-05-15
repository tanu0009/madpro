import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TestApp() {
  console.log('TestApp rendering');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test App</Text>
      <Text style={styles.text}>This is a minimal test app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
