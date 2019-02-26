<template lang="pug">
div(class="modal modal_search")
  div(class="modal_contents")
    div(class="container")
      section(class="page_title large")
        div Search
      section(class="search")
        div(class="search_bar")
          button(class="search", name="Search modal button") Search
          label(for="search_modal", class="label_hidden") Search this website
          input(type="text", id="search_modal", placeholder="Search news, events, people and programs", v-model="query")
      
      section(class="results")
        section(class="category", v-if="search_results_directory.length")
          h2 In People
          div(v-for="person in search_results_directory", key="person.scid")
            router-link(:to="'/people/single/' + person.scid") {{person.display_name}}
        section(class="category", v-if="search_results_courses.length")
          h2 In Courses
          div(v-for="course in search_results_courses", key="course.course_id")
            router-link(:to="'/courses/course/' + course.course_id") {{course.course_number}} - {{course.long_title}}
        section(class="category", v-if="search_results_research.length")
          h2 In Research
          div(v-for="field in search_results_research", key="field.field")
            router-link(:to="'/research/single/' + field.field") {{field.field_text}}
        section(class="category", v-if="search_results_directory.length")
          h2 In News
          div(v-for="news in search_results_news", key="news.id")
            router-link(:to="'/news/single/' + news.id") {{news.headline}}
        section(class="category", v-if="search_results_events.length")
          h2 In Events
          div(v-for="event in search_results_events", key="event.id")
            router-link(:to="'/events/single/' + event.id") {{event.name}} 
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
import Vue from 'vue'

export default {
  name: 'global-search',

  data () {
    return {
      query: ''
    }
  },

  computed: {
    search_results_directory() {
      let results = [];
      let search_term = this.query;
      let directory = this.$store.state.directory.list;
      let directory_length = this.$store.state.directory.list.length;

      if (search_term.length) {
        for(let i = 0; i < directory_length; i++) {
          if(directory[i].display_name.toLowerCase().indexOf(search_term.toLowerCase()) > -1) {
            results.push(directory[i]);
          }

          if(results.length >= 5) {
            break;
          }
        }
      }
      
      return results;
    },
    search_results_courses() {
      let results = [];
      let search_term = this.query;
      let courses = this.$store.state.courses.lists[this.$store.state.semesterCode.code];
      let courses_length = this.$store.state.courses.lists[this.$store.state.semesterCode.code].length;
      
      if (search_term.length) {
        for(let i = 0; i < courses_length; i++) {
          if(courses[i].long_title.toLowerCase().indexOf(search_term.toLowerCase()) > -1) {
            results.push(courses[i]);
          }

          if(results.length >= 5) {
            break;
          }
        }
      }
      
      return results;
      
    },
    search_results_research() {
      let results = [];
      let search_term = this.query;
      let researchFields = this.$store.state.researchFields.list;
      let researchFields_length = this.$store.state.researchFields.list.length;

      if (search_term.length) {
        for(let i = 0; i < researchFields_length; i++) {
          if(researchFields[i].field !== "not_applicable" && researchFields[i].field_text.toLowerCase().indexOf(search_term.toLowerCase()) > -1) {
            results.push(researchFields[i]);
          }

          if(results.length >= 5) {
            break;
          }
        }
      }
      
      return results;
      
    },
    search_results_news() {
      let results = [];
      let search_term = this.query;
      let news = this.$store.state.news.list;
      let news_length = this.$store.state.news.list.length;
      
      if (search_term.length) {
        for(let i = 0; i < news_length; i++) {
          if(news[i].headline.toLowerCase().indexOf(search_term.toLowerCase()) > -1) {
            results.push(news[i]);
          }

          if(results.length >= 5) {
            break;
          }
        }
      }
      
      return results;
      
    },
    search_results_events() {
      let results = [];
      let search_term = this.query;
      let events = this.$store.state.events.list;
      let events_length = this.$store.state.events.list.length;
      
      if (search_term.length) {
        for(let i = 0; i < events_length; i++) {
          if(events[i].name.toLowerCase().indexOf(search_term.toLowerCase()) > -1) {
            results.push(events[i]);
          }

          if(results.length >= 5) {
            break;
          }
        }
      }
      
      return results;
      
    }
  },

  methods: {
    updatePage: function() {
      this.page += 1;
    }
  }
}
</script>
