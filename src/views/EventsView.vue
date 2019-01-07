<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main
        section(class="page_title hidden_content")
          h1 Events

        EventsGrid(
          :events="events"
          :articlesToShow="articlesToShow"
          :moreArticles="moreArticles"
          :isSingle="isSingle"
          )
        //- section(class="page_blocks have_tags")

          //- div(class="page_block_container visible")


            EventsItem(
              class="card"
              v-for="(event, i) in events"
              :firsty="!i"
              :data="event"
              :key="event.uid"
            )

          button(
            class="button_show_more"
            v-if="events.length > 3"
          ) Show More

    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import NewHeader from '../components/NewHeader.vue';
import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';

import EventsGrid from '../components/EventsGrid.vue'
import { sortDataByDate } from '../filter/index';

export default {
  name: 'events-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    EventsGrid,
    ModalSearch,
  },
  data () {
    return {
      title: 'Events from the School of Computer Science',
      page_title_label: 'Events',
      header_class: 'pulled',
      articlesToShow: 9,
      moreArticles: 6,
      isSingle: false
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
      return this.$store.state.events.list;
    }
  },
  asyncData ({ store, route }) {
    return store.dispatch('GET_EVENTS_LIST');
  }
}
</script>
