<template>
  <div>
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
          if (count === 4) {
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
.courses-view {
  margin-top: 1em;
}

.card-holder {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  left: -1vw;
  margin-top: 1em;
  h1{
    font-size: 1em;
    a{
      text-decoration: none;
    }
  }
  p{
    font-size: .8em;
    em{
      color: #C41230;
    }
  }
}

.course-link {
  padding: .1em .8em;
  margin-right: .5em;
  background: #c41230;
  color: white;
  font-weight: 900;
  text-decoration: none;
  display: inline-block;
  width: 3.5em;
  text-align: center;
  border: 2px solid;
  margin-bottom: .2em;
  &:hover {
    background: white;
    color: #c41230;
    text-decoration: none;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex: 1 50%;
    @media screen and (max-width: 768px) {
      flex: none;
      width: 100%;
    }
  }
}

h1 {
  margin-top: 3.2em;
  margin-bottom: .2em;
}

h2 {
  margin-top: 1em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #000;
}

h3 {
  top: 2.2em;
  position: sticky;
  margin-top: 1.85em;
  padding-top: .8em;
  padding-bottom: .8em;
  font-weight: 400;
  border-bottom: 1px solid #eee;
  background: white;
  z-index: 20;
}

#lti {
  border-bottom: 4px solid #3bb422;
}

#hci {
  border-bottom: 4px solid #b49b22;
}

#ri {
  border-bottom: 4px solid #9b22b4;
}

#cs {
  border-bottom: 4px solid #22b49b;
}

#mlg {
  border-bottom: 4px solid #b42284;
}

#isr {
  border-bottom: 4px solid #165574;
}

#rob {
  border-bottom: 4px solid #3bb422;
}

#cb {
  border-bottom: 4px solid #b45222;
}

#scs {
  border-bottom: 4px solid #c41230;
}

#etc {
  border-bottom: 4px solid #2c3e50;
}

#se {
  border-bottom: 4px solid #165574;
}

h4 {
  margin-bottom: .2em;
  margin-top: 1.6em;
  > span {
    font-weight: 300;
  }
  > em {
    font-weight: 900;
    font-size: .6em;
    background: #fff;
    padding: .2em .5em;
    font-style: normal;
    display: inline-block;
    border-left: 2px solid white;
    position: relative;
    margin-right: .8em;
    left: 2px;
    top: -.2em;
    &.levelU {
      color: #222;
      border: 1px solid;
    }
    &.levelG {
      background: #666;
      color: white;
      border: 1px solid #666;
    }
  }

}
</style>
