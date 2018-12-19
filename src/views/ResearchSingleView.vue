<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
      :page_title_link="page_title_link"
    )
    div(class="container")
      main
        section(
          class="page_header min"
          :style="{'background-image': `url(${require('../assets/images/placeholders/research_header.jpg')})`}"
        )
          div(class="page_header_title")
            h1 {{selected_research_area}}
          div(class="page_header_description")
            p(
              class="page_description"
              v-html="selected_description"
            )
            div(class="page_jump")
              p departments: #[a(class="page_jump_link") mL] | #[a(class="page_jump_link") RI]

        Tabs(:tabs="tab_data")

      section(class="subfooter clean")
        div(class="container")
          h3 more information
          div(class="gutter-xl")
            div(class="col-4-7")
              p This approach has been widely used to build credit card fraud detection systems, medical diagnosis systems, internet search engines and recommender systems. Important subareas include (i) Active Learning---a form of machine learning in which the computer can choose its own experiments (ii) Reinforcement Learning---in which a system learns to achieve rewards which are delayed and (iii) Life Long Learning in which a machine uses its experience in learning an earlier task to help itself learn faster in future tasks. A very important machine learning technique is Deep Learning, which has proved over the past five years to be surprisingly effective at learning solutions to problems which previous generations of machine learning algorithm had failed at.
            div(class="col-3-7")
              blockquote Instead of asking a programmer to write a program to detect faces in an image, a machine learning practitioner will ask humans to manually label thousands of images with the locations of faces and leave it up to the machine learning algorithm to derive a face detector.
    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import NewHeader from '../components/NewHeader.vue';
import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import Tabs from '../components/Tabs.vue';
import TabPeople from '../components/TabPeople.vue';
import TabPublications from '../components/TabPublications.vue';
import TabCourses from '../components/TabCourses.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    Tabs
  },
  methods: {
    filterContent: function (filter, e) {
      $('.content_filter .filter_item').removeClass('active');
      $(e.currentTarget).addClass('active');
      $(".content_list .filter_item_list").removeClass('visible');
      $(".content_list .filter_item_list[data-filter="+filter+"]").addClass('visible');
    }
  },
  data () {
    return {
      title: 'Machine Learning - Research Areas',
      page_title_label: 'Research',
      page_title_link: '/research',
      header_class: 'pulled has_back'
    }
  },
  computed: {
    tab_data () {
      return [{
        name: 'People',
        component: TabPeople
      }, {
        name: 'Publications',
        component: TabPublications
      }, {
        name: 'Courses',
        component: TabCourses
      }];
    },
    selected_research_area() {
      return this.$store.state.researchAreas.title;
    },
    selected_description() {
      let research_area = this.research_areas.find((area) => area.area_id === this.$store.state.researchAreas.area_id);
      if (research_area && research_area.description) {
        return research_area.description;
      }
      return '';
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
      return this.$store.state.researchAreaCourses.list;
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
    graduateLevel() {
      return this.graduate_level || this.$store.state.route.params.graduate_level;
    }
  },
  asyncData ({ store, route }) {
    store.dispatch('GET_SEMESTER_CODE');
    store.dispatch('GET_DIRECTORY');
    store.dispatch('GET_RESEARCH_AREA_MEMBERS', route.params.research_area);
    store.dispatch('GET_RESEARCH_AREA_COURSES', route.params.research_area);
    return store.dispatch('GET_RESEARCH_AREAS').then(() => {
      let area_id = route.params.research_area || store.state.researchAreas.area_id
      if (area_id) {
        let research_area = store.state.researchAreas.list.find((area) => area.area_id === area_id);
        if (research_area) {
          // store.dispatch('SEARCH_NEWS_ARTICLES', research_area.title);
          store.commit("SET_SELECTED_RESEARCH_AREA", {
            area_id: research_area.area_id,
            title: research_area.title,
            description: research_area.description
          });
        }
      }
    });
  }

}

</script>
