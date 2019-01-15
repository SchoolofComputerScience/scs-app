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
          a(href="/news", class="button_back") back
          span(
            class="label_page_meta_title"
          ) department tag
        section(class="content_media")
          div(class="gutter-xl")
            div(class="col-1-2")
              h1 {{article.headline}}
              p(class="content_byline") Written by #[a(:href="`mailto:${newsContactInfo.email}`") {{newsContactInfo.display_name}}] on #[span {{dateFix(article.date)}}]
              h2(
                class="content_subtitle"
                v-if="article.subheading"
              ) {{article.subheading}}
            div(class="col-1-2")
              div(
                v-for="tag in article.tags"
                class="tags button-small"
                v-if="tag.name != ''"
                :key="tag.name"
                ) {{tag.name}}
              img(:src="article.image", :alt="article.image_alt")
          div(
            class="content_story"
            v-html="article.copy"
          )

        MixedGrid(
          :items="news"
          :minShow="articlesToShow"
          :numToAdd="moreArticles"
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
import format from 'date-fns/format';

export default {
  name: 'news-view',
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
      title: 'News - Single',
      page_title_label: 'News',
      header_class: 'pulled single',
      articlesToShow: 3,
      moreArticles: 3,
      isSingle: true
    }
  },
  asyncData ({ store, route }) {
    store.dispatch('GET_NEWS_ARTICLE', route.params.article);
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
    article(){
      let article = this.$route.params.article
      for (var id in this.$store.state.news.articles)
        if(id === article) return this.cleanHTML(this.$store.state.news.articles[id])
    },
    news() {
      let theArticle = this.$route.params.article;

      return this.$store.state.news.list.filter((article) => {
        return article.id !== theArticle;
      }).map((article, i) => {
        return {
          id: i,
          type: 'news',
          data: article
        };
      });
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
