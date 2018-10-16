<template>
  <section class="content-page card">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded">
      <div>
        <div class="type" :style="{background: typeColors.get(event.event_type)}">{{event.event_type}}</div>

        <h1>{{event.headline}}</h1>
        <h2 v-if="event.name">{{event.name}}</h2>

        <section>
          <p class="title small">Place & Time</p>
          <h3 v-if="event.building">{{event.building.toUpperCase() | buildingTranslate}}
            <span v-if="event.room"> {{event.room}}</span>
          </h3>

          <h4>{{dateFix(event.start_date)}}</h4>

          <p>
            Starts: {{timeFix(event.start_date)}}
            <span v-if="event.end_date">&#47; Ends: {{timeFix(event.end_date)}}</span>
          </p>
        </section>

        <section class="speaker" v-if="event.speakerName">
          <p class="title small">Speaker</p>
          <h2>{{event.speakerName}}</h2>
          <h4 v-if="event.speakerCompany">{{event.speakerCompany}}</h4>
          <h4 v-if="event.speakerCompanyTeam">{{event.speakerCompanyTeam}}</h4>
        </section>

        <section class="abstract" v-if="event.description">
          <p class="title small">Description</p>
          <p v-html="event.description"></p>
        </section>

        <section class="poster" v-if="event.poster_url">
          <p class="title small">Attachments</p>
          <p><a class="button" :href="event.poster_url">{{event.poster_text}}</a></p>
        </section>

      </div>
    </transition>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'
import format from 'date-fns/format'
import { SCS_EVENT_COLORS } from '../filter/index';

export default {
  name: 'event-view',

  components: {
    Spinner
  },

  data: function () {
    return {
      'typeColors': SCS_EVENT_COLORS
    };
  },

  computed: {
    loaded() {
      let event = this.$route.params.event
      for (var id in this.$store.state.events.event)
        if(id === event) return true
    },
    event(){
      let event = this.$route.params.event
      for (var id in this.$store.state.events.event)
        if(id === event) return this.$store.state.events.event[id]
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
      return format(arg, 'dddd, MMM D, YYYY')
    }
  },

  asyncData ({ store, route }) {
    return store.dispatch('GET_EVENT', route.params.event)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.type{
  display: inline-block;
  color: white;
  font-size: .7em;
  background: $red; //default
  padding: $base-line-height / 4;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

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
