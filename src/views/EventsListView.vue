<template>
  <section>
    <div class="events-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <div class="card-holder">
          <div class="card"  v-for="event in events" :key="event.uid" >
            <div :class="event.type" class="type">{{event.type}}</div>
            <router-link  :to="'/events/' + event.uid">
              <div>
                <h2>{{event.startDate | dateTranslate}}</h2>
                <h3>{{event.title}}</h3>
              </div>
            </router-link>
          </div>
        </div>
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

  computed: {
    loaded() {
      return this.$store.state.events.list.length > 0 ? true : false
    },
    events() {
      return this.$store.state.events.list
    }
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
