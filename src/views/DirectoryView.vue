<template>
  <section class="page">
    <div class="directory-list">
      <Spinner class="spinner" v-if="!loaded" key="spinner"></Spinner>
      <div class="filter-toggle" v-if="loaded">
        <form class="search" v-on:submit.prevent>
          <input class="filter-input" v-model="query" :placeholder="placeholder" v-on:submit.prevent name="query" autocomplete="off">
        </form>
        <div class="filter-title" :class="depTitle">
          <button class="Student" @click="titleFilter('Student')" name="student">Student</button>
          <button class="Faculty" @click="titleFilter('Faculty')" name="faculty">Faculty</button>
          <button class="Staff" @click="titleFilter('Staff')" name="staff">Staff</button>
        </div>

        <div class="dep-buttons" :class="nav">
          <router-link :to="'/directory/'" class="all">all</router-link>
          <router-link :to="'/directory/department/csd'" class="csd" name="csd">csd</router-link>
          <router-link :to="'/directory/department/lti'" class="lti" name="lti">lti</router-link>
          <router-link :to="'/directory/department/hcii'" class="hcii" name="hcii">hcii</router-link>
          <router-link :to="'/directory/department/ri'" class="ri" name="ri">ri</router-link>
          <router-link :to="'/directory/department/deans_office'" class="scs" name="scs">scs</router-link>
          <router-link :to="'/directory/department/compbio'" class="compbio" name="compbio">cbd</router-link>
          <router-link :to="'/directory/department/mld'" class="mld" name="mld">mld</router-link>
          <router-link :to="'/directory/department/isr'" class="isr" name="isr">isr</router-link>
        </div>

        <div class="count">showing : {{ directoryShown}} / {{directoryLength}}</div>
      </div>

      <VirtualScroller v-if="loaded" class="scroller card-holder" :items="directory" item-height="38" main-tag="section" content-tag="ul" page-mode>
        <template scope="props">
          <DirectoryListItem :item="props.item"></DirectoryListItem>
        </template>
      </VirtualScroller>

    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import Spinner from '../components/Spinner.vue'
import _ from 'lodash'
import DirectoryListItem from '../components/DirectoryListItem.vue'
import VirtualScroller from '../components/VirtualScroller.vue'

const renderers = {
  person: DirectoryListItem
}

function fetchDirectory(store) {
  store.dispatch('GET_DIRECTORY', store.state.route.params.department);
}

export default {
  name: 'directory-list',

  preFetch: fetchDirectory,

  components: {
    Spinner,
    DirectoryListItem,
    VirtualScroller
  },

  data () {
    return {
      query: '',
      nav: '',
      directory: [],
      directoryLength: 0,
      directoryShown: 0,
      depTitle: ''
    }
  },

  watch: {
    query: function () {
      this.departmentFilter()
    }
  },

  beforeMount () {
    this.query = this.$store.state.directory.query
    fetchDirectory(this.$store)
    this.departmentFilter()
  },

  mounted () {
    Vue.nextTick(() => {
      window.scrollTo(0, this.$store.state.directory.y_position)
    })
  },

  beforeDestroy () {
    this.$store.commit('SET_POSITION', window.scrollY)
    this.$store.commit('SET_QUERY', this.query)
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
      return "search " + this.nav;
    }
  },

  methods: {

    titleFilter: function(val) {
      if(val === this.depTitle){
        this.depTitle = ''
      }else{
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

        pushEntry |= this.depTitle == "Faculty" &&
          typeof(scs_rel) == "string" &&
          scs_rel.includes(this.depTitle.toLowerCase());
        pushEntry |= this.depTitle !== "Faculty" && hr_rel.includes(this.depTitle);
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

<style lang="stylus">
.items{
  display: flex;
  flex-wrap: wrap;
}
</style>

<style lang="stylus" scoped>

.virtual-scroller:not(.page-mode) {
  overflow-y: auto;
  max-height: 40em;
}
.item-container {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}
.items {
  width: 100%;
}

.resize-observer{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
  display: block;
  overflow: hidden;
}

.card-holder {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  position: relative;
  min-height: 20em;
}

.dep-buttons {
  margin-top: 1.6em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  a {
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
    &.deans_office, &.scs{
      background-color: #C41230;
      &:hover, .active{
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
  &.all a.all{
    background-color: transparent;
    border-color: #2c3e50;
    color: #2c3e50;
  }
  &.ri a.ri{
    background-color: transparent;
    border-color: #9b22b4;
    color: #9b22b4;
  }
  &.lti a.lti{
    background-color: transparent;
    border-color: #3bb422;
    color: #3bb422;
  }
  &.csd a.csd{
    background-color: transparent;
    border-color: #22b49b;
    color: #22b49b;
  }
  &.hcii a.hcii{
    background-color: transparent;
    border-color: #b49b22;
    color: #b49b22;
  }
  &.compbio a.compbio {
    background-color: transparent;
    border-color: #b45222;
    color: #b45222;
  }
  &.deans_office a.scs,
  &.scs a.scs{
    background-color: transparent;
    border-color: #C41230;
    color: #C41230;
  }
  &.isr a.isr {
    background-color: transparent;
    border-color: #165574;
    color: #165574;
  }
  &.mld a.mld{
    background-color: transparent;
    border-color: #b42284;
    color: #b42284;
  }
}

.filter{
  border: 1px solid #e0e0e0;
  padding: 1em;
  margin-bottom: 1em;
}

.filter-toggle{
  transition: all .5s;
  margin-bottom: 1em;
  padding-top: 1.6em;
  .count{
    font-size: .7em;
    text-transform: uppercase;
    padding-top: .5em;
    color: #444;
  }
}

.filter-label{
  display: block;
  margin-top: 2.2em;
}

.filter-input{
  border: none;
  border-left: .1em solid #C41230;
  background: white;
  font-size: 1.5em;
  font-weight: 300;
  padding-bottom: .4em;
  margin-top: .5em;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: #efefef;
  transition: border-left .1s, background .1s;
  width: 100%;
  &:focus{
    border-left: .2em solid #C41230;
    background: white;
    padding-left: .4em
  }
}

.filter-input::placeholder{
  font-weight:300;
  color: #aaa;
  font-style: italic;
}

.main .filter-input{
  margin-top: 0;
}

.main.filter{
  border: 0;
  border-bottom: 1px solid #e0e0e0;
}
.filter-title {
  width: 38%;
  display: inline-block;
  button{
    -webkit-appearance: none;
    border: 0;
    outline: none;
    padding: .7em 1.2em .7em 1.2em;
    font-size: .9em;
    text-transform: uppercase;
    margin-right: .5em;
    cursor: pointer;
    border-bottom: 3px solid #eee;
    background: #efefef;
    &:hover{
      background: #ddd
    }
  }
  &.Staff button.Staff{
    background: transparent;
    border-bottom: 3px solid #C41230;
  }
  &.Faculty button.Faculty{
    background: transparent;
    border-bottom: 3px solid #C41230;
  }
  &.Student button.Student{
    background: transparent;
    border-bottom: 3px solid #C41230;
  }
}
form.search {
  width: 58%;
  margin-right: 2%
  display: inline-block;
}

</style>
