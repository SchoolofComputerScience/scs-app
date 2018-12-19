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
          a(href="/news", class="button_back") back
          span(class="label_page_meta_title") robotics institute
        section(class="content_media")
          div(class="gutter-xl")
            div(class="col-1-2")
              h1 New CMU Degree Prepares Researchers for AI-Directed Experimentation
              p(class="content_byline") Written by #[a(href="#") Byron Spice] on #[span Tuesday, October 9, 2018]
              h2(class="content_subtitle") Artificial Intelligence Will Drive More Decisions in Biological Experiments
            div(class="col-1-2")
              img(src="../assets/images/placeholders/news_home_1.jpg", alt="Title of main story image")
          div(class="content_story")
            p Computers increasingly are helping scientists identify and select experiments necessary for scientific discoveries, so Carnegie Mellon University has created a two-year master's degree program to train specialists needed to design, configure, operate and maintain these systems.
            p CMU's Computational Biology Department will offer the Master of Science in Automated Science: Biological Experimentation beginning in fall 2019 and is accepting applications for its initial class through Dec. 1.
            p "Automation has disrupted numerous industries and is poised to radically transform the pace and economics of scientific research in academia and industry," said Robert F. Murphy, head of the Computational Biology Department and co-director of the new master's degree program. "We will train students to become leaders in this new field, where automated instruments and artificial intelligence combine to produce scientific discoveries."
            p Automation such as high-throughput screening is a standard means of experimentation for drug discovery and of basic biological science. Advances in AI and machine learning now make it possible and — given the complexity and scope of today's experiments — even preferable for computers to choose which experiments will fill gaps in knowledge and which only duplicate knowledge and can be skipped.
            p "The goal is to develop self-driving instruments, similar to self-driving cars that require little if any help from their occupants," Murphy said. "The need for human intervention in experiments will be minimal, though creating these automated systems and planning experiments will require people who are familiar both with experimental methods and with the machine learning and statistical methods necessary to construct predictive models."
            p "This exciting new program in automated science will break new ground while building upon the unique strengths of Carnegie Mellon," said Carnegie Mellon President Farnam Jahanian. "By training a new generation to develop and use 'self-driving instruments' that combine artificial intelligence with automated research instruments, we will play a leading role in advancing new paradigms in discovery and changing the way that experimental science is done."
            p Christopher Langmead, associate professor of computational biology and co-director with Murphy of the master's program, said the initial concentration will be in biological experimentation, but additional subject areas are expected to be added in coming years.
            p The program seeks to attract students who are preparing for laboratory careers and otherwise might pursue master's degrees in biology or chemistry. It will train students for jobs such as laboratory automation specialists and automation engineers. It also will provide excellent preparation for students contemplating Ph.D. studies in related disciplines.
            p To ensure that it meets industry needs, the program will have an external advisory board drawn from potential employers.
            p "This program will provide a major boost to the scientific automation field and I am very happy to be involved with it," said DJ Kleinbaum, an external advisory board member and co-founder of Emerald Cloud Lab, a California company that provides automated solutions for contract research.
            p The MSASBE program will provide training in three areas:
            ul
              li Hands-on use of automated instruments and study of their design principles, interfaces and capabilities;
              li Computational methods for constructing predictive models from experimental data; and
              li Algorithmic methods for experimental design and selection
            p The interdisciplinary program will draw on faculty from CMU's Computational Biology Department, Machine Learning Department, Computer Science Department, Department of Biological Sciences, Department of Chemistry, Mechanical Engineering Department and Biomedical Engineering Department]

        section(class="page_blocks have_tags")
          h2 related
          div(class="page_block_container visible")

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
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_single_related_item_2.jpg')})`}"
            )
              a(href="#", class="link_absolute") Advancing Robotics Will Boost U.S. Manufacturing Competitiveness
              div(class="page_block_labels")
                span(class="page_block_label") oct 25
              div(class="page_block_content")
                span(class="page_block_title") Advancing Robotics Will Boost U.S. Manufacturing Competitiveness
              div(class="page_block_tags")
                span robotics institute

            div(
              class="page_block news_item"
              :style="{'background-image': `url(${require('../assets/images/placeholders/news_single_related_item_3.jpg')})`}"
            )
              a(href="#", class="link_absolute") Carnegie Mellon Team Dives Into DARPA Subterranean Challenge
              div(class="page_block_labels")
                span(class="page_block_label") sep 27
              div(class="page_block_content")
                span(class="page_block_title") Carnegie Mellon Team Dives Into DARPA Subterranean Challenge
              div(class="page_block_tags")
                span robotics institute

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
      title: 'News - Single',
      page_title_label: 'News',
      header_class: 'pulled single'
    }
  }
}
</script>
