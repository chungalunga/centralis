const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/incidents' }, // Default route redirects to /incidents
      { path: 'incidents', component: () => import('pages/IncidentsPage.vue') },
      { path: 'incidents/:id', component: () => import('pages/IncidentDetailsPage.vue'), name: 'incident-details' }, // New route for incident details
      { path: 'new-incident', component: () => import('pages/NewIncidentPage.vue') },
      { path: 'big-events', component: () => import('pages/BigEventsPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'landing-page', component: () => import('pages/LandingPage.vue') },

    ],
    meta: { requiresAuth: true } // Example: Route requires authentication
  },
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/loading', // Add the loading page route
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoadingPage.vue') }
    ]

  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
