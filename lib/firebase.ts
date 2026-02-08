import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "REDACTED_API_KEY",
    authDomain: "whimsical-love.firebaseapp.com",
    projectId: "whimsical-love",
    storageBucket: "whimsical-love.firebasestorage.app",
    messagingSenderId: "46985704278",
    appId: "1:46985704278:web:78f285654d277192121cf7",
    measurementId: "G-DTXWK11ML7"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };
