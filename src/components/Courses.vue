<template>
  <div class="courses-view">
    <transition name="fade" mode="out-in">
      <article>
        <h2>{{semester | seasonTranslate}} Course Listing</h2>
        <div v-for="(department, departmentID) in courseListByDepartment">
          <h3 :id="departmentID.toLowerCase()">{{departmentID | departmentTranslate}}</h3>
          <section class="container">
            <div class="item" v-for="(course, courseNumber) in department">
              <h4><em :class="'level' + course.level">{{course.level}}</em> {{courseNumber}} | <span>{{course.longTitle}}</span></h4>
              <router-link class="course-link" v-for="item in course.courseCodes" :key="item.code" :to="'/courses/course/' + item.code">{{item.section}}</router-link>
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
// .courses-view {
//   margin-top: 1em;
// }
//
// .course-link {
//   padding: .1em .8em;
//   margin-right: .5em;
//   background: #c41230;
//   color: white;
//   font-weight: 900;
//   text-decoration: none;
//   display: inline-block;
//   width: 3.5em;
//   text-align: center;
//   border: 2px solid;
//   margin-bottom: .2em;
//   &:hover {
//     background: white;
//     color: #c41230;
//     text-decoration: none;
//   }
// }
//
// .container {
//   display: flex;
//   flex-wrap: wrap;
//   .item {
//     flex: 1 50%;
//     @media screen and (max-width: 768px) {
//       flex: none;
//       width: 100%;
//     }
//   }
// }
//
// h1 {
//   margin-top: 3.2em;
//   margin-bottom: .2em;
// }
//
// h2 {
//   margin-top: 1em;
//   padding-bottom: 0.5em;
//   border-bottom: 1px solid #000;
// }
//
// h3 {
//   top: 2.2em;
//   position: sticky;
//   margin-top: 1.85em;
//   padding-top: .8em;
//   padding-bottom: .8em;
//   font-weight: 400;
//   border-bottom: 1px solid #eee;
//   background: white;
//   z-index: 20;
// }
//
// #lti {
//   border-bottom: 4px solid #3bb422;
// }
//
// #hci {
//   border-bottom: 4px solid #b49b22;
// }
//
// #ri {
//   border-bottom: 4px solid #9b22b4;
// }
//
// #cs {
//   border-bottom: 4px solid #22b49b;
// }
//
// #mlg {
//   border-bottom: 4px solid #b42284;
// }
//
// #isr {
//   border-bottom: 4px solid #165574;
// }
//
// #rob {
//   border-bottom: 4px solid #3bb422;
// }
//
// #cb {
//   border-bottom: 4px solid #b45222;
// }
//
// #scs {
//   border-bottom: 4px solid #c41230;
// }
//
// #etc {
//   border-bottom: 4px solid #2c3e50;
// }
//
// #se {
//   border-bottom: 4px solid #165574;
// }
//
// h4 {
//   margin-bottom: .2em;
//   margin-top: 1.6em;
//   > span {
//     font-weight: 300;
//   }
//   > em {
//     font-weight: 900;
//     font-size: .6em;
//     background: #fff;
//     padding: .2em .5em;
//     font-style: normal;
//     display: inline-block;
//     border-left: 2px solid white;
//     position: relative;
//     margin-right: .8em;
//     left: 2px;
//     top: -.2em;
//     &.levelU {
//       color: #222;
//       border: 1px solid;
//     }
//     &.levelG {
//       background: #666;
//       color: white;
//       border: 1px solid #666;
//     }
//   }
//
// }
</style>
