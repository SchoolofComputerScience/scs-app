<template lang="pug">
div.page_block.news_item(
  :class="{promoted: firsty && !isSingle }"
  :style="{ 'background-image': 'url(' + article.image + ')' }"
)
  router-link(
    :to="'/news/single/' + article.id"
    class="link_absolute"
  ) {{article.headline}}
  div(class="page_block_labels")
    span(class="page_block_label") {{timeFix(article.date)}}
  div(class="page_block_content")
    span(
      class="page_block_title"
    ) {{article.headline}}
    span(
      class="page_block_subtitle"
      v-if="firsty && !isSingle"
    ) {{article.subheading}}
  div(class="page_block_tags")
    span robotics institute
</template>

<script>
import format from 'date-fns/format';
export default {

  name: 'news-article',
  props: {
    'firsty': true,
    'article': {},
    'isSingle': false
  },

  asyncData ({ store, route }) {
    return store.dispatch('GET_NEWS_ARTICLE', route.params.article);
    store.dispatch('GET_NEWS_LIST');
  },
  computed: {
    loaded() {
      if(this.$store.state.news.error.length > 0) {
        router.replace('/404');
      }
      let article = this.$route.params.article
      for (var id in this.$store.state.news.articles)
        if(id === article) return true
    },
    newsContactInfo() {
      return this.$store.state.news.newsContact;
    }
  },
  methods: {
    cleanHTML: function(data){
      return data
    },
    tagFilter: (tag) => {
      if(tag.includes('_')) {
        return '/directory/' + tag
      }else{
        return '/departments/' + tag.toLocaleLowerCase()
      }
    },
    timeFix (arg) {
      return format(arg, 'MMM DD')
    },
    dateFix (arg) {
      return format(arg, 'dddd, MMMM D, YYYY')
    }
  },
}
</script>
