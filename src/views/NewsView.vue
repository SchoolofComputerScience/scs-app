<template>
  <section class="content-page card">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div class="news-view" >
      <transition name="fade" mode="out-in" v-if="loaded">
        <div>
          <figure class="news-header" :style="{ 'background-image': 'url(' + article.image + ')' }">
            <div class="tags">
              <router-link
                v-for="tag in article.tags"
                class="tags button-small"
                v-if="tag.name != ''"
                :key="tag.name"
                :to="tag.tag.toLowerCase()">{{tag.name}}</router-link>
            </div>
          </figure>
          <div class="content-container">
            <h1>{{article.title}}</h1>
            <h2>{{dateFix(article.date)}}</h2>
            <article v-html="article.body" class="body"></article>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'
import format from 'date-fns/format'

export default {
  name: 'NewsItem',
  props: ['data'],
  methods: {
    timeFix (arg) {
      return format(arg, 'dddd, MMMM D, YYYY')
    }
  }
}

function fetchNews(store) {
  return store.dispatch('GET_NEWS_ARTICLE', store.state.route.params.article)
}

export default {
  name: 'news-view',

  preFetch: fetchNews,

  components: {
    Spinner
  },

  computed: {
    loaded() {
      let article = this.$route.params.article
      for (var uid in this.$store.state.news.articles)
        if(uid === article) return true
    },
    article(){
      let article = this.$route.params.article
      for (var uid in this.$store.state.news.articles)
        if(uid === article) return this.cleanHTML(this.$store.state.news.articles[uid])
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

    dateFix (arg) {
      return format(arg, 'MMMM Do YYYY')
    }
  },

  beforeMount () {
    fetchNews(this.$store)
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.tags{
  margin-bottom: $base-line-height / 4;
}
.news-header {
  min-height: $base-line-height * 12;
  left: -$base-line-height * 2;
  top: -$base-line-height * 2;
  margin-bottom: $base-line-height;
  background-size: cover;
  background-position: center;
  width: calc(100% + #{$base-line-height} * 4);
  margin: 0;
  position: relative;
  display: flex;
  padding-left: $base-line-height * 2;
  align-items: flex-end;
  @include breakpoint-max(desktop) {
    left: -$base-line-height;
    top: -$base-line-height;
    padding-left: $base-line-height;
    width: calc(100% + #{$base-line-height} * 2);
  }
  @include breakpoint-max(tablet){
    min-height: $base-line-height * 8;
  }
}

</style>
