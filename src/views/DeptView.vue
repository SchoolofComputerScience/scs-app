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
          h1 Departments
        section(class="content_list")
          div(class="list_cards large")
            div(class="list_card" v-for="department in departments")
              router-link(
                :to="'/departments/single/' + department.id"
                class="link_absolute"
              )
              div
                span(class="item_title") {{department.title}}
                span(class="item_mark", aria-hidden="true") {{department.abbreviation}}
                p(class="item_description") {{department.description}}
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

export default {
  name: 'pub-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
  },
  computed: {
    departments: function () {
      return [{
        id: 'cb',
        abbreviation: 'cb',
        title: 'Computational Biology',
        description: 'Computational biology is a critically important and growing field that is essential to biomedical research.  The Computational Biology Department at Carnegie Mellon is part of the internationally-recognized School of Computer Science, and draws upon the incredible energy and expertise in the entire School.'
      }];
    }
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
  data () {
    return {
      title: 'Departments',
      page_title_label: 'Departments',
      header_class: 'pulled',
      page_title_link: false,
      header_list: [{
        anchor: 'computational-biology',
        title: 'Computational Biology'
      }, {
        anchor: 'computer-science',
        title: 'Computer Science'
      }, {
        anchor: 'human-computer-interaction',
        title: 'Human-Computer Interaction'
      }, {
        anchor: 'institute-for-software-research',
        title: 'Institute for Software Research'
      }, {
        anchor: 'language-technologies-institute',
        title: 'Language Technologies Institute'
      }, {
        anchor: 'machine-learning',
        title: 'Machine Learning'
      }, {
        anchor: 'robotics-institute',
        title: 'Robotics Institute'
      }]
    }
  },
  asyncData ({ store }) {
    store.dispatch('GET_SCS_DEPARTMENT_LIST');
  }
}
</script>
