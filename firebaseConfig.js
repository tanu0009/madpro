import { initializeApp } from '@react-native-firebase/app';
import { getDatabase } from '@react-native-firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEN8CupUU4tAKmXg8lJg1HN6qblQyKi3Y",
  authDomain: "madpro-db498.firebaseapp.com",
  projectId: "madpro-db498",
  storageBucket: "madpro-db498.firebasestorage.app",
  messagingSenderId: "192588737481",
  appId: "1:192588737481:web:137a6014cec65484a25618",
  measurementId: "G-K0C9CQPD49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };