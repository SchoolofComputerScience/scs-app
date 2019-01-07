<template lang="pug">
section(class="page_blocks")

  h2(v-if="isSingle") related

  div(class="page_block_container visible")

    EventsItem(
      class="card"
      v-for="(event, i) in events"
      :firsty="!i"
      :data="event"
      :key="event.uid"
      :articlesToShow="articlesToShow"
      :isSingle="isSingle"
    )

  button(
    class="button_show_more"
    v-on:click="articlesToShow += moreArticles"
  ) Show More
</template>

<script>

import EventsItem from '../components/EventsItem.vue';

export default {
  name: 'eventsGrid-view',
  components: {
    EventsItem
  },
  props: [
    'events',
    'articlesToShow',
    'moreArticles',
    'isSingle'
  ]
}
</script>
