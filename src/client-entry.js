import 'es6-promise/auto'
import { app, store, router } from './app'
import Multiselect from 'vue-multiselect'
import Vue from 'vue'

import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-92798181-1',
  router
})

Vue.component('multiselect', Multiselect)

store.replaceState(window.__INITIAL_STATE__)

app.$mount('#app')
