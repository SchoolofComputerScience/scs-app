<template>
  <div>
    <transition name="fade" mode="out-in">
      <article>
        <div v-for="(department, departmentID) in courseListByDepartment" class="content-page card">
          <h3 :id="departmentID.toLowerCase()">{{departmentID | departmentTranslate}}</h3>
          <section class="container">
            <div class="item" v-for="(course, course_number) in department">
              <router-link class="course-link" v-for="item in course.courseCodes" :key="item.code" :to="'/courses/course/' + item.code">
              <h4><em>{{course_number}}</em> | {{course.graduate_level}} | {{course.long_title}}</h4>
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

export default {
  name: 'courses',

  props: ['semester', 'department', 'graduate_level'],

  computed: {
    courseListByDepartment() {
      let component_department = this.department || this.$store.state.department.selected_department;
      let component_semester = this.semester || this.$store.state.route.params.semester;
      let component_level = this.graduate_level || this.$store.state.route.params.graduate_level;
      let courses_data = this.$store.state.courses.lists[component_semester] || [];
      let departments = {};
      let courses = {};

      for (let i = 0, courses_count = courses_data.length; i < courses_count; i++) {
        let course = courses_data[i];

        if (component_level && component_level.length && component_level !== course.graduate_level) {
          continue;
        }

        if (component_department && component_department.length && component_department !== course.department) {
          continue;
        }

        departments[course.department] = departments[course.department] || {};
        departments[course.department][course.course_number] = departments[course.department][course.course_number] || {};

        if (departments[course.department][course.course_number].courseCodes) {
          departments[course.department][course.course_number].courseCodes.push({
            code: course.course_id,
            section: course.section
          });
        }
        else {
          departments[course.department][course.course_number] = {
            // longTitle: course.longTitle,
            graduate_level: course.graduate_level,
            long_title: course.long_title,
            courseCodes: [{
              code: course.course_id,
              section: course.section
            }],
            s3_department: course.s3_department,
            department: course.department,
            section: course.section
          };
        }
      }

      return departments;
    }
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
