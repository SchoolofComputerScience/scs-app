<template>
  <ul class="directory">
    <li v-for="person in directory" class="card">
      <router-link :to="'/directory/' + person.scid">
        <div class="image" :style="{ 'background-image': 'url(' + person.image_url + ')' }"></div>
        <p class="name">{{ person.display_name }}</p>
        <p class="title">{{person.position}}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import DirectoryListItem from '../components/DirectoryListItem.vue'

export default {
  name: 'department-directory',

  components: {
    DirectoryListItem
  },

  asyncData ({ store, route: { params: { department }}} ) {
    return store.dispatch('GET_DIRECTORY', { department });
  },

  computed: {
    directory() {
      let filtered = [];
      let departmentFilter = this.$store.state.route.params.department;
      let random_indexes = [];
      let directory_length = this.$store.state.directory.list.length;
      let maxCount = 12;

      if (directory_length > 0 && !filtered.length) {
        for(let i = 0; i <= directory_length * 2; i++) {
          if (filtered.length === maxCount) {
            break;
          }

          let rand_num = Math.floor(Math.random() * (directory_length - 1));
          let person = this.$store.state.directory.list[rand_num];

          if (person.scs_relationship_class !== 'faculty' || !person.image_url || random_indexes.includes(rand_num)) {
            continue;
          }

          if(person.departments.includes(departmentFilter) || !departmentFilter) {
            filtered.push(person);
            random_indexes.push(rand_num);
          }
        }
      }
      return filtered;
    }
  }
}
</script>

<style lang="scss" scoped>
// .card {
//   position: relative;
//   flex: 1 30%;
//   justify-content: space-between;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   display: block;
//   transition: none;
//   max-width: 31%;
//   &:hover{
//     border: 0;
//   }
//   a {
//     display: block;
//     text-align: center;
//   }
//
//   p.name {
//     font-weight: 900;
//     font-size: 1em;
//     text-transform: capitalize;
//     color: #C41230;
//     padding-bottom: .2em;
//     padding-top: .35em;
//     text-align: center;
//   }
//   p.title {
//     font-size: .9em;
//     font-weight: 400;
//     text-align: center;
//     span {
//       font-weight: 900;
//       text-transform: uppercase;
//     }
//   }
//   span.department {
//     font-weight: 900;
//     text-transform: uppercase;
//   }
//   a {
//     text-decoration: none;
//     color: #131313;
//   }
//   &:hover {
//     background: white;
//     box-shadow: none;
//     transition: none;
//   }
//   p {
//     margin-bottom: 0em;
//     margin-top: 0;
//     text-transform: capitalize;
//     padding: 0;
//   }
//   p.room {
//     font-size: .7em;
//     text-transform: uppercase;
//     font-weight: 300;
//   }
//   .image {
//     width: 15em;
//     height: 15em;
//     background-size: cover;
//     display: inline-block;
//     text-align: center;
//   }
// }
//
// @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
//   .card {
//     position: relative;
//     flex: 1;
//     justify-content: space-between;
//     margin-top: 15px;
//     margin-bottom: 15px;
//     display: block;
//     transition: none;
//     max-width: 100%;
//   }
// }

</style>
