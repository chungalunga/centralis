<template>
  <q-page padding class="bg-grey-1">
    <div class="q-gutter-md" style="max-width: 1000px; margin: 0 auto;">
      <div class="row items-center">
        <q-icon name="arrow_back" size="md" color="grey-7" class="cursor-pointer" @click="$router.go(-1)" />
        <div class="text-h5 q-ml-sm">Some incident brief description</div>
      </div>

      <div class="row items-center justify-between q-mt-md">
        <div class="text-body1">
          <q-badge color="red" size="sm">Ongoing</q-badge> - 9 Mar 2025 at 14:36 CET
        </div>
        <div>
          <q-btn flat label="Escalate" />
          <q-btn color="primary" label="Acknowledge" style="margin-left: 10px;">
            <q-menu anchor="bottom end" self="top end">
            </q-menu>
          </q-btn>
        </div>
      </div>

      <div class="row items-center justify-between q-mt-md">
        <div class="row items-center">
          <div class="text-caption text-grey">
            <q-icon name="delete" color="grey" size="sm" /> Remove
          </div>
        </div>
        <div>
          <q-badge color="grey-5" text-color="grey-8">Not acknowledged yet</q-badge>
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-4 col-xs-12">
          <q-card>
            <q-card-section>
              <div class="text-caption text-grey">Cause</div>
              <div class="text-body1 text-left">Mnkjhjkjhjkj</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-xs-12 q-pl-md q-pr-md">
          <q-card>
            <q-card-section>
              <div class="text-caption text-grey">Started at</div>
              <div class="text-body1">23 hours ago</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-xs-12">
          <q-card>
            <q-card-section>
              <div class="text-caption text-grey">Length</div>
              <div class="text-body1">Ongoing</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <h3>Tasks</h3>
      <TaskTable :tasks="taskStore.getTasks" :columns="columns" :loading="taskStore.isLoading" :error="taskStore.error"
        @add-task="openAddTaskDialog" @edit-task="openEditTaskDialog" @delete-task="deleteTask" />

      <TaskDialog v-model="dialog" :isEditing="isEditing" :task="selectedTask" :assigneeOptions="assigneeOptions"
        :statusOptions="statusOptions" :priorityOptions="priorityOptions" @save-task="saveTask" @cancel="closeDialog"
        @updateTask="updateSelectedTask" />

      <q-card class="q-mt-lg bg-grey-3">
        <q-card-section>
          <div class="text-caption text-grey">Escalation</div>
          <div class="text-body1">Entire team</div>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-lg">
        <q-card-section>
          <div class="text-caption text-grey">Metadata</div>
          <q-btn flat icon="add" label="Add" />
        </q-card-section>
      </q-card>


      <div class="text-body1">Timeline</div>
      <q-input outlined placeholder="Leave a comment or post-mortem. You can use markdown here or @mention a colleague."
        class="q-mt-sm">
        <template v-slot:append>
          <q-icon name="attach_file" />
          <q-btn round flat icon="send" color="primary" />
        </template>
      </q-input>
      <q-timeline class="q-mt-md">
        <q-timeline-entry v-for="entry in timelineEntries" :key="entry.id" :title="entry.title"
          :subtitle="entry.subtitle">
          {{ entry.content }}
        </q-timeline-entry>
      </q-timeline>

      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <h2>Incident Details</h2>

        <!-- Nature of the Incident -->
        <section>
          <h3>Nature of the Incident</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.description" label="Incident Description" type="textarea"
                :rules="[requiredRule]" />
            </div>
            <div class="col-md-6 col-12">
              <q-select outlined v-model="incident.incidentType" :options="incidentTypeOptions" label="Incident Type"
                :rules="[requiredRule]" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.location" label="Location" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.timeDetected" label="Time Detected" type="datetime-local"
                :rules="[requiredRule]" />
            </div>
            <div class="col-md-6 col-12">
              <q-checkbox v-model="incident.isOngoing" label="Is Incident Ongoing?" />
            </div>
          </div>
        </section>

        <!-- Impact Assessment -->
        <section>
          <h3>Impact Assessment</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.businessImpact" label="Business Impact" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.financialImpact" label="Financial Impact Estimate" type="number" />
            </div>
            <div class="col-md-6 col-12">
              <q-select outlined v-model="incident.operationalImpact" :options="operationalImpactOptions"
                label="Operational Impact" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.customerImpact" label="Customer Impact" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.estimatedDowntime" label="Estimated Downtime (Hours)" type="number" />
            </div>
            <div class="col-md-6 col-12">
              <q-select outlined v-model="incident.severityLevel" :options="severityLevelOptions" label="Severity Level"
                :rules="[requiredRule]" />
            </div>
          </div>
        </section>

        <!-- Immediate Actions & Containment -->
        <section>
          <h3>Immediate Actions & Containment</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.containmentActions" label="Containment Actions Taken"
                type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.responseLead" label="Response Lead" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.resourcesDeployed" label="Resources Deployed" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-checkbox v-model="incident.immediateSafetyConcerns" label="Immediate Safety Concerns?" />
            </div>
          </div>
        </section>

        <!-- Recovery Plan & Progress -->
        <section>
          <h3>Recovery Plan & Progress</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.recoveryPlan" label="Recovery Plan" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.recoveryMilestones" label="Recovery Milestones" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.estimatedRecoveryTime" label="Estimated Recovery Time"
                type="datetime-local" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.recoveryStatus" label="Recovery Status" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.recoveryRisks" label="Recovery Risks" type="textarea" />
            </div>
          </div>
        </section>

        <!-- Communication -->
        <section>
          <h3>Communication</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.communicationPlan" label="Communication Plan" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.stakeholdersInformed" label="Stakeholders Informed" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.approvedMessaging" label="Approved Messaging" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.spokesperson" label="Spokesperson" />
            </div>
          </div>
        </section>

        <!-- Root Cause Analysis (Later Stage, but Important) -->
        <section>
          <h3>Root Cause Analysis</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.suspectedCause" label="Suspected Cause" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.investigationSteps" label="Investigation Steps" type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.preventativeMeasures" label="Preventative Measures" type="textarea" />
            </div>
          </div>
        </section>

        <!-- Compliance & Legal Considerations -->
        <section>
          <h3>Compliance & Legal Considerations</h3>
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.complianceRequirements" label="Compliance Requirements"
                type="textarea" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.legalCounselInvolved" label="Legal Counsel Involved" />
            </div>
            <div class="col-md-6 col-12">
              <q-input outlined v-model="incident.reportingRequirements" label="Reporting Requirements"
                type="textarea" />
            </div>
          </div>
        </section>

        <q-btn label="Save Incident" type="submit" color="primary" />
      </q-form>


    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useIncidentStore } from 'stores/incidentStore'; // adjust path
