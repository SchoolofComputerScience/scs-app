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
          h1 News
        section(class="page_blocks have_tags")
          div(class="page_block_container visible")
            div(
              class="page_block news_item promoted"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_1.jpg')})`}"
            )
              a(href="#", class="link_absolute") New CMU Degree Prepares Researchers for AI-Directed Experimentation
              div(class="page_block_labels")
                span(class="page_block_label") oct 9
              div(class="page_block_content")
                span(class="page_block_title") New CMU Degree Prepares Researchers for AI-Directed Experimentation
                span(class="page_block_subtitle") Artificial Intelligence Will Drive More Decisions in Biological Experiments
              div(class="page_block_tags")
                span robotics institute
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_2.jpg')})`}"
            )
              a(href="#", class="link_absolute") PopSci Recognizes Wheel-Track With "Best of What's New" Award
              div(class="page_block_labels")
                span(class="page_block_label") nov 27
              div(class="page_block_content")
                span(class="page_block_title") PopSci Recognizes Wheel-Track With "Best of What's New" Award
              div(class="page_block_tags")
                span robotics institute
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_3.jpg')})`}"
            )
              a(href="#", class="link_absolute") Farber Elected 2018 AAAS Fellow
              div(class="page_block_labels")
                span(class="page_block_label") nov 27
              div(class="page_block_content")
                span(class="page_block_title") Farber Elected 2018 AAAS Fellow
              div(class="page_block_tags")
                span institute for software research
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_5.jpg')})`}"
            )
              a(href="#", class="link_absolute") Bajpai, Wang Earn Stehlik Scholarships
              div(class="page_block_labels")
                span(class="page_block_label") nov 21
              div(class="page_block_content")
                span(class="page_block_title") Bajpai, Wang Earn Stehlik Scholarships
              div(class="page_block_tags")
                span computer science
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_home_4.png')})`}"
            )
              a(href="#", class="link_absolute") Carnegie Mellon University, Microsoft Join Forces to Advance Edge Computing Research
              div(class="page_block_labels")
                span(class="page_block_label") nov 14
              div(class="page_block_content")
                span(class="page_block_title") Carnegie Mellon University, Microsoft Join Forces to Advance Edge Computing Research
              div(class="page_block_tags")
                span computational biology
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_page_nov_13.jpg')})`}"
            )
              a(href="#", class="link_absolute") Neural Nets Supplant Marker Genes in Analyzing Single Cell RNA Sequencing
              div(class="page_block_labels")
                span(class="page_block_label") nov 13
              div(class="page_block_content")
                span(class="page_block_title") Neural Nets Supplant Marker Genes in Analyzing Single Cell RNA Sequencing
              div(class="page_block_tags")
                span computational biology
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_page_nov_12.jpg')})`}"
            )
              a(href="#", class="link_absolute") High Stakes
              div(class="page_block_labels")
                span(class="page_block_label") nov 12
              div(class="page_block_content")
                span(class="page_block_title") High Stakes
              div(class="page_block_tags")
                span institute for software research
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_page_nov_6.jpg')})`}"
            )
              a(href="#", class="link_absolute") Sandholm, Brown To Receive Minsky Medal
              div(class="page_block_labels")
                span(class="page_block_label") nov 6
              div(class="page_block_content")
                span(class="page_block_title") Sandholm, Brown To Receive Minsky Medal
              div(class="page_block_tags")
                span computer science
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_page_nov_1.jpg')})`}"
            )
              a(href="#", class="link_absolute") Sadeh Speaks on Plenary Panel About Data Protection and Privacy
              div(class="page_block_labels")
                span(class="page_block_label") nov 1
              div(class="page_block_content")
                span(class="page_block_title") Sadeh Speaks on Plenary Panel About Data Protection and Privacy
              div(class="page_block_tags")
                span institute for software research
            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_page_oct_30.jpg')})`}"
            )
              a(href="#", class="link_absolute") Faculty Profile: Fang Finds Fulfilment in AI for Social Good
              div(class="page_block_labels")
                span(class="page_block_label") oct 30
              div(class="page_block_content")
                span(class="page_block_title") Faculty Profile: Fang Finds Fulfilment in AI for Social Good
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
      title: 'News from the School of Computer Science',
      page_title_label: 'News',
      header_class: 'pulled'
    }
  }
}
</script>
