import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import HomeView from '../views/HomeView.vue'
// import DirectoryView from '../views/DirectoryView.vue'
// import PublicationView from '../views/PublicationView.vue'
// import DepartmentView from '../views/DepartmentView.vue'
// import DepartmentsView from '../views/DepartmentsView.vue'
// import MemberView from '../views/MemberView.vue'
// import NewsListView from '../views/NewsListView.vue'
// import EventsListView from '../views/EventsListView.vue'
// import NewsView from '../views/NewsView.vue'
// import EventView from '../views/EventView.vue'
// import PageView from '../views/PageView.vue'
// import CourseView from '../views/CourseView.vue'
// import CourseListView from '../views/CourseListView.vue'
// import CourseSelectView from '../views/CourseSelectView.vue'
// import ErrorView from '../views/ErrorView.vue'
// import ProgramsView from '../views/ProgramsView.vue'
// import ProgramView from '../views/ProgramView.vue'
import ResearchAreasView from '../views/ResearchAreasView.vue'
import ResearchAreasListView from '../views/ResearchAreasListView.vue'
// import DiversityInclusionView from '../views/DiversityInclusionView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import PubView from '../views/PubView.vue'
import DeptView from '../views/DeptView.vue'
import DeptSingleView from '../views/DeptSingleView.vue'
import CoursesView from '../views/CoursesView.vue'
import PeopleView from '../views/PeopleView.vue'
import PeopleSingleView from '../views/PeopleSingleView.vue'
import ResearchView from '../views/ResearchView.vue'
import ResearchSingleView from '../views/ResearchSingleView.vue'
import NewsView from '../views/NewsView.vue'
import NewsSingleView from '../views/NewsSingleView.vue'
import EventsView from '../views/EventsView.vue'
import EventsSingleView from '../views/EventsSingleView.vue'

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      meta: {
        title: 'Discover',
        theme: ''
    },
      component: DiscoverView
    },
    {
      path: '/publications/',
      meta: {
        title: 'Publications',
        theme: 'publications'
      },
      component: PubView
    },
    {
      path: '/departments/',
      meta: {
        title: 'Departments',
        theme: 'default'
      },
      component: DeptView
    },
    {
      path: '/departments/single/',
      meta: {
        title: 'Human-Computer Interaction - Departments',
        theme: 'default'
      },
      component: DeptSingleView
    },
    {
      path: '/courses/',
      meta: {
        title: 'Courses',
        theme: 'courses'
      },
      component: CoursesView
    },
    {
      path: '/people/',
      meta: {
        title: 'People',
        theme: 'people'
      },
      component: PeopleView
    },
    {
      path: '/people/single/:name?',
      meta: {
        title: 'David Touretzky - People',
        theme: 'people'
      },
      component: PeopleSingleView
    },
    {
      path: '/research/',
      meta: {
        title: 'Research Areas',
        theme: 'research'
      },
      component: ResearchView
    },
    {
      path: '/research/single/:research_area',
      meta: {
        title: 'Machine Learning - Research Areas',
        theme: 'research'
      },
      component: ResearchSingleView
    },
    {
      path: '/news/',
      meta: {
        title: 'News from the School of Computer Science',
        theme: 'news'
      },
      component: NewsView
    },
    {
      path: '/news/single/:article',
      meta: {
        title: 'News - Single',
        theme: 'news'
      },
      component: NewsSingleView
    },
    {
      path: '/events/',
      meta: {
        title: 'Events from the School of Computer Science',
        theme: 'events'
      },
      component: EventsView
    },
    {
      path: '/events/single/',
      meta: {
        title: 'Event - Single',
        theme: 'events'
      },
      component: EventsSingleView
    },
    // { path: '/', component: HomeView },
    // { path: '/directory/', component: DirectoryView },
    // { path: '/directory/department/:department', component: DirectoryView },
    // { path: '/directory/:name?', component: MemberView },
    // { path: '/courses/', component: CourseSelectView },
    // { path: '/courses/course/:course', component: CourseView },
    // { path: '/courses/:semester', component: CourseListView },
    // { path: '/departments', component: DepartmentsView },
    // { path: '/departments/:department?', component: DepartmentView },
    // { path: '/programs', component: ProgramsView },
    // { path: '/programs/:program', component: ProgramView },
    // { path: '/publication/:pubid/:scid', component: PublicationView },
    // { path: '/news/', component: NewsListView },
    // { path: '/events/', component: EventsListView },
    // { path: '/news/:article?', component: NewsView },
    // { path: '/events/:event?', component: EventView },
    { path: '/research_2/', component: ResearchAreasListView },
    { path: '/research_2/:research_area', component: ResearchAreasView },
    // { path: '/diversity-and-inclusion', component: DiversityInclusionView },
    // { path: '/404', component: ErrorView },
    // { path: '/:page', name: 'page', component: PageView },
  ]
})

router.beforeEach((to, from, next) => {
  if (typeof document !== 'undefined') {
    document.title = to.meta.title || 'No Title'
    if (to.meta.theme) {
      document.querySelector('body').className = 'theme_' + to.meta.theme
    }
  }


  next()
})

export default router