import { date } from 'quasar';
import { QTimeline, QTimelineEntry, useQuasar } from 'quasar';
import TaskTable from 'components/TaskTable.vue'; // Import TaskTable
import TaskDialog from 'components/TaskDialog.vue';
import { useTaskStore } from 'stores/taskStore';

const q = useQuasar();
const route = useRoute();
const taskStore = useTaskStore();

const incidentId = ref(route.params.id);  // Assuming incident ID is in the route params

const incidentStore = useIncidentStore();
const timelineEntries = ref([]);

// Reactive Data
const dialog = ref(false);
const isEditing = ref(false);
const selectedTask = ref({
  id: null,
  title: '',
  description: '',
  assignedTo: '',
  status: '',
  dueDate: '',
  priority: '',
});

// Table Columns
const columns = [
  { name: 'title', required: true, label: 'Title', align: 'left', field: 'title' },
  { name: 'assignedTo', align: 'left', label: 'Assigned To', field: 'assignedTo' },
  { name: 'status', align: 'left', label: 'Status', field: 'status' },
  { name: 'dueDate', align: 'left', label: 'Due Date', field: 'dueDate' },
  { name: 'priority', align: 'left', label: 'Priority', field: 'priority' },
  { name: 'actions', align: 'right', label: 'Actions' },
];

// Options for Task form
const assigneeOptions = ['John Doe', 'Jane Smith', 'IT Team', 'Operations Team'];
const statusOptions = ['Open/To Do', 'In Progress', 'Blocked/On Hold', 'Completed', 'Cancelled'];
const priorityOptions = ['High', 'Medium', 'Low'];

// Functions

// Open Add Task Dialog
const openAddTaskDialog = () => {
  isEditing.value = false;
  selectedTask.value = {
    id: null,
    title: '',
    description: '',
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
  };
  dialog.value = true;
};

// Open Edit Task Dialog
const openEditTaskDialog = (row) => {
  isEditing.value = true;
  selectedTask.value = { ...row };
  dialog.value = true;
};

