<template lang="pug">
  .wrapper
    NavDrawer
    NewHeader(
      :page_title_label="page_title_label"
      :header_class="header_class"
      :page_title_link="page_title_link"
    )
    main
      div(class="container")
        section(
          class="page_header"
          :style="{'background-image': `url(${require('../assets/images/placeholders/department_header.jpg')})`}"
        )
          div(class="page_header_title")
            h1 {{department.title}}
          div(class="page_header_description")
            p(class="page_description") {{department.description}}
            div(class="page_jump")
              a(
                :href="header_text.button_link"
                target="_blank"
                class="page_jump_button"
              ) {{ header_text.button_name }}
              div
                p(class="page_title_small") learn more about...
                a(
                  v-for="item in header_text.list"
                  :href="item.link"
                  ) {{item.name}}

        MixedGrid(
          :items="newsAndEvents"
          :title= "'News & Events'"
          :isSingle="false"
          :minShow="6"
          :numToAdd="4"
        )

        PeopleGrid(
          :directory="directory"
          :hasHeadline="true"
          )

        CourseList(
          :courses="courses"
          :hasHeadline="true"
          )

        PubList(
          :hasHeadline="hasHeadline"
          )

        ResearchAreaGrid(
          :researchAreas="researchAreas"
          :hasHeadline="hasHeadline"
          :minShow="8"
          :numToAdd="4"
        )

      section(
        class="subfooter"
        :style="{'background-image': `url(${require('../assets/images/placeholders/department_subfooter.jpg')})`}"
      )
        div(class="container")
          div(class="gutter-xl")
            div(class="col-3-5")
              h3(class="knockout") {{footer_text.description_title}}
              p {{footer_text.description}}
              a(
                :href="footer_text.description_link"
                class="button_arrow"
                ) {{footer_text.description_link_text}}
            div(class="col-2-5")
              h3 {{footer_text.list_title}}
              ul(class="list_basic")
                li(
                  v-for="item in footer_text.list"
                  )
                  a(
                    :href="item.link"
                    ) {{item.name}}
    NewFooter
    ModalExplore
    ModalSearch
</template>

<script>

import _ from 'lodash';
import NewHeader from '../components/NewHeader.vue';
import NewFooter from '../components/NewFooter.vue';
import NavDrawer from '../components/NavDrawer.vue';
import ModalExplore from '../components/ModalExplore.vue';
import ModalSearch from '../components/ModalSearch.vue';
import PeopleGrid from '../components/PeopleGrid.vue';
import CourseList from '../components/CourseList.vue';
import PubList from '../components/PubList.vue';
import ResearchAreaGrid from '../components/ResearchAreaGrid.vue';
import MixedGrid from '../components/MixedGrid.vue';

