<template>
  <section class="research-area-view">
    <section class="top-forty">
      <h2>Top 40 Research Areas</h2>
      <a href="javascript:void(0);" v-for="area in topForty" v-on:click="searchArea" :area="area.title">{{area.title}}</a>
    </section>
    <section class="faculty-members" v-if="selected_research_area">
      <h2>Faculty Involved In {{selected_research_area}}</h2>
      <ul class="items"><DirectoryListItem  v-for="member in facultyInArea" :item="member"></DirectoryListItem></ul>
    </section>
    <section class="research-news">
      <h2>Latest News Articles On {{selected_research_area}}</h2>
      <div class="card-holder">
        <div v-if="error" class="error-message">
          <p>{{error}}</p>
        </div>
        <div class="card" v-if="!error" v-for="news_item in news" :key="news_item.uid">
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
import DepartmentFilter from '../components/DepartmentFilter.vue'
import { router } from '../app'

function fetchData(store) {
  if (store.state.researchAreas.area) {
    store.dispatch('SEARCH_NEWS_ARTICLES', store.state.researchAreas.area);
  }

  return store.dispatch('GET_DIRECTORY') && store.dispatch('GET_RESEARCH_AREAS');
}

export default {
  name: 'research-areas-view',

  preFetch: fetchData,

  components: {
    DirectoryListItem,
    DepartmentFilter
  },

  data() {
    return {
      query: '',
      error: ''
    }
  },

  computed: {
    selected_research_area() {
      return this.$store.state.researchAreas.area;
    },
    research_areas() {
      return this.$store.state.researchAreas.list;
    },
    news() {
      return this.$store.state.news.list
    },
    members() {
      return this.$store.state.directory.list;
    },
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
    },
    facultyInArea() {
      let faculty = [];
      if (this.$store.state.researchAreas.list.length && this.$store.state.directory.list.length && this.$store.state.researchAreas.area) {
        let selected_area = this.$store.state.researchAreas.area;
        let research_area = this.$store.state.researchAreas.list.find((area) => area.title === selected_area);
        let directory = this.$store.state.directory.list;

        research_area.members.map(function(member){
          let research_member = _.find(directory, function(person){ return person.scid === member })
          if (research_member)
            faculty.push(research_member);
        });
      }

      return faculty;
    }
  },

  methods: {
    tagFilter: (tag) => {
      if(tag.includes('_')) {
        return '/directory/' + tag
      }else{
        return '/departments/' + tag.toLocaleLowerCase()
      }
    },
    searchArea: function(event) {
      let area = event.target.getAttribute('area');
      let all_areas = event.target.parentElement.children;
      
      for(let i = 0, all_areas_length = all_areas.length; i < all_areas_length; i++) {
        all_areas[i].classList.remove('selected');
      }

      event.target.classList.add('selected');
      this.query = area;
      this.$store.commit("SET_SELECTED_RESEARCH_AREA", area); 
      this.$store.dispatch('SEARCH_NEWS_ARTICLES', area);
    }
  },

  beforeMount () {
    fetchData(this.$store)
  }
}
</script>

<style lang="stylus" scoped>
h2 {
  margin-bottom: 0.5em;
}

.faculty-members, .research-news {
  margin: 1em 0;
}

.search-input{
  border: none;
  border-left: .1em solid #C41230;
  background: white;
  font-size: 1.5em;
  font-weight: 300;
  padding-bottom: .4em;
  margin-top: 1.6em;
  outline: none;
  padding: .5em .2em .5em 1.2em;
  background: #efefef;
  transition: border-left .1s, background .1s;
  width: 100%;
  margin-bottom: 1em;
  &:focus{
    border-left: .2em solid #C41230;
    background: white;
    padding-left: .4em
  }
}

.tags{
  font-size: .7em;
  display: inline-block;
  margin-right: .7em;
  margin-bottom: .7em;
  position: relative;
  a{
    border: 1px solid;
    padding: .35em .6em;
    text-decoration: none;
    &:hover{
      border: 1px solid;
      background: #C41230;
      color: white;
    }
  }
}

.card-holder {
  display: flex;
  flex-wrap: row;
  flex-flow: wrap;
  width: calc(100% + 2vw);
  position: relative;
  left: -1vw;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-flex-direction: row;
  flex-direction: row;
  p {
    font-size: .8em;
    em {
      color: #C41230;
    }
  }
}

.card {
  position: relative;
  background-position: center;
  background-size: cover;
  flex: 1 45%;
  padding: 1vw;
  transition: .4s all;
  display: flex;
  align-items: start;
  justify-content: start;
  position: relative;
  z-index: 1;
  max-width: 50%;
  > div{
    width: 100%;
  }
  > div > a {
    z-index: 9;
    text-decoration: none;
    width: 100%;
    left: 0em;
    top: 0em;
    display: inline-block;
    transition: .35s box-shadow, .35s top, .35s left;
    position: relative;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    margin-bottom: 1em;
  }
  .content {
    padding: 1.6em 2vw;
    display: block;
  }
  &:hover{
    > div > a {
      top: -.1em;
      left: -.1em;
      transition: .2s box-shadow, .2s top, .2s left;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
  aside {
    display: block;
    vertical-align: center;
    border-top: 1px solid #C41230;
  }
  figure{
    display: block;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 12em;
    transition: .4s background;
    padding-left: 0;
  }
  h2 {
    font-size: .95em;
    margin: 0;
    border-bottom: 1px solid #C41230;
    padding-bottom: .9em;
    margin-top: .6em;
    font-weight: 300;
    position: relative;
    &:after {
      content: " ";
      display: block;
      width: 2em;
      height: 2px;
      position: absolute;
      bottom: -2px;
      background: rgb(196, 18, 48);
    }
  }
  h3 {
    font-size: 1.2em;
    padding-top: .8em;
    margin-bottom: .4em;
    font-weight: 300;
  }
  p {
    font-size: .85em;
    margin-top: 1em;
  }
}

.top-forty {
  a {
    display: inline-block;
    width: 33%;
    padding: 0.35em;
  }

  .selected {
    background: #c41230;
    color: white;
    font-weight: 600;
  }
}
</style>
