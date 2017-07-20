<template>
  <div class="programs-view">
    <h1>Overview of Programs</h1>
    <p>
      The Carnegie Mellon School of Computer Science is recognized around the world as a leader in all facets of computer science and robotics education.
    </p>
    <p>
      Respected international surveys have consistently ranked CMU's graduate programs in computer science among the best in the United States. SCS also is ranked highly in specialty areas such as programming languages, artificial intelligence, systems and theory.
    </p>
    <p>
      And a survey by the editors of The Wall Street Journal ranked our undergraduate computer science program No. 1 in the United States among corporate recruiters.
    </p>
    <DepartmentFilter :types="scs_department_types"></DepartmentFilter>
    <div class="level-buttons" :class="graduate_level">
      <button class="U" v-on:click="filter" filter-name="graduate_level" filter-value="undergraduate">Undergraduate</button>
      <button class="G" v-on:click="filter" filter-name="graduate_level" filter-value="graduate">Graduate</button>
    </div>
    <Programs :graduate_level="graduate_level" :department="department"></Programs>
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

  computed: {
    department() {
      return this.$store.state.department.selected_department;
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
// h3 {
//   top: 2.2em;
//   position: sticky;
//   margin-top: 1em;
//   margin-bottom: 0;
//   border-top: 1px solid #eee;
//   padding-top: .8em;
//   padding-bottom: .8em;
//   font-weight: 400;
//   border-bottom: 1px solid #eee;
//   background: white;
//   z-index: 20;
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
// }
//
// p {
//   margin-bottom: 1em;
// }
//
// .level-buttons {
//   margin-top: 1em;
//
//   button {
//     -webkit-appearance: none;
//     cursor: pointer;
//     display: inline-block;
//     min-width: 50px;
//     background: #eee;
//     border: none;
//     font-size: 1em;
//     padding: 1em;
//     margin: 1em 1em 1em 0;
//     font-weight: bold;
//     letter-spacing: 0.25px;
//     border: 1px solid #fff;
//     font-family: Open Sans;
//
//     &:hover {
//       border: 1px solid #c41230;
//     }
//   }
//
//   &.undergraduate {
//     .U {
//       color: #fff;
//       background: #c41230;
//     }
//   }
//
//   &.graduate {
//     .G {
//       color: #fff;
//       background: #c41230;
//     }
//   }
// }
</style>
