import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCKaok7HcaoZ7jDn6EY2ua1Hex8XIgeUWU",
    authDomain: "sports-comm.firebaseapp.com",
    projectId: "sports-comm",
    storageBucket: "sports-comm.appspot.com",
    messagingSenderId: "262315949373",
    appId: "1:262315949373:web:9035f3c83fe6d3f1bb1954",
    measurementId: "G-ZN05DP8HRZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };