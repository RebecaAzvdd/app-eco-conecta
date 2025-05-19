import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0xxtt8vqlq-lZrQJ9csGvFMjffvIpViQ",
    authDomain: "eco-conecta-8ee34.firebaseapp.com",
    projectId: "eco-conecta-8ee34",
    storageBucket: "eco-conecta-8ee34.firebasestorage.app",
    messagingSenderId: "577243524748",
    appId: "1:577243524748:web:5db9ca3a0c91594efc95a9",
    measurementId: "G-C2EX7JJS6J"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
