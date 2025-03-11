// stores/taskStore.js
import { defineStore } from 'pinia';
import { db } from 'boot/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useQuasar } from 'quasar'; // Import useQuasar

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    unsubscribe: null, // To store the unsubscribe function
  }),
  getters: {
    getTasks: (state) => state.tasks,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  actions: {
    async fetchTasks(incidentId) {
      this.loading = true;
      this.error = null;
      try {
        //Unsubscribe if the task listener is already active.
        if (this.unsubscribe) {
          this.unsubscribe();
        }
        // Set up real-time listener and store the unsubscribe function in state
        this.unsubscribe = onSnapshot(
          collection(db, 'incidents', incidentId, 'tasks'),
          (querySnapshot) => {
            this.tasks = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Updated Tasks (Realtime):", this.tasks);
          },
          (error) => {
            console.error('Error fetching tasks:', error);
            this.error = error;
            //You can trigger an error in Quasar from the error call back
            // $q.notify({
            //   message: 'Error fetching tasks',
            //   color: 'negative',
            //   icon: 'error',
            // });
          }
        );
      } catch (error) {
        console.error('Error setting up real-time listener:', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addTask(incidentId, task) {
      this.loading = true;
      this.error = null;
      try {
        const tasksCollection = collection(db, 'incidents', incidentId, 'tasks');
        await addDoc(tasksCollection, task);
      } catch (error) {
        console.error('Error adding task:', error);
        this.error = error;
        //You can trigger an error in Quasar from the error call back
        // $q.notify({
        //   message: 'Error adding tasks',
        //   color: 'negative',
        //   icon: 'error',
        // });
      } finally {
        this.loading = false;
      }
    },
    async updateTask(incidentId, taskId, task) {
      this.loading = true;
      this.error = null;
      try {
        const taskDoc = doc(db, 'incidents', incidentId, 'tasks', taskId);
        await updateDoc(taskDoc, task);
      } catch (error) {
        console.error('Error updating task:', error);
        this.error = error;
        //You can trigger an error in Quasar from the error call back
        // $q.notify({
        //   message: 'Error updating tasks',
        //   color: 'negative',
        //   icon: 'error',
        // });
      } finally {
        this.loading = false;
      }
    },
    async deleteTask(incidentId, taskId) {
      this.loading = true;
      this.error = null;
      try {
        const taskDoc = doc(db, 'incidents', incidentId, 'tasks', taskId);
        await deleteDoc(taskDoc);
      } catch (error) {
        console.error('Error deleting task:', error);
        this.error = error;
        //You can trigger an error in Quasar from the error call back
        // $q.notify({
        //   message: 'Error deleting tasks',
        //   color: 'negative',
        //   icon: 'error',
        // });
      } finally {
        this.loading = false;
      }
    },
    clearTasks() {
      //This will clear the tasks if a new listener is being setup.
      this.tasks = [];
    },
    unsubscribeListener() {
      if (this.unsubscribe) {
        console.log("Unsubscribing all listeners");
        this.unsubscribe();
        this.unsubscribe = null; // Reset the unsubscribe function
      }
    },
  },
});
