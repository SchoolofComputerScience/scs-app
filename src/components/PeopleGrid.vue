<template lang="pug">
section(
  v-if="directory.length"
  class="page_blocks"
  )

  h2(
    v-if="hasHeadline"
    ) People
  div(class="page_block_container visible")

    PeopleItem(
      v-for="(person, i) in directory"
      v-if="i < itemsToShow"
      :person="person"
      :key="person.scid"
    )
    button(
      class="button_show_more"
      v-if="itemsToShow < directory.length"
      v-on:click="itemsToShow += moreItems"
    ) Show More
</template>

<script>

import PeopleItem from '../components/PeopleItem.vue';

export default {
  name: 'peopleGrid-view',
  props: [
    'directory',
    'hasHeadline'
  ],
  components: {
    PeopleItem
  },
  data () {
    return {
      itemsToShow: 8,
      moreItems: 4,
    }
  }
}
</script>
