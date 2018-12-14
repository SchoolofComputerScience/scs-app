<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    main
      div(class="container")
        section(
          class="page_header"
          :style="{'background-image': `url(${require('../assets/images/placeholders/department_header.jpg')})`}"
        )
          div(class="page_header_title")
            h1 Human-Computer Interaction
          div(class="page_header_description")
            p(class="page_description") Founded in 1993, the HCII is a place where we work to understand and create technology that harmonizes with and improves human capabilities, goals, and social environments through interdisciplinary research and education in design, computer science, and behavioral and social sciences. Though housed in the School of Computer Science, the institute is truly interdisciplinary and includes faculty and students from CMU's Dietrich College of Humanities and Social Sciences, Tepper School of Business, College of Fine Arts, Carnegie Institute of Technology and Software Engineering Institute, as well as computer science.
            div(class="page_jump")
              a(class="page_jump_button",href="#") visit the hci website
              div
                p(class="page_title_small") learn more about...
                a(href="#") Undergraduate Programs
                a(href="#") Graduate Programs
                a(href="#") Technical Reports
                a(href="#") Research Pages
                a(href="#") Faculty

        section(class="page_blocks")
          h2 news &amp; events
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
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_vincent.jpg')})`}"
            )
              a(href="#", class="link_absolute") Vincent Aleven
              div(class="page_block_content")
                span(class="page_block_title") Vincent Aleven
                span(class="page_block_description") Director, Bhci Program
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_karen.jpg')})`}"
            )
              a(href="#", class="link_absolute") Karen Kornblum Berntsen
              div(class="page_block_content")
                span(class="page_block_title") Karen Kornblum Berntsen
                span(class="page_block_description") Associate Teaching Professor
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_marti.jpg')})`}"
            )
              a(href="#", class="link_absolute") Marti Louw
              div(class="page_block_content")
                span(class="page_block_title") Marti Louw
                span(class="page_block_description") Director, Learning Media Design Center
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_john.jpg')})`}"
            )
              a(href="#", class="link_absolute") John Zimmerman
              div(class="page_block_content")
                span(class="page_block_title") John Zimmerman
                span(class="page_block_description") Professor
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_judeth.jpg')})`}"
            )
              a(href="#", class="link_absolute") Judeth (Judy) Choi
              div(class="page_block_content")
                span(class="page_block_title") Judeth (Judy) Choi
                span(class="page_block_description") Human-Computer Interaction Institute
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_tianshi.jpg')})`}"
            )
              a(href="#", class="link_absolute") Tianshi Li
              div(class="page_block_content")
                span(class="page_block_title") Tianshi Li
                span(class="page_block_description")
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_anderinsola.jpg')})`}"
            )
              a(href="#", class="link_absolute") Aderinsola Akintilo
              div(class="page_block_content")
                span(class="page_block_title") Aderinsola Akintilo
                span(class="page_block_description") Human-Computer Interaction Institute
            div(
              class="page_block person"
              :style="{'background-image': `url(${require('../assets/images/placeholders/people_jennifer.jpg')})`}"
            )
              a(href="#", class="link_absolute") John Zimmerman
              div(class="page_block_content")
                span(class="page_block_title") John Zimmerman
                span(class="page_block_description") MHCI Program Coordinator

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
              h3(class="knockout") Programs
              p The Human-Computer Interaction Institute offers multidisciplinary undergraduate and graduate educational programs that emphasize technology for the benefit of people and society.
              a(href="#", class="button_arrow") All Programs
            div(class="col-2-5")
              h3 Popular HCI Programs
              ul(class="list_basic")
                li
                  a(href="#") Ph.D. in HCI
                li
                  a(href="#") Master of Human-Computer Interaction (MHCI)
                li
                  a(href="#") Accelerated Master of Human-Computer Interaction
                li
                  a(href="#") Master of Educational Technology and Applied Learning Science (METALS)
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
  data () {
    return {
      title: 'Human-Computer Interaction - Departments',
      page_title_label: 'Departments',
      header_class: 'pulled has_back'
    }
  }
}
</script>
