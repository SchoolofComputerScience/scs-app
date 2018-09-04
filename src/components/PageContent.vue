<template>
  <div class="content" :class="pageId">
    <spinner class="spinner" v-if="!content" key="spinner"></spinner>
    <div class="content-body" v-if="content" key="content" v-html="content"></div>
  </div>
</template>

<script>
import marked from 'marked'
import Spinner from './Spinner.vue'

export default {
  name: 'page-content',

  props: ['metadata'],

  components: {
    Spinner
  },

  computed: {
    content(){
      marked.setOptions({
        gfm: true,
        tables: true,
        smartLists: true
      })
      if(this.$store.state.pages.pages[this.$route.params.page] !== undefined){
        const metadataDelimiter = '---'
        const metadataPosition = this.$store.state.pages.pages[this.$route.params.page].indexOf(metadataDelimiter)
        return marked(this.$store.state.pages.pages[this.$route.params.page].slice(metadataPosition + metadataDelimiter.length))
      }
    },
    pageId(){
      return this.$route.params.page
    }
  }
}
</script>

<style lang="scss">
img {
  width: 100%
}

.content-title a {
  transition: color .3s ease;
  &:hover{
    text-decoration: none;
  }
}

.content-meta {
  margin-top: .5em;
  margin-bottom: 0;
}

.content-body h1 {
  font-weight: bold;
  background: #eee;
  margin: -2rem -1.5rem 1rem -1.5rem;
  padding: 3rem 1.5rem 1.5rem 1.5rem;
}

input {
  margin-bottom: 1rem;
}

.tbl {
  width: 100%;
  border: 1px solid #000;
  margin-bottom: 1rem;

  td {
    padding: 0.5rem;
    border: 1px solid #000;
  }

  tr:nth-child(2n + 1) {
    background: #efefef;
  }
}
</style>
