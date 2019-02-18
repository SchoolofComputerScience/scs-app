<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main
        section(class="page_title")
          h1 2,198 people working across<br> 39 research areas and 7 departments.
        section(class="search")
          div(class="search_bar")
            button(class="search", name="Search People") Search
            label(for="search_people", class="label_hidden") Search People
            input(type="text", id="search_people", placeholder="Search People", title="Search People")
        section(class="promoted")
          div(class="gutter")
            div(class="col-1-3")
              h2 By type
              ul(class="leading_numbers theme_people")
                li
                  a(href="#") #[span 943] Students
                li
                  a(href="#") #[span 922] Staff
                li
                  a(href="#") #[span 253] Faculty
                li
                  a(href="#") #[span 168] Research
              h2 By department
              ul(class="leading_numbers theme_people")
                li
                  a(href="#") #[span 300] Computational Biology
                li
                  a(href="#") #[span 498] Computer Science
                li
                  a(href="#") #[span 300] Human-Computer Interaction
                li
                  a(href="#") #[span 200] Institute for Software Research
                li
                  a(href="#") #[span 198] Language Technologies
                li
                  a(href="#") #[span 88] Machine Learning
                li
                  a(href="#") #[span 99] Robotics Institute
            div(class="col-2-3")
              h2 By research area
              ul(class="leading_numbers multi_column_2 theme_people")
                li
                  a(href="#") #[span 63] Machine Learning
                li
                  a(href="#") #[span 25] Robotics
                li
                  a(href="#") #[span 35] Human-Computer Interaction
                li
                  a(href="#") #[span 44] Artificial Intelligence
                li
                  a(href="#") #[span 62] Computer Vision
                li
                  a(href="#") #[span 29] Natural Language Processing
                li
                  a(href="#") #[span 18] Computer Programming
                li
                  a(href="#") #[span 11] Computational Biology
                li
                  a(href="#") #[span 18] Software Engineering
                li
                  a(href="#") #[span 18] Computer Graphics
                li
                  a(href="#") #[span 18] Privacy
                li
                  a(href="#") #[span 18] Motion Planning
                li
                  a(href="#") #[span 18] Mobile Computing
                li
                  a(href="#") #[span 18] Control
                li
                  a(href="#") #[span 18] Big Data
                li
                  a(href="#") #[span 18] Speech Processing
                li
                  a(href="#") #[span 18] Optimization
                li
                  a(href="#") #[span 18] Networking
                li
                  a(href="#") #[span 18] Writing
                li
                  a(href="#") #[span 18] Logic
                li
                  a(href="#") #[span 18] Web Search Engines
                li
                  a(href="#") #[span 18] Distributed Systems
                li
                  a(href="#") #[span 18] Statistics
                li
                  a(href="#") #[span 18] Learning Sciences
                li
                  a(href="#") #[span 18] Formal Methods
                li
                  a(href="#") #[span 18] Data Mining
                li
                  a(href="#") #[span 18] Ubiquitous Computing
                li
                  a(href="#") #[span 18] Social Computing
                li
                  a(href="#") #[span 18] Security
                li
                  a(href="#") #[span 18] Human-Robot Interaction
                li
                  a(href="#") #[span 18] Algorithms
                li
                  a(href="#") #[span 18] Social Network Analysis
                li
                  a(href="#") #[span 18] Reinforcement Learning
                li
                  a(href="#") #[span 18] Machine Translation
                li
                  a(href="#") #[span 18] Informal Retrieval
                li
                  a(href="#") #[span 18] Educational Data Mining
                li
                  a(href="#") #[span 18] Crowd Sourcing
                li
                  a(href="#") #[span 18] Computer Architecture
                li
                  a(href="#") #[span 18] Software Architecture
                li
                  a(href="#", class="view_all") View All
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
      title: 'People',
      page_title_label: 'People',
      header_class: 'pushed',
    }
  }
}
</script>
