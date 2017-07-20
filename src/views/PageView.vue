<template>
  <transition name="fade" mode="out-in" appear>
    <div class="page content-container">
      <page-content class="page-body" :metadata="page"></page-content>
    </div>
  </transition>
</template>

<script>
import PageContent from '../components/PageContent.vue'
import { router } from '../app'

function fetchPage(store) {
  return store.dispatch('FETCH_PAGE', store.state.route.params.page)
}

export default {
  name: 'page-view',

  components: {
    PageContent
  },

  preFetch: fetchPage,

  computed: {
    page () {
      const pages = this.$store.getters.navigation
      for (var i = 0; i < pages.length; i++) {
        if (pages[i].slug === this.$route.params.page) {
          return pages[i]
        }
      }
      return { markdown: '', slug: '', title: '' }
    }
  },

  created () {
    this.$store.dispatch('documentTitle', this.page.title)
  },

  beforeMount () {
    fetchPage(this.$store)
  }
}
</script>

<style lang="scss" scoped>
  // .page-body {
  //   @media only screen and (max-width: 768px) {
  //     margin: 1em;
  //   }
  // }
</style>
