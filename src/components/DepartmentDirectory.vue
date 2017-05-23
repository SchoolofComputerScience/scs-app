<template>
  <ul class="directory">
    <DirectoryListItem v-for="person in topten" :item="person" :key="person._id"></DirectoryListItem>
  </ul>
</template>

<script>
import Vue from 'vue'
import DirectoryListItem from '../components/DirectoryListItem.vue'


function fetchDirectory(store) {
  store.dispatch('GET_DIRECTORY', store.state.route.params.department);
}

export default {
  name: 'department-directory',

  preFetch: fetchDirectory,

  components: {
    DirectoryListItem
  },

  beforeMount () {
    fetchDirectory(this.$store);
  },

  computed: {
    topten() {
      let filtered = [];
      let count = 0;
      let departmentFilter = this.$store.state.route.params.department;
      for (var i = 0; i < this.$store.state.directory.list.length; i++) {
        if(this.$store.state.directory.list[i].departments.includes(departmentFilter) || !departmentFilter){
          filtered.push(this.$store.state.directory.list[i])
          count++;

          if (count === 10) {
            break;
          }
        }
      }

      return filtered;
    }
  }
}
</script>