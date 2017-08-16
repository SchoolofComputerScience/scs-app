<template>
  <div>
    <div class="programs-view content-page card">
      <h1>Overview of Programs</h1>
      <p>The Carnegie Mellon School of Computer Science is recognized around the world as a leader in all facets of computer science and robotics education.</p>
      <p>Respected international surveys have consistently ranked CMU's graduate programs in computer science among the best in the United States. SCS also is ranked highly in specialty areas such as programming languages, artificial intelligence, systems and theory.</p>
      <p>And a survey by the editors of The Wall Street Journal ranked our undergraduate computer science program No. 1 in the United States among corporate recruiters.</p>
    </div>
    <div class="data-page">
      <div class="filters">
        <DepartmentFilter :types="scs_department_types"></DepartmentFilter>
        <div class="buttons" :class="graduate_level">
          <button class="button U" v-on:click="filter" filter-name="graduate_level" filter-value="undergraduate">Undergraduate</button>
          <button class="button G" v-on:click="filter" filter-name="graduate_level" filter-value="graduate">Graduate</button>
        </div>
      </div>
      <Programs :graduate_level="graduate_level" ></Programs>
    </div>
  </div>
</template>

<script>
import Programs from '../components/Programs.vue'
import DepartmentFilter from '../components/DepartmentFilter.vue'
import { router } from '../app'

export default {
  name: 'programs-view',

  components: {
    Programs,
    DepartmentFilter
  },

  data() {
    return {
      graduate_level: '',
      degree_level: '',
      scs_department_types: ['academic']
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

.filters{
  display: flex;
  justify-content: space-between;
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
