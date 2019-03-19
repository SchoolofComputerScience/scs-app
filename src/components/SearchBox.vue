<template lang="pug">

section(class="search")
  div(class="search_bar")
    button(class="search", name="Search modal button") Search
    label(for="search_modal", class="label_hidden") Search
    input(type="text", id="search_modal", :placeholder="placeholder", v-model="query")
  section(v-if="autoSuggest", class="auto-suggest")
    div(v-for="result in search_results", :key="search_results.id")
      router-link(:to="result.link") {{result.display}}
        span(v-if="result.category")  in {{result.category}}
  section(v-if="!autoSuggest", class="results")
    section(v-if="search_results.length")
      h2 Results
      div(v-for="result in search_results", :key="search_results.id")
        router-link(:to="result.link") {{result.category}} - {{result.display}}

</template>

<script>
import Vue from 'vue'

export default {
  name: 'search-box',

  //Structure Of 'dataToSearch' Should Be: [ { id, display, link, category } ]
  props: [
    'dataToSearch',
    'placeholder',
    'autoSuggest',
    'resultLimit'
  ],

  data () {
    return {
      query: ''
    }
  },

  computed: {
    search_results() {
      let results = [];
      let search_term = this.query || '';
      let data = this.dataToSearch || '';
      let data_length = this.dataToSearch && this.dataToSearch.length;

      if (search_term.length) {
        for(let i = 0; i < data_length; i++) {
          if(data[i].display && data[i].display.toLowerCase().indexOf(search_term.toLowerCase()) > -1) {
            results.push(data[i]);
          }

          if(results.length >= (this.resultLimit || 5)) {
            break;
          }
        }
      }
      
      return results;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.auto-suggest {
  z-index: 10000;
  border: .2em solid $red;
}

</style>