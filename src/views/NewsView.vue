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
        section(class="page_blocks have_tags")
          div(class="page_block_container visible")
                   
          
            div.page_block.news_item(
              v-for="article, i in news"
              v-if="i <= articlesToShow"
              v-bind:class="{promoted : !i }"
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
                  v-if="!i"
                ) {{article.subheading}}
              div(class="page_block_tags")
                span robotics institute          

          button(
            class="button_show_more"
            v-on:click="articlesToShow += 6"
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
import format from 'date-fns/format';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
  },
  data () {
    return {
      title: 'News from the School of Computer Science',
      page_title_label: 'News',
      header_class: 'pulled',
      articlesToShow: 9
    }
  },
  asyncData ({ store }) {
    return store.dispatch('GET_NEWS_LIST')
  },
  computed: {
    loaded() {
      if(this.$store.state.news.error.length > 0){
        this.error = this.$store.state.news.error
        router.replace('/404');
      }else{
        this.error = false;
      }
      return this.$store.state.news.list.length > 0 ? true : false
    },
    news() {
      return this.$store.state.news.list
    },
  },

  methods: {
    searchNews: _.debounce(function(){
      this.$store.dispatch('SEARCH_NEWS_ARTICLES', this.query)
    }, 500),
    timeFix (arg) {
      return format(arg, 'MMM DD')
    },
    tagFilter: (tag) => {
      if(tag.includes('_')) {
        return '/directory/' + tag
      }else{
        return '/departments/' + tag.toLocaleLowerCase()
      }
    }
  }
  
  
  
}
</script>
