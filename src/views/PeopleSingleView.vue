<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
    )

    div(class="container" v-if="person")
      main
        section(class="page_meta")
          a(href="/people", class="button_back") back
          span(
            class="label_page_meta_title"
            v-for="department in departments"
            v-if="departments.length <= 1"
            ) {{department}}
          div(
            class="page_meta_dropdown"
            v-if="departments.length > 1"
            )
            div(
              class="page_meta_dropdown_list"
              )
              span(
                class="label_page_meta_title"
                v-for="department in departments"
                ) {{department}}
        section(class="content_bio")
          div(class="gutter-medium")
            div(class="col-1-2")
              img(:src="person.image_url", alt="Profile Photo")
            div(class="col-1-2")
              h1 {{person.display_name}}
              p {{primaryPosition.scs_position_desc}}, {{primaryPosition.title}}
              div(class="content_tags")
                span(class="label_tags") Faculty
                span(class="label_tags") Research
              div(class="contact_table")
                div(class="contact_row" v-if="!person.phone_full.includes('null') && person.phone_full")
                  p Phone
                  p #[a(:href="'tel:' + person.phone_full_call")]{{person.phone_full}}
                div(class="contact_row" v-if="person.display_email")
                  p Email
                  p #[a(v-bind:href="'mailto:' + person.email") {{person.display_email}}]
                div(class="contact_row" v-if="primaryPosition.room")
                  p Office
                  p {{primaryPosition.room}}
                div(class="contact_row" v-if="person.homepage_url")
                  p Homepage
                  p #[a(:href="person.homepage_url") {{person.homepage_url}}]

        Tabs(:tabs="tab_data")

    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import _ from 'lodash';
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
  data () {
    return {
      tab: 'David Touretzky - People',
      page_title_label: 'People',
      header_class: 'pulled single',
    }
  },
  methods: {
    firstCaps: function (str) {
      return str.split(/\s/).map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }).join(' ');
    }
  },
  computed: {
    tab_data () {
      return [{
        name: 'Publications',
        component: TabPublications
      }, {
        name: 'Courses',
        component: TabCourses
      }, {
        name: 'Research Areas',
        component: TabResearchAreas
      }];
    },
    departments: function () {
      let scid = this.$route.params.scid;
      let directoryListing = this.$store.state.directory.list.find((p) => {
        return p.scid === scid;
      });

      return directoryListing.departments.map((departmentId) => {
        let department = this.$store.state.department.scs_list.find((d) => {
          return d.department_id === departmentId;
        });

        return department.department_name;
      });
    },
    person: function () {
      return this.$store.state.member[this.$route.params.scid];
    },
    primaryPosition: function () {
      let person = this.$store.state.member[this.$route.params.scid];

      return _.first((person.positions || []).filter(function (position) {
        return position.primary_position_indicator;
      }));
    }
  },
  asyncData ({ store, route }) {
    store.dispatch('GET_SCS_DEPARTMENT_LIST');
    store.dispatch('GET_DIRECTORY');
    store.dispatch('FETCH_MEMBER', route.params.scid)
  }
}
</script>
