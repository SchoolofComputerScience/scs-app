<template>
  <div>
    <div class="content-page card header">
      <h1>{{semester | seasonTranslate}} Course Listing</h1>
      <p>Course listings and descriptions for SCS courses</p>
    </div>
    <div class="data-page">
      <div class="filters">
        <DepartmentFilter :types="scs_department_types"></DepartmentFilter>
        <div class="buttons" :class="level">
          <button class="button U" v-on:click="filter" filter-name="level" filter-value="U">Undergraduate</button>
          <button class="button G" v-on:click="filter" filter-name="level" filter-value="G">Graduate</button>
        </div>
      </div>
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <Courses :semester="semester" :level="level" :department="department"></Courses>
    </div>
  </div>
</template>

<script>
import Courses from '../components/Courses.vue'
import Spinner from '../components/Spinner.vue'
import DepartmentFilter from '../components/DepartmentFilter.vue'
import { router } from '../app'

export default {
  name: 'courses-list-view',

  components: {
    Courses,
    Spinner,
    DepartmentFilter
  },

  data () {
    return {
      semester: this.$store.state.route.params.semester,
      department: '',
      level: '',
      nav: '',
      scs_department_types: ['academic']
    }
  },

  asyncData ({ store, route: { params: {semester}}} ) {
    return store.dispatch('FETCH_COURSE_LIST', { semester })
  },

  computed: {
    loaded() {
      return this.$store.state.courses.lists[this.semester] ? true : false
    }
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
@import '../assets/scss/vars';

.filters{
  display: flex;
  justify-content: space-between;
}

.header{
  margin-bottom: 0;
  p{
    padding-bottom: 0;
  }
}

.buttons{
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
