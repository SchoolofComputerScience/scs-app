<template>
  <section class="content-page card">
    <h1>{{selected_research_area}}</h1>
    <section class="area-section" v-if="programs">
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
    <section v-if="courses" class="area-section">
      <h2 class="title">{{semesterCode | seasonTranslate}} Courses</h2>
      <p v-for="course in courses">
        <router-link :to="'/courses/course/' + course.course_id"> <span>{{course.course_number}} | {{course.title}}</span></router-link>
      </p>
    </section>
    <section v-if="has_news" class="research-news area-section">
      <h2>Latest News Articles On {{selected_research_area}}</h2>
      <div class="card-holder">
        <div v-if="error" class="error-message">
          <p>{{error}}</p>
        </div>
        <div class="news-item" v-if="!error" v-for="news_item in news" :key="news_item.uid">
          <router-link :to="'/news/' + news_item.uid" class="card">
            <figure :style="{ 'background-image': 'url(' + news_item.image + ')' }"></figure>
            <div class="content">
              <p>{{timeFix(news_item.date)}}</p>
              <h3>{{news_item.title}}</h3>
            </div>
          </router-link>
          <div class="tags">
            <router-link
              v-for="tag in news_item.tags"
              v-if="tag.name != ''"
              :key="tag.name"
              class="button-small"
              :to="tag.tag.toLowerCase()">{{tag.name}}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import DirectoryListItem from '../components/DirectoryListItem.vue'
import { router } from '../app'
import format from 'date-fns/format'

export default {
  name: 'research-areas-view',

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
    courses() {
      let courses = false;
      let selected_area = this.research_areas.find((area) => area.area_id === this.$store.state.researchAreas.area_id);
      if (this.research_areas.length > 0) {
        if (selected_area) {
          courses = selected_area.courses;
        }
      }

      return courses;

    },
    programs() {
      let programs = [];
      let selected_area = this.research_areas.find((area) => area.area_id === this.$store.state.researchAreas.area_id);

      if (selected_area && selected_area.programs) {
        selected_area.programs.forEach(function(program) {
          programs.push(program);
        });
      }

      return programs.length > 0 ? programs : false;
    },
    semesterCode(){
      return this.$store.state.semesterCode.code;
    },
    facultyInArea() {
      let faculty = [];
      if (this.research_areas.length && this.$store.state.directory.list.length && this.$store.state.researchAreas.area_id) {
        let selected_area = this.$store.state.researchAreas.area_id;
        let research_area = this.research_areas.find((area) => area.area_id === selected_area);
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
    },
    timeFix (arg) {
      return format(arg, 'dddd, MMMM Do YYYY')
    }
  },

  asyncData ({ store, route }) {
    store.dispatch('GET_SEMESTER_CODE');
    store.dispatch('GET_DIRECTORY');
    return store.dispatch('GET_RESEARCH_AREAS').then(() => {
      let area_id = route.params.research_area || store.state.researchAreas.area_id
      if (area_id) {
        let research_area = store.state.researchAreas.list.find((area) => area.area_id === area_id);
        if (research_area) {
          store.dispatch('SEARCH_NEWS_ARTICLES', research_area.title);
          store.commit("SET_SELECTED_RESEARCH_AREA", { area_id: research_area.area_id, title: research_area.title });
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.area-section {
  margin-bottom: 3em;
}

.items {
  line-height: 1.5;
}

.card-holder {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

.tags{
  display: inline-block;
  a{
    margin-bottom: $base-line-height / 2;
  }
}

.news-item{
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  position: relative;
  width: 50%;
  max-width: 50%;
  @include breakpoint-max(laptop) {
    width: 100%;
    max-width: 100%;
  }
  &:nth-child(even){
    padding-left: $base-line-height;
    @include breakpoint-max(laptop) {
      padding: 0;
    }
  }
  margin-top: $base-line-height;
}

.card {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  width: 100%;
  background-position: center;
  background-size: cover;
  transition: .4s all;
  margin-bottom: $base-line-height * 0.562;
  > div > a {
    z-index: 9;
    text-decoration: none;
  }
  .content {
    display: block;
  }
  aside {
    display: block;
    vertical-align: center;
  }
  figure{
    display: block;
    background-position: center;
    background-size: cover;
    width: calc(100% + (#{$base-line-height} * 2));
    height: $base-line-height * 8;
    top: -$base-line-height;
    position: relative;
    margin: 0;
    margin-left: -$base-line-height;
  }
  h2 {
    font-weight: 300;
    position: relative;
  }
  h3 {
    font-weight: 300;
  }
  p {
    color: $black;
  }

}
</style>
