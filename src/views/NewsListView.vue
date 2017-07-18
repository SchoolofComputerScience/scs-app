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

<style lang="stylus" scoped>
.page{
  display: block;
}
.error-message{
  font-size: 1.6em;
  margin: 1em;
}

.search {
  @media only screen and (max-width: 768px) {
    padding: 0 1em;
  }
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

.tags{
  font-size: .7em;
  display: inline-block;
  margin-right: .7em;
  margin-bottom: .7em;
  position: relative;
  a{
    border: 1px solid;
    padding: .35em .6em;
    text-decoration: none;
    &:hover{
      border: 1px solid;
      background: #C41230;
      color: white;
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: .9em;
    margin-bottom: 1.4em;
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

  @media only screen and (max-width: 768px) {
    display: block;
    width: 100%;
    left: 0;
    padding: 1em;
  }

}
.card {
  position: relative;
  background-position: center;
  background-size: cover;
  flex: 1 45%;
  padding: 1vw;
  transition: .4s all;
  display: flex;
  align-items: start;
  justify-content: start;
  position: relative;
  z-index: 1;
  max-width: 50%;
  > div{
    width: 100%;
  }
  > div > a {
    z-index: 9;
    text-decoration: none;
    width: 100%;
    left: 0em;
    top: 0em;
    display: inline-block;
    transition: .35s box-shadow, .35s top, .35s left;
    position: relative;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    margin-bottom: 1em;
  }
  .content {
    padding: 1.6em 2vw;
    display: block;
  }
  &:hover{
    > div > a {
      top: -.1em;
      left: -.1em;
      transition: .2s box-shadow, .2s top, .2s left;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
  &:active{
    > div > a {
      top: 0em;
      left: 0em;
      transition: 0s box-shadow, 0s top, 0s left;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    }
  }
  aside {
    display: block;
    vertical-align: center;
    border-top: 1px solid #C41230;
  }
  figure{
    display: block;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 12em;
    transition: .4s background;
    padding-left: 0;
  }
  h2 {
    font-size: .95em;
    margin: 0;
    border-bottom: 1px solid #C41230;
    padding-bottom: .9em;
    margin-top: .6em;
    font-weight: 300;
    position: relative;
    &:after {
      content: " ";
      display: block;
      width: 2em;
      height: 2px;
      position: absolute;
      bottom: -2px;
      background: rgb(196, 18, 48);
    }
  }
  h3 {
    font-size: 1.2em;
    padding-top: .8em;
    margin-bottom: .4em;
    font-weight: 300;
  }
  p {
    font-size: .85em;
    margin-top: 1em;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 100%;
    margin-bottom: 3em;
  }
}
</style>
