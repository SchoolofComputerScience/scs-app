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
          if (count === 12) {
            break;
          }
        }
      }

      return filtered;
    }
  }
}
</script>

<style lang="stylus" scoped>
.card {
  position: relative;
  flex: 1 30%;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
  display: block;
  transition: none;
  border: 1px solid #eee;
  height: 128px;
  max-width: 31%;
  @media screen and (max-width: 1520px) {
    height: 110px;
  }
  p.name {
    font-weight: 900;
    border-bottom: 1px solid #eee;
    font-size: 1em;
    text-transform: capitalize;
    color: #C41230;
    padding-bottom: .2em;
    padding-top: .35em;
  }
  p.title {
    font-size: .9em;
    font-weight: 400;
    span {
      font-weight: 900;
      text-transform: uppercase;
    }
  }
  span.department {
    font-weight: 900;
    text-transform: uppercase;
  }
  a {
    text-decoration: none;
    color: #131313;
  }
  &:hover {
    background: white;
    box-shadow: none;
    transition: none;
    border: 1px solid #bbb;
  }
  p {
    margin-bottom: .4em;
    margin-top: 0;
    text-transform: capitalize;
  }
  p.room {
    font-size: .7em;
    text-transform: uppercase;
    font-weight: 300;
  }
}
</style>
