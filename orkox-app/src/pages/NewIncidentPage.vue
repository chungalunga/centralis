<template>
  <q-page padding class="bg-grey-1">
    <div class="q-gutter-md" style="max-width: 800px; margin: 0 auto;">
      <!-- Title & Header -->
      <div>
        Share this URL with your team.
      </div>
      <q-input readonly borderless value="https://uptime.betterstack.com/report/H4iHzy3VDcbA6tepUjf1UBKG" />

      <div class="text-h6 q-mt-lg">Report new incident to Your team</div>

      <div class="row q-mt-md">
        <div class="col-md-6 col-xs-12">
          <div class="text-subtitle1">What's going on?</div>
          <div class="text-caption text-grey">
            Please describe what's going on including steps to reproduce the issue. The more specific you are, the
            easier it's going to be for your colleagues to locate the issue and resolve the incident.
          </div>
        </div>

        <div class="col-md-6 col-xs-12">
          <q-card>
            <q-card-section>
              <q-input outlined label="Brief description (maximum of 100 characters)"
                hint="Example: New users can't sign up" />
              <q-input outlined label="In-depth description" type="textarea" class="q-mt-md" />

              <div class="q-mt-md">
                <div class="text-caption text-grey">Attach files or screenshots</div>
                <div class="row items-center">
                  <q-input outlined readonly class="col" placeholder="Drag & drop files or screenshots" />
                  <q-btn label="Choose files" class="col-auto" />
                </div>
              </div>

              <div class="text-subtitle1">Your contact details</div>
              <div class="text-caption text-grey">
                The team will be able to contact you in case they need more information.
              </div>

              <q-input outlined label="Your e-mail" value="dane.savcic@gmail.com" />

              <div class="text-subtitle1">Who should we notify?</div>
              <div class="text-caption text-grey">
                Please configure how urgent this incident is.
              </div>

              <div class="row items-center">
                <div class="col-3">
                  <q-checkbox label="Call" />
                </div>
                <div class="col-3">
                  <q-checkbox label="SMS" />
                </div>
                <div class="col-3">
                  <q-checkbox label="E-mail" checked />
                </div>
                <div class="col-3">
                  <q-checkbox label="Push notification" />
                </div>
                <div class="col-12 text-caption text-grey">No one is on-call right now, so we will alert the entire
                  team.</div>
              </div>
            </q-card-section>
            <q-btn color="primary" label="Create new Incident" class="q-mt-md full-width" />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>

</script>

<style scoped></style>
