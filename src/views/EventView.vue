<template>
  <section class="content-page card">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded">
      <div>
        <h1>{{event.title}}</h1>
        <h2 v-if="event.talkTitle">{{event.talkTitle}}</h2>

        <section class="speaker" v-if="event.speakerName">
          <p class="title small">Speaker</p>
          <h2>{{event.speakerName}}</h2>
          <h4 v-if="event.speakerCompany">{{event.speakerCompany}}</h4>
          <h4 v-if="event.speakerCompanyTeam">{{event.speakerCompanyTeam}}</h4>
        </section>

        <section class="date" v-if="event.startDate">
          <p class="title small">Date</p>
          <h3>{{dateFix(event.startDate)}}</h3>
        </section>

        <section class="time">
          <p class="title small">Time</p>
          <aside>
            <p v-if="event.startDate">Starts: {{timeFix(event.startDate)}}</p>
            <p class="divide" v-if="event.endDate"> / </p>
            <p v-if="event.endDate">Ends: {{timeFix(event.endDate)}}</p>
          </aside>
        </section>

        <section class="location" v-if="event.room">
          <p class="title small">Location</p>
          <aside>
            <h3 v-if="event.room">{{event.room}}</h3>
            <h3 class="divide" v-if="event.building"> / </h3>
            <h3 v-if="event.building">{{event.building}}</h3>
          </aside>
        </section>

        <section class="abstract" v-if="event.abstract">
          <p class="title small">Abstract</p>
          <p v-html="event.abstract"></p>
        </section>

        <section class="poster" v-if="event.poster">
          <p class="title small">Attachments</p>
          <p><a class="button" :href="event.poster">poster</a></p>
        </section>
      </div>
    </transition>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'
import format from 'date-fns/format'

function fetchEvent(store) {
  return store.dispatch('GET_EVENT', store.state.route.params.event)
}

export default {
  name: 'event-view',

  preFetch: fetchEvent,

  components: {
    Spinner
  },

  computed: {
    loaded() {
      let event = this.$route.params.event
      for (var uid in this.$store.state.events.event)
        if(uid === event) return true
    },
    event(){
      let event = this.$route.params.event
      for (var uid in this.$store.state.events.event)
        if(uid === event) return this.$store.state.events.event[uid]
    }
  },

  methods: {
    cleanHTML: function(data){
      return data
    },
    timeFix (arg) {
      return format(arg, 'h:mm a')
    },
    dateFix (arg) {
      return format(arg, 'MMMM Do YYYY')
    }
  },

  beforeMount () {
    fetchEvent(this.$store)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.title {
  text-transform: uppercase;
  border-bottom: 1px solid $primary-grey;
  margin: 0;
  padding: 0;
  padding-bottom: $base-line-height / 2;
  margin-bottom: $base-line-height / 2;
  margin-top: $base-line-height;
  font-size: .8rem;
}

.time aside > p, .location aside > h3{
  display: inline-block;
  &.divide{
    padding: 0 $base-line-height;
  }
}
</style>
