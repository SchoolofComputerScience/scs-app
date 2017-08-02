import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as filters from './filter'
import { sync } from 'vuex-router-sync'
import 'isomorphic-fetch'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

export { app, router, store }
