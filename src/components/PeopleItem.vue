<template lang="pug">
div(
  class="page_block person"
  :style="person.backgroundImage"
  )
  router-link(
    :to="'/people/single/' + person.scid"
    class="link_absolute"
    )
  div(class="page_block_content")
    span(class="page_block_title") {{ person.display_name }}
    span(class="page_block_description") {{ person.position }}
</template>

<script>

export default {
  name: 'PeopleItem-view',
  props: [
    'person'
  ]
}
</script>
