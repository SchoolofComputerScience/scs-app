<template>
  <section class="department-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded" >
      <div>
        <figure class="department-header" :style="{ 'background-image': 'url(' + department.mainimg + ')' }"></figure>
        <div class="content-container">
          <img class="logo" :src="department.logo" />
          <h1>{{department.name}}</h1>
          <p>{{department.description}}</p>
          <h3 class="component-title">{{this.$route.params.department | upc}} Directory</h3>
          <section class="card-holder">
            <DepartmentDirectory></DepartmentDirectory>
          </section>
          <router-link class="btn" :to="'/directory/department/' + this.$route.params.department">View Full {{this.$route.params.department | upc}} Directory</router-link>
          <h3 class="component-title">{{this.$route.params.department | upc}} Course Listing</h3>
          <section class="course-list">
            <Courses :semester="semester"></Courses>
          </section>
          <router-link class="btn" :to="'/courses/'">View Full {{this.$route.params.department | upc}} Course List</router-link>

        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'
import CourseListView from '../views/CourseListView.vue'
import DepartmentDirectory from '../components/DepartmentDirectory.vue'
import Courses from '../components/Courses.vue'

function fetchDepartment(store) {
  return store.dispatch('GET_DEPARTMENT_LIST')
    .then(() => {
      let departmentArray = ['compbio', 'csd',  'hcii', 'lti', 'mld', 'ri', 'isr', 'deans_office']
      /*
        temp dep array
        WIP: ping the collection with department codes to verify department
        let isDepartment = store.state.department.list.some((n) => n._id === store.state.route.params.department)
      */
      let isDepartment = departmentArray.some((n) => n == store.state.route.params.department)
      isDepartment
        ? getDeparmentData(store)
        : router.push('/')
    })
}

function getDeparmentData(store){
  return store.dispatch('GET_DEPARTMENT', store.state.route.params.department)
}

export default {
  name: 'department-view',

  preFetch: fetchDepartment,

  components: {
    Spinner,
    CourseListView,
    DepartmentDirectory,
    Courses
  },

  data() {
    return {
      semester: "F17"
    }
  },

  computed: {
    loaded() {
      return this.$store.state.department.department[this.$route.params.department] ? true : false
    },
    department(){
      return this.$store.state.department.department[this.$route.params.department]
    }
  },

  beforeMount () {
    fetchDepartment(this.$store)
  }

}
</script>

<style lang="stylus">
.course-list article h2{
  display: none;
}
.course-list article > div >  h3{
  display: none;
}

</style>
<style lang="stylus" scoped>
h1 {
  font-size 2em
}
.directory-title{
  margin-top 2em;
}
h3{
  border-top: 1px solid #eee;
  border-bottom: 1px dashed #eee;
  padding: 1em 0 1em;
  margin-bottom: 1em;
  margin-top: 2em;
}
.content-container {
  background white;
  margin 1em
  padding: 3em 5em;
  display: block;
  z-index: 9;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  position: relative;
  top: 20.5em;
  margin-bottom: 20.5em;
}

.logo{
  background: white;
  max-width: 8em;
  top: 2em;
  left: -4em;
  position: absolute;
  border: 1px solid #eee;
}

.department-header {
  min-height: 36em;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: -0.55em;
  margin: 0;
}
.comp-spin{
  border: 1px solid blue;

}
h2 {
  font-size: 1.2em;
  margin: 0;
  border-bottom: 1px solid #C41230;
  padding-bottom: .6em;
  font-weight: 300;
  position: relative;
  &:after {
    content: " ";
    display: block;
    width: 2em;
    height: 2px;
    position: absolute;
    bottom: -2px;
    background rgb(196, 18, 48);
  }
}


.card-holder ul{
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  position: relative;
}

.btn {
  display: inline-block;
  color: white;
  background: #c41230;
  padding: .3em .8em;
  margin-right: .5em;
  margin-bottom: .2em;
  font-weight: 900;
  text-decoration: none;
  text-align: center;
  border: 2px solid;
  &:hover {
    background: white;
    color: #c41230;
    text-decoration: none;
  }
}
</style>
