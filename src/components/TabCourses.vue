<template lang="pug">
// filter list for courses

ul.visible(
  data-filter="courses"
  class="filter_item_list list_stacked list_multi_column theme_courses"
)
  li(
    v-for="course in getResearchAreaCourses"
    :key="course.course_id"
  )
    router-link(
      :to="'/courses/course/' + course.course_id"
    ) #[span(class="item_title") {{course.title}}] #[span(class="label") code] #[span(class="label") graduate_level]
    div(class="list_window")
      span(class="label_primary") department
      span(class="label_secondary") {{course.course_number}}
      span(class="label_title") {{course.title}}
      span(class="label_description") course_description
      span(class="label_tertiary") graduate_level
</template>

<script>
export default {
  name: 'tab-courses',
  computed: {
    dataCount () {
      return this.$store.state.researchAreaCourses.list.length;
    },
    getResearchAreaCourses () {
      return this.$store.state.researchAreaCourses.list;
    }
  }
}
</script>