export default {
  name: 'discover-view',
  components: {
    NewHeader,
    NavDrawer,
    NewFooter,
    ModalExplore,
    ModalSearch,
    PeopleGrid,
    CourseList,
    PubList,
    ResearchAreaGrid,
    MixedGrid
  },
  data () {
    return {
      title: 'Human-Computer Interaction - Departments',
      page_title_label: 'Departments',
      page_title_link: '/departments',
      header_class: 'pulled has_back',
      hasHeadline: true,
      people_types: [
        'faculty'
      ]
    }
  },
  computed: {
    // pub(){
    //   if(this.$store.state.publication.pub[this.$route.params.pubid] !== undefined){
    //     return this.$store.state.publication.pub[this.$route.params.pubid]
    //   }
    // },
    // pbset(){
    //   return this.$store.state.publication.pub[this.$route.params.pubid] ? true : false
    // },
    courses () {
      let departmentFilter = this.$route.params.department;

      // FIXME: don't hard code me, bruh
      return this.$store.state.courses.lists['F18'].filter((course) => {
        return course.department.toLowerCase() === departmentFilter.toLowerCase();
      });
    },
    semesterCode () {
      return this.$store.state.semesterCode.code;
    },
    department: function () {
      return {
        id: 'cb',
        abbreviation: 'cb',
        title: 'Computational Biology',
        description: 'Computational biology is a critically important and growing field that is essential to biomedical research.  The Computational Biology Department at Carnegie Mellon is part of the internationally-recognized School of Computer Science, and draws upon the incredible energy and expertise in the entire School.'
      };
    },
    directory () {
      let filtered = [];
      let departmentFilter = this.$route.params.department;
      let random_indexes = [];
      let directory_length = this.$store.state.directory.list.length;
      let maxCount = 12;
      let peopleTypes = this.people_types;

      // console.log(this.$store.state.courses.lists['F18'][0]);

      return this.$store.state.directory.list.filter((person) => {
        return (
          person.departments.includes(departmentFilter) &&
          peopleTypes.includes(person.scs_relationship_class)
        );
      }).map((person) => {
        person.backgroundImage = 'background-image: url(' + person.image_url + ');';
        return person;
      });
    },
    researchAreas: function () {
      // TODO: this will be a list of research areas filtered
      // to the currently loaded department

      return [{
        area_id: 'machine_learning',
        title: 'Machine Learning'
      }, {
        area_id: 'robotics',
        title: 'Robotics'
      }, {
        area_id: 'human_computer_interaction',
        title: 'Human-Computer Interaction'
      }, {
        area_id: 'artificial_intelligence',
        title: 'Artificial Intelligence'
      }, {
        area_id: 'computer_vision',
        title: 'Computer Vision'
      }, {
        area_id: 'natural_language_processing',
        title: 'Natural Language Processing'
      }];
    },
    newsAndEvents: function () {
      // FIXME: just sampling/shuffling to show variety of neighbors, need 
      // to figure out how these are to be combined....
      
      let news = _.sampleSize((this.$store.state.news.list || []).map((data) => {
        return {
          type: 'news',
          data: data
        };
      }), 6);
      
      let events = _.sampleSize((this.$store.state.events.list || []).map((data) => {
        return {
          type: 'event',
          data: data
        };
      }), 6);
      
      return _.shuffle(
        news.concat(events)
      ).map((item, i) => {
        return item.id = i, item;
      });
    },
    header_text: function () {
      return {
        button_name: 'visit the hci website',
        button_link: 'https://hcii.cmu.edu/',
        list: [{
          name: 'Undergraduate Programs',
          link: '#',
        }, {
          name: 'Graduate Programs',
          link: '#'
        }, {
          name: 'Technical Reports',
          link: '#'
        }, {
          name: 'Research Pages',
          link: '#'
        }, {
          name: 'Faculty',
          link: '#'
        }]
      }
    },
    footer_text: function () {
      return {
        description_title: 'Programs',
        description: 'The Human-Computer Interaction Institute offers multidisciplinary undergraduate and graduate educational programs that emphasize technology for the benefit of people and society.',
        description_link: '#',
        description_link_text: 'All Programs',
        list_title: 'Popular HCI Programs',
        list: [{
          name: 'Ph.D. in HCI',
          link: '#',
        }, {
          name: 'Master of Human-Computer Interaction (MHCI)',
          link: '#'
        }, {
          name: 'Accelerated Master of Human-Computer Interaction',
          link: '#'
        }, {
          name: 'Master of Educational Technology and Applied Learning Science (METALS)',
          link: '#'
        }]
      }
    }
  },
  asyncData ({ store, route: { params: { department, pubid, scid }}} ) {
    store.dispatch('GET_SCS_DEPARTMENT_LIST');
    store.dispatch('FETCH_COURSE_LIST', 'F18');
    store.dispatch('GET_EVENTS_LIST');
    store.dispatch('GET_NEWS_LIST');
    store.dispatch('FETCH_PUBLICATION', { pubid, scid });
    return store.dispatch('GET_DIRECTORY', { department });
  }
}
</script>
