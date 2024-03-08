import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "{{process.env.VUE_APP_FIREBASE_API_KEY}}",
    authDomain: "sports-comm.firebaseapp.com",
    projectId: "sports-comm",
    storageBucket: "sports-comm.appspot.com",
    messagingSenderId: "262315949373",
    appId: "1:262315949373:web:9035f3c83fe6d3f1bb1954",
    measurementId: "G-ZN05DP8HRZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };