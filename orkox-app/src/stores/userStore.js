import { defineStore } from 'pinia';
import { auth, db } from 'boot/firebase'; // adjust path
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'; // Import GoogleAuthProvider and signInWithPopup

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    currentRoute: null
  }),
  actions: {
    async signIn(email, password) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        this.user = userCredential.user;  // Store User object from firebase.
        return true; // Signal success
      } catch (error) {
        console.error('Sign-in error', error.message);
        throw error; // Re-throw to handle in the component
      }
    },

    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider(); // Create a GoogleAuthProvider instance
        const result = await signInWithPopup(auth, provider); // Sign in with popup
        this.user = result.user; // Set user state

      } catch (error) {
        console.error('Google Sign-in error', error.message);
        throw error; // Re-throw to handle in the component
      }
    },

    async signOut() {
      try {
        await signOut(auth); // Use firebase/auth signOut function
        this.user = null;
      } catch (error) {
        console.error('Sign-out error', error.message);
      }
    },
    setUser(user) {
      this.user = user;
    },
    // ... other auth-related actions (signUp, etc.)
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    userId: (state) => state.user ? state.user.uid : null,
  },
});
