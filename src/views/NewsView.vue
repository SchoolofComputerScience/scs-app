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

        NewsGrid(
          :news="news"
          :articlesToShow="articlesToShow"
          :moreArticles="moreArticles"
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
import NewsGrid from '../components/NewsGrid.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    NewsGrid,
    ModalExplore,
    ModalSearch,
  },
  data () {
    return {
      title: 'News from the School of Computer Science',
      page_title_label: 'News',
      header_class: 'pulled',
      articlesToShow: 9,
      featured: 'promoted',
      moreArticles: 6
    }
  },
  asyncData ({ store }) {
    return store.dispatch('GET_NEWS_LIST')
  },
  computed: {
    news() {
      return this.$store.state.news.list
    }
  }
}
</script>
