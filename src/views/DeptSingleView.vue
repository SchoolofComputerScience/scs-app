<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
      :page_title_link="page_title_link"
    )
    main
      div(class="container")
        section(
          class="page_header"
          :style="{'background-image': `url(${require('../assets/images/placeholders/department_header.jpg')})`}"
        )
          div(class="page_header_title")
            h1 {{department.title}}
          div(class="page_header_description")
            p(class="page_description") {{department.description}}
            div(class="page_jump")
              a(
                :href="header_text.button_link"
                target="_blank"
                class="page_jump_button"
              ) {{ header_text.button_name }}
              div
                p(class="page_title_small") learn more about...
                a(
                  v-for="item in header_text.list"
                  :href="item.link"
                  ) {{item.name}}

        section(class="page_blocks")
          h2 News &amp; Events
          div(class="page_block_container visible")

            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_item_1.jpg')})`}"
            )
              a(href="#", class="link_absolute") Kery, Myers Win Best Paper at VL/HCC for Verdant Prototype
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") oct 22
              div(class="page_block_content")
                span(class="page_block_title") Kery, Myers Win Best Paper at VL/HCC for Verdant Prototype

            div(class="page_block event")
              a(href="#", class="link_absolute") Learning Programming at Scale: Code, Data, and Environment
              div(class="page_block_labels")
                span(class="page_block_label primary") events
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") Oct
                  span(class="page_block_date_day") 26
                span(class="page_block_title") Learning Programming at Scale: Code, Data, and Environment
                span(class="page_block_description") with Philip Guo

            div(class="page_block news_item")
              a(href="#", class="link_absolute") WGU and CMU Partner to Develop AI-Enabled Career Guidance...
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") oct 16
              div(class="page_block_content")
                span(class="page_block_title") WGU and CMU Partner to Develop AI-Enabled Career Guidance...

          button(class="button_show_more") Show More

        PeopleGrid(
          :directory="directory"
          :hasHeadline="true"
          )

        CourseList(
          :courses="courses"
          :hasHeadline="true"
          )

        PubList

        section(class="content_list")
          h2 Research Areas
          div(class="filter_item_list list_cards visible small")
            div(class="list_card")
              a(href="#", class="link_absolute") Accessibility
              div
                span(class="item_title") Accessibility
            div(class="list_card")
              a(href="#", class="link_absolute") Crowdsourcing
              div
                span(class="item_title") Crowdsourcing
            div(class="list_card")
              a(href="#", class="link_absolute") Enabling Technologies
              div
                span(class="item_title") Enabling Technologies
            div(class="list_card")
              a(href="#", class="link_absolute") Design Research
              div
                span(class="item_title") Design Research
            div(class="list_card")
              a(href="#", class="link_absolute") Human Assistance
              div
                span(class="item_title") Human Assistance
            div(class="list_card")
              a(href="#", class="link_absolute") Context-Aware Computing
              div
                span(class="item_title") Context-Aware Computing
            div(class="list_card")
              a(href="#", class="link_absolute") Tools
              div
                span(class="item_title") Tools
            div(class="list_card")
              a(href="#", class="link_absolute") Games
              div
                span(class="item_title") Games
            div(class="list_card")
              a(href="#", class="link_absolute") Education
              div
                span(class="item_title") Education
            div(class="list_card")
              a(href="#", class="link_absolute") Healthcare
              div
                span(class="item_title") Healthcare
            div(class="list_card")
              a(href="#", class="link_absolute") Learning Sciences &amp; Technologies
              div
                span(class="item_title") Learning Sciences &amp; Technologies
            div(class="list_card")
              a(href="#", class="link_absolute") Service Design
              div
                span(class="item_title") Service Design
            div(class="list_card")
              a(href="#", class="link_absolute") Social Computing
              div
                span(class="item_title") Social Computing
            div(class="list_card")
              a(href="#", class="link_absolute") Societal Problems
              div
                span(class="item_title") Societal Problems

      section(
        class="subfooter"
        :style="{'background-image': `url(${require('../assets/images/placeholders/department_subfooter.jpg')})`}"
      )
        div(class="container")
          div(class="gutter-xl")
            div(class="col-3-5")
              h3(class="knockout") {{footer_text.description_title}}
              p {{footer_text.description}}
              a(
                :href="footer_text.description_link"
                class="button_arrow"
                ) {{footer_text.description_link_text}}
            div(class="col-2-5")
              h3 {{footer_text.list_title}}
              ul(class="list_basic")
                li(
                  v-for="item in footer_text.list"
                  )
                  a(
                    :href="item.link"
                    ) {{item.name}}
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
import PeopleGrid from '../components/PeopleGrid.vue';
import CourseList from '../components/CourseList.vue';
import PubList from '../components/PubList.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    PeopleGrid,
    CourseList,
    PubList
  },
  data () {
    return {
      title: 'Human-Computer Interaction - Departments',
      page_title_label: 'Departments',
      page_title_link: '/departments',
      header_class: 'pulled has_back',
      people_types: [
        'faculty'
      ]
    }
  },
  computed: {
    // pub(){
    //   if(this.$store.state.publication.pub[this.$route.params.pubid] !== undefined){
    //     return this.$store.state.publication.pub[this.$route.params.pubid]
    //   }
    // },
    // pbset(){
    //   return this.$store.state.publication.pub[this.$route.params.pubid] ? true : false
    // },
    courses () {
      let departmentFilter = this.$route.params.department;

      // FIXME: don't hard code me, bruh
      return this.$store.state.courses.lists['F18'].filter((course) => {
        return course.department.toLowerCase() === departmentFilter.toLowerCase();
      });
    },
    semesterCode () {
      return this.$store.state.semesterCode.code;
    },
    department: function () {
      console.log(this.$store.state.publication.pub[this.$route.params.pubid]);
      return {
        id: 'cb',
        abbreviation: 'cb',
        title: 'Computational Biology',
        description: 'Computational biology is a critically important and growing field that is essential to biomedical research.  The Computational Biology Department at Carnegie Mellon is part of the internationally-recognized School of Computer Science, and draws upon the incredible energy and expertise in the entire School.'
      };
    },
    directory () {
      let filtered = [];
      let departmentFilter = this.$route.params.department;
      let random_indexes = [];
      let directory_length = this.$store.state.directory.list.length;
      let maxCount = 12;
      let peopleTypes = this.people_types;

      // console.log(this.$store.state.courses.lists['F18'][0]);

      return this.$store.state.directory.list.filter((person) => {
        return (
          person.departments.includes(departmentFilter) &&
          peopleTypes.includes(person.scs_relationship_class)
        );
      }).map((person) => {
        person.backgroundImage = 'background-image: url(' + person.image_url + ');';
        return person;
      });
    },
    header_text: function () {
      return {
        button_name: 'visit the hci website',
        button_link: 'https://hcii.cmu.edu/',
        list: [{
          name: 'Undergraduate Programs',
          link: '#',
        }, {
          name: 'Graduate Programs',
          link: '#'
        }, {
          name: 'Technical Reports',
          link: '#'
        }, {
          name: 'Research Pages',
          link: '#'
        }, {
          name: 'Faculty',
          link: '#'
        }]
      }
    },
    footer_text: function () {
      return {
        description_title: 'Programs',
        description: 'The Human-Computer Interaction Institute offers multidisciplinary undergraduate and graduate educational programs that emphasize technology for the benefit of people and society.',
        description_link: '#',
        description_link_text: 'All Programs',
        list_title: 'Popular HCI Programs',
        list: [{
          name: 'Ph.D. in HCI',
          link: '#',
        }, {
          name: 'Master of Human-Computer Interaction (MHCI)',
          link: '#'
        }, {
          name: 'Accelerated Master of Human-Computer Interaction',
          link: '#'
        }, {
          name: 'Master of Educational Technology and Applied Learning Science (METALS)',
          link: '#'
        }]
      }
    }
  },
  asyncData ({ store, route: { params: { department, pubid, scid }}} ) {
    store.dispatch('GET_SCS_DEPARTMENT_LIST');
    store.dispatch('FETCH_COURSE_LIST', 'F18');
    store.dispatch('FETCH_PUBLICATION', { pubid, scid });
    return store.dispatch('GET_DIRECTORY', { department });
  }
}
</script>
