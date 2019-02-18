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
          h1 News

        MixedGrid(
          :items="news"
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
import MixedGrid from '../components/MixedGrid.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    MixedGrid,
    ModalExplore,
    ModalSearch,
  },
  data () {
    return {
      title: 'News from the School of Computer Science',
      page_title_label: 'News',
      header_class: 'pulled',
      featured: 'promoted',
      minShow: 10,
      numToAdd: 6,
      isSingle: false
    }
  },
  asyncData ({ store }) {
    return store.dispatch('GET_NEWS_LIST')
  },
  computed: {
    news() {
      return this.$store.state.news.list.map((article, i) => {
        return {
          id: i,
          type: 'news',
          data: article
        };
      });
    }
  }
}
</script>
