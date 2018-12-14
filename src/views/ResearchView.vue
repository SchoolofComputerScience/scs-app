<template lang="pug">
  .wrapper
    NavDrawer
    header(v-bind:class="header_class")
      div(class="container")
        a(href="/", class="link_logo")
          img(src="../assets/images/logo-color.svg" class="logo", alt="CMU CS Logo")
        span(v-if="page_title_label" class="section_title has_list") {{page_title_label}}
          ul
            li(data-anchor="machine-learning") Machine Learning
            li(data-anchor="robotics") Robotics
            li(data-anchor="human-computer-interaction") Human-Computer Interaction
            li(data-anchor="artificial-intelligence") Artificial Intelligence
            li(data-anchor="computer-vision") Computer Vision
            li(data-anchor="natural-language-processing") Natural Language Processing
            li(data-anchor="programming-languages") Programming Languages
            li(data-anchor="computational-biology") Computational Biology
            li(data-anchor="software-engineering") Software Engineering
            li(data-anchor="computer-graphics") Computer Graphics
            li(data-anchor="distributed-systems") Distributed Systems
            li(data-anchor="statistics") Statistics
            li(data-anchor="learning-sciences") Learning Sciences
            li(data-anchor="formal-methods") Formal Methods
            li(data-anchor="data-mining") Data Mining
        nav(class="main_nav")
          button(class="open_menu") Open Menu
          button(class="launch_explore js_launch_explore desktop") Launch Explore
          button(class="launch_search js_launch_search desktop") Launch Search

    div(class="container")
      main
        section(class="page_title hidden_content")
          h1 Research Areas
        section(class="content_list")
          div(class="list_cards visible")
            div(class="list_card")
              a(href="#", class="link_absolute") Machine Learning
              div
                span(class="item_title") Machine Learning
                span(class="label") #[a(href="#") 24 people] #[a(href="#") 12 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Robotics
              div
                span(class="item_title") Robotics
                span(class="label") #[a(href="#") 42 people] #[a(href="#") 1,205 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Human-Computer Interaction
              div
                span(class="item_title") Human-Computer Interaction
                span(class="label") #[a(href="#") 31 people] #[a(href="#") 842 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Artificial Intelligence
              div
                span(class="item_title") Artificial Intelligence
                span(class="label") #[a(href="#") 14 people] #[a(href="#") 322 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Computer Vision
              div
                span(class="item_title") Computer Vision
                span(class="label") #[a(href="#") 78 people] #[a(href="#") 362 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Natural Language Processing
              div
                span(class="item_title") Natural Language Processing
                span(class="label") #[a(href="#") 98 people] #[a(href="#") 2,582 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Programming Languages
              div
                span(class="item_title") Programming Languages
                span(class="label") #[a(href="#") 39 people] #[a(href="#") 255 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Computational Biology
              div
                span(class="item_title") Computational Biology
                span(class="label") #[a(href="#") 138 people] #[a(href="#") 966 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Software Engineering
              div
                span(class="item_title") Software Engineering
                span(class="label") #[a(href="#") 51 people] #[a(href="#") 843 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Computer Graphics
              div
                span(class="item_title") Computer Graphics
                span(class="label") #[a(href="#") 19 people] #[a(href="#") 319 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Distributed Systems
              div
                span(class="item_title") Distributed Systems
                span(class="label") #[a(href="#") 93 people] #[a(href="#") 1,052 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Statistics
              div
                span(class="item_title") Statistics
                span(class="label") #[a(href="#") 46 people] #[a(href="#") 996 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Learning Sciences
              div
                span(class="item_title") Learning Sciences
                span(class="label") #[a(href="#") 188 people] #[a(href="#") 2,525 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Formal Methods
              div
                span(class="item_title") Formal Methods
                span(class="label") #[a(href="#") 83 people] #[a(href="#") 449 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Data Mining
              div
                span(class="item_title") Data Mining
                span(class="label") #[a(href="#") 34 people] #[a(href="#") 66 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Ubiquitous Computing
              div
                span(class="item_title") Ubiquitous Computing
                span(class="label") #[a(href="#") 86 people] #[a(href="#") 447 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Social Computing
              div
                span(class="item_title") Social Computing
                span(class="label") #[a(href="#") 106 people] #[a(href="#") 3,552 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Security
              div
                span(class="item_title") Security
                span(class="label") #[a(href="#") 37 people] #[a(href="#") 129 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Human-Robot Interaction
              div
                span(class="item_title") Human-Robot Interaction
                span(class="label") #[a(href="#") 155 people] #[a(href="#") 1,868 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Algorithyms
              div
                span(class="item_title") Algorithyms
                span(class="label") #[a(href="#") 72 people] #[a(href="#") 3,323 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Social Network Analysis
              div
                span(class="item_title") Social Network Analysis
                span(class="label") #[a(href="#") 28 people] #[a(href="#") 126 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Privacy
              div
                span(class="item_title") Privacy
                span(class="label") #[a(href="#") 58 people] #[a(href="#") 311 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Motion Planning
              div
                span(class="item_title") Motion Planning
                span(class="label") #[a(href="#") 15 people] #[a(href="#") 405 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Mobile Computing
              div
                span(class="item_title") Mobile Computing
                span(class="label") #[a(href="#") 21 people] #[a(href="#") 121 publications]
            div(class="list_card")
              a(href="#", class="link_absolute") Reinforcement Learning
              div
                span(class="item_title") Reinforcement Learning
                span(class="label") #[a(href="#") 91 people] #[a(href="#") 158 publications]









    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';

export default {
  name: 'pub-view',
  components: {
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
  },
  data () {
    return {
      title: 'Research Areas',
      page_title_label: 'Research',
      header_class: 'pulled'
    }
  }
}
</script>
