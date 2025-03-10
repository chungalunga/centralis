<template>
  <q-page class="row items-start justify-center">

    <!-- Hero Section -->
    <div class="hero-section relative-position overflow-hidden">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" height="500px" fit="cover">
        <div class="absolute-full flex column items-center justify-center text-white">
          <div class="text-h3 text-center">Manage <transition name="fade" mode="out-in">
              <span :key="headerText">{{ headerText }}</span>
            </transition>
          </div>
          <div class="text-subtitle1 text-center q-mt-sm">Your all-in-one solution for incident tracking and resolution.
          </div>
          <div class="row q-col-gutter-md q-mt-lg">
            <q-btn color="primary" label="Get Started" size="lg" to="/login" />
            <q-btn color="white" text-color="primary" label="Learn More" size="lg" flat bordered />
          </div>
        </div>
      </q-img>
    </div>

    <!-- Value Proposition Section -->
    <div class="q-pa-md">
      <div class="row justify-center q-col-gutter-md">
        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-md">
          <q-card flat bordered>
            <q-card-section class="text-center">
              <q-icon name="notifications_active" color="primary" size="40px" />
              <div class="text-h6 q-mt-sm">Real-time Alerts</div>
              <div class="text-body1 q-mt-sm">Instant notifications keep your team informed.</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-md">
          <q-card flat bordered>
            <q-card-section class="text-center">
              <q-icon name="visibility" color="primary" size="40px" />
              <div class="text-h6 q-mt-sm">Centralized View</div>
              <div class="text-body1 q-mt-sm">Manage all incidents from one easy-to-use dashboard.</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12 q-pa-md">
          <q-card flat bordered>
            <q-card-section class="text-center">
              <q-icon name="assignment_turned_in" color="primary" size="40px" />
              <div class="text-h6 q-mt-sm">Automated Workflows</div>
              <div class="text-body1 q-mt-sm">Automate incident workflows for faster resolution.</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="q-pa-md">
      <div class="text-h5 text-center q-mb-md">Key Features</div>
      <div class="row q-col-gutter-md justify-center">
        <div class="col-md-6 col-sm-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Incident Reporting</div>
              <div class="text-body1 q-mt-sm">Easily report new incidents with detailed information and attachments.
              </div>
            </q-card-section>
            <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
          </q-card>
        </div>

        <div class="col-md-6 col-sm-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Real-time Collaboration</div>
              <div class="text-body1 q-mt-sm">Collaborate with your team in real-time using comments and notifications.
              </div>
            </q-card-section>
            <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" />
          </q-card>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="q-pa-md text-center">
      <q-btn color="primary" label="Start Free Trial" size="lg" to="/login" />
    </div>

    <!-- Footer -->
    <div class="bg-grey-2 text-center q-pa-md">
      © {{ new Date().getFullYear() }} Your Company Name
    </div>



  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const headerText = ref('Initial Header Text');
const headerTexts = [
  'Welcome to my Quasar App!',
  'Animated Header!',
  'Cool Transition!',
  'This is awesome!',
];
let textIndex = 0;
let intervalId;

const changeHeaderText = () => {
  textIndex = (textIndex + 1) % headerTexts.length;
  headerText.value = headerTexts[textIndex];
};

const startAutoChange = () => {
  intervalId = setInterval(() => {
    changeHeaderText();
  }, 3000); // Change every 3 seconds
};

const stopAutoChange = () => {
  clearInterval(intervalId);
};

onMounted(() => {
  startAutoChange();
});

onUnmounted(() => {
  stopAutoChange();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hero-section {
  height: 500px;
  /* Adjust as needed */
}

.hero-section .text-h3 {
  font-weight: 500;
  /* Adjust as needed */
}

.rotating-text {
  display: inline-block;
  animation: rotateText 4s linear infinite;
  /* Adjust duration as needed */
}
</style>
