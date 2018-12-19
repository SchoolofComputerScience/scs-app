<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader
    main
      div(class="container")
        section(class="page_title large")
          h1 Discover
        section(class="statement")
          div(class="gutter-xl flex")
            div(class="col-5-7")
              p Carnegie Mellon's School of Computer Science is widely recognized as one of the first and best computer science programs in the world. Our programs train the next generation of innovators to solve real-world problems and improve the way people live and work.
            div(class="col-2-7")
              a(class="link_more") more

      section(class="contrast_bar")
        div(class="container")
          div(class="gutter-xl")
            div(class="col-2-3")
              div(class="search_bar dark")
                button(class="search", name="Search inline button") Search
                label(for="search_inline")
                input(type="text", id="search_inline", placeholder="Search the School of Computer Science", title="Search this website")
            div(class="col-1-3")
              p(class="micro") Not sure where to look?
              a(class="link_explore") Explore the CMU School<br> of Computer Science

      section(class="page_blocks")
        div(class="container")
          div(class="page_block_container visible")

            div(
              class="page_block news_item promoted"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_1.jpg')})`}"
            )
              a(href="/news/single") New CMU Degree Prepares Researchers for AI-Directed Experimentation
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") oct 9
              div(class="page_block_content")
                span(class="page_block_title") New CMU Degree Prepares Researchers for AI-Directed Experimentation
                span(class="page_block_subtitle") Artificial Intelligence Will Drive More Decisions in Biological Experiments

            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_2.jpg')})`}"
            )
              a(href="/news/single") PopSci Recognizes Wheel-Track With "Best of What's New" Award
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") nov 27
              div(class="page_block_content")
                span(class="page_block_title") PopSci Recognizes Wheel-Track With "Best of What's New" Award

            div(class="page_block event")
              a(href="/events/single") Field Robotics Center Seminar
              div(class="page_block_labels")
                span(class="page_block_label primary") events
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") Field Robotics Center Seminar
                span(class="page_block_description") with Rogerio Bonatti

            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_3.jpg')})`}"
            )
              a(href="/news/single") Farber Elected 2018 AAAS Fellow
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") nov 27
              div(class="page_block_content")
                span(class="page_block_title") Farber Elected 2018 AAAS Fellow

            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_5.jpg')})`}"
            )
              a(href="/news/single") Bajpai, Wang Earn Stehlik Scholarships
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") nov 21
              div(class="page_block_content")
                span(class="page_block_title") Bajpai, Wang Earn Stehlik Scholarships

            div(class="page_block event")
              a(href="/events/single") CyLab Student Seminar
              div(class="page_block_labels")
                span(class="page_block_label primary") events
                span(class="page_block_label") seminar
              div(class="page_block_content")
                div(class="page_block_date")
                  span(class="page_block_date_month") nov
                  span(class="page_block_date_day") 28
                span(class="page_block_title") CyLab Student Seminar
                span(class="page_block_description") with William Melicher

            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_4.png')})`}"
            )
              a(href="/news/single") Carnegie Mellon University, Microsoft Join Forces to Advance Edge Computing Research
              div(class="page_block_labels")
                span(class="page_block_label primary") news
                span(class="page_block_label") nov 14
              div(class="page_block_content")
                span(class="page_block_title") Carnegie Mellon University, Microsoft Join Forces to Advance Edge Computing Research

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
      title: 'Discover',
      page_title_link: false,
    }
  }
}
</script>
