<template>
  <section class="data-page">
    <div class="filter-toggle">
      <form class="search" v-on:submit.prevent>
        <input class="filter-search"
          v-model="query"
          :placeholder="placeholder"
          v-on:submit.prevent
          name="query"
          autocomplete="off">
      </form>
      <div class="filter-container">
        <div class="filter-title buttons" :class="depTitle">
          <button class="button" @click="toggleView()" name="student">{{ display_text }}</button>
        </div>
      </div>
    </div>
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <ul v-if="loaded" :class="display_view">
      <li v-if="display_view === 'list'">
        <div class="row legend">
          <span class="col-4">Name</span>
          <span class="col-4 title">Position</span>
          <span class="col-4">Email</span>
        </div>
      </li>
      <DirectoryListItem v-for="person in finalDirectory" :view="display_view" :item="person" :key="person.scid"></DirectoryListItem>
    </ul>
    <button class="button col-12" @click="updatePage()">Load More People</button>
  </section>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import DirectoryListItem from '../components/DirectoryListItem.vue'
import DepartmentFilter from '../components/DepartmentFilter.vue'
import Spinner from '../components/Spinner.vue'

const renderers = {
  person: DirectoryListItem
}

export default {
  name: 'directory-list',

  components: {
    DirectoryListItem,
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
      page: 1,
      display_view: '',
      display_text: ''
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_DIRECTORY', store.state.route.params.department);
  },

  computed: {
    loaded() {
      if(this.$store.state.directory.list.length > 0){
        this.directory = this.$store.state.directory.list;
        this.display_view = this.$store.state.directory.layout.view;
        this.display_text = this.$store.state.directory.layout.text;
        return true;
      }else{
        return false;
      }
    },
    placeholder() {
      let depTitleHold = this.depTitle ? ' ' + this.depTitle.toLowerCase() : ''
      return 'search ' + this.nav.replace('_', ' ') + depTitleHold + ' names';
    },
    finalDirectory(){
      let search_term = this.query;
      if (search_term.length){
        this.directory = this.$store.state.directory.list.filter(function(person) {
          return person.display_name.indexOf(search_term) > -1 ? person : false;
        }); 
        return this.directory.length > (100 * this.page) ? this.directory.slice(0, (100 * this.page)) : this.directory;
      }
      else {
        return this.$store.state.directory.list.slice(0, (100 * this.page));
      }
    }
  },

  methods: {
    clearQuery: function() {
      this.query = '';
    },

    toggleView: function() {
      if(this.display_view === 'grid') {
        this.display_view = 'list';
        this.display_text = 'Card View';
        this.$store.commit('SET_PREFERRED_VIEW', {
          view: 'list',
          text: 'Card View'
        });
      } else {
        this.display_view = 'grid';
        this.display_text = 'List View';
        this.$store.commit('SET_PREFERRED_VIEW', {
          view: 'grid',
          text: 'List View'
        });
      }
    },

    updatePage: function() {
      this.page += 1;
    }
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

.grid {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}


.legend {
  margin: 1rem 0 0.5rem 0;
}
</style>
