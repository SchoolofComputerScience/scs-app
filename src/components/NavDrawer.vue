<template lang="pug">
  div(class="slider_nav_container")
    nav(class="mobile_nav")
      button(class="js_launch_explore on") Explore
      button(class="js_launch_search on") Search
    nav(class="slider_nav on")
      a(href="#") Academics
      a(href="#") Research
      a(href="#") Departments
      a(href="#") People
      a(href="#") News
      a(href="#") Events
      a(href="#") School
</template>

<script>
export default {
  name: 'NewNav'
}
</script>
