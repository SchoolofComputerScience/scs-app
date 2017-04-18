<template>
  <div class="courses-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded" >
      <article>
        <h1>{{courseListParam | seasonTranslate}} Course Listing</h1>
        <div v-for="department in courseListSection" :key="department.departmentId">
          <h3 :id="department.departmentId">{{department.departmentId | departmentTranslate}}</h3>
          <section class="container">
            <div class="item" v-if="courseSection.longTitle" v-for="(courseSection, index) in department.courseListings" :key="courseSection.courseNumber">
              <h4><em :class="'level' + courseSection.level">{{courseSection.level}}</em> {{courseSection.courseNumber}} | <span>{{courseSection.longTitle}}</span></h4>
              <router-link class="course-link" v-for="course in courseSection.courses" track-by="course.courseCode" :to="'/courses/course/' + course.courseCode" :key="course.section">{{course.section}}</router-link>
            </div>
          </section>
        </div>
      </article>
    </transition>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

function fetchCourses(store) {
  return store.dispatch('FETCH_COURSE_LIST', store.state.route.params.courseList)
}

export default {
  name: 'courses-list-view',

  components: {
    Spinner
  },

  preFetch: fetchCourses,

  computed: {
    loaded() {
      return this.$store.state.courses.lists[this.$route.params.courseList] ? true : false
    },

    courseListSection(){
      if(this.$store.state.courses.lists[this.$route.params.courseList] !== undefined) {

        let courseData = this.$store.state.courses.lists[this.$route.params.courseList]
        let allCourses = []
        let allDepartments = []

        courseData.map((course) => {
          if(allCourses.some((id) => id.courseNumber == course.courseNumber)){
            allCourses.find((id) => id.courseNumber === course.courseNumber).courses.push(course)
          }else{
            allCourses.push({
              courseNumber: course.courseNumber,
              longTitle: course.longTitle,
              level: course.level,
              courses: [course],
              departmentId: course.s3Department
            })
          }
          allCourses.sort(function(a, b) {
            return parseFloat(a.courseNumber) - parseFloat(b.courseNumber);
          })
        })

        allCourses.map((department) => {
          if(allDepartments.some((id) => id.departmentId == department.departmentId)){
            allDepartments.find((id) => id.departmentId === department.departmentId).courseListings.push(department)
          }else{
            allDepartments.push({
              departmentId: department.departmentId,
              courseListings: [department]
            })
          }
        })

        return allDepartments

      }
    },
    courseListParam(){
      return this.$route.params.courseList
    },
  },

  beforeMount () {
    fetchCourses(this.$store)
  }
}
</script>

<style lang="stylus" scoped>
.course-link {
  padding: .1em .8em;
  margin-right: .5em;
  background: #c41230;
  color: white;
  font-weight: 900;
  text-decoration: none;
  display: inline-block;
  width: 3.5em;
  text-align: center;
  border: 2px solid;
  margin-bottom: .2em;
  &:hover {
    background: white;
    color: #c41230;
    text-decoration: none;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex: 1 50%;
    @media screen and (max-width 768px) {
      flex: none;
      width: 100%;
    }
  }
}

h1 {
  margin-top: 3.2em;
  margin-bottom: .2em;
}

h3 {
  top: 2.2em;
  position: sticky;
  margin-top: 1.85em;
  margin-bottom: 0;
  border-top: 1px solid #eee;
  padding-top: .8em;
  padding-bottom: .8em;
  font-weight: 400;
  border-bottom: 1px solid #eee;
  background: white;
  z-index: 20;
}

h4 {
  margin-bottom: .2em;
  margin-top: 1.6em;
  > span {
    font-weight: 300;
  }
  > em {
    font-weight: 900;
    font-size: .6em;
    background: #fff;
    padding: .2em .5em;
    font-style: normal;
    display: inline-block;
    border-left: 2px solid white;
    position: relative;
    margin-right: .8em;
    left: 2px;
    top: -.2em;
    &.levelU {
      color: #222;
      border: 1px solid;
    }
    &.levelG {
      background: #666;
      color: white;
      border: 1px solid #666;
    }
  }
}
</style>
