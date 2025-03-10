<template>
  <q-card style="width: 500px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">{{ incident ? 'Edit Incident' : 'New Incident' }}</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="onSubmit">
        <q-input filled v-model="form.title" label="Title" />
        <q-input filled v-model="form.description" label="Description" type="textarea" />
        <!-- Add more fields like status, severity, etc. -->
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup @click="emit('close')" />
      <q-btn flat label="Submit" color="primary" @click="onSubmit" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  incident: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['incident-submitted', 'close']);

const form = ref({
  title: '',
  description: '',
  // ... other fields
});

watch(
  () => props.incident,
  (newIncident) => {
    if (newIncident) {
      form.value = { ...newIncident }; // Populate form with incident data for editing
    } else {
      form.value = { title: '', description: '' }; // Reset form for new incidents
    }
  },
  { immediate: true }
);


const onSubmit = () => {
  emit('incident-submitted', form.value);
  emit('close');
};
</script>
