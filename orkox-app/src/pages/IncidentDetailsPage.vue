<template>
  <q-page padding class="bg-grey-1">
    <div class="q-gutter-md" style="max-width: 800px; margin: 0 auto;">
      <div class="row items-center">
        <q-icon name="arrow_back" size="md" color="grey-7" class="cursor-pointer" @click="$router.go(-1)" />
        <div class="text-h5 q-ml-sm">Manually reported</div>
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
        <div class="col-md-4 col-xs-12">
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

      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-caption text-grey">Escalation</div>
          <div class="text-body1">Entire team</div>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-caption text-grey">Metadata</div>
          <q-btn flat icon="add" label="Add" />
        </q-card-section>
      </q-card>

      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-body1">Timeline</div>
          <q-input outlined
            placeholder="Leave a comment or post-mortem. You can use markdown here or @mention a colleague."
            class="q-mt-sm">
            <template v-slot:append>
              <q-icon name="attach_file" />
              <q-btn round flat icon="send" color="primary" />
            </template>
          </q-input>
          <!-- Timeline component placeholder -->
          <div class="q-mt-md">
            <p>Timeline Component Here</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useIncidentStore } from 'stores/incidentStore'; // adjust path
import { date } from 'quasar';

const route = useRoute();
const incidentStore = useIncidentStore();
const incidentId = route.params.id; // Get the incident ID from the route
const incident = ref(null);

onMounted(async () => {
  await incidentStore.fetchIncidents(); // Fetch all incidents (or fetch just the single incident)
  incident.value = incidentStore.incidents.find(incident => incident.id === incidentId);

  if (!incident.value) {
    // Handle the case where the incident is not found (e.g., redirect to a 404 page)
    console.warn("Incident not found:", incidentId);
  }
});

const formatDate = (time) => date.formatDate(time, 'YYYY-MM-DD HH:mm')
</script>

<style scoped></style>
