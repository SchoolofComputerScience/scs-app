<template>
  <div class="content-page card">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div v-if="loaded">

      <div class="breadcrumbs">
        <router-link :to="'/courses/' + course.semester_code"> {{course.semester_code | seasonTranslate}} </router-link>
      </div>

      <div class="top-bar">
        <p>{{course.college}} |
          {{course.s3_department | departmentTranslate}} |
          <span v-if="course.graduate_level === 'G'">Graduate</span>
          <span v-if="course.graduate_level === 'U'">Undergraduate</span>
        </p>
      </div>

      <h2>{{course.long_title}}</h2>

      <p class="body">{{course.description}}</p>

      <section class="course-information">

        <p class="units" v-if="course.units">Units: {{course.units}}</p>

        <h3>Sections</h3>

        <div class="item" v-for="section in course.sections">

          <p v-if="section.section">Section: {{section.section}}</p>
          <div class="instructors" v-if="section.instructors.length > 1">
            <p v-if="section.instructors.length === 1">Instructor</p>
            <p v-else-if="section.instructors.length > 1">Instructors</p>


            <p v-for="instructor in section.instructors">
              <router-link v-if="instructor.valid" :to="'/directory/' + instructor.scid">{{ instructor.first_name + " " + instructor.last_name }}</router-link>
              <span v-else>{{ instructor.first_name + " " + instructor.last_name }}</span>
            </p>
          </div>
          <p v-else>No instructors listed.</p>

          <!--
          <div v-if="course.sections[0].meetings[0]">
            <p class="title">Building</p>
            <p>{{course.sections[0].meetings[0].building | buildingTranslate}}</p>
          </div>

          <div v-if="course.sections[0].meetings[0]">
            <p class="title">Room Number</p>
            <p>{{course.sections[0].meetings[0].room}}</p>
          </div>

          <div v-if="course.sections[0].meetings[0].start_time">
            <p class="title">Time</p>
            <p v-if="course.sections[0].meetings[0].start_time">{{course.sections[0].meetings[0].start_time}} - {{course.sections[0].meetings[0].end_time}}</p>
          </div>

          <div v-if="course.sections[0].meetings[0]">
            <p class="title">Days</p>
            <p v-if="course.sections[0].meetings[0].days">{{course.sections[0].meetings[0].days | dayTranslate}}</p>
          </div>
          -->
        </div> <!-- end course sections -->
      </section>
    </div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

function fetchCourse(store) {
  return store.dispatch('FETCH_COURSE',  store.state.route.params.course)
}

export default {
  name: 'course-view',

  components: {
    Spinner
  },

  preFetch: fetchCourse,

  computed: {

    loaded() {
      return this.$store.state.courses.course[this.$route.params.course] ? true : false
    },
    course(){
      return this.$store.state.courses.course[this.$route.params.course]
    }
  },

  beforeMount () {
    fetchCourse(this.$store)
  }
}
</script>

<style lang="scss" scoped>
//
// h2 {
//   margin-top: 1.6em;
// }
//
// p.body {
//   margin-bottom: 2.2em;
// }
//
// .units {
//   max-width: 6em;
//   > p:nth-child(2) {
//     word-wrap: break-word;
//     margin-top: 2em;
//     font-weight: 900;
//   }
// }
//
// .breadcrumbs {
//   margin-top: 1em;
// }
//
// .top-bar {
//   margin-top: 1.8em;
//   border-bottom: 1px dashed #ccc;
//   border-top: 1px solid #ccc;
//   span {
//     font-weight: 900;
//   }
// }
//
// .course-information {
//   display: flex;
//   margin-top: 2em;
//   flex-wrap: wrap;
//
//   > div {
//     margin-right: 3.5rem;
//     &:last-child {
//       margin-right: 0;
//     }
//   }
//
//   p {
//     margin-top: .8em;
//   }
//
//   .title {
//     text-transform: uppercase;
//     font-size: .8em;
//     border-bottom: 1px solid #ccc;
//   }
// }
</style>
