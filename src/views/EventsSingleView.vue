<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main
        section(class="page_meta")
          a(href="/events", class="button_back") back
          span(class="label_page_meta_title") department name
        section(class="content_media")
          h1 {{event.name}}
          div(class="gutter-xl")
            div(class="col-3-5")
              div(class="emphasized")
                h2 {{event.speakerName}}
                p(
                  v-if="event.description"
                  ) {{event.description}}
            div(class="col-2-5")
              div(class="content_page_block")
                div(class="page_block_date")
                  span(class="page_block_date_month") {{eventDate.month}}
                  span(class="page_block_date_day") {{eventDate.day}}
                div(class="page_block_details")
                  p #[span Time:] {{timeFix(event.start_date)}}
                  p #[span Location:] {{event.building.toUpperCase() | buildingTranslate}} {{event.room}}

        EventsGrid(
          :events="events"
          :articlesToShow="articlesToShow"
          :moreArticles="moreArticles"
          :isSingle="isSingle"
          )

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
import format from 'date-fns/format';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    EventsGrid
  },
  data () {
    return {
      title: 'Events from the School of Computer Science',
      page_title_label: 'Events',
      header_class: 'pulled single',
      articlesToShow: 2,
      moreArticles: 3,
      isSingle: true
    }
  },
  computed: {
    loaded() {
      let event = this.$route.params.event
      for (var id in this.$store.state.events.event)
        if(id === event) return true
    },
    events() {
      let theEvent = this.$route.params.event
      return this.$store.state.events.list.filter((event) => {
        return event.id !== theEvent;
      });
    },
    event(){
      let event = this.$route.params.event
      for (var id in this.$store.state.events.event)
        if(id === event) return this.$store.state.events.event[id]
    },
    eventDate(){
      const dateObject = {
        month: format(this.event.start_date, 'MMM'),
        day: format(this.event.start_date, 'DD'),
        year: format(this.event.start_date, 'YYYY')
      };
      return dateObject;
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
    store.dispatch('GET_EVENT', route.params.event)
    store.dispatch('GET_EVENTS_LIST');
  }
}
</script>