// Save Task (Add or Edit)
const saveTask = async (taskData) => {
  if (!taskData) return;

  if (isEditing.value) {
    await taskStore.updateTask(incidentId.value, taskData.id, taskData);
  } else {
    await taskStore.addTask(incidentId.value, taskData);
  }
  $q.notify({
    message: `Task ${isEditing.value ? 'updated' : 'added'} successfully`,
    color: 'positive',
    icon: 'check',
  });
};

// Delete Task
const deleteTask = async (taskId) => {
  $q.dialog({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this task?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      await taskStore.deleteTask(incidentId.value, taskId);
      $q.notify({
        message: 'Task deleted successfully',
        color: 'positive',
        icon: 'check',
      });
    });
};

// Close Dialog
const closeDialog = () => {
  dialog.value = false;
};

//Update selected task for all edits
const updateSelectedTask = (updatedTask) => {
  selectedTask.value = updatedTask;
};

// Load Tasks on Mount
onMounted(() => {
  taskStore.fetchTasks(incidentId.value); // Fetch tasks on component mount
});

// Unsubscribe from the listener when the component is unmounted
onBeforeUnmount(() => {
  taskStore.unsubscribeListener();
});

// Watch incidentId for changes and refetch tasks
watch(
  () => incidentId.value,
  (newIncidentId, oldIncidentId) => {
    if (newIncidentId !== oldIncidentId) {
      // Clean up listeners with an active unsubscribe
      if (taskStore.unsubscribe) {
        taskStore.clearTasks();
        taskStore.unsubscribeListener();
      }
      taskStore.fetchTasks(newIncidentId);
    }
  }
);


onMounted(async () => {
  await incidentStore.fetchIncidents(); // Fetch all incidents (or fetch just the single incident)
  incident.value = incidentStore.incidents.find(incident => incident.id === incidentId.value);

  if (!incident.value) {
    console.warn("Incident not found:", incidentId);
  } else {
    // Example timeline entries, replace with real data
    timelineEntries.value = [
      { id: 1, title: 'Incident Reported', subtitle: '9 Mar 2025', content: 'Description of the incident reporting.' },
      { id: 2, title: 'First Response', subtitle: '9 Mar 2025', content: 'Details of the first response.' }
    ];
  }
});

const formatDate = (time) => date.formatDate(time, 'YYYY-MM-DD HH:mm')


const $q = useQuasar(); // access Quasar components if needed

// Define reactive data (using ref)
const incident = ref({
  description: '',
  incidentType: '',
  location: '',
  timeDetected: '',
  isOngoing: false,
  businessImpact: '',
  financialImpact: null,
  operationalImpact: '',
  customerImpact: '',
  estimatedDowntime: null,
  containmentActions: '',
  responseLead: '',
  resourcesDeployed: '',
  immediateSafetyConcerns: false,
  recoveryPlan: '',
  recoveryMilestones: '',
  estimatedRecoveryTime: '',
  recoveryStatus: '',
  recoveryRisks: '',
  communicationPlan: '',
  stakeholdersInformed: '',
  approvedMessaging: '',
  spokesperson: '',
  suspectedCause: '',
  investigationSteps: '',
  preventativeMeasures: '',
  complianceRequirements: '',
  legalCounselInvolved: '',
  reportingRequirements: '',
  severityLevel: ''
});

// Options for dropdowns (you would ideally fetch these from an API)
const incidentTypeOptions = [
  'Security Breach',
  'System Outage',
  'Operational Disruption',
  'Safety Incident',
  'HR Complaint',
  'Other',
];

const operationalImpactOptions = [
  'None',
  'Minor Disruption',
  'Significant Disruption',
  'Critical Disruption',
];

const severityLevelOptions = [
  'Critical',
  'High',
  'Medium',
  'Low'
];

// Form submission handler
const onSubmit = () => {
  // Handle form submission here (e.g., send data to an API)
  console.log('Submitting incident data:', incident.value);

  // Example:  Show a notification
  $q.notify({
    message: 'Incident details saved!',
    color: 'green',
    icon: 'check'
  });
};

// Validation rule (example)
const requiredRule = (val) => !!val || 'This field is required';


</script>

<style scoped>
section {
  margin-bottom: 2em;
  /* Add space between sections */
}

h2,
h3 {
  margin-bottom: 0.5em;
}

/* Style Labels */
label {
  font-weight: 500;
  /* Make labels slightly bolder */
  display: block;
  /* Ensures labels are above the input */
  margin-bottom: 0.2em;
}

q-input,
q-select,
q-checkbox {
  margin-bottom: 0.8em;
}
</style>
