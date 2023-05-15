import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTb6bljxqkQwwcKhmFfWkUSlysE_DbwR4",
  authDomain: "saudeapp-93c9f.firebaseapp.com",
  projectId: "saudeapp-93c9f",
  storageBucket: "saudeapp-93c9f.appspot.com",
  messagingSenderId: "377047844114",
  appId: "1:377047844114:web:c3298ed7c79c36ff171fcb"
};
// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const firebase = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

const storage = getStorage(app)

export { app, db, firebase, storage };

