<template>
  <transition name="page-transition" mode="out-in" appear>
    <section class="page">
      <department-card v-for="department in departments" :departmentData="department" :key="department.uid"></department-card>
    </section>
  </transition>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import DepartmentCard from '../components/DepartmentCard.vue'

export default {
  name: 'home-view',

  components: {
    Spinner,
    DepartmentCard
  },

  computed: {
    departments () {
      return this.$store.state.department.list
    }
  },

  asyncData ({ store }) {
    return store.dispatch('GET_DEPARTMENTS')
  }
}
</script>
