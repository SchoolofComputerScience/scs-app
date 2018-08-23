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
import researchAreas from './modules/researchAreas';
import semesterCode from './modules/semesterCode';
import navigation from './modules/navigation';
import researchAreaCourses from './modules/researchAreaCourses';
import researchAreaMembers from './modules/researchAreaMembers';

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
    programs,
    researchAreas,
    semesterCode,
    navigation,
    researchAreaCourses,
    researchAreaMembers
  }
})


export default store
