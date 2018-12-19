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
    ) #[span(class="item_title") {{course.title}}] #[span(class="label") {{semesterCode}}] #[span(class="label") {{getGraduateLevel(course.course_id)}}]
    div(class="list_window")
      span(class="label_primary") {{getDeparment(course.course_id)}}
      span(class="label_secondary") {{course.course_number}}
      span(class="label_title") {{course.title}}
      span(class="label_description") {{getDescription(course.course_id)}}
      span(class="label_tertiary") {{getGraduateLevel(course.course_id)}}
</template>

<script>
export default {
  name: 'tab-courses',
  methods: {
    getCourse: function (course_id) {
      // FIXME: don't hard code, bruh
      let courseLookup = (this.$store.state.courses.lists['F18'] || []).reduce((h, c) => {
        return h[c.course_id] = c, h;
      }, {});

      return courseLookup[course_id];
    },
    getGraduateLevel: function (course_id) {
      let course = this.getCourse(course_id);
      let level  = (course
        ? course.graduate_level.toLowerCase()
        : ''
      );

      if (level === 'u') {
        return 'Undergraduate';
      } else if (level === 'g') {
        return 'Graduate';
      } else {
        return 'N/A';
      }
    },
    getDescription: function (course_id) {
      let course = this.getCourse(course_id);

      return (course
        ? course.description
        : ''
      );
    },
    getDeparment: function (course_id) {
      let course = this.getCourse(course_id);

      return (course
        ? course.department
        : ''
      );
    }
  },
  computed: {
    getResearchAreaCourses () {
      return this.$store.state.researchAreaCourses.list;
    },
    semesterCode () {
      return this.$store.state.semesterCode.code;
    }
  }
}
</script>
