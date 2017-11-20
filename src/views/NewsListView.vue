<template>
  <section class="data-page">
    <div class="news-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <section class="page">
          <form class="search" v-on:submit.prevent>
            <input class="news-search" v-model="query" placeholder="Search Articles" @keyup.enter="searchNews" name="query" autocomplete="off">
          </form>
          <div class="card-holder">
            <div v-if="error" class="error-message">
              <p>{{error}}</p>
            </div>
            <NewsItem v-if="!error" v-for="list in news" :key="list.uid" :data="list" :show_tags="true"></NewsItem>
          </div>
        </section>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import NewsItem from '../components/NewsItem.vue'
import _ from 'lodash'
import { router } from '../app'

export default {
  name: 'news-list-view',

  components: {
    Spinner,
    NewsItem
  },

  data () {
    return {
      query: '',
      error: ''
    }
  },

  watch: {
    query: function () {
      this.searchNews()
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

<style lang="scss" scoped>
@import '../assets/scss/vars';

.page{
  display: block;
}

.error-message{
  margin: $base-line-height 0;
}

.news-search{
  border: none;
  border-left: .1em solid $red;
  background: white;
  font-size: 1.5em;
  font-weight: 300;
  margin-top: $base-line-height / 2;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: white;
  transition: border-left .1s, background .1s;
  width: 100%;
  &:focus{
    border-left: .2em solid $red;
    background: white;
    padding-left: .4em
  }
}

.news-search::placeholder{
  font-weight: 300;
  color: #aaa;
  font-style: italic;
}

.card-holder {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

</style>
