<template>
  <section :class="selected_department">
    <div v-if="route_link" class="buttons" >
      <button v-for="department in departments" v-on:click="filter" class="button" :key="department.department_id" :class="department.department_id" :name="department.department_id">{{department.department_id.replace('_', ' ')}}</button>
    </div>
    <div v-else class="buttons">
      <button v-for="department in departments" class="button" v-on:click="filter" :class="department.department_id" :key="department.department_id" :filter-value="department.department_id">{{ department.department_id.replace('_', ' ') }}</button>
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
      if (this.route_link) {
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
      else {
        if (filter_value === this.$store.state.department.selected_department)
          this.$store.commit("SET_SELECTED_DEPARTMENT", '');
        else
          this.$store.commit("SET_SELECTED_DEPARTMENT", filter_value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.buttons {
  margin-top: $base-line-height;
  margin-bottom: $base-line-height;
  font-size: .7rem;
  .button-holder{
    display: inline-block;
  }
  a, button {
    display: inline-block;
    -webkit-appearance: none;
    text-transform: uppercase;
    border: 1px solid $red;
    background: white;
    box-shadow: $box-shadow-inert;
    color: $red;
    font-weight: 900;
    font-size: .9em;
    padding: $base-line-height / 2;
    font-family: Open Sans, Helvetica, sans-serif;
    border-radius: 2px;
    margin-right: $base-line-height / 4;
    cursor: pointer;
    top: 0;
    left: 0;
    transition: .2s;
    &:focus {
      outline: 0;
    }
    &:hover{
      cursor: pointer;
      box-shadow: $box-shadow-hover;
      position: relative;
      top: -.1em;
      left: -.1em;
    }
  }
}
section{
  &.hcii .hcii, &.compbio .compbio, &.csd .csd, &.lti .lti, &.mld .mld, &.ri .ri, &.deans_office .deans_office, &.isr .isr{
    background: $red;
    color: white;
  }
}
</style>
