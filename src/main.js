import Vue from 'vue'
import App from './App.vue'

import store from './store/store'

Vue.config.productionTip = false


// setup routes
import VueRouter from 'vue-router'
import { routes } from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history', // adjust URLs
  routes
  // husk <router-view></router-view> i App.vue
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
