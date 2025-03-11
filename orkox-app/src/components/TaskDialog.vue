<template>
  <q-dialog :model-value="modelValue" persistent @hide="$emit('update:modelValue', false)">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ isEditing ? 'Edit Task' : 'Add Task' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            :model-value="task.title"
            @update:model-value="emit('updateTask', { ...task, title: $event })"
            label="Task Title"
            :rules="[requiredRule]"
            placeholder="e.g., Investigate Network Logs"
          />

          <q-input
            :model-value="task.description"
            @update:model-value="emit('updateTask', { ...task, description: $event })"
            label="Task Description (Optional)"
            type="textarea"
            placeholder="Detailed description of the task"
          />

          <q-select
            :model-value="task.assignedTo"
            :options="assigneeOptions"
            label="Assigned To"
            :rules="[requiredRule]"
            @update:model-value="emit('updateTask', { ...task, assignedTo: $event })"
          />

          <q-select
            :model-value="task.status"
            :options="statusOptions"
            label="Status"
            :rules="[requiredRule]"
            @update:model-value="emit('updateTask', { ...task, status: $event })"
          />

          <q-datetime
            :model-value="task.dueDate"
            label="Due Date"
            mask="YYYY-MM-DD HH:mm"
            :rules="[requiredRule]"
            @update:model-value="emit('updateTask', { ...task, dueDate: $event })"
          />

          <q-select
            :model-value="task.priority"
            :options="priorityOptions"
            label="Priority"
            :rules="[requiredRule]"
            @update:model-value="emit('updateTask', { ...task, priority: $event })"
          />

          <div>
            <q-btn label="Cancel" color="secondary" @click="onCancel" />
            <q-btn
              label="Save Task"
              type="submit"
              color="primary"
              :loading="false"
              :disable="false"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      description: '',
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
    }),
  },
  assigneeOptions: {
    type: Array,
    required: true,
  },
  statusOptions: {
    type: Array,
    required: true,
  },
  priorityOptions: {
    type: Array,
    required: true,
  },
});

// Emits
const emit = defineEmits(['update:modelValue', 'save-task', 'cancel', 'updateTask']); // Added updateTask emit

// Functions

// Submit Function
const onSubmit = async () => {
  emit('save-task', props.task);
  emit('update:modelValue', false);
};

// Cancel Function
const onCancel = () => {
  emit('update:modelValue', false);
  emit('cancel');
};

// Validation Rule
const requiredRule = (val) => !!val || 'This field is required';
</script>
