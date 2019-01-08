<template lang="pug">
div(
  :class="{event_item : firsty && !isSingle, promoted : firsty && !isSingle, event : !firsty || isSingle}"
  class="page_block"
  )
  router-link(
    :to="'/events/single/' + data.id"
    class="link_absolute"
    ) {{data.name}}
  div(class="page_block_labels")
    span(class="page_block_label") {{data.event_type}}
  div(class="page_block_content")
    div(class="page_block_date")
      span(class="page_block_date_month") {{eventDate.month}}
      span(class="page_block_date_day") {{eventDate.day}}
    div(
      v-if="firsty && !isSingle"
      class="page_block_title_container"
    )
      span(class="page_block_title") {{data.name}}
      span(class="page_block_subtitle") {{data.speakerName.toLowerCase()}}
    div(
      v-if="firsty && !isSingle"
      class="page_block_details"
    )
      p #[span Time:] {{timeFix(data.start_date)}}
      p #[span Location:] {{data.building.toUpperCase() | buildingTranslate}} {{data.room}}
    span(
      v-if="!firsty || isSingle"
      class="page_block_title"
    ) {{data.name}}
    span(
      v-if="!firsty || isSingle"
      class="page_block_description"
    ) {{data.speakerName.toLowerCase()}}
  div(class="page_block_tags")
    span department name
</template>

<script>
  import format from 'date-fns/format'

  export default {
    name: 'EventsItem',
    props: {
      'firsty': true,
      'data': {},
      'isSingle': false
    },
    computed: {
      eventDate(){
        const dateObject = {
          month: format(this.data.start_date, 'MMM'),
          day: format(this.data.start_date, 'DD'),
          year: format(this.data.start_date, 'YYYY')
        };
        return dateObject;
      }
    },
    methods: {
      timeFix (arg) {
        return format(arg, 'h:mm a')
      },
      dateFix (arg) {
        return format(arg, 'MMM D, YYYY')
      }
    }
  }

</script>
