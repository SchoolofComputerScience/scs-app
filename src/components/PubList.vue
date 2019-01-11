<template lang="pug">
section(
  class="content_list"
  )
  h2 Publications
  ul(class="list_stacked list_multi_column theme_publications visible")
    li
      a(href="#") #[span(class="item_title") Learning with Staleness] #[span(class="label") 2018]
    li
      a(href="#") #[span(class="item_title") Efficient Methods for Prediction and Control in Partially Observable Environments] #[span(class="label") 2018]
    li
      a(href="#") #[span(class="item_title") Sublinear-Time Learning and Inference for High-Dimensional Models] #[span(class="label") 2018]
        div(class="list_window")
          span(class="label_primary") Robotics Institute
          span(class="label_secondary") thesis
          span(class="label_title") Sublinear-Time Learning and Interference for High-Dimensional Models
          span(class="label_description") Pengju Jin, M.S. Thesis
          span(class="label_tertiary") CMU-CS-18-103
    li
      a(href="#") #[span(class="item_title") Stress Detection for Keystroke Dynamics] #[span(class="label") 2018]
    li(class="show_more")
      button(class="button_show_more") Show More
</template>

<script>

export default {
  name: 'PubList-view',
  props: [
    // 'courses',
    // 'hasHeadline'
  ],
  data () {
    return {
      // itemsToShow: 5,
      // moreItems: 5,
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
