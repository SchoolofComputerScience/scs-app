<template>
  <div class="courses-view">
    <DepartmentFilter :types="scs_department_types"></DepartmentFilter>
    <div class="level-buttons" :class="level">
      <button class="U" v-on:click="filter" filter-name="level" filter-value="U">Undergraduate</button>
      <button class="G" v-on:click="filter" filter-name="level" filter-value="G">Graduate</button>
    </div>
    <Courses :semester="semester" :level="level" :department="department"></Courses>
  </div>
</template>

<script>
import Courses from '../components/Courses.vue'
import DepartmentFilter from '../components/DepartmentFilter.vue'
import { router } from '../app'

function fetchCourses(store) {
  return store.dispatch('FETCH_COURSE_LIST', store.state.route.semester)
}

export default {
  name: 'courses-list-view',

  components: {
    Courses,
    DepartmentFilter
  },

  data() {
    return {
      semester: this.$store.state.route.params.semester,
      department: '',
      level: '',
      nav: '',
      scs_department_types: ['academic']
    }
  },

  preFetch: fetchCourses,

  computed: {
    loaded() {
      return this.$store.state.courses.lists[this.semester] ? true : false
    }
  },

  beforeMount () {
    fetchCourses(this.$store)
  },

  methods: {
    filter(event) {
      let filter_name = event.target.getAttribute('filter-name');
      let filter_value = event.target.getAttribute('filter-value');
      if (filter_value && this[filter_name] !== filter_value)
        this[filter_name] = filter_value;
      else
        this[filter_name] = '';
    }
  }
}
</script>

<style lang="scss" scoped>
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
    @media screen and (max-width: 768px) {
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
  margin-top: 1em;
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

.dep-buttons {
  margin-top: 1.6em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  a {
    display: inline-block;
    margin-right: 2em;
    margin-top: 1.6em;
    margin-bottom: 1.6em;
    -webkit-appearance: none;
    text-transform: uppercase;
    color: #2c3e50;
    font-weight: 900;
    font-size: .95em;
    padding: .5em 1.2em .5em .2em;
    border: none;
    border-bottom: 4px solid;
    &.all, &.etc{
      border-color: #2c3e50;
      &:hover{
        background-color: #2c3e50;
      }
    }
    &.ri{
      border-color: #9b22b4;
      &:hover{
        background-color: #9b22b4;
      }
    }
    &.lti{
      border-color: #3bb422;
      &:hover{
        background-color: #3bb422;
      }
    }
    &.csd{
      border-color: #22b49b;
      &:hover{
        background-color: #22b49b;
      }
    }
    &.hcii{
      border-color: #b49b22;
      &:hover{
        background-color: #b49b22;
      }
    }
    &.compbio{
      border-color: #b45222;
      &:hover{
        background-color: #b45222;
      }
    }
    &.deans_office {
      border-color: #C41230;
      &:hover, .active{
        background-color: #C41230;
      }
    }
    &.isr{
      border-color: #165574;
      &:hover{
        background-color: #165574;
      }
    }
    &.mld{
      border-color: #b42284;
      &:hover{
        background-color: #b42284;
      }
    }
    &:hover{
      text-decoration: none;
      color: white;
    }
  }
  &.ri a.ri{
    background-color: #9b22b4;
    color: white;
  }
  &.lti a.lti{
    background-color: #3bb422;
    color: white;
  }
  &.csd a.csd{
    background-color: #22b49b;
    color: white;
  }
  &.hcii a.hcii{
    background-color: #b49b22;
    color: white;
  }
  &.compbio a.compbio {
    background-color: #b45222;
    color: white;
  }
  & a.deans_office, &.scs a.scs{
    background-color: #C41230;
    color: white;
  }
  &.isr a.isr {
    background-color: #165574;
    color: white;
  }
  &.mld a.mld{
    background-color: #b42284;
    color: white;
  }
}

.level-buttons {
  margin-top: 1em;

  button {
    -webkit-appearance: none;
    cursor: pointer;
    display: inline-block;
    min-width: 50px;
    background: #eee;
    border: none;
    font-size: 1em;
    padding: 1em;
    margin: 1em 1em 1em 0;
    font-weight: bold;
    letter-spacing: 0.25px;
    border: 1px solid #fff;
    font-family: Open Sans;

    &:hover {
      border: 1px solid #c41230;
    }
  }

  &.U {
    .U {
      color: #fff;
      background: #c41230;
    }
  }

  &.G {
    .G {
      color: #fff;
      background: #c41230;
    }
  }

}
</style>
