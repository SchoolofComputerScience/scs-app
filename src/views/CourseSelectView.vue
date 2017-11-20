<template>
  <div class="courses-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <article>
      <h1>Course Listings</h1>
      <p>The Carnegie Mellon School of Computer Science is recognized around the world as a leader in all facets of computer science and robotics education.</p>
      <li class="current">
        <router-link class="btn" :to="'/courses/M17'">Summer 17</router-link>
        <router-link class="btn" :to="'/courses/F17'">Fall 17</router-link>
      </li>
    </article>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

export default {
  name: 'courses-select-view',

  components: {
    Spinner
  },

  data () {
    return {
      season: '',
      year: '',
    }
  },

  computed: {
    loaded() {
      return this.$store.state.courses.years.length > 0 ? true : false
    },
    years() {
      return this.$store.state.courses.years
    },
    classObject() {
      return {
        active: this.season && this.year
      }
    },
    navigate(){
      if(!this.year || !this.season)
        return ''
      else
        return '/courses/' + this.season.id + this.yearFilter(this.year._id)
    }
  },

  methods: {
    yearFilter(e){
      let year = e +'';
      return year.slice(-2);
    }
  },

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_COURSE_YEARS');
  }
}
</script>
