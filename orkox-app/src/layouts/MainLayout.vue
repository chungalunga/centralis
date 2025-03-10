<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white hidden sm-and-up">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Centralis
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250" :breakpoint="600"
      v-if="userStore.currentRoute != '/landing-page'">
      <q-list>

        <q-item clickable v-ripple to="/incidents" :class="{ 'bg-grey-2': $route.path === '/incidents' }">
          <q-item-section avatar>
            <q-icon name="notification_important" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Incidents
          </q-item-section>

          <q-item-section side>
            <q-badge color="primary">1</q-badge>
          </q-item-section>

        </q-item>

        <q-item clickable v-ripple to="/big-events" :class="{ 'bg-grey-2': $route.path === '/big-events' }">
          <q-item-section avatar>
            <q-icon name="event" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Big Events
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/observances" :class="{ 'bg-grey-2': $route.path === '/observances' }">
          <q-item-section avatar>
            <q-icon name="visibility" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Observances
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/opportunities" :class="{ 'bg-grey-2': $route.path === '/opportunities' }">
          <q-item-section avatar>
            <q-icon name="trending_up" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Opportunities
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/settings" :class="{ 'bg-grey-2': $route.path === '/settings' }">
          <q-item-section avatar>
            <q-icon name="settings" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Settings
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/profile" :class="{ 'bg-grey-2': $route.path === '/profile' }">
          <q-item-section avatar>
            <q-icon name="person" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Profile
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" color="grey-7" />
          </q-item-section>

          <q-item-section>
            Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/userStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const leftDrawerOpen = ref(false);
const router = useRouter();
const userStore = useUserStore();

userStore.currentRoute = route.path
console.log(userStore.currentRoute)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = async () => {
  await userStore.signOut();
  router.push('/loading'); // Redirect to login page after logout
};
</script>

<style scoped>
.custom-header {
  background-color: #3f51b5;
  /* Replace with your desired color */
  color: white;
  /* Replace with your desired text color */
}

/* This is the important part to show only icons on minimized drawers */
.q-drawer--mini .q-item__section--side {
  display: block;
}

.q-drawer--mini .q-item__section--main {
  display: none;
}
</style>
