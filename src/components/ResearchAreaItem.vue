<template lang="pug">
div.list_card
  router-link.link_absolute(
    :to="'/research/single/' + researchArea.area_id"
  ) {{researchArea.title}}
  div
    span.item_title {{researchArea.title}}
</template>

<script>

export default {
  name: 'ResearchAreaItem-view',
  props: [
    'researchArea'
  ]
}
</script>
