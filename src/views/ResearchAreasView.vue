<template>
  <section class="content-page card">
    <h1>{{selected_research_area}}</h1>
    <section class="area-section" v-if="facultyInArea">
      <h2>Programs That Include {{selected_research_area}}</h2>
      <ul class="items">
        <li v-for="program in programs" :key="program.program_id">{{program.program_name}}</li>
      </ul>
    </section>
    <section class="faculty-members area-section" v-if="facultyInArea">
      <h2>Faculty Involved In {{selected_research_area}}</h2>
      <ul class="items">
        <DirectoryListItem  v-for="member in facultyInArea" :key="member.scid" :item="member"></DirectoryListItem>
      </ul>
    </section>
    <section v-if="has_news" class="research-news area-section">
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
                <h2>{{news_item.date}}</h2>
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
    programs() {
      let programs = [];
      let selected_area = this.$store.state.researchAreas.list.find((area) => area.area_id === this.$store.state.researchAreas.area_id);

      selected_area.programs.forEach(function(program) {
        programs.push(program);
      });

      return programs;
    },
    facultyInArea() {
      let faculty = [];
      if (this.$store.state.researchAreas.list.length && this.$store.state.directory.list.length && this.$store.state.researchAreas.area_id) {
        let selected_area = this.$store.state.researchAreas.area_id;
        let research_area = this.$store.state.researchAreas.list.find((area) => area.area_id === selected_area);
        let directory = this.$store.state.directory.list;

        research_area.members.map(function(member){
          let research_member = _.find(directory, function(person){ return person.scid === member.scid })
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
.area-section {
  margin-bottom: 3em;
}

.items {
  line-height: 1.5;
}
</style>
