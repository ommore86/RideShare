// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdQjknQ1mSS3a-iw0zXpiKr7B4T7ybiGk",
    authDomain: "rideshare-86.firebaseapp.com",
    projectId: "rideshare-86",
    storageBucket: "rideshare-86.firebasestorage.app",
    messagingSenderId: "897347300702",
    appId: "1:897347300702:web:5b815fe21856e901d373cf",
    measurementId: "G-WTBL4TF40L"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };