<template lang="pug">
div(
  class="page_block person"
  :style="item.backgroundImage"
  )
  router-link(
    :to="'/people/single/' + item.scid"
    class="link_absolute"
    )
  div(class="page_block_content")
    span(class="page_block_title") {{ item.display_name }}
    span(class="page_block_description") {{ item.position }}
</template>

<script>

export default {
  name: 'PeopleItem-view',
  props: [
    'item'
  ]
}
</script>
