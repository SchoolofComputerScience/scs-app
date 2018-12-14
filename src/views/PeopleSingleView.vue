<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main
        section(class="page_meta")
          a(href="#", class="button_back") back
          span(class="label_page_meta_title") Robotics Institute
        section(class="content_bio")
          div(class="gutter-medium")
            div(class="col-1-2")
              img(src="../assets/images/placeholders/bio_image.jpg", alt="Profile Photo")
            div(class="col-1-2")
              h1 David Touretzky
              p Courtesy Faculty Member, Research Professor
              div(class="content_tags")
                span(class="label_tags") Faculty
                span(class="label_tags") Research
              div(class="contact_table")
                div(class="contact_row")
                  p Phone
                  p 412-268-7561
                div(class="contact_row")
                  p Email
                  p #[a(href="mailto:dst@cs.cmu.edu") dst@cs.cmu.edu]
                div(class="contact_row")
                  p Office
                  p 9013
                div(class="contact_row")
                  p Homepage
                  p #[a(href="http://cs.cmu.edu/~dst/") cs.cmu.edu/~dst/]
        section(class="content_filter")
          button(class="filter_item active", data-filter="publications") #[span publications] #[span 224]
          button(class="filter_item", data-filter="courses") #[span upcoming courses] #[span 4]
          button(class="filter_item", data-filter="research") #[span research areas] #[span 3]
        section(class="content_list")

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

          // filter list for publications

          div(class="gutter-xl filter_item_list visible", data-filter="publications")
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

          // filter list for research areas

          div(class="filter_item_list list_cards", data-filter="research")
            div(class="list_card")
              a(href="#", class="link_absolute") Cognitive robotics
              div
                span(class="item_title") Cognitive robotics
            div(class="list_card")
              a(href="#", class="link_absolute") Computer science education
              div
                span(class="item_title") Computer science education
            div(class="list_card")
              a(href="#", class="link_absolute") Computational neuroscience
              div
                span(class="item_title") Computational neuroscience
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
      title: 'David Touretzky - People',
      page_title_label: 'People',
      header_class: 'pulled single',
    }
  }
}
</script>
