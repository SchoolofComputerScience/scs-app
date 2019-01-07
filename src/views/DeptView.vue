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


            div(
              class="list_card"
              v-for="department in departments"
              v-if="department.uid != 'deans_office'"
              :departmentData="department"
              :key="department.uid"
            ) {{department.department_name}}


            div(class="list_card")
              a(href="/departments/single/' + department.department_id", class="link_absolute") Computational Biology
              div
                span(class="item_title") Computational Biology
                span(class="item_mark", aria-hidden="true") cb
                p(class="item_description") Computational biology is a critically important and growing field that is essential to biomedical research.  The Computational Biology Department at Carnegie Mellon is part of the internationally-recognized School of Computer Science, and draws upon the incredible energy and expertise in the entire School.
            div(class="list_card")
              a(href="/departments/single/' + department.department_id", class="link_absolute") Computer Science
              div
                span(class="item_title") Computer Science
                span(class="item_mark", aria-hidden="true") cs
                p(class="item_description") Carnegie Mellon is known worldwide for our broad view of computer science. We build upon the strong foundations our history has provided and act quickly to explore new directions. We are fearless in pushing the frontiers of our field.
            div(class="list_card")
              a(href="/departments/single", class="link_absolute") Human-Computer Interaction
              div
                span(class="item_title") Human-Computer Interaction
                span(class="item_mark", aria-hidden="true") hci
                p(class="item_description") Founded in 1993, the HCII is a place where we work to understand and create technology that harmonizes with and improves human capabilities, goals, and social environments through interdisciplinary research and education in design, computer science, and behavioral and social sciences.
            div(class="list_card")
              a(href="/departments/single", class="link_absolute") Institute for Software Research
              div
                span(class="item_title") Institute for Software Research
                span(class="item_mark", aria-hidden="true") isr
                p(class="item_description") ISR is one of the seven academic departments of the Carnegie Mellon School of Computer Science (SCS). ISR hosts the SCS PhD programs in Software Engineering (SE) and Societal Computing (SC), along with six professional masters programs. We also host the undergraduate minor in software engineering.
            div(class="list_card")
              a(href="/departments/single", class="link_absolute") Language Technologies Institute
              div
                span(class="item_title") Language Technologies Institute
                span(class="item_mark", aria-hidden="true") lti
                p(class="item_description") The Language Technologies Institute at Carnegie Mellon educates the leaders of tomorrow and performs groundbreaking research in the areas of Natural Language Processing, Computational Linguistics, Information Extraction, Summarization &amp; Question Answering, Information Retrieval, Text Mining &amp; Analytics, Knowledge Representation, Reasoning & Acquisition, Language Technologies for Education, Machine Learning, Machine Translation, Multimodal Computing and Interaction, Speech Processing, and Spoken Interfaces &amp; Dialogue Processing.
            div(class="list_card")
              a(href="/departments/single", class="link_absolute") Machine Learning
              div
                span(class="item_title") Machine Learning
                span(class="item_mark", aria-hidden="true") ml
                p(class="item_description") Machine Learning (ML) is a fascinating field of Artificial Intelligence (AI) research and practice where  we investigate how  computer agents can improve their perception, cognition, and action  with experience. Machine Learning is about machines improving from  data, knowledge, experience, and interaction.
            div(class="list_card")
              a(href="/departments/single", class="link_absolute") Robotics Institute
              div
                span(class="item_title") Robotics Institute
                span(class="item_mark", aria-hidden="true") ri
                p(class="item_description") The Robotics Institute at Carnegie Mellon University was established in 1979 to conduct basic and applied research in robotics technologies relevant to industrial and societal tasks. Seeking to combine the practical and the theoretical, the Robotics Institute has diversified its efforts and approaches to robotics science while retaining its original goal of realizing the potential of the robotics field.
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
  computed: {
    departments () {
      // console.log(this.$store.state.departments.list)
      // return this.$store.state.departments.list
    }
  },
  asyncData ({ store }) {
    // store.dispatch('GET_SCS_DEPARTMENT_LIST');
  }
}
</script>
