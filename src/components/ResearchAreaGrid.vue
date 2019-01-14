<template lang="pug">
section(class="content_list" v-if="researchAreas.length")
  h2(v-if="hasHeadline") Research Areas
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
    'hasHeadline',
    'minShow',
    'numToAdd'
  ],
  components: {
    ResearchAreaItem
  },
  data () {
    return {
      itemsToShow: this.minShow || 4,
      moreItems: this.numToAdd || 2,
    }
  }
}
</script>
