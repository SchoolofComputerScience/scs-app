<template>
  <section class="">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded" >
      <div v-if="department[0]">
        <div class="content-page card">
          <figure class="department-header" :style="{ 'background-image': 'url(' + department[0].mainimg + ')' }">
            <img class="logo circle large-circle" v-if="department[0].logo" :src="department[0].logo" />
          </figure>
          <h1>{{department[0].name}}</h1>
          <p>{{department[0].description}}</p>
          <p><a class="button-small" :href="department[0].url" target="_blank">{{department[0].name}} website</a></p>
        </div>
        <Programs :condensed="true" :department="this.$route.params.department" class="content-page card"></Programs>
        <NewsList :department="this.$route.params.department"></NewsList>
        <EventsList :department="this.$route.params.department"></EventsList>
        <Courses :semester="semester"></Courses>
      </div>
    </transition>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'
import CourseListView from '../views/CourseListView.vue'
import DepartmentDirectory from '../components/DepartmentDirectory.vue'
import NewsList from '../components/DepartmentNewsList.vue'
import EventsList from '../components/DepartmentEventsList.vue'
import Courses from '../components/Courses.vue'
import Programs from '../components/Programs.vue'

export default {
  name: 'department-view',

  asyncData ({ store }) {
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

  data () {
    return {
      semester: "F17"
    }
  },

  computed: {
    loaded() {
      if(this.$store.state.department.list){
        if(!this.$store.state.department.list.some((n) => n.uid === this.$route.params.department))
          router.push('/')
        return true;
      }
    },
    department(){
      if(this.$store.state.department.list){
        let param = this.$route.params.department;
        let departments = this.$store.state.department.list;
        return departments.filter(function(el){
          if(el.uid === param)
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
  margin-bottom: $base-line-height;
  @include breakpoint-max(desktop) {
    margin-left: -$base-line-height;
    width: calc(100% + #{$base-line-height  * 2});
  }
  .logo{
    margin: $base-line-height;
  }
}

</style>
