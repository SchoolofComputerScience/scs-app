template>
  <div class="courses-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded" >
      <div>

        <div class="breadcrumbs">
          <router-link :to="'/courses'">Courses</router-link> / <router-link :to="'/courses/' + course.semesterCode"> {{course.semesterCode | seasonTranslate}} </router-link>
        </div>

        <div class="top-bar">
          <p>{{course.college}} |
            {{course.s3Department | departmentTranslate}} |
            <span v-if="course.level === 'G'">Graduate</span>
            <span v-if="course.level === 'U'">Undergraduate</span>
          </p>
        </div>

        <h2>{{course.longTitle}}</h2>

        <p class="body">{{course.description}}</p>

        <section class="course-information">

          <div class="units" v-if="course.units">
            <p class="title">Units</p>
            <p>{{course.units}}</p>
          </div>

          <div v-if="course.instructors[0]">
            <p class="title" v-if="course.instructors.length === 1">Instructor</p>
            <p class="title" v-if="course.instructors.length > 1">Instructors</p>
            <p v-for="instructor in course.instructors">
              <router-link :to="'/directory/' + instructor.scid">{{ instructor.firstName + " " + instructor.lastName }}</router-link>
            </p>
          </div>

          <div v-if="course.meetings[0]">
            <p class="title">Building</p>
            <p>{{course.meetings[0].building | buildingTranslate}}</p>
          </div>

          <div v-if="course.meetings[0]">
            <p class="title">Room Number</p>
            <p>{{course.meetings[0].room}}</p>
          </div>


          <div v-if="course.meetings[0].startTime">
            <p class="title">Time</p>
            <p v-if="course.meetings[0].startTime">{{course.meetings[0].startTime}} - {{course.meetings[0].endTime}}</p>
          </div>

          <div v-if="course.meetings[0]">
            <p class="title">Days</p>
            <p v-if="course.meetings[0].days">{{course.meetings[0].days | dayTranslate}}</p>
          </div>
        </section>

      </div>
    </transition>
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

<style lang="stylus" scoped>

h2 {
  margin-top: 1.6em;
}

p.body {
  margin-bottom: 2.2em;
}

.units {
  max-width: 6em;
  > p:nth-child(2) {
    word-wrap: break-word;
    margin-top: 2em;
    font-weight: 900;
  }
}

.breadcrumbs {
  margin-top: 1em;
}

.top-bar {
  margin-top: 1.8em;
  border-bottom: 1px dashed #ccc;
  border-top: 1px solid #ccc;
  span {
    font-weight: 900;
  }
}

.course-information {
  display: flex;
  margin-top: 2em;
  flex-wrap: wrap;

  > div {
    margin-right: 3.5rem;
    &:last-child {
      margin-right: 0;
    }
  }

  p {
    margin-top: .8em;
  }

  .title {
    text-transform: uppercase;
    font-size: .8em;
    border-bottom: 1px solid #ccc;
  }
}
</style>
