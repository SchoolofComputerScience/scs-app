<template>
  <section class="content-page card">
    <h1>{{selected_research_area}}</h1>
    <section class="faculty-members" v-if="facultyInArea">
      <h2>Faculty Involved In {{selected_research_area}}</h2>
      <ul class="items">
        <DirectoryListItem  v-for="member in facultyInArea" :key="member.scid" :item="member"></DirectoryListItem>
      </ul>
    </section>
    <section v-if="has_news" class="research-news">
      <h2>Latest News Articles On {{selected_research_area}}</h2>
      <div class="card-holder">
        <div v-if="error" class="error-message">
          <p>{{error}}</p>
        </div>
        <div class="news-card" v-if="!error" v-for="news_item in news" :key="news_item.uid">
          <div>
            <router-link  :to="'/news/' + news_item.uid">
              <figure :style="{ 'background-image': 'url(' + news_item.image + ')' }"></figure>
              <div class="content">
                <h2>{{news_item.date | moment("dddd, MMMM Do YYYY")}}</h2>
                <h3>{{news_item.title}}</h3>
              </div>
            </router-link>
            <div class="tags" v-for="tag in news_item.tags">
              <router-link :to="tag.tag.toLowerCase()">{{tag.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import DirectoryListItem from '../components/DirectoryListItem.vue'
import { router } from '../app'

function fetchData(store) {
  store.dispatch('GET_DIRECTORY');
  return store.dispatch('GET_RESEARCH_AREAS').then(() => {
    let area_id = store.state.route.params.research_area || store.state.researchAreas.area_id
    if (area_id) {
      let research_area = store.state.researchAreas.list.find((area) => area.area_id === area_id);
      if (research_area) {
        store.dispatch('SEARCH_NEWS_ARTICLES', research_area.title);
        store.commit("SET_SELECTED_RESEARCH_AREA", { area_id: research_area.area_id, title: research_area.title });
      }
    }
  });
}

export default {
  name: 'research-areas-view',

  preFetch: fetchData,

  components: {
    DirectoryListItem,
  },

  data() {
    return {
      query: '',
      error: ''
    }
  },

  computed: {
    selected_research_area() {
      return this.$store.state.researchAreas.title;
    },
    research_areas() {
      return this.$store.state.researchAreas.list;
    },
    news() {
      return this.$store.state.news.list
    },
    has_news() {
      return this.$store.state.news.list.length > 0;
    },
    members() {
      return this.$store.state.directory.list;
    },
    facultyInArea() {
      let faculty = [];
      if (this.$store.state.researchAreas.list.length && this.$store.state.directory.list.length && this.$store.state.researchAreas.area_id) {
        let selected_area = this.$store.state.researchAreas.area_id;
        let research_area = this.$store.state.researchAreas.list.find((area) => area.area_id === selected_area);
        let directory = this.$store.state.directory.list;

        research_area.members.map(function(member){
          let research_member = _.find(directory, function(person){ return person.scid === member })
          if (research_member)
            faculty.push(research_member);
        });
      }

      if (faculty.length)
        return faculty;
      else
        return false;
    }
  },

  methods: {
    tagFilter: (tag) => {
      if(tag.includes('_')) {
        return '/directory/' + tag
      }else{
        return '/departments/' + tag.toLocaleLowerCase()
      }
    }
  },

  beforeMount () {
    fetchData(this.$store)
  }
}
</script>

<style lang="scss" scoped>
// h1 {
//   text-align: center;
//   font-size: 1.7em;
//   padding: 0.5em 0;
// }
//
// h2 {
//   margin-bottom: 0.5em;
// }
//
// .faculty-members, .research-news {
//   margin: 1em 0;
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
// .news-card {
//   position: relative;
//   background-position: center;
//   background-size: cover;
//   flex: 1 45%;
//   padding: 1vw;
//   transition: .4s all;
//   display: flex;
//   align-items: start;
//   justify-content: start;
//   position: relative;
//   z-index: 1;
//   max-width: 50%;
//   > div{
//     width: 100%;
//   }
//   > div > a {
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
//     > div > a {
//       top: -.1em;
//       left: -.1em;
//       transition: .2s box-shadow, .2s top, .2s left;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
//     }
//   }
//   aside {
//     display: block;
//     vertical-align: center;
//     border-top: 1px solid #C41230;
//   }
//   figure{
//     display: block;
//     background-position: center;
//     background-size: cover;
//     width: 100%;
//     height: 12em;
//     transition: .4s background;
//     padding-left: 0;
//   }
//   h2 {
//     font-size: .95em;
//     margin: 0;
//     border-bottom: 1px solid #C41230;
//     padding-bottom: .9em;
//     margin-top: .6em;
//     font-weight: 300;
//     position: relative;
//     &:after {
//       content: " ";
//       display: block;
//       width: 2em;
//       height: 2px;
//       position: absolute;
//       bottom: -2px;
//       background: rgb(196, 18, 48);
//     }
//   }
//   h3 {
//     font-size: 1.2em;
//     padding-top: .8em;
//     margin-bottom: .4em;
//     font-weight: 300;
//   }
//   p {
//     font-size: .85em;
//     margin-top: 1em;
//   }
// }
//
// .top-forty {
//   a {
//     display: inline-block;
//     width: 33%;
//     padding: 0.35em;
//   }
//
//   .selected {
//     background: #c41230;
//     color: white;
//     font-weight: 600;
//   }
// }
</style>
