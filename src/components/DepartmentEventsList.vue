<template>
  <div class="data-page">
    <div class="card-holder">
      <EventsItem v-for="list in eventsListByDepartment" :data="list" :key="eventsListByDepartment.uid"></EventsItem>
    </div>
  </div>
</template>

<script>
import { router } from '../app'
import EventsItem from '../components/EventsItem.vue'

function fetchEventsList(store) {
  return store.dispatch('GET_EVENTS_LIST')
}

export default {
  name: 'EventsList',

  components: {
    EventsItem
  },

  props: ['department'],

  computed: {
    eventsListByDepartment() {
      let events_data = this.$store.state.events.list || [];
      let dep_events = []
      let count = 0;
      for (let i = 0; i < events_data.length; i++) {
        if(events_data[i].tags.includes(this.department.toUpperCase())){
          dep_events.push(events_data[i])
          count++;
          if (count === 3) {
            break;
          }
        }
      }

      return dep_events;
    }
  },

  beforeMount () {
    fetchEventsList(this.$store)
  }
}
</script>

<style lang="scss" scoped>
.card-holder {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
}
</style>
