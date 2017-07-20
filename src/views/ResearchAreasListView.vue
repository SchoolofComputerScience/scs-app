<template>
  <section class="research-areas">
    <h1>Top 40 Research Areas</h1>
    <div class="card-holder">
      <div v-for="area in topForty" class="research-area-card">
        <router-link :to="'/research/' + area.area_id">
          <h3>{{area.title}}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { router } from '../app'

function fetchData(store) {
  return store.dispatch('GET_RESEARCH_AREAS');
}

export default {
  name: 'research-areas-list-view',

  preFetch: fetchData,

  computed: {
    topForty(){
      let topForty = [];
      if (this.$store.state.researchAreas.list.length) {
        let list = this.$store.state.researchAreas.list;
        let sorted = _.sortBy(list, 'gs_count');
        sorted = sorted.reverse();

        for (let i = 0; i < 40; i++) {
          topForty.push(sorted[i]);
        }
      }

      return topForty;
    }
  },

  beforeMount () {
    fetchData(this.$store)
  }
}
</script>

<style lang="scss" scoped>
// h2 {
//   margin-bottom: 0.5em;
// }
//
// h3 {
//   background: #c41230;
//   color: #fff;
//   padding: 0.5em;
//   text-align: center;
// }
//
// p {
//   padding: 0.5em;
// }
//
// .search-input{
//   border: none;
//   border-left: .1em solid #C41230;
//   background: white;
//   font-size: 1.5em;
//   font-weight: 300;
//   padding-bottom: .4em;
//   margin-top: 1.6em;
//   outline: none;
//   padding: .5em .2em .5em 1.2em;
//   background: #efefef;
//   transition: border-left .1s, background .1s;
//   width: 100%;
//   margin-bottom: 1em;
//   &:focus{
//     border-left: .2em solid #C41230;
//     background: white;
//     padding-left: .4em
//   }
// }
//
// .tags{
//   font-size: .7em;
//   display: inline-block;
//   margin-right: .7em;
//   margin-bottom: .7em;
//   position: relative;
//   a{
//     border: 1px solid;
//     padding: .35em .6em;
//     text-decoration: none;
//     &:hover{
//       border: 1px solid;
//       background: #C41230;
//       color: white;
//     }
//   }
// }
//
// .card-holder {
//   display: flex;
//   flex-wrap: row;
//   flex-flow: wrap;
//   width: calc(100% + 2vw);
//   position: relative;
//   left: -1vw;
//   display: -webkit-flex;
//   display: flex;
//   -webkit-flex-wrap: wrap;
//   flex-wrap: wrap;
//   -webkit-flex-direction: row;
//   flex-direction: row;
//   p {
//     font-size: .8em;
//     em {
//       color: #C41230;
//     }
//   }
// }
//
// .research-area-card {
//   position: relative;
//   flex: 1 45%;
//   padding: 1vw;
//   transition: .4s all;
//   display: flex;
//   align-items: start;
//   justify-content: start;
//   position: relative;
//   z-index: 1;
//   max-width: 50%;
//   > a {
//     z-index: 9;
//     text-decoration: none;
//     width: 100%;
//     left: 0em;
//     top: 0em;
//     display: inline-block;
//     transition: .35s box-shadow, .35s top, .35s left;
//     position: relative;
//     background: white;
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
//     margin-bottom: 1em;
//   }
//   .content {
//     padding: 1.6em 2vw;
//     display: block;
//   }
//   &:hover{
//    > a {
//       top: -.1em;
//       left: -.1em;
//       transition: .2s box-shadow, .2s top, .2s left;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
//     }
//   }
// }
</style>
