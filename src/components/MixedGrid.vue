<template lang="pug">
section.page_blocks(v-if="items.length")
  h2(v-if="title") {{title}}
  .page_block_container.visible
    component(
      v-for="item, i in items"
      v-if="i < itemsToShow"
      :key="item.id"
      :is="getComponentType(item.type)"
      :item="item.data"
      :isSingle="isSingle"
      :firsty="!i"
    )

    button.button_show_more(
      v-if="itemsToShow < items.length"
      v-on:click="itemsToShow += moreItems"
    ) Show More
</template>

<script>

import NewsArticle from './NewsArticle.vue';
import EventsItem from './EventsItem.vue'

export default {
  name: 'MixedGrid-view',
  components: {
    NewsArticle,
    EventsItem
  },
  props: [
    'items',
    'title',
    'isSingle',
    'minShow',
    'numToAdd'
  ],
  data () {
    return {
      itemsToShow: this.minShow || 3,
      moreItems: this.numToAdd || 3,
    }
  },
  methods: {
    getComponentType: function (type) {
      if (type === 'news') {
        return NewsArticle;
      } else if (type === 'event') {
        return EventsItem;
      }
    }
  }
}
</script>
