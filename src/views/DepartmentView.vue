<template>
  <section class="">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded">
      <div v-if="department[0]">
        <div class="content-page card">
          <figure class="department-header" :style="{ 'background-image': 'url(' + department[0].mainimg + ')' }">
            <img class="logo circle large-circle" v-if="department[0].logo" :src="department[0].logo"/>
          </figure>
          <h1 class="department-title">{{department[0].name}}</h1>
          <p>{{department[0].description}}</p>
          <div>
            <a class="btn btn-lg btn-outline-danger btn-responsive" :href="department[0].url" target="_blank">{{department[0].name}}
              website</a>
          </div>
        </div>
        <NewsList :department="this.$route.params.department"></NewsList>
        <EventsList :department="this.$route.params.department" :compact="true"></EventsList>
      </div>
    </transition>
  </section>
</template>

<script>
  import Spinner from '../components/Spinner.vue'
  import {router} from '../app'
  import CourseListView from '../views/CourseListView.vue'
  import DepartmentDirectory from '../components/DepartmentDirectory.vue'
  import NewsList from '../components/DepartmentNewsList.vue'
  import EventsList from '../components/DepartmentEventsList.vue'
  import Courses from '../components/Courses.vue'
  import Programs from '../components/Programs.vue'

  export default {
    name: 'department-view',

    asyncData({store}) {
      store.dispatch('GET_SEMESTER_CODE');
      return store.dispatch('GET_DEPARTMENTS')
    },

    components: {
      Spinner,
      CourseListView,
      DepartmentDirectory,
      Courses,
      Programs,
      NewsList,
      EventsList
    },

    computed: {
      loaded() {
        return true;
      },
      department() {
        if (this.$store.state.department.list) {
          let param = this.$route.params.department;
          let departments = this.$store.state.department.list;
          return departments.filter(function (el) {
            if (el.department_id === param)
              return el
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/vars';
  @import '../assets/scss/circle';

  .btn-responsive {
    white-space: normal;
  }

  .department-title {
    font-weight: 700 ;
  }

  .department-header {
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    left: 0;
    top: -$base-line-height * 2;
    margin: 0;
    margin-left: -$base-line-height * 2;
    width: calc(100% + #{$base-line-height  * 4});
    @include breakpoint-max(desktop) {
      margin-left: -$base-line-height;
      width: calc(100% + #{$base-line-height  * 2});
    }
    .logo {
      margin: $base-line-height;
    }

  }

</style>
