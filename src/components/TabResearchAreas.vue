<template lang="pug">
// filter list for research areas

div(class="filter_item_list list_cards visible")
  div(
    v-for="researchArea in contentData"
    :key="researchArea.area_id"
    class="list_card"
    )
    router-link(
      :to="'/research/single/' + researchArea.area_id"
      class="link_absolute"
    ) {{researchArea.title}}
    div
      span(class="item_title") {{researchArea.title}}
</template>

<script>
export default {
  name: 'tab-research_areas',
  props: [
    "contentData"
  ]
}
</script>
