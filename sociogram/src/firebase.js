// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsQZe9pEVMsTWP0PegJvDXcHUnw3CzI54",
  authDomain: "instagram-f060c.firebaseapp.com",
  projectId: "instagram-f060c",
  storageBucket: "instagram-f060c.appspot.com",
  messagingSenderId: "508994261974",
  appId: "1:508994261974:web:3769334a9b5b7512e20a77",
  measurementId: "G-YEZKXQ1T8R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// import { getStorage } from "firebase/storage";
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage, analytics };
