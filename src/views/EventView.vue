<template>
  <section>
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div class="event-view" >
      <transition name="fade" mode="out-in" v-if="loaded">
        <div>
          <figure class="event-header" :class="event.type"></figure>
          <div class="content-container">
            <h1>{{event.title}}</h1>
            <h2 v-if="event.talkTitle">{{event.talkTitle}}</h2>

            <section class="speaker" v-if="event.speakerName">
              <p class="title">Speaker</p>
              <h2>{{event.speakerName}}</h2>
              <h4 v-if="event.speakerCompany">{{event.speakerCompany}}</h4>
              <h4 v-if="event.speakerCompanyTeam">{{event.speakerCompanyTeam}}</h4>
            </section>

            <section class="date" v-if="event.startDate">
              <p class="title">Date</p>
              <h4>{{event.startDate | dateTranslate}}</h4>
            </section>

            <section class="time">
              <p class="title">Time</p>
              <aside>
                <h4 v-if="event.startDate">{{event.startDate | timeTranslate}}</h4>
                <span v-if="event.endDate"> / </span>
                <h4 v-if="event.endDate">{{event.endDate | timeTranslate}}</h4>
              </aside>
            </section>

            <section class="location" v-if="event.room">
              <p class="title">Location</p>
              <h4 v-if="event.room">{{event.room}}</h4>
              <h4 v-if="event.building">{{event.building}}</h4>
            </section>

            <section class="abstract" v-if="event.abstract">
              <p class="title">Abstract</p>
              <p v-html="event.abstract"></p>
            </section>

            <section class="poster" v-if="event.poster">
              <p class="title">Attachments</p>
              <p><a class="btn" :href="event.poster">poster</a></p>
            </section>

          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

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
    }
  },

  beforeMount () {
    fetchEvent(this.$store)
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/content';

h1 {
  font-size: 2em;
  margin-bottom: 0;
}

h2 {
  font-weight: 300;
  margin-top: .6em;
}

.content-container {
  background: white;
  margin: 1em;
  padding: 3em 5em;
  display: block;
  z-index: 9;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  position: relative;
  top: 4em;
  margin-bottom: 4em;
}

.event-header {
  min-height: 12em;
  position: absolute;
  width: 100%;
  left: 0;
  top: -0.55em;
  margin: 0;
  &.thesis {
    background: #1289c4;
  }
  &.seminars, &.Seminars {
    background: #30c412;
  }
  &.talks {
    background: #12c4a6;
  }
}

.title {
  text-transform: uppercase;
  font-size: .8em;
  border-bottom: 1px solid #ccc;
  margin-top: 3.2em;
}

section.time {
  h4, span{
    display: inline-block;
    margin-top: 0;
    font-weight: 300;
  }
}

section.speaker,
section.location {
  h2 {
    margin-bottom: 0em;
  }
  h4 {
    margin: .2em 0;
    &:nth-of-type(2) {
      font-weight: 300;
    }
  }
}

.poster .btn {
  padding: .3em .8em;
  margin-right: .5em;
  font-weight: 900;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  border: 2px solid;
  margin-bottom: .2em;
  background: #c41230;
  color: #fff;
  text-transform: uppercase;
  &:hover {
    background: #fff;
    color: #c41230;
    text-decoration: none;
  }
}
</style>
