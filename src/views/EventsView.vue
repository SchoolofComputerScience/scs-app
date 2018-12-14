<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )
    div(class="container")
      main
        section(class="page_title hidden_content")
          h1 Events
        section(class="page_blocks have_tags")
          div(class="page_block_container visible")
            div(class="page_block event_item promoted")
              a(href="#", class="link_absolute") MOONSHOT x Transportation
              div(class="page_block_labels")
                span(class="page_block_label") career presentation
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                div(class="page_block_title_container")
                  span(class="page_block_title") MOONSHOT x Transportation
                  span(class="page_block_subtitle") Presented by the CMU Futurist Club, The Graduate Entrepreneurial Club, and the Transportation Club
                div(class="page_block_details")
                  p #[span Time:] 6:00-8:00pm
                  p #[span Location:] Tepper Quad, Simmons Auditorium
              div(class="page_block_tags")
                span robotics institute

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

            div(class="page_block event")
              a(href="#", class="link_absolute") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti
              div(class="page_block_tags")
                span institute for software research

          button(class="button_show_more") Show More
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
      title: 'Events from the School of Computer Science',
      page_title_label: 'Events',
      header_class: 'pulled'
    }
  }
}
</script>
