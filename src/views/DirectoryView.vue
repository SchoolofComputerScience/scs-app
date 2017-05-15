<template>
  <section class="page">
    <div class="directory-list">
      <Spinner class="spinner" v-if="!loaded" key="spinner"></Spinner>
      <div class="filter-toggle" v-if="loaded">
        <form class="search">
          <input class="filter-input" v-model="query" placeholder="search" name="query" autocomplete="off">
        </form>

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

      <VirtualScroller v-if="loaded" class="scroller card-holder" :items="directory" item-height="34" main-tag="section" content-tag="ul" page-mode>
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
      directoryShown: 0
    }
  },
  watch: {
    query: function () {
      this.findBy()
    }
  },

  beforeMount () {
    this.query = this.$store.state.directory.query
    fetchDirectory(this.$store);
  },

  mounted () {
    Vue.nextTick(() => window.scrollTo(0, this.$store.state.directory.y_position))
  },

  beforeDestroy () {
    this.$store.commit('SET_POSITION', window.scrollY)
    this.$store.commit('SET_QUERY', this.query)
  },

  computed: {
    loaded() {
      if(this.$store.state.directory.list.length > 0){
        this.directory = this.$store.state.directory.list
        this.directoryLength = this.$store.state.directory.list.length
        this.departmentFilt()
        return true
      }else{
        return false
      }
    }
  },

  methods: {
    departmentFilt() {
      let vm = this
      let departmentFilter = this.$store.state.route.params.department
      let filtered = []

      vm.nav = departmentFilter
      vm.loaded = false
      vm.query = ''

      for (var i = 0; i < this.$store.state.directory.list.length; i++) {
        if(this.$store.state.directory.list[i].departments.includes(departmentFilter) || !departmentFilter){
          filtered.push(this.$store.state.directory.list[i])
        }
      }

      vm.directoryShown = filtered.length
      vm.directory = filtered
    },
    findBy: _.debounce(function(){
      let departmentFilter = this.$store.state.route.params.department
      let vm = this

      if(this.query === ''){
        vm.directory = this.$store.state.directory.list
      }

      let filtered = []

      for (var i = 0; i < this.$store.state.directory.list.length; i++) {
        if(this.$store.state.directory.list[i].departments.includes(departmentFilter) || !departmentFilter){
          let normalised = this.$store.state.directory.list[i].full_name.toString().toLowerCase();
          if (normalised.indexOf(this.query.toLowerCase()) > -1) {
            filtered.push(this.$store.state.directory.list[i])
          }
        }
      }
      vm.directoryShown = filtered.length
      vm.directory = filtered
    }, 200)
  }
}
</script>

<style lang="stylus">
@import '../assets/styles/filter';
</style>

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
    font-weight: 900;
    font-size: .95em;
    padding: .5em 1.2em .5em .2em;
    border: none;
    border-bottom: 4px solid;
    &.all{
      border-color: #2c3e50;
      &:hover{
        background-color: #2c3e50;
      }
    }
    &.ri{
      border-color: #9b22b4;
      &:hover{
        background-color: #9b22b4;
      }
    }
    &.lti{
      border-color: #3bb422;
      &:hover{
        background-color: #3bb422;
      }
    }
    &.csd{
      border-color: #22b49b;
      &:hover{
        background-color: #22b49b;
      }
    }
    &.hcii{
      border-color: #b49b22;
      &:hover{
        background-color: #b49b22;
      }
    }
    &.compbio{
      border-color: #b45222;
      &:hover{
        background-color: #b45222;
      }
    }
    &.deans_office, &.scs{
      border-color: #C41230;
      &:hover, .active{
        background-color: #C41230;
      }
    }
    &.isr{
      border-color: #165574;
      &:hover{
        background-color: #165574;
      }
    }
    &.mld{
      border-color: #b42284;
      &:hover{
        background-color: #b42284;
      }
    }
    &:hover{
      text-decoration: none;
      color white;
    }
  }
  &.ri a.ri{
    background-color: #9b22b4;
    color white;
  }
  &.lti a.lti{
    background-color: #3bb422;
    color white;
  }
  &.csd a.csd{
    background-color: #22b49b;
    color white;
  }
  &.hcii a.hcii{
    background-color: #b49b22;
    color white;
  }
  &.compbio a.compbio {
    background-color: #b45222;
    color white;
  }
  & a.deans_office, &.scs a.scs{
    background-color: #C41230;
    color white;
  }
  &.isr a.isr {
    background-color: #165574;
    color white;
  }
  &.mld a.mld{
    background-color: #b42284;
    color white;
  }
}

</style>
