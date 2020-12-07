import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

import store from './store/store'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyB2Sn-HRG2dr_3JyBz9Dz8x90Ji_eDsbUs",
  authDomain: "netflix-97535.firebaseapp.com",
  databaseURL: "https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "netflix-97535",
  storageBucket: "netflix-97535.appspot.com",
  messagingSenderId: "591542368105",
  appId: "1:591542368105:web:c7189c55b4f827962eaff8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

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
