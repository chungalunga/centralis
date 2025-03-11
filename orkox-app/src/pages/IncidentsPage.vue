<template>
  <q-page class="bg-grey-1">

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Edit Task' : 'Add Task' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input v-model="task.title" label="Task Title" :rules="[requiredRule]"
              placeholder="e.g., Investigate Network Logs" />

            <q-input v-model="task.description" label="Task Description (Optional)" type="textarea"
              placeholder="Detailed description of the task" />

            <q-select v-model="task.assignedTo" :options="assigneeOptions" label="Assigned To"
              :rules="[requiredRule]" />

            <q-select v-model="task.status" :options="statusOptions" label="Status" :rules="[requiredRule]" />

            <q-datetime v-model="task.dueDate" label="Due Date" mask="YYYY-MM-DD HH:mm" :rules="[requiredRule]" />

            <q-select v-model="task.priority" :options="priorityOptions" label="Priority" :rules="[requiredRule]" />

            <div>
              <q-btn label="Cancel" color="secondary" @click="onCancel" />
              <q-btn label="Save Task" type="submit" color="primary" :loading="loading" :disable="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-toolbar style="max-width: 900px;" class="q-mx-auto">
      <div class="text-h4">Incidents</div>
      <q-space />
      <q-input borderless placeholder="Search" class="rounded-borders search-input q-ma-xl q-pl-md"
        v-model="searchQuery" style="width: 300px;">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn color="primary" label="Report a new incident" rounded @click="goToNewIncidentPage" class="q-ml-md" />
    </q-toolbar>

    <q-card style="max-width: 900px;" class="q-mx-auto">
      <q-table :rows="filteredIncidents" :columns="columns" row-key="id" :loading="incidentStore.loading"
        :filter="searchQuery" flat bordered class="q-pa-md rounded-borders" hide-pagination hide-bottom>
        <template v-slot:body="props">
          <q-tr :props="props" style="cursor: pointer;" @click="goToIncidentDetails(props.row.id)">
            <q-td key="title" :props="props">
              <div class="text-body1">{{ props.row.title }}</div>
              <div class="text-caption text-grey">{{ props.row.description }}</div>
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ formatDate(props.row.createdAt) }}
            </q-td>
            <q-td key="length" :props="props">
              <span class="row items-center">
                <q-badge color="red" size="0.5em" class="q-mr-sm"></q-badge>Ongoing
              </span>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:loading>
          <q-inner-loading :showing="true">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>

      <q-dialog v-model="isNewIncidentDialogVisible">
        <IncidentForm @incident-submitted="handleIncidentSubmitted" @close="isNewIncidentDialogVisible = false" />
      </q-dialog>

      <q-dialog v-model="isEditIncidentDialogVisible">
        <IncidentForm :incident="selectedIncident" @incident-submitted="handleIncidentSubmitted"
          @close="isEditIncidentDialogVisible = false" />
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useIncidentStore } from 'stores/incidentStore'; // adjust path
import IncidentForm from 'components/IncidentForm.vue'; // adjust path
import { date } from 'quasar';
import { useRouter } from 'vue-router'; // Import useRouter

const incidentStore = useIncidentStore();
const searchQuery = ref('');
const isNewIncidentDialogVisible = ref(false);
const isEditIncidentDialogVisible = ref(false);
const selectedIncident = ref(null);

const router = useRouter();

onMounted(() => {
  incidentStore.fetchIncidents();
});

const filteredIncidents = computed(() => {
  if (!searchQuery.value) {
    return incidentStore.incidents;
  }
  const searchTerm = searchQuery.value.toLowerCase();
  return incidentStore.incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm) ||
    incident.description.toLowerCase().includes(searchTerm) ||
    incident.createdBy.toLowerCase().includes(searchTerm) || // Add createdBy
    formatDate(incident.createdAt).toLowerCase().includes(searchTerm) || // Add createdAt
    incident.status.toLowerCase().includes(searchTerm) // Add status
  );
});

// Function to navigate to Incident Details Page
function goToIncidentDetails(incidentId) {
  router.push({ name: 'incident-details', params: { id: incidentId } });
}

function goToNewIncidentPage() {
  router.push({ path: '/new-incident' });
}

function editIncident(incident) {
  selectedIncident.value = incident;
  isEditIncidentDialogVisible.value = true;
}

async function handleIncidentSubmitted(incidentData) {
  if (selectedIncident.value) {
    await incidentStore.updateIncident(selectedIncident.value.id, incidentData);
    isEditIncidentDialogVisible.value = false;
    selectedIncident.value = null;
  } else {
    await incidentStore.addIncident(incidentData);
    isNewIncidentDialogVisible.value = false;
  }
  incidentStore.fetchIncidents(); // Refresh
}

const columns = [
  { name: 'title', required: true, label: 'Monitor', align: 'left', field: 'title', sortable: true },
  { name: 'createdAt', label: 'Started At', field: 'createdAt', align: 'left', sortable: true },
  { name: 'length', label: 'Length', field: 'length', align: 'left', sortable: true },
  { name: 'actions', label: 'actions', align: 'right', sortable: true }
]

const formatDate = (time) => date.formatDate(time, 'YYYY-MM-DD HH:mm')

const statusColor = (status) => {
  if (status === 'Open') return 'red'
  if (status === 'In Progress') return 'amber'
  return 'green'
}
</script>

<style lang="css" scoped>
.search-input {
  background-color: white;
  border: 1px solid #ddd;
  /* Light gray border */
}

.q-tr:hover {
  background-color: #f5f5f5;
  /* Adjust highlight color as needed */
}
</style>
