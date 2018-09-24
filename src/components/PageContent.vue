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
