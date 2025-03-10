<template>
  <q-page padding class="bg-grey-1">
    <div class="q-gutter-md" style="max-width: 800px; margin: 0 auto;">
      <div class="text-h4">Account settings</div>

      <div class="row q-mt-md">
        <div class="col-md-4 col-xs-12">
          <div class="text-subtitle1">Basic account information</div>
          <div class="text-caption text-grey">
            We'll ask you to click a magic link in your email everytime you sign in.
            You can configure your profile picture here or at <a href="https://gravatar.com">Gravatar</a>.
          </div>
        </div>

        <div class="col-md-8 col-xs-12">
          <q-card>
            <q-card-section>
              <div class="row items-center q-col-gutter-md">
                <div class="col-auto">
                  <q-avatar size="60px" font-size="24px" color="primary" text-color="white">DS</q-avatar>
                </div>
                <div class="col">
                  <q-input outlined label="First name" />
                </div>
                <div class="col">
                  <q-input outlined label="Last name" />
                </div>
              </div>

              <q-input outlined label="E-mail" class="q-mt-md" value="dane.savcic@gmail.com" />
              <q-input outlined label="Phone" class="q-mt-md" value="+32 460 23 47 50" />

              <q-select outlined :options="timezones" label="Timezone" class="q-mt-md" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-4 col-xs-12">
          <div class="text-subtitle1">Holiday mode</div>
          <div class="text-caption text-grey">
            Suspend all alerts & notifications until a specific date.
          </div>
        </div>
        <div class="col-md-8 col-xs-12">
          <q-card>
            <q-card-section>
              <q-toggle label="Holiday mode" />
              <q-input outlined label="I am on holiday until" class="q-mt-md" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-4 col-xs-12">
          <div class="text-subtitle1">Permanently remove your account</div>
        </div>
        <div class="col-md-8 col-xs-12">
          <q-btn color="red" label="Permanently remove my account" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const timezones = [
  {
    label: '(GMT+01:00) Ljubljana',
    value: 'ljubljana'
  },
  {
    label: '(GMT+02:00) London',
    value: 'london'
  },
]
</script>

<style scoped></style>
