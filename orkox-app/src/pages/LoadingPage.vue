<template>
  <q-page class="flex flex-center">
    <q-spinner color="primary" size="3em" />
    <p>Loading...</p>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/userStore';
import { authInitialized } from 'boot/firebase';

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  await authInitialized;

  if (userStore.isLoggedIn) {
    router.push('/incidents'); // Or your main app route
  } else {
    router.push('/login');
  }
});
</script>
