<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/userStore';

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  // Redirect to the loading page on app mount
  router.push('/loading');
});
</script>