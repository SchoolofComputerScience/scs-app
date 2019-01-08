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

        section(class="page_blocks")
          h2 People
          div(class="page_block_container visible")
            div(
              v-for="person in directory"
              ) {{ person.display_name }}
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_vincent.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") Vincent Aleven
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") Vincent Aleven
            //-     span(class="page_block_description") Director, Bhci Program
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_karen.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") Karen Kornblum Berntsen
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") Karen Kornblum Berntsen
            //-     span(class="page_block_description") Associate Teaching Professor
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_marti.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") Marti Louw
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") Marti Louw
            //-     span(class="page_block_description") Director, Learning Media Design Center
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_john.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") John Zimmerman
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") John Zimmerman
            //-     span(class="page_block_description") Professor
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_judeth.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") Judeth (Judy) Choi
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") Judeth (Judy) Choi
            //-     span(class="page_block_description") Human-Computer Interaction Institute
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_tianshi.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") Tianshi Li
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") Tianshi Li
            //-     span(class="page_block_description")
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_anderinsola.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") Aderinsola Akintilo
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") Aderinsola Akintilo
            //-     span(class="page_block_description") Human-Computer Interaction Institute
            //- div(
            //-   class="page_block person"
            //-   :style="{'background-image': `url(${require('../assets/images/placeholders/people_jennifer.jpg')})`}"
            //- )
            //-   a(href="#", class="link_absolute") John Zimmerman
            //-   div(class="page_block_content")
            //-     span(class="page_block_title") John Zimmerman
            //-     span(class="page_block_description") MHCI Program Coordinator

        section(class="content_list")
          h2 Upcoming Courses
          ul(class="list_stacked list_multi_column theme_courses visible")
            li
              a(href="#") #[span(class="item_title") Interactive Data Science] #[span(class="label") undergraduate]
            li
              a(href="#") #[span(class="item_title") Freshman Immigration Course] #[span(class="label") undergraduate]
              div(class="list_window")
                span(class="label_primary") computer science
                span(class="label_secondary") 15-128
                span(class="label_title") Freshman Immigration Course
                span(class="label_description") The Freshman Immigration Course is taken by first-semester Computer Science majors on the Pittsburgh campus.
                span(class="label_tertiary") undergraduate
            li
              a(href="#") #[span(class="item_title") Data Science Seminar] #[span(class="label") graduate]
            li
              a(href="#") #[span(class="item_title") Data Science Capstone] #[span(class="label") undergraduate]
            li
              a(href="#") #[span(class="item_title") Computer Science Co-Op] #[span(class="label") undergraduate]
            li(class="show_more")
              button(class="button_show_more") Show More
        section(class="content_list")
          h2 Publications
          ul(class="list_stacked list_multi_column theme_publications visible")
            li
              a(href="#") #[span(class="item_title") Learning with Staleness] #[span(class="label") 2018]
            li
              a(href="#") #[span(class="item_title") Efficient Methods for Prediction and Control in Partially Observable Environments] #[span(class="label") 2018]
            li
              a(href="#") #[span(class="item_title") Sublinear-Time Learning and Inference for High-Dimensional Models] #[span(class="label") 2018]
                div(class="list_window")
                  span(class="label_primary") Robotics Institute
                  span(class="label_secondary") thesis
                  span(class="label_title") Sublinear-Time Learning and Interference for High-Dimensional Models
                  span(class="label_description") Pengju Jin, M.S. Thesis
                  span(class="label_tertiary") CMU-CS-18-103
            li
              a(href="#") #[span(class="item_title") Stress Detection for Keystroke Dynamics] #[span(class="label") 2018]
            li(class="show_more")
              button(class="button_show_more") Show More
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

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
  },
  computed: {
    department: function () {
      return {
        id: 'cb',
        abbreviation: 'cb',
        title: 'Computational Biology',
        description: 'Computational biology is a critically important and growing field that is essential to biomedical research.  The Computational Biology Department at Carnegie Mellon is part of the internationally-recognized School of Computer Science, and draws upon the incredible energy and expertise in the entire School.'
      };
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
  directory() {
    let filtered = [];
    let departmentFilter = this.$store.state.route.params.department;
    let random_indexes = [];
    let directory_length = this.$store.state.directory.list.length;
    let maxCount = 12;

    if (directory_length > 0 && !filtered.length) {
      for(let i = 0; i <= directory_length * 2; i++) {
        if (filtered.length === maxCount) {
          break;
        }

        let rand_num = Math.floor(Math.random() * (directory_length - 1));
        let person = this.$store.state.directory.list[rand_num];

        if (person.scs_relationship_class !== 'faculty' || !person.image_url || random_indexes.includes(rand_num)) {
          continue;
        }

        if(person.departments.includes(departmentFilter) || !departmentFilter) {
          filtered.push(person);
          random_indexes.push(rand_num);
        }
      }
    }
    return filtered;
  },
  data () {
    return {
      title: 'Human-Computer Interaction - Departments',
      page_title_label: 'Departments',
      page_title_link: '/departments',
      header_class: 'pulled has_back'
    }
  },
  asyncData ({ store, route: { params: { department }}} ) {
    return store.dispatch('GET_DIRECTORY', { department });
  },
}
</script>
