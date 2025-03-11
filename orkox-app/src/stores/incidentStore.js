import { defineStore } from 'pinia';
import { db } from 'boot/firebase'; // adjust path
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp } from 'firebase/firestore';  // Import Firestore functions
import { useUserStore } from 'stores/userStore'; // Import the userStore

export const useIncidentStore = defineStore('incident', {
  state: () => ({
    incidents: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchIncidents() {
      this.loading = true;
      try {
        console.log("Fetching incidents")
        const querySnapshot = await getDocs(collection(db, "incidents"));
        this.incidents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching incidents:", error);
        this.error = error.message;
      } finally {
        console.log("Fetched incidents")
        this.loading = false;
      }
    },

    async addIncident(incidentData) {
      const userStore = useUserStore(); // Get the userStore
      const userId = userStore.userId; // Get the user ID

      if (!userId) {
        console.error("User not logged in.");
        this.error = "User not logged in.";
        return; // Or throw an error
      }

      try {
        const docRef = await addDoc(collection(db, "incidents"), {
          ...incidentData,
          createdBy: userId, // Add the user ID
          createdAt: serverTimestamp(),
          authorizedReaders: [userId] // Initialize authorizedReaders with the creator
        });
        this.incidents.push({ id: docRef.id, ...incidentData, createdBy: userId });
        return docRef.id;
      } catch (error) {
        console.error("Error adding incident:", error);
        this.error = error.message;
      }
    },

    async updateIncident(incidentId, updates) {
      try {
        const incidentDocRef = doc(db, "incidents", incidentId);
        await updateDoc(incidentDocRef, updates);

        // Update incident in the store as well (optimistic update)
        const index = this.incidents.findIndex(incident => incident.id === incidentId);
        if (index !== -1) {
          this.incidents[index] = { ...this.incidents[index], ...updates };
        }
      } catch (error) {
        console.error("Error updating incident:", error);
        this.error = error.message;
      }
    },

    async deleteIncident(incidentId) {
      try {
        const incidentDocRef = doc(db, "incidents", incidentId);
        await deleteDoc(incidentDocRef);

        this.incidents = this.incidents.filter(incident => incident.id !== incidentId);
      } catch (error) {
        console.error("Error deleting incident:", error);
        this.error = error.message;
      }
    },

    // Add/Remove Authorized Readers Actions
    async addAuthorizedReader(incidentId, userId) {
      try {
        const incidentDocRef = doc(db, "incidents", incidentId);
        await updateDoc(incidentDocRef, {
          authorizedReaders: arrayUnion(userId)
        });

        // Optionally, update the incident in the store as well
        const index = this.incidents.findIndex(incident => incident.id === incidentId);
        if (index !== -1) {
          // Ensure authorizedReaders exists or is initialized before adding to it.
          if (!this.incidents[index].authorizedReaders) {
            this.incidents[index].authorizedReaders = [];
          }
          this.incidents[index].authorizedReaders.push(userId);
        }

      } catch (error) {
        console.error("Error adding authorized reader:", error);
        this.error = error.message;
      }
    },

    async removeAuthorizedReader(incidentId, userId) {
      try {
        const incidentDocRef = doc(db, "incidents", incidentId);
        await updateDoc(incidentDocRef, {
          authorizedReaders: arrayRemove(userId)
        });

        // Optionally, update the incident in the store as well
        const index = this.incidents.findIndex(incident => incident.id === incidentId);
        if (index !== -1) {
          if (this.incidents[index].authorizedReaders) {
            this.incidents[index].authorizedReaders = this.incidents[index].authorizedReaders.filter(uid => uid !== userId);
          }
        }

      } catch (error) {
        console.error("Error removing authorized reader:", error);
        this.error = error.message;
      }
    },
  },
});
