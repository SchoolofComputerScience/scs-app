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

function fetchCourses(store) {
  return store.dispatch('FETCH_COURSE_YEARS')
}

export default {
  name: 'courses-select-view',

  components: {
    Spinner
  },

  preFetch: fetchCourses,

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

  beforeMount () {
    fetchCourses(this.$store)
  }
}
</script>

<style lang="scss" scoped>
// h1 {
//   padding-top: .7em;
//   font-size: 2em;
//   @media only screen and (max-width: 768px) {
//     font-size: 1.5em;
//     padding-bottom: .7em;
//   }
// }
//
// .current {
//   @media only screen and (max-width: 768px) {
//     margin: 1em 0 0 0;
//   }
// }
//
// .courses-view {
//   @media only screen and (max-width: 768px) {
//     margin: 0 1em;
//   }
// }
//
// h2.archived {
//   font-size: 1.2em;
//   text-transform: uppercase;
//   margin-bottom: .2em;
//   border-bottom: 1px solid #eee;
//   padding-bottom: .6em;
//   color: #b7b2b3;
// }
//
// .archive-find {
//   display: flex;
//   > div {
//     flex: 1;
//     padding: 1em 1em 1em 0;
//   }
//   button {
//     min-height: 20px;
//     line-height: 20px;
//     padding: 1px 0 0 5px;
//     margin-bottom: 8px;
//     font-size: 14px;
//     width: 100%;
//     height: 100%;
//     border-radius: 5px;
//     border: 0px;
//     color: white;
//     font-weight: 800;
//     background: #b7b2b3;
//     a {
//       text-decoration: none;
//       cursor: default;
//       color: white;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//
//     @media only screen and (max-width: 768px) {
//       padding: 10px 0;
//     }
//   }
//
//   @media only screen and (max-width: 768px) {
//     display: block;
//   }
// }
//
// button.active {
//   background: #c41230;
//   cursor: pointer;
//   a {
//     cursor: pointer;
//     height: 100%;
//   }
//   &:hover {
//     background: #ab2139;
//   }
// }
//
// li {
//   list-style: none;
//   margin-bottom: 1em;
//   padding-bottom: 1em;
//   width: 50%;
//   display: inline-block;
//   font-size: .8em;
//   &:first-of-type {
//     display: block;
//     font-size: 1.4em;
//     width: 100%;
//   }
// }
//
// .btn {
//   display: inline-block;
//   color: white;
//   background: #c41230;
//   padding: .3em .8em;
//   margin-right: .5em;
//   margin-bottom: .2em;
//   font-weight: 900;
//   text-decoration: none;
//   text-align: center;
//   border: 2px solid;
//   &:hover {
//     background: white;
//     color: #c41230;
//     text-decoration: none;
//   }
// }
</style>
