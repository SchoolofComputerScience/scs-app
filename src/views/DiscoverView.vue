<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader
    main
      div(class="container")
        section(class="page_title large")
          h1 Discover
        section(class="statement")
          div(class="gutter-xl flex")
            div(class="col-5-7")
              p Carnegie Mellon's School of Computer Science is widely recognized as one of the first and best computer science programs in the world. Our programs train the next generation of innovators to solve real-world problems and improve the way people live and work.
            div(class="col-2-7")
              a(class="link_more") more

      section(class="contrast_bar")
        div(class="container")
          div(class="gutter-xl")
            div(class="col-2-3")
              div(class="search_bar dark")
                button(class="search", name="Search inline button") Search
                label(for="search_inline")
                input(type="text", id="search_inline", placeholder="Search the School of Computer Science", title="Search this website")
            div(class="col-1-3")
              p(class="micro") Not sure where to look?
              a(class="link_explore") Explore the CMU School<br> of Computer Science
      .container
        MixedGrid(
          :items="newsAndEvents"
          :title= "false"
          :isSingle="false"
          :minShow="7"
          :numToAdd="3"
        )

      DepartmentGrid

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
import MixedGrid from '../components/MixedGrid.vue';
import DepartmentGrid from '../components/DepartmentGrid.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    MixedGrid,
    DepartmentGrid
  },
  data () {
    return {
      title: 'Discover',
      page_title_link: false,
    }
  },
  computed: {
    newsAndEvents: function () {
      // FIXME: just sampling/shuffling to show variety of neighbors, need
      // to figure out how these are to be combined....

      let news = _.sampleSize((this.$store.state.news.list || []).map((data) => {
        return {
          type: 'news',
          data: data
        };
      }), 6);

      let events = _.sampleSize((this.$store.state.events.list || []).map((data) => {
        return {
          type: 'event',
          data: data
        };
      }), 6);

      return _.shuffle(
        news.concat(events)
      ).map((item, i) => {
        return item.id = i, item;
      });
    }
  },
  asyncData ({ store, route: { params: { department, pubid, scid }}} ) {
    store.dispatch('GET_EVENTS_LIST');
    store.dispatch('GET_NEWS_LIST');
  }
}
</script>
