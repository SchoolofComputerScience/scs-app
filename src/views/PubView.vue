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
          h1 The most diverse, interdisciplinary research establishment on the planet.
        section(class="search")
          div(class="search_bar")
            button(class="search", name="Search inline button") Search
            label(for="search_publications", class="label_hidden") Search Publications
            input(type="text", id="search_publications", placeholder="Search Publications", title="Search Publications")
        section(class="trending")
          h2 Trending publications
          ul(class="list_trending list_multi_column visible")
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Uncertainty Adaptation in Robot Perception and Learning] #[span(class="label") thesis] #[span(class="rank", style="width:100%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Annotating and Automatically Tagging Constructions of Causal Language] #[span(class="label") thesis] #[span(class="rank", style="width:60%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Eliminating Adverse Control Plane Interactions in Independent Network Systems] #[span(class="label") thesis] #[span(class="rank", style="width:50%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Influence-directed Explanations for Machine Learning] #[span(class="label") thesis] #[span(class="rank", style="width:40%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Painting with CaTS: Camera-aided Texture Synthesis] #[span(class="label") thesis] #[span(class="rank", style="width:35%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") An Application Platform for Wearable Cognitive Assistance] #[span(class="label") thesis] #[span(class="rank", style="width:30%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") The 2nd Controlled Adaptation of Self-Adaptive Systems Workshop (CASaS2017)] #[span(class="label") thesis] #[span(class="rank", style="width:25%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") The Profession of IT: Misconceptions About Computer Science] #[span(class="label") thesis] #[span(class="rank", style="width:20%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Soft Robotics: Autonomous Motility of Polymer Films] #[span(class="label") thesis] #[span(class="rank", style="width:10%")]
            li(class="theme_publications")
              a(href="#") #[span(class="item_title") Half a Century of Software Engineering Education: The CMU Exemplar] #[span(class="label") thesis] #[span(class="rank", style="width:5%")]
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
  name: 'pub-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
  },
  data () {
    return {
      title: 'Publications',
      page_title_label: 'Publications',
      header_class: 'pushed'
    }
  }
}
</script>
