import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as filters from './filter'
import { sync } from 'vuex-router-sync'
import 'isomorphic-fetch'
import moment from 'vue-moment'

Vue.use(moment)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)

const app = new Vue(Vue.util.extend({ router, store}, App ))

export { app, router, store }
