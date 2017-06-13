<template>
  <section>
    <div class="events-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <section class="page">
          <form class="search" v-on:submit.prevent>
            <input class="search-input" v-model="query" placeholder="Search Events" @keyup.enter="searchEvents" name="query" autocomplete="off">
          </form>
          <div class="card-holder">
            <div v-if="error" class="error-message">
              <p>{{error}}</p>
            </div>
            <div class="card" v-if="!error" v-for="event in events" :key="event.uid" >
              <div :class="event.type" class="type">{{event.type}}</div>
              <router-link  :to="'/events/' + event.uid">
                <div>
                  <h2>{{event.startDate | dateTranslate}}</h2>
                  <h3>{{event.title}}</h3>
                </div>
              </router-link>
            </div>
          </div>
        </section>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'

function fetchEventsList(store) {
  return store.dispatch('GET_EVENTS_LIST')
}

export default {
  name: 'events-list-view',

  preFetch: fetchEventsList,

  components: {
    Spinner
  },

  data () {
    return {
      query: '',
      error: ''
    }
  },

  watch: {
    query: function () {
      this.searchEvents()
    }
  },

  computed: {
    loaded() {

      if(this.$store.state.events.error.length > 0){
        this.error = this.$store.state.events.error
      }else{
        this.error = false;
      }

      return this.$store.state.events.list.length > 0 ? true : false
    },
    events() {
      return this.$store.state.events.list
    }
  },

  methods: {
    searchEvents: _.debounce(function(){
      this.$store.dispatch('SEARCH_EVENTS', this.query)
    }, 500)
  },

  beforeMount () {
    fetchEventsList(this.$store)
  }
}
</script>

<style lang="stylus" scoped>
.card-holder
  display flex
  flex-wrap wrap
  position relative
  left -1vw
  margin-top: 2em
  h1
    font-size 1em
    a
      text-decoration none
  p
    font-size .8em
    em
      color #C41230

.error-message{
  font-size: 1.6em;
  margin: 1em;
}
.search-input{
  border: none;
  border-left: .1em solid #C41230;
  background: white;
  font-size: 1.5em;
  font-weight: 300;
  padding-bottom: .4em;
  margin-top: 1.6em;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: #efefef;
  transition: border-left .1s, background .1s;
  width: 100%;
  margin-bottom: 0em;
  &:focus{
    border-left: .2em solid #C41230;
    background: white;
    padding-left: .4em
  }
}
.card
  flex 1 calc(50% - 2em)
  margin 1em
  position relative
  z-index 1
  border: 1px solid #eee
  width: calc(50% - 2em);
  background: white;
  a
    width: 100%
    z-index 9
    text-decoration none
    display: flex;
    align-items: center
    > div
      width: 100%
  h2
    font-size .85em
    margin .2rem 1rem
    padding-bottom .6em
    padding-top .6em
    font-weight 300
    position relative

  h3
    font-size 1.35em
    padding-bottom: 1em
    margin .2rem 1rem
    border-top: 1px solid #eee
    padding-top: .8em
    font-weight 300
  p
    font-size .85em
    margin-top 1em

// card colors
.card .type{
  text-transform: uppercase
  color: white;
  background: black
  padding: .3rem 1rem;
  &.thesis{
    background: #1289c4
  }
  &.seminars, &.Seminars{
    background: #30c412
  }
  &.talks {
    background: #12c4a6
  }
}

</style>
