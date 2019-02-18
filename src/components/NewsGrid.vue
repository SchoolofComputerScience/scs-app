<template lang="pug">
section(class="page_blocks have_tags")

  h2(v-if="isSingle") related

  div(class="page_block_container visible")

    ArticleItem(
      v-for="article, i in news"
      v-if="i <= articlesToShow"
      :firsty="!i"
      :articlesToShow="articlesToShow"
      :item="article"
      :key="article.id"
      :isSingle="isSingle"
      )

  button(
    class="button_show_more"
    v-on:click="articlesToShow += moreArticles"
  ) Show More
</template>

<script>

import ArticleItem from '../components/NewsArticle.vue';

export default {
  name: 'newsGrid-view',
  components: {
    ArticleItem
  },
  props: [
    'news',
    'articlesToShow',
    'moreArticles',
    'isSingle'
  ]
}
</script>
