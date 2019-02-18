<template>
  <section class="department-filter">
    <div class="dropdown show">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{selected_department.name}}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a v-for="department in departments" v-on:click="filter" :key="department.department_id" :dept_id="department.department_id" :dept_name="department.department_name" class="dropdown-item" href="javascript:void(0);">{{department.department_name}}</a>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { router } from '../app'

export default {
  name: 'department_filter',

  props: ['route_link', 'types', 'excluded_departments'],

  computed: {
    departments() {
      let types = this.types || [];
      let excluded_departments = this.excluded_departments || [];
      let scs_list = this.$store.state.department.scs_list.map(x => x);
      scs_list.unshift({ department_id: '', department_name: 'All Departments', scs_type: 'academic'});

      return scs_list.filter((department) => {
        return types.includes(department.scs_type) && !excluded_departments.includes(department.department_id);
      });
    },
    selected_department() {
      if (this.$store.state.department.selected_department && this.$store.state.department.selected_department.id) {
        return this.$store.state.department.selected_department;
      } else {
        return { id: '', name: 'All Departments' };
      }
    }
  },

  methods: {
    filter(event) {
      let dept_id = event.target.getAttribute('dept_id') || event.target.getAttribute('filter-value');
      let dept_name = event.target.getAttribute('dept_name') || event.target.getAttribute('filter-value');
      if (this.route_link) {
        if (dept_id === this.$store.state.department.selected_department.id || !dept_id){
          this.$store.commit("SET_SELECTED_DEPARTMENT", { id: '', name: ''});
          if (this.route_link)
            router.push({ path: '/directory'})
        } else {
          this.$store.commit("SET_SELECTED_DEPARTMENT", { id: dept_id, name: dept_name });
          if (this.route_link)
            router.push({ path: '/directory/department/' + dept_id});
        }
      }
      else {
        if (dept_id === this.$store.state.department.selected_department.id)
          this.$store.commit("SET_SELECTED_DEPARTMENT", '');
        else
          this.$store.commit("SET_SELECTED_DEPARTMENT", { id: dept_id, name: dept_name });
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

.dropdown {
  margin-top: 1.333rem;
  .dropdown-toggle {
    background: $red;
    font-weight: bold;
    border-color: #fff;
    border-radius: .2rem;
    height: 2.75rem;
  }
}
</style>
