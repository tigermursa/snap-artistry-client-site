// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEnNxl0bGyvkDdKHrzAfYnbyCZD7Tbb14",
  authDomain: "summer-camp-81b20.firebaseapp.com",
  projectId: "summer-camp-81b20",
  storageBucket: "summer-camp-81b20.appspot.com",
  messagingSenderId: "942375446712",
  appId: "1:942375446712:web:c8df897f058ded4893ac4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default app;
// TODO: ADD ENV