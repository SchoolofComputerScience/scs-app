<template>
  <section class="data-page">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div class="filter-toggle" v-if="loaded">
      <form class="search" v-on:submit.prevent>
        <input class="filter-search"
          v-model="query"
          :placeholder="placeholder"
          v-on:submit.prevent
          name="query"
          autocomplete="off">
        <button :class="clearToggle" class="clearQuery" v-on:click="clearQuery"></button>
      </form>
      <div class="filter-container">
        <DepartmentFilter :route_link="route_link" :types="scs_department_types" :excluded_departments="excluded_departments"></DepartmentFilter>
        <div class="filter-title buttons" :class="depTitle">
          <button class="Student button" @click="titleFilter('Student')" name="student">Student</button>
          <button class="Faculty button" @click="titleFilter('Faculty')" name="faculty">Faculty</button>
          <button class="Staff button" @click="titleFilter('Staff')" name="staff">Staff</button>
        </div>
      </div>
    </div>

    <VirtualScroller
      v-if="loaded"
      class="scroller card-holder"
      :items="directory"
      main-tag="section"
      content-tag="ul"
      page-mode>
      <template scope="props">
        <DirectoryListItem :item="props.item"></DirectoryListItem>
      </template>
    </VirtualScroller>
  </section>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import DirectoryListItem from '../components/DirectoryListItem.vue'
import VirtualScroller from '../components/VirtualScroller.vue'
import DepartmentFilter from '../components/DepartmentFilter.vue'
import Spinner from '../components/Spinner.vue'

const renderers = {
  person: DirectoryListItem
}

function fetchDirectory(store) {
  store.dispatch('GET_DIRECTORY', store.state.route.params.department);
}

export default {
  name: 'directory-list',

  components: {
    DirectoryListItem,
    VirtualScroller,
    DepartmentFilter,
    Spinner
  },

  data () {
    return {
      query: '',
      nav: '',
      clearToggle: 'hide',
      directory: [],
      directoryLength: 0,
      directoryShown: 0,
      depTitle: '',
      route_link: 'true',
      scs_department_types: ['academic', 'admin', 'school'],
      excluded_departments: ['scs_facilities', 'scs'],
    }
  },

  watch: {
    query: function () {
      this.departmentFilter()
      this.clearToggle = this.query ? 'active' : 'hide'
    }
  },

  beforeMount () {
    this.query = this.$store.state.directory.query
    fetchDirectory(this.$store)
    this.departmentFilter()
  },

  mounted () {
    Vue.nextTick(() => {
      this.query = this.$store.state.directory.query;
      this.depTitle = this.$store.state.directory.title_filter;
      window.scrollTo(0, this.$store.state.directory.y_position)
    })
  },

  beforeDestroy () {
    this.$store.commit('SET_POSITION', window.scrollY)
    this.$store.commit('SET_QUERY', this.query)
    this.$store.commit('SET_TITLE_FILTER', this.depTitle)
  },

  computed: {
    loaded() {
      if(this.$store.state.directory.list.length > 0){
        if(this.$store.state.route.params.department === undefined){
          this.directory = this.$store.state.directory.list
        }
        this.directoryLength = this.$store.state.directory.list.length
        this.directoryShown = this.$store.state.directory.list.length
        this.departmentFilter()
        return true
      }else{
        return false
      }
    },
    placeholder() {
      let depTitleHold = this.depTitle ? ' ' + this.depTitle.toLowerCase() : ''
      return 'search ' + this.nav.replace('_', ' ') + depTitleHold + ' names';
    }
  },

  methods: {
    clearQuery: function() {
      this.query = '';
    },

    titleFilter: function(val) {
      if(val === this.depTitle){
        this.$store.commit('SET_TITLE_FILTER', '')
        this.depTitle = ''
      }else{
        this.$store.commit('SET_TITLE_FILTER', this.depTitle)
        this.depTitle = val;
      }
      this.departmentFilter()
    },

    departmentFilter: _.debounce(function(){

      let departmentParam = this.$store.state.route.params.department || ''
      this.nav = departmentParam
      this.directoryShown = this.$store.state.directory.list.length
      this.directory = this.$store.state.directory.list

      if(departmentParam === ''){
        this.nav = 'all'
      }

      if(this.query === '' && departmentParam === ''){
        if(this.depTitle === '')
          return;
      }

      var departmentFilter = []

      for (var i = 0; i < this.directoryLength; ++i) {
        if(this.directory[i].departments.includes(departmentParam) || !departmentParam){
          departmentFilter.push(this.directory[i])
        }
      }

      var titleFilter = []

      for (var i = 0; i < departmentFilter.length; ++i) {

        // check if any of the boolean conditions are met before pushing

        let pushEntry = 0;
        let scs_rel = departmentFilter[i].scs_relationship_class || '';
        let hr_rel = departmentFilter[i].hr_relationship_class || '';

        pushEntry |= this.depTitle == "Faculty" &&
          (
              hr_rel.includes(this.depTitle) ||
              scs_rel.includes(this.depTitle.toLowerCase())
          );
        pushEntry |= this.depTitle !== "Faculty" &&
            !scs_rel.includes("faculty") &&
            hr_rel.includes(this.depTitle);
        pushEntry |= !this.depTitle;

        if(pushEntry){
          titleFilter.push(departmentFilter[i]);
        }
      }

      var textFilter = []

      if(this.query !== '') {
        for (var i = 0; i < titleFilter.length; ++i) {
          let normalised = titleFilter[i].display_name.toString().toLowerCase();
          if (normalised.indexOf(this.query.toLowerCase()) > -1) {
            textFilter.push(titleFilter[i])
          }
        }
      }else{
        textFilter = titleFilter;
      }

      this.directoryShown = textFilter.length
      this.directory = textFilter

    }, 100),

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.filter-search{
  border: none;
  border-left: .1em solid $red;
  background: white;
  font-size: 1.5em;
  font-weight: 300;
  margin-top: $base-line-height / 2;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: darken($primary-grey, 5%);
  transition: border-left .1s, background .1s;
  width: 100%;
  &:focus{
    border-left: .2em solid $red;
    background: white;
    padding-left: .4em
  }
}

.filter-container{
  display: flex;
  justify-content: space-between;
  @include breakpoint-max(tablet) {
    display: block;
    margin-bottom: $base-line-height;
  }
}

.filter-search::placeholder{
  font-weight: 300;
  color: #aaa;
  font-style: italic;
}

.main .filter-search{
  margin-top: 0;
}

.filter-title {
  &.Staff button.Staff, &.Faculty button.Faculty, &.Student button.Student{
    background: $red;
    color: white;
  }
}

form.search {
  width: 100%;
  margin-right: 2%;
  display: inline-block;
  position: relative;
  input{
    background: white;
  }
  button.clearQuery{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 5em;
    margin-top: $base-line-height / 2;
    background: $red;
    border: 0;
    outline: 0;
    cursor: pointer;
    &:after{
      content: '+';
      display: block;
      color: white;
      font-size: 2.8em;
      line-height: 0;
      transform: rotate(-45deg);
    }
    &.hide{
      transition: .1s all;
      opacity: 0;
      width: 1em;
    }
    &.active{
      transition: .1s all;
      opacity: 1;
      width: 5em;
    }
  }
}
</style>
