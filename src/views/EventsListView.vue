<template>
  <section class="data-page">
    <div class="events-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <section class="page">
          <form v-on:submit.prevent>
            <input class="event-search" v-model="query" placeholder="Search Events" @keyup.enter="searchEvents" name="query" autocomplete="off">
          </form>
          <div class="card-holder">
            <div v-if="error" class="error-message">
              <p>{{error}}</p>
            </div>
            <div class="card" v-if="!error" v-for="event in events" :key="event.uid" >
              <div :class="event.type" class="type">{{event.type}}</div>
              <router-link  :to="'/events/' + event.uid">
                <div>
                  <p><b>{{timeFix(event.startDate)}}</b> / {{dateFix(event.startDate)}}</p>
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
import format from 'date-fns/format'

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
    }, 500),
    timeFix (arg) {
      return format(arg, 'h:mm a')
    },
    dateFix (arg) {
      return format(arg, 'MMMM Do YYYY')
    }
  },

  beforeMount () {
    fetchEventsList(this.$store)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.event-search{
  border: none;
  border-left: .1em solid $red;
  font-size: 1.5em;
  font-weight: 300;
  margin-top: $base-line-height / 2;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: white;
  transition: border-left .1s, background .1s;
  width: 100%;
  &:focus{
    border-left: .2em solid $red;
    background: white;
    padding-left: .4em
  }
}

.type{
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  font-size: .8rem;
  background: $red;
  padding-bottom: 0;
  padding: $base-line-height / 4;
  text-transform: uppercase;
}

.event-search::placeholder{
  font-weight: 300;
  color: #aaa;
  font-style: italic;
}

.card-holder{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
}

.error-message{
  margin: $base-line-height 0;
}

.card{
  width: 30%;
  position: relative;
  z-index: 1;
  margin: 0;
  margin-top: $base-line-height;
  &:nth-child(3n -2),
  &:nth-child(3n -1){
    margin-right: $base-line-height;
  }
  @include breakpoint-max(tablet) {
    &:nth-child(3n -2),
    &:nth-child(3n -1){
      margin-right: 0;
    }
    &:nth-child(2n -1){
      margin-right: $base-line-height;
    }
    width: 47%;
  }
  p{
    color: $black;
  }
  a{
    padding-top: $base-line-height;
    width: 100%;
    z-index: 9;
    text-decoration: none;
    display: flex;
    align-items: center;
    > div{
      width: 100%;
    }
  }
  h3{
    padding-top: $base-line-height;
    border-top: 1px solid $primary-grey;
  }
}

</style>
