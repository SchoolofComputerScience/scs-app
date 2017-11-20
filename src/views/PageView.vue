<template>
  <div class="card content-page">
    <page-content class="page-body" :metadata="page"></page-content>
  </div>
</template>

<script>
import PageContent from '../components/PageContent.vue'
import { router } from '../app'

export default {
  name: 'page-view',

  components: {
    PageContent
  },

  asyncData ({ store, route }) {
    return store.dispatch('FETCH_PAGE', route.params.page);
  },

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
  }
}
</script>
