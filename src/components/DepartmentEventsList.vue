<template>
  <section class="data-page">
    <h2 class="pb-0 mt-2 mb-0" v-if="eventsListByDepartment.length">Upcoming Events</h2>
    <div class="card-holder">
      <EventsItem v-for="list in eventsListByDepartment" :data="list" :key="eventsListByDepartment.uid" :compact="compact"></EventsItem>
    </div>
  </section>
</template>

<script>
  import { router } from '../app'
  import EventsItem from '../components/EventsItem.vue'
  import { sortDataByDate } from '../filter/index';

  function fetchEventsList(store) {
    return store.dispatch('GET_EVENTS_LIST')
  }

  export default {
    name: 'EventsList',

    components: {
      EventsItem
    },

    props: {
      department:{},
      compact: {
        type: Boolean,
        default: false
      }
    },

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

        //TODO: TEMPORARY -- Sorting will be done on backend
        return sortDataByDate(dep_events, 'startDate');
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
