<template>
  <section>
    <div class="news-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <section class="page">
          <form class="search" v-on:submit.prevent>
            <input class="search-input" v-model="query" placeholder="Search Articles" @keyup.enter="searchNews" name="query" autocomplete="off">
          </form>
          <div class="card-holder">
            <div v-if="error" class="error-message">
              <p>{{error}}</p>
            </div>
            <NewsItem v-if="!error" v-for="list in news" :key="list.uid" :data="list"></NewsItem>
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

function fetchNewsList(store) {
  return store.dispatch('GET_NEWS_LIST')
}

export default {
  name: 'news-list-view',

  preFetch: fetchNewsList,

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

  computed: {
    loaded() {
      if(this.$store.state.news.error.length > 0){
        this.error = this.$store.state.news.error
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

  },

  beforeMount () {
    fetchNewsList(this.$store)
  }
}
</script>

<style lang="scss" scoped>
.page{
  display: block;
}
.error-message{
  font-size: 1.6em;
  margin: 1em;
}
.search-input{
  border: none;
  border-left: .1em solid #C41230;
  background: white;
  font-size: 1.5em;
  font-weight: 300;
  padding-bottom: .4em;
  margin-top: 1.6em;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: #efefef;
  transition: border-left .1s, background .1s;
  width: 100%;
  margin-bottom: 1em;
  &:focus{
    border-left: .2em solid #C41230;
    background: white;
    padding-left: .4em
  }
}

.card-holder {
  display: flex;
  flex-wrap: row;
  flex-flow: wrap;
  width: calc(100% + 2vw);
  position: relative;
  left: -1vw;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-flex-direction: row;
  flex-direction: row;
  p {
    font-size: .8em;
    em {
      color: #C41230;
    }
  }
}
</style>
