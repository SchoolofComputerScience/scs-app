<template lang="pug">
// filter list for publications

div.visible(class="gutter-xl filter_item_list", data-filter="publications")
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
</template>

<script>

export default {
  name: 'tab-publications',
  props: [
    "contentData"
  ]
}
</script>
