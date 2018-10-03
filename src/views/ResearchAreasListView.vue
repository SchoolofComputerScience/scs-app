<template>
  <section class="content-page card">
    <h1>Top Research Areas</h1>
    <div class="card-holder">
      <div v-for="area in topForty" class="card card-section" :key="area.area_id">
        <router-link :to="'/research/' + area.area_id">
          <h3>{{area.title}}</h3>
          <p v-html="area.description"></p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { router } from '../app'

export default {
  name: 'research-areas-list-view',

  computed: {
    topForty(){
      let topAreas = [];
      if (this.$store.state.researchAreas.list.length) {
        let list = this.$store.state.researchAreas.list;
        let sorted = _.sortBy(list, 'gs_count');
        sorted = sorted.reverse();

        for (let i = 0; i < 25; i++) {
          topAreas.push(sorted[i]);
        }
      }

      return topAreas;
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_RESEARCH_AREAS');
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
