
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtoclhM3Fo6GqDbd3GHFxNlfpq8gC_iUw",
  authDomain: "aftras-ed5f3.firebaseapp.com",
  projectId: "aftras-ed5f3",
  storageBucket: "aftras-ed5f3.firebasestorage.app",
  messagingSenderId: "554954669876",
  appId: "1:554954669876:web:78c2f712f1e63af9b4ef61",
  measurementId: "G-MVDZPEL4Y5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
