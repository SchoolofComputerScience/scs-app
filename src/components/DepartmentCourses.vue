<template>
  <div class="courses-view">
    <transition name="fade" mode="out-in">
      <article>
        <h3>{{semester | seasonTranslate}} Course Listing</h3>
        <div>
          <section class="container">
            <div class="item" v-if="courseSection.longTitle" v-for="(courseSection, index) in courses" :key="courseSection.courseNumber">
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
import { router } from '../app'

function fetchCourses(store, semester) {
  return store.dispatch('FETCH_COURSE_LIST', semester)
}

export default {
  name: 'department-courses',

  props: ['semester'],

  preFetch(store) {
    return store.dispatch('FETCH_COURSE_LIST', this.semester);
  },

  computed: {
    courses(){
      let department = this.$store.state.route.params.department;
      if(this.$store.state.courses.lists[this.semester] !== undefined) {

        let courseData = this.$store.state.courses.lists[this.semester];
        let department_courses = [];

        courseData.map((course) => {
          if (course.department.toLowerCase() === department) {
            if(department_courses.some((id) => id.courseNumber == course.courseNumber)){
              department_courses.find((id) => id.courseNumber === course.courseNumber).courses.push(course)
            } 
            else {
              department_courses.push({
                courseNumber: course.courseNumber,
                longTitle: course.longTitle,
                level: course.level,
                courses: [course],
                departmentId: course.s3Department
              });
            }
          }

          department_courses.sort(function(a, b) {
            return parseFloat(a.courseNumber) - parseFloat(b.courseNumber);
          });
        });

        return department_courses;
      }
    }
  },

  beforeMount () {
    fetchCourses(this.$store, this.semester);
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
