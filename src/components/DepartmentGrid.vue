<template lang="pug">
section(class="department_blocks")
  div(class="container")
    h2(class="knockout") Departments

    div(class="list_cards small")

      div(
        class="list_card"
        v-for="item in departments"
        )
        a(:href="item.link") {{item.name}}
        div
          span(class="item_title") {{item.name}}
          span(class="item_mark") {{item.mark}}

      div(class="list_card normalized")
        a(href="#") Dean's Business Office
        div
          span(class="item_title") Dean's Business Office
</template>

<script>

export default {
  name: 'DepartmentGrid-view',
  computed: {
    departments: function () {
      // FIXME: should we maybe pass this in or should this function 
      // adjust its return value based on where it is being used (
      // e.g. check the url for any dept params)? if it is only being
      // used in this specfic place, i guess it is probably ok to just 
      // do it this way...
      
      return [{
        name: 'Computational Biology',
        mark: 'cb',
        link: '#',
      }, {
        name: 'Computer Science',
        mark: 'cs',
        link: '#',
      }, {
        name: 'Human-Computer Interaction',
        mark: 'hci',
        link: '#',
      }, {
        name: 'Institute for Software Research',
        mark: 'isr',
        link: '#',
      }, {
        name: 'Language Technologies',
        mark: 'lti',
        link: '#',
      }, {
        name: 'Machine Learning',
        mark: 'mlb',
        link: '#',
      }, {
        name: 'Robotics Institute',
        mark: 'ri',
        link: '#',
      }]
    }
  }
}
</script>
