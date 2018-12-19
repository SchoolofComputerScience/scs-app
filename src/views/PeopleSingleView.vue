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
          a(href="/people", class="button_back") back
          span(class="label_page_meta_title") Robotics Institute
        section(class="content_bio")
          div(class="gutter-medium")
            div(class="col-1-2")
              img(src="../assets/images/placeholders/bio_image.jpg", alt="Profile Photo")
            div(class="col-1-2")
              h1 David Touretzky
              p Courtesy Faculty Member, Research Professor
              div(class="content_tags")
                span(class="label_tags") Faculty
                span(class="label_tags") Research
              div(class="contact_table")
                div(class="contact_row")
                  p Phone
                  p 412-268-7561
                div(class="contact_row")
                  p Email
                  p #[a(href="mailto:dst@cs.cmu.edu") dst@cs.cmu.edu]
                div(class="contact_row")
                  p Office
                  p 9013
                div(class="contact_row")
                  p Homepage
                  p #[a(href="http://cs.cmu.edu/~dst/") cs.cmu.edu/~dst/]

        Tabs(:tabs="tab_data")

    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import NewHeader from '../components/NewHeader.vue';
import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import Tabs from '../components/Tabs.vue';
import TabPublications from '../components/TabPublications.vue';
import TabCourses from '../components/TabCourses.vue';
import TabResearchAreas from '../components/TabResearchAreas.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';

export default {
  name: 'person-view',
  props: ['member'],
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    Tabs
  },
  computed: {
    tab_data () {

      let tabs = [{
        name: 'Publications',
        component: TabPublications,
        data: []
      }, {
        name: 'Courses',
        component: TabCourses,
        data: [{"course_id":"F18-05434","course_number":"05434","title":"Machine Learning in Practice","__typename":"ResearchAreasCourse"},{"course_id":"F18-05834","course_number":"05834","title":"Applied Machine Learning","__typename":"ResearchAreasCourse"},{"course_id":"F18-10601","course_number":"10601","title":"Introduction to Machine Learning (Master's)","__typename":"ResearchAreasCourse"},{"course_id":"F18-10611","course_number":"10611","title":"MS DAP Research","__typename":"ResearchAreasCourse"},{"course_id":"F18-10701","course_number":"10701","title":"Introduction to Machine Learning (PhD)","__typename":"ResearchAreasCourse"},{"course_id":"F18-10715","course_number":"10715","title":"Advanced Introduction to Machine Learning","__typename":"ResearchAreasCourse"},{"course_id":"F18-10910","course_number":"10910","title":"PhD DAP Research","__typename":"ResearchAreasCourse"},{"course_id":"F18-11344","course_number":"11344","title":"Machine Learning in Practice","__typename":"ResearchAreasCourse"},{"course_id":"F18-11663","course_number":"11663","title":"Applied Machine Learning","__typename":"ResearchAreasCourse"},{"course_id":"F18-11777","course_number":"11777","title":"Advanced Multimodal Machine Learning","__typename":"ResearchAreasCourse"},{"course_id":"F18-17428","course_number":"17428","title":"Machine Learning and Sensing","__typename":"ResearchAreasCourse"},{"course_id":"F18-17728","course_number":"17728","title":"Machine Learning and Sensing","__typename":"ResearchAreasCourse"}]
      }, {
        name: 'Research Areas',
        component: TabResearchAreas,
        data: [{"area_id":"machine_learning","title":"Machine Learning","description":"","gs_count":14,"__typename":"ResearchAreas"}, {"area_id":"distributed_systems","title":"Distributed Systems","description":"From entertainment to finance to the natural sciences, modern computation increasingly happens across thousands and millions of computing elements working together. Research in distributed systems focuses on developing algorithms, programming models, and implementation strategies for creating functional, usable, and high-performance distributed systems. Research areas of the field include consensus, routing, atomicity, adverse cooperation, and distributed approximation.","gs_count":13,"__typename":"ResearchAreas"},{"area_id":"statistics","title":"Statistics","description":"","gs_count":12,"__typename":"ResearchAreas"},{"area_id":"learning_sciences","title":"Learning Sciences","description":"","gs_count":10,"__typename":"ResearchAreas"},{"area_id":"formal_methods","title":"Formal Methods","description":"","gs_count":10,"__typename":"ResearchAreas"},{"area_id":"data_mining","title":"Data Mining","description":"","gs_count":9,"__typename":"ResearchAreas"}]
      }];

      return tabs;
    }
  },
  data () {
    return {
      title: 'David Touretzky - People',
      page_title_label: 'People',
      header_class: 'pulled single',
    }
  }
}
</script>
