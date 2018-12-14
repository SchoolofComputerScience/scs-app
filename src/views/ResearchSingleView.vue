<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main
        section(
          class="page_header min"
          :style="{'background-image': `url(${require('../assets/images/placeholders/research_header.jpg')})`}"
        )
          div(class="page_header_title")
            h1 Machine Learning
          div(class="page_header_description")
            p(class="page_description") Machine learning is a branch of computer science and statistics in which many training examples of a phenomenon are used to automatically generate a predictive model, which can then be used to predict future instances of the phenomenon.
            div(class="page_jump")
              p departments: #[a(class="page_jump_link") mL] | #[a(class="page_jump_link") RI]

        section(class="content_filter")
          button(class="filter_item active", data-filter="people") #[span people] #[span 224]
          button(class="filter_item", data-filter="publications") #[span publications] #[span 4]
          button(class="filter_item", data-filter="courses") #[span upcoming courses] #[span 3]

        section(class="content_list")

          div(class="page_block_container filter_item_list visible" data-filter="people")
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
            a(href="#", class="view_all") View All

          // filter list for publications

          div(class="gutter-xl filter_item_list", data-filter="publications")
            div(class="col-1-3")
              div(class="filter_column filter_list")
                div(class="pane_toggle")
                  span(class="pane_toggle_item active") by Research Area
                div(class="pane_result")
                  button(class="pane_result_item", data-filter="all") #[span All] #[span 17]
                  button(class="pane_result_item") #[span Cognitive robotics] #[span 12]
                  button(class="pane_result_item active") #[span Computational neuroscience] #[span 4]
                  button(class="pane_result_item") #[span Computer science education] #[span 1]
              button(class="filter_toggle") by category
            div(class="col-2-3")
              ul(class="list_stacked list_multi_column theme_publications visible")
                li
                  a(href="#") #[span(class="item_title") On the role of robot simulations in embodied cognitive science] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") Couplets: Helping Elementary School Students Recognize Structure in Code] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") Demonstrating the Ability of Elementary School Students to Reason about Programs] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") Calypso for Cozmo: Robotic AI for Everyone] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") Semantic Reasoning in Young Programmers] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") Computational thinking and mental models: From kodu to calypso] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") Evaluating the Effect of Using Physical Manipulatives to Foster Computational Thinking] #[span(class="label") 2018]
                  div(class="list_window")
                    span(class="label_primary") Robotics Institute
                    span(class="label_secondary") pub type
                    span(class="label_title") Evaluating the Effect of Using Physical Manipulatives to Foster Computational Thinking in Elementary School
                    span(class="label_description") Ashish Aggarwal, Christina Gardner-McCune, David S Touretzky
                    span(class="label_tertiary") pub #id
                li
                  a(href="#") #[span(class="item_title") Semantic reasoning in young programmers] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") CNBC Matlab Mini-Course] #[span(class="label") 2018]
                li
                  a(href="#") #[span(class="item_title") On the role of robot simulations in embodied cognitive science] #[span(class="label") 2018]
                li(class="show_more")
                  button(class="button_show_more") Show More

          // filter list for courses

          ul(class="filter_item_list list_stacked list_multi_column theme_courses" data-filter="courses")
            li
              a(href="#") #[span(class="item_title") Rapid Prototyping Technologies] #[span(class="label") fall '18] #[span(class="label") undergraduate]
            li
              a(href="#") #[span(class="item_title") Artifical Intelligence: Representation and Problem Solving] #[span(class="label") fall '18] #[span(class="label") undergraduate]
            li
              a(href="#") #[span(class="item_title") Intermediate Rapid Prototyping] #[span(class="label") fall '18] #[span(class="label") undergraduate]
            li
              a(href="#") #[span(class="item_title") Cognitive Robotics] #[span(class="label") spring '19] #[span(class="label") undergraduate]
              div(class="list_window")
                span(class="label_primary") Robotics Institute
                span(class="label_secondary") 15-494/694
                span(class="label_title") Cognitive Robotics
                span(class="label_description") This course will explore the future of robot toys by analyzing and programming Anki Cozmo, a new robot with built-in artificial...
                span(class="label_tertiary") undergraduate

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
      title: 'Machine Learning - Research Areas',
      page_title_label: 'Research',
      header_class: 'pulled has_back'
    }
  }
}
</script>
