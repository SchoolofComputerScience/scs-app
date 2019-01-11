<template lang="pug">
section(class="department_blocks")
  div(class="container")
    h2(class="knockout") Departments

    div(class="list_cards small")

      div(
        class="list_card"
        v-for="item in department.list"
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
    department: function () {
      return {
        list: [{
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
