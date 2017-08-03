<template>
  <div>
    <transition name="fade" mode="out-in">
      <article>
        <div v-for="(department, departmentID) in courseListByDepartment" class="content-page card">
          <h3 :id="departmentID.toLowerCase()">{{departmentID | departmentTranslate}}</h3>
          <section class="container">
            <div class="item" v-for="(course, courseNumber) in department">
              <router-link class="course-link" v-for="item in course.courseCodes" :key="item.code" :to="'/courses/course/' + item.code">
                <h4><span>{{course.longTitle}}</span> | <em>{{courseNumber}}</em> | {{course.level}}</h4>
              </router-link>
            </div>
          </section>
        </div>
      </article>
    </transition>
  </div>
</template>

<script>
import { router } from '../app'

function fetchCourses(store, semester) {
  return store.dispatch('FETCH_COURSE_LIST', semester)
}

export default {
  name: 'courses',

  props: ['semester', 'department', 'level'],

  preFetch(store) {
    return store.dispatch('FETCH_COURSE_LIST', (this.semester || this.$store.state.route.params.semester));
  },

  computed: {
    courseListByDepartment() {
      let component_department = this.department || this.$store.state.department.selected_department;
      let component_semester = this.semester || this.$store.state.route.params.semester;
      let component_level = this.level || this.$store.state.route.params.level;
      let courses_data = this.$store.state.courses.lists[component_semester] || [];
      let departments = {};
      let courses = {};

      for (let i = 0, courses_count = courses_data.length; i < courses_count; i++) {
        let course = courses_data[i];

        if (component_level && component_level.length && component_level !== course.level) {
          continue;
        }

        if (component_department && component_department.length && component_department !== course.department) {
          continue;
        }

        departments[course.s3Department] = departments[course.s3Department] || {};
        departments[course.s3Department][course.courseNumber] = departments[course.s3Department][course.courseNumber] || {};

        if (departments[course.s3Department][course.courseNumber].courseCodes) {
          departments[course.s3Department][course.courseNumber].courseCodes.push({
            code: course.courseCode,
            section: course.section
          });
        }
        else {
          departments[course.s3Department][course.courseNumber] = {
            longTitle: course.longTitle,
            level: course.level,
            courseCodes: [{
              code: course.courseCode,
              section: course.section
            }],
            s3Department: course.s3Department,
            department: course.department,
            section: course.section
          };
        }
      }

      return departments;
    }
  },

  beforeMount () {
    fetchCourses(this.$store, (this.semester || this.$store.state.route.params.semester));
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

a > h4{
  color: $red;
  padding: 0;
  margin-bottom: $base-line-height / 2;
  em{
    font-weight: 600;
  }
  &:hover{
    text-decoration: underline;
  }
}
</style>
