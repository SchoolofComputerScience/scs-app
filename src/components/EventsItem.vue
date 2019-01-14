<template lang="pug">
div(
  :class="{event_item : firsty && !isSingle, promoted : firsty && !isSingle, event : !firsty || isSingle}"
  class="page_block"
  )
  router-link(
    :to="'/events/single/' + item.id"
    class="link_absolute"
    ) {{item.name}}
  div(class="page_block_labels")
    span(class="page_block_label") {{item.event_type}}
  div(class="page_block_content")
    div(class="page_block_date")
      span(class="page_block_date_month") {{eventDate.month}}
      span(class="page_block_date_day") {{eventDate.day}}
    div(
      v-if="firsty && !isSingle"
      class="page_block_title_container"
    )
      span(class="page_block_title") {{item.name}}
      span(class="page_block_subtitle") with {{ item.speakerName | capitalize }}
    div(
      v-if="firsty && !isSingle"
      class="page_block_details"
    )
      p #[span Time:] {{timeFix(item.start_date)}}
      p #[span Location:] {{item.building.toUpperCase() | buildingTranslate}} {{item.room}}
    span(
      v-if="!firsty || isSingle"
      class="page_block_title"
    ) {{item.name}}
    span(
      v-if="!firsty || isSingle"
      class="page_block_description"
    ) with {{ item.speakerName | capitalize }}
  div(class="page_block_tags")
    span department name
</template>

<script>
  import format from 'date-fns/format'

  export default {
    name: 'EventsItem',
    props: {
      'firsty': true,
      'item': {},
      'isSingle': false
    },
    computed: {
      eventDate(){
        const dateObject = {
          month: format(this.item.start_date, 'MMM'),
          day: format(this.item.start_date, 'DD'),
          year: format(this.item.start_date, 'YYYY')
        };
        return dateObject;
      }
    },
    methods: {
      timeFix (arg) {
        return format(arg, 'h:mm a')
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString().split(/\s+/)
        return value.map((str) => {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        }).join(' ');
      }
    }
  }

</script>
