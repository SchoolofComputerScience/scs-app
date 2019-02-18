<template>
  <div class="card content-page">
    <page-content class="page-body"></page-content>
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
  }
}
</script>
