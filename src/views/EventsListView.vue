<template>
  <section class="data-page">
    <div class="events-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <section class="page">
          <form v-on:submit.prevent>
            <input
              class="event-search"
              v-model="query"
              placeholder="Search Events"
              @keyup.enter="searchEvents"
              name="query"
              autocomplete="off">
          </form>
          <div class="card-holder">
            <div v-if="error" class="error-message">
              <p>{{error}}</p>
            </div>
            <EventsItem
              class="card"
              v-if="!error"
              v-for="event in events"
              :data="event"
              :key="event.uid"></EventsItem>
          </div>
        </section>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import EventsItem from '../components/EventsItem.vue'

export default {
  name: 'events-list-view',

  components: {
    Spinner,
    EventsItem
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

  asyncData ({ store, route }) {
    return store.dispatch('GET_EVENTS_LIST');
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

</style>
