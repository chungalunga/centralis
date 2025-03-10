import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { useUserStore } from 'stores/userStore';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (to.path === '/loading') {
      // Allow navigation to the loading page without authentication check
      next();
    } else if (requiresAuth && !userStore.isLoggedIn) {
      next('/loading');
    } else {
      next();
    }
  });

  return Router;
});
