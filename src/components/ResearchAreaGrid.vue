<template lang="pug">
div.filter_item_list.list_cards.visible
  ResearchAreaItem(
    v-for="(researchArea, i) in researchAreas"
    v-if="i < itemsToShow"
    :researchArea="researchArea"
    :key="researchArea.area_id"
  )
  button.button_show_more(
    v-if="itemsToShow < researchAreas.length"
    v-on:click="itemsToShow += moreItems"
  ) Show More
</template>

<script>

import ResearchAreaItem from './ResearchAreaItem.vue';

export default {
  name: 'researchArea-view',
  props: [
    'researchAreas',
    'hasHeadline'
  ],
  components: {
    ResearchAreaItem
  },
  data () {
    return {
      itemsToShow: 4,
      moreItems: 2,
    }
  }
}
</script>
