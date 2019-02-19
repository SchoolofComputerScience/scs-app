<template>
  <section class="content-page card">
    <h1>Top Research Areas</h1>
    <div class="card-holder">
      <div v-for="item in fields" class="card card-section" :key="item.field">
        <router-link :to="'/research/' + item.field">
          <h3>{{item.field_text}}</h3>
          <p v-html="item.description"></p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { router } from '../app'

export default {
  name: 'research-fields-list-view',

  computed: {
    fields(){
      if (this.$store.state.researchFields.list.length) {
        return this.$store.state.researchFields.list;
      }
      else {
        return [];
      }
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_RESEARCH_FIELDS');
  }
}
</script>

<style lang="scss" scoped>
.card-section {
  a {
    color: #000;  

    &:hover {
      text-decoration: none;

      h3 {
        text-decoration: underline;
      }
    }
  }
}
</style>
