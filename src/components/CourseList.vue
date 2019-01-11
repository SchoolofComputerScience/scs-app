<template lang="pug">
section(
  class="content_list"
  v-if="courses.length"
  )
  h2 Upcoming Courses
  ul(class="list_stacked list_multi_column theme_courses visible")

    li(
      v-for="(course, i) in courses"
      v-if="i <= itemsToShow"
      :key="course.course_id"
      )
        a(href="#")
          span(class="item_title") {{course.long_title}}
          span(class="label") {{course.semester_code}}
          span(class="label") {{ course.graduate_level | unAbbreviate() }}
        div(class="list_window")
          span(class="label_primary") {{course.department}}
          span(class="label_secondary") {{course.course_number}}
          span(class="label_title") {{course.long_title}}
          span(class="label_description") {{course.description | truncate(250)}}
          span(class="label_tertiary") {{ course.graduate_level | unAbbreviate() }}
    li(class="show_more")
      button(
        class="button_show_more"
        v-if="itemsToShow < courses.length"
        v-on:click="itemsToShow += moreItems"
        ) Show More
</template>

<script>

export default {
  name: 'courseList-view',
  props: [
    'courses',
    'hasHeadline'
  ],
  data () {
    return {
      itemsToShow: 5,
      moreItems: 5,
    }
  },
  filters: {
    truncate: function (value, limit) {
      if (value.length > limit) {
        value = value.substring(0, (limit - 3)) + '...';
      }
      return value
    },
    unAbbreviate: function (value) {
      value = value.toLowerCase();
      if (value === 'u') {
        return 'Undergraduate';
      } else if (value === 'g') {
        return 'Graduate';
      } else {
        return 'N/A';
      }
    }
  }
}
</script>
