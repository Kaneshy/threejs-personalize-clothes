
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "d-customizer.firebaseapp.com",
    projectId: "d-customizer",
    storageBucket: "d-customizer.appspot.com",
    messagingSenderId: "92605117271",
    appId: "1:92605117271:web:bd0da9750866aa2ce9c412",
    measurementId: "G-6GKC2YN21W"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app
