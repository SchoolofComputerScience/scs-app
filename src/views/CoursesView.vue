<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main(class="pushed")
        section(class="page_title")
          h1 The leader in all facets of computer science and robotics education.
        section(class="search")
          div(class="search_bar")
            button(class="search", name="Search inline button") Search
            label(for="search_courses", class="label_hidden") Search Fall '18 Courses
            input(type="text", id="search_courses", placeholder="Search Fall '18 Courses", title="Search Fall '18 Courses")
        section(class="promoted")
          h2 Courses by department
          ul(class="leading_numbers multi_column_3 theme_courses")
            li
              a(href="#") #[span 106] Computer Science
            li
              a(href="#") #[span 51] Robotics
            li
              a(href="#") #[span 42] Computational Biology
            li
              a(href="#") #[span 36] Software Engineering
            li
              a(href="#") #[span 31] Human-Computer Interaction
            li
              a(href="#") #[span 28] Language Technologies
            li
              a(href="#") #[span 21] Machine Learning
            li
              a(href="#") #[span 3] Interdisciplinary
            li
              a(href="#", class="view_all") View All
          h2 Courses by program
          ul(class="leading_numbers theme_courses")
            li
              a(href="#") #[span 159] Graduate Programs
            li
              a(href="#") #[span 168] Undergraduate Programs
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
      title: 'Courses',
      page_title_label: 'Courses',
      header_class: 'pushed'
    }
  }
}
</script>
