<template lang="pug">
section(
  class="content_list"
  )
  h2(
    v-if="hasHeadline"
    ) Publications
  ul(class="list_stacked list_multi_column theme_publications visible")
    li(
      v-for="(item, i) in publications"
      v-if="i <= itemsToShow"
      )
      a(href="#")
        span(class="item_title") {{item.name}}
        span(class="label") {{item.year}}
        div(
          v-if="item.person"
          class="list_window"
          )
          span(class="label_primary") {{item.department}}
          span(class="label_secondary") {{item.type}}
          span(class="label_title") {{item.name}}
          span(class="label_description") {{item.person}}
          span(class="label_tertiary") {{item.identification}}
    li(class="show_more")
      button(
        v-if="itemsToShow < publications.length"
        v-on:click="itemsToShow += moreItems"
        class="button_show_more"
        ) Show More
</template>

<script>

export default {
  name: 'PubList-view',
  data () {
    return {
      itemsToShow: this.minShow || 4,
      moreItems: this.numToAdd || 5,
    }
  },
  props: [
    'hasHeadline',
    'minShow',
    'numToAdd'
  ],
  computed: {
    publications: function () {
      return [{
        name: 'Learning with Staleness',
        year: '2018',
        person: '',
        link: '#',
        department: '',
        type: '',
        identification: ''
      }, {
        name: 'Efficient Methods for Prediction and Control in Partially Observable Environments',
        year: '2018',
        person: 'Pengju Jin, M.S. Thesis',
        link: '#',
        department: 'Robotics Institute',
        type: 'thesis',
        identification: 'CMU-CS-18-103'
      }, {
        name: 'Sublinear-Time Learning and Inference for High-Dimensional Models',
        year: '2018',
        person: 'Pengju Jin, M.S. Thesis',
        link: '#',
        department: 'Robotics Institute',
        type: 'thesis',
        identification: 'CMU-CS-18-103'
      }, {
        name: 'Stress Detection for Keystroke Dynamics',
        year: '2018',
        person: 'Pengju Jin, M.S. Thesis',
        link: '#',
        department: 'Robotics Institute',
        type: 'thesis',
        identification: 'CMU-CS-18-103'
      }];
    }
  },
  filters: {
    truncate: function (value, limit) {
      if (value.length > limit) {
        value = value.substring(0, (limit - 3)) + '...';
      }
      return value
    },
    unAbbreviate: function (value) {
      value = value.toLowerCase();
      if (value === 'u') {
        return 'Undergraduate';
      } else if (value === 'g') {
        return 'Graduate';
      } else {
        return 'N/A';
      }
    }
  }
}
</script>
