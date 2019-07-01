import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false;

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://generalapi.test/api',
      headers: {
        common: {
          Accept: 'application/json'
        }
      }
    })
  }
});

router.beforeEach((to, from, next) => {
  const auth = to.matched.some(record => record.meta.auth);
  const currentUser = localStorage.getItem('user');
  if(auth && !currentUser) {
    next('/login');
  } else if(to.path == '/login' && currentUser) {
    next('/');
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
