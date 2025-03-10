<template>
  <q-item clickable v-ripple @click="emit('edit', incident)">
    <q-item-section>
      <q-item-label>{{ incident.title }}</q-item-label>
      <q-item-label caption lines="1">{{ incident.description }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>{{ incident.status }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  incident: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit']);
</script>
