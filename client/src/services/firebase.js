import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBpf4LXqmLkpFtrsnIU_Xe4Sziv4eQcQTA",
  authDomain: "amuma-smart-bra.firebaseapp.com",
  databaseURL: "https://amuma-smart-bra-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "amuma-smart-bra",
  storageBucket: "amuma-smart-bra.firebasestorage.app",
  messagingSenderId: "716685429019",
  appId: "1:716685429019:web:0711c4464f4760e21a2bbe",
  measurementId: "G-RZ9ZRW7JL1"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;