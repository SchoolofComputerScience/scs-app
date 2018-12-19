<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
      :page_title_link="page_title_link"
      :header_list="header_list"
    )

    div(class="container")
      main
        section(class="page_title hidden_content")
          h1 Research Areas
        section(class="content_list")
          div(class="list_cards visible")

            div(
              class="list_card"
              v-for="area in topForty"
              class="card card-section"
              :key="area.area_id"
            )
              router-link(
                :to="'/research/single/' + area.area_id"
                class="link_absolute"
              ) {{area.title}}
              div
                span(class="item_title") {{area.title}}
                span(class="label") #[a(href="#") 24 people] #[a(href="#") 12 publications]

    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import NewHeader from '../components/NewHeader.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';

import _ from 'lodash';

export default {
  name: 'pub-view',
  components: {
    NavDrawer,
    NewFooter,
    NewHeader,
    ModalExplore,
    ModalSearch,
  },
  methods: {
    openMenu: function () {
      $('main, header').toggleClass('nav_open');
      $('.slider_nav_container').toggleClass('open');
      $('.open_menu, .modal_explore').toggleClass('on');
      $('.launch_explore, .launch_search, .modal_explore, .modal_search, .mobile_nav button').removeClass('on');
      removeBody();
    },
    launchExplore: function () {
      $('.modal_search, .launch_search').removeClass('on');
      $('.js_launch_explore, .modal_explore').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      closeMenu();
      removeBody();
    },
    launchSearch: function () {
      $('.modal_explore, .launch_explore').removeClass('on');
      $('.js_launch_search, .modal_search').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      closeMenu();
      removeBody();
    }
  },
  computed: {
    topForty(){
      let topAreas = [];

      if (this.$store.state.researchAreas.list.length) {
        let list = this.$store.state.researchAreas.list;
        let sorted = _.sortBy(list, 'gs_count');
        sorted = sorted.reverse();

        for (let i = 0; i < 25; i++) {
          topAreas.push(sorted[i]);
        }
      }
      return topAreas;
    }
  },
  asyncData ({ store }) {
    // console.log(store.dispatch('GET_RESEARCH_AREAS'));
    return store.dispatch('GET_RESEARCH_AREAS');
  },
  data () {
    return {
      title: 'Research Areas',
      page_title_label: 'Research',
      header_class: 'pulled',
      page_title_link: false,
      header_list: [{
        anchor: 'machine-learning',
        title: 'Machine Learning'
      }, {
        anchor: 'robotics',
        title: 'Robotics'
      }, {
        anchor: 'human-computer-interaction',
        title: 'Human-Computer Interaction'
      }, {
        anchor: 'artificial-intelligence',
        title: 'Artificial Intelligence'
      }, {
        anchor: 'computer-vision',
        title: 'Computer Vision'
      }, {
        anchor: 'natural-language-processing',
        title: 'Natural Language Processing'
      }, {
        anchor: 'programming-languages',
        title: 'Programming Language'
      }, {
        anchor: 'computational-biology',
        title: 'Computational Biology'
      }, {
        anchor: 'software-engineering',
        title: 'Software Engineering'
      }, {
        anchor: 'computer-graphics',
        title: 'Computer Graphics'
      }, {
        anchor: 'distributed-systems',
        title: 'Distributed Systems'
      }, {
        anchor: 'statistics',
        title: 'Statistics'
      }, {
        anchor: 'learning-sciences',
        title: 'Learning Sciences'
      }, {
        anchor: 'formal-methods',
        title: 'Formal Methods'
      }, {
        anchor: 'data-mining',
        title: 'Data Mining'
      }]
    }
  }
}
</script>
