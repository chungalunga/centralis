import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useUserStore } from 'stores/userStore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO_VDlBtLUUwVT9jx73FTesIgm_ND3-Nk",
  authDomain: "organizely-ae827.firebaseapp.com",
  projectId: "organizely-ae827",
  storageBucket: "organizely-ae827.firebasestorage.app",
  messagingSenderId: "540471783903",
  appId: "1:540471783903:web:06676668c34f05ad09546a",
  measurementId: "G-ZG61LQ7ZDX"
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
          console.log("User logged in:", user.email);
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
