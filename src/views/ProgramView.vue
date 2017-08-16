<template>
  <div class="program-view content-page card">
    <h1>{{program.program_name}}</h1>
    <p>{{program.description}} - <a :href="program.url" target="_blank">Learn More</a></p> 
    <section class="research-areas" v-if="researchAreas">
      <h2> Associated Research Areas</h2>
      <ul class="research-areas-list">
        <li v-for="(title, id) in researchAreas" :key="id">
          <router-link :to="'/research/' + id">{{title}}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { router } from '../app'

export default {
  name: 'program-view',

  computed: {
    program() {
      return this.$store.state.programs.selected;
    },

    researchAreas() {
      let areas = this.$store.state.programs.selected.areas;
      let final_list = {};

      if (areas) {
        areas.forEach(function(track){
          track.areas.forEach(function(area){
            if (!final_list[area.area_id]) {
              final_list[area.area_id] = area.title;
            }
          });
        });

        return final_list;
      }
      else {
        return false;
      }
    }
  },

  asyncData ({ store, route: { params: { program } }}) {
    return store.dispatch('GET_PROGRAM', program);
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/mixins.scss';

.research-areas {
  margin-top: 1em;

  h2 {
    text-align: center;
  }
}

.research-areas-list {
  line-height: 2.5;

  li {
    display: inline-block;
    text-align: center;
    width: 100%;
  }

  a {
    font-size: 1.25em;
    display: block;
  }
}

@include breakpoint-min(laptop) {
  .research-areas-list li {
    width: 33%;

    a {
      font-size: 1em;
    }
  }
}

</style>
