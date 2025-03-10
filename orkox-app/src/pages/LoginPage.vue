<template>
  <q-page class="flex flex-center">
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input filled v-model="form.email" label="Email" />
          <q-input filled v-model="form.password" label="Password" type="password" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Login" color="primary" @click="onSubmit" />
        <q-btn flat label="Sign in with Google" color="primary" @click="signInGoogle" /> <!-- Google Sign-In Button -->
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  email: '',
  password: ''
});

const onSubmit = async () => {
  try {
    await userStore.signIn(form.value.email, form.value.password);
    router.push('/incidents'); // Redirect to incidents page after login
  } catch (error) {
    console.error('Login failed', error);
    // Display error message to the user (e.g., using a Quasar Notify)
    $q.notify({
      message: 'Login failed: ' + error.message,
      color: 'negative',
      icon: 'warning'
    });
  }
};

const signInGoogle = async () => {
  try {
    await userStore.signInWithGoogle();
    router.push('/incidents'); // Redirect to incidents page after login
  } catch (error) {
    console.error('Google Sign-in failed', error);
    // Display error message to the user (e.g., using a Quasar Notify)
    $q.notify({
      message: 'Google Sign-in failed: ' + error.message,
      color: 'negative',
      icon: 'warning'
    });
  }
};
</script>
