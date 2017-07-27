<template>
  <section class="page">
    <div class="directory-list">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <div class="filter-toggle" v-if="loaded">

        <form class="search" v-on:submit.prevent>
          <input class="filter-input" v-model="query" :placeholder="placeholder" v-on:submit.prevent name="query" autocomplete="off">
          <button :class="clearToggle" class="clearQuery" v-on:click="clearQuery"></button>
        </form>

        <div class="filter-title" :class="depTitle">
          <button class="Student" @click="titleFilter('Student')" name="student">Student</button>
          <button class="Faculty" @click="titleFilter('Faculty')" name="faculty">Faculty</button>
          <button class="Staff" @click="titleFilter('Staff')" name="staff">Staff</button>
        </div>

        <DepartmentFilter :route_link="route_link" :types="scs_department_types" :excluded_departments="excluded_departments"></DepartmentFilter>

        <div class="count">showing : {{ directoryShown}} / {{directoryLength}}</div>
      </div>

      <VirtualScroller v-if="loaded" class="scroller card-holder" :items="directory" item-height="64" main-tag="section" content-tag="ul" page-mode>
        <template scope="props">
          <DirectoryListItem :item="props.item"></DirectoryListItem>
        </template>
      </VirtualScroller>

    </div>
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

  asyncData ({ store, route: {params: {department}}} ) {
    return store.dispatch('GET_DIRECTORY', { department })
  },

  beforeMount () {
    this.query = this.$store.state.directory.query
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
        let scs_rel = departmentFilter[i].scs_relationship_class;
        let hr_rel = departmentFilter[i].hr_relationship_class;

        // remove this once we have all of the scs_rel codes filled in the data
        scs_rel = typeof(scs_rel) == "string" ? scs_rel : "";

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
          let normalised = titleFilter[i].full_name.toString().toLowerCase();
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

<style lang="scss">
// .items{
//   display: flex;
//   flex-wrap: wrap;
// }
// .item-container{
//   min-height: 16em;
// }
// </style>
//
// <style lang="scss" scoped>
//
// .virtual-scroller:not(.page-mode) {
//   overflow-y: auto;
//   max-height: 40em;
// }
//
// .item-container {
//   box-sizing: border-box;
//   width: 100%;
//   overflow: hidden;
// }
//
// .resize-observer{
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
//   width: 100%;
//   height: 100%;
//   border: none;
//   background-color: transparent;
//   pointer-events: none;
//   display: block;
//   overflow: hidden;
// }
//
// .card-holder {
//   display: flex;
//   flex-wrap: wrap;
//   padding: 0;
//   position: relative;
// }
//
// .filter{
//   border: 1px solid #e0e0e0;
//   padding: 1em;
//   margin-bottom: 1em;
// }
//
// .filter-toggle{
//   transition: all .5s;
//   margin-bottom: 1em;
//   padding-top: 1.6em;
//   .count{
//     font-size: .7em;
//     text-transform: uppercase;
//     padding-top: .5em;
//     color: #444;
//   }
// }
//
// .filter-label{
//   display: block;
//   margin-top: 2.2em;
// }
//
// .filter-input{
//   border: none;
//   border-left: .1em solid #C41230;
//   background: white;
//   font-size: 1.5em;
//   font-weight: 300;
//   padding-bottom: .4em;
//   margin-top: .5em;
//   outline: none;
//   padding: .5em .2em .5em 1.2em;
//   background: #efefef;
//   transition: border-left .1s, background .1s;
//   width: 100%;
//   &:focus{
//     border-left: .2em solid #C41230;
//     background: #f8f8f8;
//     padding-left: .4em
//   }
// }
//
// .filter-input::placeholder{
//   font-weight:300;
//   color: #aaa;
//   font-style: italic;
// }
//
// .main .filter-input{
//   margin-top: 0;
// }
//
// .main.filter{
//   border: 0;
//   border-bottom: 1px solid #e0e0e0;
// }
// .filter-title {
//   width: 38%;
//   display: inline-block;
//   button{
//     -webkit-appearance: none;
//     border: 0;
//     outline: none;
//     padding: .7em 1.2em .7em 1.2em;
//     font-size: .9em;
//     text-transform: uppercase;
//     margin-right: .5em;
//     cursor: pointer;
//     border-bottom: 3px solid white;
//     background: #dadada;
//     &:hover{
//       background: #e2e2e2;
//     }
//     &:active{
//       background: #f5f5f5
//     }
//   }
//   &.Staff button.Staff{
//     background: transparent;
//     border-bottom: 3px solid #C41230;
//   }
//   &.Faculty button.Faculty{
//     background: transparent;
//     border-bottom: 3px solid #C41230;
//   }
//   &.Student button.Student{
//     background: transparent;
//     border-bottom: 3px solid #C41230;
//   }
// }
//
// form.search {
//   width: 58%;
//   margin-right: 2%;
//   display: inline-block;
//   position: relative;
//   button.clearQuery{
//     position: absolute;
//     top: 0.1em;
//     right: 0;
//     bottom: 0;
//     width: 5em;
//     margin-top: 1em;
//     background: #C41230;
//     border: 0;
//     outline: 0;
//     cursor: pointer;
//     &:after{
//       content: '+';
//       display: block;
//       color: white;
//       font-size: 2.8em;
//       line-height: 0;
//       transform: rotate(-45deg);
//     }
//     &.hide{
//       transition: .1s all;
//       opacity: 0;
//       width: 1em;
//     }
//     &.active{
//       transition: .1s all;
//       opacity: 1;
//       width: 5em;
//     }
//   }
// }
// </style>
//
// <style lang="scss">
// section.ri .buttons > button.ri{
//   background-color: white;
//   color: #9b22b4;
//   border-bottom: 3px solid #9b22b4;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
//
// section.lti .buttons > button.lti{
//   background-color: white;
//   color: #3bb422;
//   border-bottom: 3px solid #3bb422;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
//
// section.csd .buttons > button.csd{
//   background-color: white;
//   color: #22b49b;
//   border-bottom: 3px solid #22b49b;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
//
// section.hcii .buttons > button.hcii{
//   background-color: white;
//   color: #b49b22;
//   border-bottom: 3px solid #b49b22;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
//
// section.compbio .buttons > button.compbio{
//   background-color: white;
//   color: #b45222;
//   border-bottom: 3px solid #b45222;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
//
// section.deans_office .buttons > button.deans_office{
//   background-color: white;
//   color: #C41230;
//   border-bottom: 3px solid #C41230;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
//
// section.isr .buttons > button.isr{
//   background-color: white;
//   color: #165574;
//   border-bottom: 3px solid #165574;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
// section.mld .buttons > button.mld{
//   background-color: white;
//   color: #b42284;
//   border-bottom: 3px solid #b42284;
//   &:hover{
//     background-color: white;
//     color: black;
//   }
// }
</style>
