<template lang="pug">
section(class="page_blocks")

  h2(
    v-if="hasHeadline"
    ) People
  div(class="page_block_container visible")

    PeopleItem(
      v-for="(person, i) in directory"
      v-if="i < people_to_show"
      :person="person"
      :key="person.scid"
    )
    button(
      class="button_show_more"
      v-on:click="people_to_show += more_people"
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
      people_to_show: 8,
      more_people: 4,
    }
  }
}
</script>
