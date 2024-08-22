import { initializeApp } from "firebase/app";
import { getStorage ,ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAbhUjdB0vO1vDhaNPMDXA8VmeqvOlQbJU",
  authDomain: "mmedia-5ae46.firebaseapp.com",
  projectId: "mmedia-5ae46",
  storageBucket: "mmedia-5ae46.appspot.com",
  messagingSenderId: "1082675259221",
  appId: "1:1082675259221:web:80d8b4d5a725dc1f65b1dc"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage , ref, uploadBytes, getDownloadURL};



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAbhUjdB0vO1vDhaNPMDXA8VmeqvOlQbJU",
//   authDomain: "mmedia-5ae46.firebaseapp.com",
//   projectId: "mmedia-5ae46",
//   storageBucket: "mmedia-5ae46.appspot.com",
//   messagingSenderId: "1082675259221",
//   appId: "1:1082675259221:web:80d8b4d5a725dc1f65b1dc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);