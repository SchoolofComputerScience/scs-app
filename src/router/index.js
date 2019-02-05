import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeView from '../views/HomeView.vue'
import DirectoryView from '../views/DirectoryView.vue'
import PublicationView from '../views/PublicationView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import DepartmentsView from '../views/DepartmentsView.vue'
import MemberView from '../views/MemberView.vue'
import NewsListView from '../views/NewsListView.vue'
import EventsListView from '../views/EventsListView.vue'
import NewsView from '../views/NewsView.vue'
import EventView from '../views/EventView.vue'
import PageView from '../views/PageView.vue'
import CourseView from '../views/CourseView.vue'
import CourseListView from '../views/CourseListView.vue'
import CourseSelectView from '../views/CourseSelectView.vue'
import ErrorView from '../views/ErrorView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import ProgramView from '../views/ProgramView.vue'
import ResearchFieldView from '../views/ResearchFieldView.vue'
import ResearchFieldsListView from '../views/ResearchFieldsListView.vue'
import DiversityInclusionView from '../views/DiversityInclusionView.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: HomeView },
    { path: '/directory/', component: DirectoryView },
    { path: '/directory/department/:department', component: DirectoryView },
    { path: '/directory/:name?', component: MemberView },
    { path: '/courses/', component: CourseSelectView },
    { path: '/courses/course/:course', component: CourseView },
    { path: '/courses/:semester', component: CourseListView },
    { path: '/departments', component: DepartmentsView },
    { path: '/departments/:department?', component: DepartmentView },
    { path: '/programs', component: ProgramsView },
    { path: '/programs/:program', component: ProgramView },
    { path: '/publication/:pubid/:scid', component: PublicationView },
    { path: '/news/', component: NewsListView },
    { path: '/events/', component: EventsListView },
    { path: '/news/:article?', component: NewsView },
    { path: '/events/:event?', component: EventView },
    { path: '/research/', component: ResearchFieldsListView },
    { path: '/research/:research_field', component: ResearchFieldView },
    { path: '/diversity-and-inclusion', component: DiversityInclusionView },
    { path: '/404', component: ErrorView },
    { path: '/:page', name: 'page', component: PageView },
  ]
})
