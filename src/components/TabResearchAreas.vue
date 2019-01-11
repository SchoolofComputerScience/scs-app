<template lang="pug">
  ResearchAreaGrid(
    :researchAreas="researchAreas"
    :hasHeadline="false"
    :minShow="4"
    :numToAdd="2"
  )
</template>

<script>

import ResearchAreaGrid from './ResearchAreaGrid.vue';

export default {
  name: 'tab-research_areas',
  components: {
    ResearchAreaGrid
  },
  computed: {
    researchAreas: function () {
      // TODO: i believe we will have a conditional here...
      // currently this is only being used on a single 
      // person page, but it is possible that this tab 
      // item can be used elsewhere, if so, then it will 
      // be the responsibility of this function to determine 
      // where it is being used and return the correct data...
      
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
    }
  }
}
</script>
