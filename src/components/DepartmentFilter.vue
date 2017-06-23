<template>
  <section>
    <div v-if="route_link" class="buttons" :class="selected_department">
      <router-link v-on:click="filter" :to="'/directory/'" class="all" :key="all">all</router-link>
      <div class="button-holder">
        <button v-for="department in departments" v-on:click="filter"  :key="department.department_id" :class="department.department_id" :name="department.department_id">{{department.department_id.replace('_', ' ')}}</button>
      </div>
    </div>
    <div v-else class="buttons" :class="selected_department">
      <button v-for="department in departments" v-on:click="filter" :class="department.department_id" :key="department.department_id" :filter-value="department.department_id">{{ department.department_id.replace('_', ' ') }}</button>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'

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
      let filter_value = event.target.getAttribute('name');

      if (filter_value === this.$store.state.department.selected_department)
        this.$store.commit("SET_SELECTED_DEPARTMENT", filter_value);

      else
        this.$store.commit("SET_SELECTED_DEPARTMENT", '');
    }
  }
}
</script>

<style lang="stylus" scoped>
.buttons {
  margin-top: 1.6em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .all{
    display: inline-block;
  }
  .button-holder{
    display: inline-block;
  }
  a, button {
    display: inline-block;
    margin-right: 2em;
    margin-top: 1.6em;
    margin-bottom: 1.6em;
    -webkit-appearance: none;
    text-transform: uppercase;
    color: #2c3e50;
    color: white;
    font-weight: 900;
    font-size: .9em;
    padding: .5em 1.2em .5em 1.2em;
    border: none;
    border-bottom: 4px solid;
    font-family: Noto Sans,Helvetica,sans-serif;
    &.all{
      background-color: #2c3e50;
      &:hover{
        border-color: #2c3e50;
      }
    }
    &.ri{
      background-color: #9b22b4;
      &:hover{
        border-color: #9b22b4;
      }
    }
    &.lti{
      background-color: #3bb422;
      &:hover{
        border-color: #3bb422;
      }
    }
    &.csd{
      background-color: #22b49b;
      &:hover{
        border-color: #22b49b;
      }
    }
    &.hcii{
      background-color: #b49b22;
      &:hover{
        border-color: #b49b22;
      }
    }
    &.compbio{
      background-color: #b45222;
      &:hover{
        border-color: #b45222;
      }
    }
    &.deans_office{
      background-color: #C41230;
      &:hover{
        border-color: #C41230;
      }
    }
    &.isr{
      background-color: #165574;
      &:hover{
        border-color: #165574;
      }
    }
    &.mld{
      background-color: #b42284;
      &:hover{
        border-color: #b42284;
      }
    }
    &:hover{
      text-decoration: none;
      color: #2c3e50;
      background-color: white;
    }
  }
  &.ri a.ri, &.ri button.ri{
    background-color: transparent;
    border-color: #9b22b4;
    color: #9b22b4;
  }
  &.lti a.lti, &.lti button.lti{
    background-color: transparent;
    border-color: #3bb422;
    color: #3bb422;
  }
  &.csd a.csd, &.csd button.csd{
    background-color: transparent;
    border-color: #22b49b;
    color: #22b49b;
  }
  &.hcii a.hcii, &.hcii button.hcii{
    background-color: transparent;
    border-color: #b49b22;
    color: #b49b22;
  }
  &.compbio a.compbio, &.compbio button.compbio {
    background-color: transparent;
    border-color: #b45222;
    color: #b45222;
  }
  &.deans_office a.deans_office, &.deans_office button.deans_office,{
    background-color: transparent;
    border-color: #C41230;
    color: #C41230;
  }
  &.isr a.isr, &.isr button.isr {
    background-color: transparent;
    border-color: #165574;
    color: #165574;
  }
  &.mld a.mld, &.mld button.mld{
    background-color: transparent;
    border-color: #b42284;
    color: #b42284;
  }
}
</style>
