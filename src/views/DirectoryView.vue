<template>
  <section class="page">
    <div class="directory-list">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <div class="filter-toggle">
        <form class="search">
          <input class="filter-input" v-if="loaded" v-model="query" placeholder="search" name="query">
        </form>
      </div>
      <section>
        <transition name="fade" mode="out-in" appear>
          <transition-group  v-if="loaded" tag="ul" class="card-holder">
            <li v-for="member in directoryFilter" :key="member.name"  class="card">
              <router-link :to="'/directory/' + member.name">
                <p class="name">{{ member.fullname }}</p>
                <p class="title"><span>({{ member.department }})</span> {{ member.short_jobtitle }}</p>
                <p class="room">{{ member.room }}</p>
              </router-link>
            </li>
          </transition-group>
        </transition>
      </section>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'

export default {
  name: 'directory-list',

  preFetch(store) {
    return store.dispatch('GET_DIRECTORY')
  },

  components: {
    Spinner
  },

  data () {
    const isInitialRender = this.$root._isMounted
    return {
      query: '',
      transition: 'slide-left'
    }
  },

  beforeMount () {
    if (!this.$root._isMounted || this.$store.state.directory.list < 1)
      this.$store.dispatch('GET_DIRECTORY')
  },

  computed: {
    loaded() {
      return this.$store.state.directory.list.length > 0 ? true : false
    },
    directoryFilter() {
      let directory = this.findBy(this.$store.state.directory.list, this.query)
      return directory
    }
  },

  methods: {
    findBy: function(directory, sortValue){
      if(sortValue.length > 0){
        return directory.filter(function (item) {
          return item.fullname.includes(sortValue)
        })
      }else{
        return directory
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../assets/styles/filter';
</style>

<style lang="stylus" scoped>
.card-holder {
  display flex
  flex-wrap wrap
  padding 0
  margin-top: 1em
  width: calc(100% + 2vw);
  position: relative;
  left: -1vw;
}

.card {
  flex: 1 200px;
  justify-content: space-between;
  padding: 1em;
  display: block;
  transition: none;
  border: 1px solid #eee;
  margin: 1vw;
  p.name {
    font-weight: 900;
    border-bottom: 1px solid #eee;
    font-size: 1em;
    text-transform: capitalize;
    color: #C41230;
    padding-bottom: .2em;
  }
  p.title {
    font-size: .9em;
    font-weight: 400;
    span {
      font-weight: 900;
      text-transform: uppercase;
    }
  }
  span.department {
    font-weight: 900;
    text-transform: uppercase;
  }
  a {
    text-decoration: none;
    color: #131313;
  }
  &:hover {
    background: white;
    box-shadow: none;
    transition: none;
    border: 1px solid #C41230;
  }
  p {
    margin-bottom: .4em;
    margin-top: 0;
    text-transform: capitalize;
  }
  p.room {
    font-size: .7em;
    text-transform: uppercase;
    font-weight: 300;
  }
}

</style>
