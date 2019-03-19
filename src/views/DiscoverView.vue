<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader
    main
      div(class="container")
        section(class="page_title large")
          h1 Discover
        section(class="statement")
          div(class="gutter-xl flex")
            div(class="col-5-7")
              p Carnegie Mellon's School of Computer Science is widely recognized as one of the first and best computer science programs in the world. Our programs train the next generation of innovators to solve real-world problems and improve the way people live and work.
            div(class="col-2-7")
              a(class="link_more") more

      section(class="contrast_bar")
        div(class="container")
          div(class="gutter-xl")
            div(class="col-2-3")
              SearchBox(placeholder="Search the School of Computer Science", :dataToSearch="search_data", :autoSuggest="true", :resultLimit="10")
            div(class="col-1-3")
              p(class="micro") Not sure where to look?
              a(class="link_explore") Explore the CMU School<br> of Computer Science
      .container
        MixedGrid(
          :items="newsAndEvents"
          :title= "false"
          :isSingle="false"
          :minShow="7"
          :numToAdd="3"
        )

      DepartmentGrid

    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import NewHeader from '../components/NewHeader.vue';
import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';
import MixedGrid from '../components/MixedGrid.vue';
import DepartmentGrid from '../components/DepartmentGrid.vue';
import SearchBox from '../components/SearchBox.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    MixedGrid,
    DepartmentGrid,
    SearchBox
  },
  data () {
    return {
      title: 'Discover',
      page_title_link: false,
    }
  },
  computed: {
    newsAndEvents: function () {
      // FIXME: just sampling/shuffling to show variety of neighbors, need
      // to figure out how these are to be combined....

      let news = _.sampleSize((this.$store.state.news.list || []).map((data) => {
        return {
          type: 'news',
          data: data
        };
      }), 10);

      let events = _.sampleSize((this.$store.state.events.list || []).map((data) => {
        return {
          type: 'event',
          data: data
        };
      }), 9);

      return _.shuffle(
        news.concat(events)
      ).map((item, i) => {
        return item.id = i, item;
      });
    },
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
  asyncData ({ store }) {
    store.dispatch('GET_SEMESTER_CODE').then(() => {
      store.dispatch('FETCH_COURSE_LIST', store.state.semesterCode.code);
    });
    store.dispatch('GET_EVENTS_LIST');
    store.dispatch('GET_NEWS_LIST');
    store.dispatch('GET_RESEARCH_FIELDS');
    store.dispatch('GET_DEPARTMENTS');
    return store.dispatch('GET_DIRECTORY');
  }
}
</script>
