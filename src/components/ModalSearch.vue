<template lang="pug">
div(class="modal modal_search")
  div(class="modal_contents")
    div(class="container")
      section(class="page_title large")
        div Search
      SearchBox(placeholder="Search news, events, people and programs", :dataToSearch="search_data", :autoSuggest="false", :resultLimit="20")
      //- section(class="trending")
      //-   span(class="h2") Popular in the last few hours
      //-   ul(class="list_trending list_multi_column visible")
      //-     li(class="theme_events")
      //-       a(href="#") #[span(class="item_title") Computer Science Visiting Speaker Talk] #[span(class="label") events] #[span(class="rank", style="width:100%")]
      //-     li(class="theme_people")
      //-       a(href="#") #[span(class="item_title") Martial Hebert - Director, Robotics Institute] #[span(class="label") people] #[span(class="rank", style="width:50%")]
      //-     li(class="theme_research")
      //-       a(href="#") #[span(class="item_title") Machine Learning] #[span(class="label") research] #[span(class="rank", style="width:30%")]
      //-     li(class="theme_news")
      //-       a(href="#") #[span(class="item_title") Architect Reveals Design of TCS Hall] #[span(class="label") news] #[span(class="rank", style="width:20%")]
      //-     li(class="theme_events")
      //-       a(href="#") #[span(class="item_title") ROBOBURGH Opportunity Expo] #[span(class="label") events] #[span(class="rank", style="width:10%")]
      //-     li(class="theme_publications")
      //-       a(href="#") #[span(class="item_title") ROBOBURGH Opportunity Expo] #[span(class="label") publications] #[span(class="rank", style="width:5%")]
</template>

<script>
import Vue from 'vue';
import SearchBox from '../components/SearchBox.vue';

export default {
  name: 'global-search',
  components: {
    SearchBox
  },
  data () {
    return {
      query: ''
    }
  },

  computed: {
    search_data: function () {
      let all_data = [];

      //Directory
      let directory = this.$store.state.directory.list;
      let directory_length = this.$store.state.directory.list.length;

      for(let i = 0; i < directory_length; i++) {
        let item = {};

        item.id = directory[i].scid;
        item.display = directory[i].display_name;
        item.link = '/people/single/' + directory[i].scid;
        item.category = "Directory";

        all_data.push(item);
      }

      //Research Areas
      let researchFields = this.$store.state.researchFields.list;
      let researchFields_length = this.$store.state.researchFields.list.length;

      for(let i = 0; i < researchFields_length; i++) {
        let item = {};

        item.id = researchFields[i].field;
        item.display = researchFields[i].field_text;
        item.link = '/research/single/' + researchFields[i].field;
        item.category = "Research";

        all_data.push(item);
      }

      //Courses
      let courses = this.$store.state.courses.lists[this.$store.state.semesterCode.code];
      let courses_length = this.$store.state.courses.lists[this.$store.state.semesterCode.code].length;

      for(let i = 0; i < courses_length; i++) {
        let item = {};

        item.id = courses[i].course_id;
        item.display = courses[i].long_title;
        item.link = '/courses/course/' + courses[i].course_id;
        item.category = "Courses";

        all_data.push(item);
      }

      //News
      let news = this.$store.state.news.list;
      let news_length = this.$store.state.news.list.length;

      for(let i = 0; i < news_length; i++) {
        let item = {};

        item.id = news[i].id;
        item.display = news[i].headline;
        item.link = '/news/single/' + news[i].id;
        item.category = "News";

        all_data.push(item);
      }

      //Events
      let events = this.$store.state.events.list;
      let events_length = this.$store.state.events.list.length;

      for(let i = 0; i < events_length; i++) {
        let item = {};

        item.id = events[i].id;
        item.display = events[i].name;
        item.link = '/events/single/' + events[i].id;
        item.category = "Events";

        all_data.push(item);
      }


      return all_data;
    }
  },

  methods: {
    updatePage: function() {
      this.page += 1;
    }
  }
}
</script>
