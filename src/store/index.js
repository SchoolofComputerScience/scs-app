import Vue from 'vue'
import Vuex from 'vuex'

import directory from './modules/directory';
import department from './modules/department';
import member from './modules/member';
import publication from './modules/publication';
import pages from './modules/pages';
import news from './modules/news';
import events from './modules/events';
import courses from './modules/courses';
import programs from './modules/programs';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    directory,
    department,
    member,
    pages,
    news,
    events,
    publication,
    courses,
    programs
  }
})

export default store
