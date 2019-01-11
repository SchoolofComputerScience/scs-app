<template lang="pug">
div.visible(class="gutter-xl filter_item_list", data-filter="publications")
  div(class="col-1-3")
    div(class="filter_column filter_list")
      div(class="pane_toggle")
        span(class="pane_toggle_item active") by Research Area
      div(class="pane_result")
        button(class="pane_result_item", data-filter="all") #[span All] #[span 17]
        button(class="pane_result_item") #[span Cognitive robotics] #[span 12]
        button(class="pane_result_item active") #[span Computational neuroscience] #[span 4]
        button(class="pane_result_item") #[span Computer science education] #[span 1]
    button(class="filter_toggle") by category
  div(class="col-2-3")
    PubList(
      :hasHeadline="hasHeadline"
      )
</template>

<script>
import PubList from '../components/PubList.vue';
export default {
  name: 'tab-publications',
  components: {
    PubList,
  },
  props: [
    "contentData"
  ],
  data () {
    return {
      hasHeadline: false
    }
  }
}
</script>
