<template>
  <q-table
    title="Tasks"
    :rows="tasks"
    :columns="columns"
    row-key="id"
    :loading="loading"
  >
    <template v-slot:top-right>
      <q-btn color="primary" icon="add" label="Add Task" @click="emit('add-task')" />
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td key="actions" :props="props">
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="edit"
          @click="emit('edit-task', props.row)"
        />
        <q-btn
          flat
          round
          dense
          color="negative"
          icon="delete"
          @click="emit('delete-task', props.row.id)"
        />
      </q-td>
    </template>

    <template v-if="loading" v-slot:loading>
      <q-inner-loading :showing="true">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </template>

    <template v-if="error" v-slot:body-top>
      <q-banner bg="red-10" text-color="white">
        {{ error.message || 'An error occurred while loading tasks.' }}
      </q-banner>
    </template>
  </q-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define Props
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object,
    default: null,
  },
});

// Define Emits
const emit = defineEmits(['add-task', 'edit-task', 'delete-task']);
</script>
