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
          span(class="label_page_meta_title") computer science
        section(class="content_media")
          h1 Computer Science Speaking Skills Talk
          div(class="gutter-xl")
            div(class="col-3-5")
              div(class="emphasized")
                h2 The Brain of Databases: Forecasting, Modeling, and Planning for Self-Driving Database Management Systems
                p In the last two decades, both researchers and vendors have built advisory tools to assist database administrators (DBAs) in various aspects of system tuning and physical design. Most of this previous work, however, is incomplete because they still require humans to make the final decisions about any changes to the database and are reactionary measures that fix problems after they occur. What is needed for a truly self-driving database management system (DBMS) is a new architecture that is designed for autonomous operation. This is different than earlier attempts because all aspects of the system are controlled by an integrated planning component that not only optimizes the system for the current workload, but also predicts future workload trends so that the system can prepare itself accordingly. With this, the DBMS can support all of the previous tuning techniques without requiring a human to determine the right way and proper time to deploy them. It also enables new optimizations that are important for modern high-performance DBMSs, but which are not possible today because the complexity of managing these systems has surpassed the abilities of human experts.
                p In this talk, I will present our roadmap towards developing a self-driving DBMS. It has three main components: workload forecasting, action modeling, and planning. I will also present our solution to the first component: a forecasting framework called QueryBot 5000 that allows a DBMS to predict the expected arrival rate of queries in the future based on historical data. It provides multiple horizons (short- vs. long-term) with different aggregation intervals. We implemented our forecasting technique in an external controller for PostgreSQL and MySQL and demonstrate their effectiveness in selecting indexes. Finally, I will present our on-going project in this journey and our long-term vision.
                p Based on joint work with Dana Van Aken, Ahmed Hefny, Gustavo Mezerhane, Andrew Pavlo, and Geoffrey J. Gordon.
                p Presented in Partial Fulfillment of the CSD Speaking Skills Requirement.
            div(class="col-2-5")
              div(class="content_page_block")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                div(class="page_block_details")
                  p #[span Time:] 6:00-8:00pm
                  p #[span Location:] Tepper Quad, Simmons Auditorium

        section(class="page_blocks")
          h2 related
          div(class="page_block_container visible")

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
      header_class: 'pulled single'
    }
  }
}
</script>
