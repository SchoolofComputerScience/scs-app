<template>
  <div class="content-page card">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div v-if="loaded">

      <div class="breadcrumbs">
        <router-link :to="'/courses/' + course.semester_code"> {{course.semester_code | seasonTranslate}} </router-link>
      </div>

      <div class="top-bar">
        <p>{{course.college | collegeTranslate}} |
          {{course.department | departmentTranslate}} |
          <span>{{course.graduate_level | courseLevelTranslate}}</span>
        </p>
      </div>

      <h2>{{course.course_number}} {{course.long_title}}</h2>

      <p class="body">{{course.description}}</p>

      <section class="course-information">

        <p class="units" v-if="course.units">Units: {{course.units}}</p>

        <div v-if="course.areas" class="research">
          <p class="title">Area Tags:</p>
          <p>
            <a class="button-small" href="javascript:void(0);" v-on:click="setResearchArea" v-for="area in course.areas" :key="area.area_id" :area-id="area.area_id" :area-title="area.title">{{ area.title }}</a>
          </p>
        </div>

        <div class="item section" v-for="section in course.sections" :key="section.course_section_id">

          <h3 v-if="course.lecture_distinction && !isNaN(section.section)">Lecture {{section.section}}</h3>
          <h4 v-else-if="course.lecture_distinction && section.parent_course">Section {{section.section}} (w/ Lecture {{section.parent_course.section}})</h4>
          <h3 v-else>Section {{section.section}}</h3>
          <div class="instructors" v-if="section.instructors && section.instructors.length >= 1">
            <p>
              <span v-if="section.instructors.length === 1">Instructor</span>
              <span v-else>Instructors</span>:
              <span v-for="(instructor,index) in section.instructors" :key="instructor.scid">
                <router-link v-if="instructor.valid" :to="'/directory/' + instructor.scid">{{ instructor.first_name + " " + instructor.last_name }}</router-link>
                <span v-else>{{ instructor.first_name + " " + instructor.last_name }}</span>
                <span v-if="index < section.instructors.length-1">, </span>

              </span>
            </p>
          </div>
          <p v-else>Instructor: TBA</p>

          <div v-for="meeting in section.meetings">
            <p v-if="meeting.days !== 'TBA'">
              {{meeting.days | dayTranslate}} |
              {{meeting.start_time}}&ndash;{{meeting.end_time}}
             </p>
            <p v-if="!['DNM', 'TBA'].includes(meeting.building)">{{meeting.building | buildingTranslate}} {{meeting.room}}</p>
            <p v-else-if="meeting.building === 'TBA'">TBA</p>
            <p v-else>Does not meet</p>
          </div>
        </div> <!-- end course sections -->
      </section>
    </div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

export default {
  name: 'course-view',

  components: {
    Spinner
  },

  computed: {

    loaded() {
      return this.$store.state.courses.course[this.$route.params.course][0] ? true : false
    },
    course(){
      /*
       * @TODO: Sort the section information by section identifier.
       * This requires checking sections.parent_course. Self-reference
       * indicates the parent. Numerals indicate a lecture.
       */
      return this.$store.state.courses.course[this.$route.params.course][0]
    }
  },

  methods: {
    // @TODO: This is copied from MemberView. Abstract this to a central
    // location for both views.
    setResearchArea(event) {
      let area_id = event.target.getAttribute('area-id');
      let area_title = event.target.getAttribute('area-title');
      let research_area = {
        area_id: area_id,
        title: area_title
      }
      this.$store.commit("SET_SELECTED_RESEARCH_AREA", research_area);
      this.$router.push('/research/'+ area_id);
    }
  },

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_COURSE',  route.params.course)
  }
}
</script>

<style lang="scss" scoped>
  h4 {
    font-size: 1em;
  }
  .section {
    margin: 1em 0;
  }
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
