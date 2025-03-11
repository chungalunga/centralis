import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useUserStore } from 'stores/userStore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBasGiF7L-ubWX-zOuK9TCBkkKq6-JcAGs",
  authDomain: "centralis-40442.firebaseapp.com",
  projectId: "centralis-40442",
  storageBucket: "centralis-40442.firebasestorage.app",
  messagingSenderId: "762039315573",
  appId: "1:762039315573:web:92bde9667de8f70beb5c3c",
  measurementId: "G-WG7BBQ3S7B"
};

let firebaseApp;
let auth;
let db;

// INITIALIZE FIREBASE
try {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully.");

  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// AUTH INITIALISED RESOLVE - important for later
let authInitializedResolve;
const authInitialized = new Promise((resolve) => {
  authInitializedResolve = resolve;
});

export { auth, db, authInitialized };

export default ({ app, router, store }) => {

  // Check Firebase App did not fail
  if (!firebaseApp) {
    console.error("Firebase app not initialized, skipping boot function");
    return;
  }

  // Set Persistance - make a call to the firebase
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Persistence set successfully");
      // Now, handle the onAuthStateChanged call, to get the user information
      onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged triggered");
        const userStore = useUserStore();
        // If the user is valid
        if (user) {
          userStore.setUser(user);
          console.log("User logged in:", user);
        } else {
          userStore.setUser(null);
          console.log("User logged out");
        }

        console.log("Authentication initialized. Resolving authInitialized promise.");
        authInitializedResolve(true); // Resolve promise
      });
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
      authInitializedResolve(false); // Always resolve promise
    });

  // Add app globals
  app.config.globalProperties.$auth = auth;
  app.config.globalProperties.$db = db;
};
