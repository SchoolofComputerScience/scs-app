<template>
  <section :class="selected_department">
    <div v-if="route_link" class="buttons" >
      <button v-for="department in departments" v-on:click="filter" :key="department.department_id" :class="department.department_id" :name="department.department_id">{{department.department_id.replace('_', ' ')}}</button>
    </div>
    <div v-else class="buttons">
      <button v-for="department in departments" v-on:click="filter" :class="department.department_id" :key="department.department_id" :filter-value="department.department_id">{{ department.department_id.replace('_', ' ') }}</button>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { router } from '../app'

function fetchDepartments(store) {
  store.dispatch('GET_SCS_DEPARTMENT_LIST');

  if (store.state.route.params.department){
    store.commit("SET_SELECTED_DEPARTMENT", store.state.route.params.department);
  }
}

export default {
  name: 'department_filter',

  preFetch: fetchDepartments,

  props: ['route_link', 'types', 'excluded_departments'],

  beforeMount () {
    fetchDepartments(this.$store);
  },

  data() {
    return {
      selectedDepartment: ''
    }
  },

  computed: {
    departments() {
      let types = this.types || [];
      let excluded_departments = this.excluded_departments || [];

      return this.$store.state.department.scs_list.filter((department) => {
        return types.includes(department.scs_type) && !excluded_departments.includes(department.department_id);
      });
    },
    selected_department() {
      return this.$store.state.department.selected_department;
    }
  },

  methods: {
    filter(event) {
      let filter_value = event.target.getAttribute('name') || event.target.getAttribute('filter-value');
      if (filter_value === this.$store.state.department.selected_department){
        this.$store.commit("SET_SELECTED_DEPARTMENT", '');
        if (this.route_link)
          router.push({ path: '/directory'})
      } else {
        this.$store.commit("SET_SELECTED_DEPARTMENT", filter_value);
        if (this.route_link)
          router.push({ path: '/directory/department/' + filter_value})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .buttons {
//   margin-top: 1.6em;
//   border-top: 1px solid #eee;
//   border-bottom: 1px solid #eee;
//   .button-holder{
//     display: inline-block;
//   }
//
//   a, button {
//     display: inline-block;
//     margin-right: 1.6em;
//     margin-top: 1.6em;
//     margin-bottom: 1.4em;
//     -webkit-appearance: none;
//     text-transform: uppercase;
//     color: #2c3e50;
//     color: white;
//     font-weight: 900;
//     font-size: .9em;
//     padding: .5em 1.2em .5em 1.2em;
//     border: none;
//     border-bottom: 4px solid;
//     font-family: Open Sans,Helvetica,sans-serif;
//     cursor: pointer;
//     &:focus {
//       outline:0;
//     }
//     &.ri{
//       background-color: #9b22b4;
//       &:hover{
//         background-color: rgba(#9b22b4, 0.80);
//       }
//       &:active{
//         background-color: rgba(#9b22b4, 0.40);
//       }
//     }
//     &.lti{
//       background-color: #3bb422;
//       &:hover{
//         background-color: rgba(#3bb422, 0.80);
//       }
//       &:active{
//         background-color: rgba(#3bb422, 0.40);
//       }
//     }
//     &.csd{
//       background-color: #22b49b;
//       &:hover{
//         background-color: rgba(#22b49b, 0.80);
//       }
//       &:active{
//         background-color: rgba(#22b49b, 0.40);
//       }
//     }
//     &.hcii{
//       background-color: #b49b22;
//       &:hover{
//         background-color: rgba(#b49b22, 0.80);
//       }
//       &:active{
//         background-color: rgba(#b49b22, 0.40);
//       }
//     }
//     &.compbio{
//       background-color: #b45222;
//       &:hover{
//         background-color: rgba(#b45222, 0.80);
//       }
//       &:active{
//         background-color: rgba(#b45222, 0.40);
//       }
//     }
//     &.deans_office{
//       background-color: #C41230;
//       &:hover{
//         background-color: rgba(#C41230, 0.80);
//       }
//       &:active{
//         background-color: rgba(#C41230, 0.40);
//       }
//     }
//     &.isr{
//       background-color: #165574;
//       &:hover{
//         background-color: rgba(#165574, 0.80);
//       }
//       &:active{
//         background-color: rgba(#165574, 0.40);
//       }
//     }
//     &.mld{
//       background-color: #b42284;
//       &:hover{
//         background-color: rgba(#b42284, 0.80);
//       }
//       &:active{
//         background-color: rgba(#b42284, 0.40);
//       }
//     }
//   }
// }
</style>
