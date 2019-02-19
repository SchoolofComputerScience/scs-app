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

        MixedGrid(
          :items="events"
          :minShow="minShow"
          :numToAdd="numToAdd"
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

import MixedGrid from '../components/MixedGrid.vue'
import { sortDataByDate } from '../filter/index';

export default {
  name: 'events-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    MixedGrid,
    ModalSearch,
  },
  data () {
    return {
      title: 'Events from the School of Computer Science',
      page_title_label: 'Events',
      header_class: 'pulled',
      minShow: 10,
      numToAdd: 6,
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
      return this.$store.state.events.list.map((data, i) => {
        return {
          id: i,
          type: 'event',
          data: data
        };
      });
    }
  },
  asyncData ({ store, route }) {
    return store.dispatch('GET_EVENTS_LIST');
  }
}
</script>
