import 'es6-promise/auto'
import { app, store } from './app'
import Multiselect from 'vue-multiselect'
import Vue from 'vue'

Vue.component('multiselect', Multiselect)

store.replaceState(window.__INITIAL_STATE__)

app.$mount('#app')
