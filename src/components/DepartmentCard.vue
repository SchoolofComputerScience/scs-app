<template>
  <section class="department-card">
    <router-link :to="'/departments/' + departmentData.uid" class="department-link card-container card">
      <div>
        <header :style="{ 'background-image': 'url(' + departmentData.mainimg + ')' }">
          <div class="circle image" :style="{ 'background-image': 'url(' + departmentData.logo + ')' }"></div>
        </header>
        <h2>{{departmentData.name}}</h2>
        <p>{{departmentData.short_description}}</p>
      </div>
    </router-link>
    <div class="card-container">
      <div class="card-content-top">
        <router-link :to="'/courses'" class="card">
          <h6>0</h6>
          <h4>Courses</h4>
        </router-link>
        <router-link :to="'/directory/department/' + departmentData.uid" class="card">
          <h6>{{departmentData.member_count._id}}</h6>
          <h4>Members</h4>
        </router-link>
        <router-link :to="'/programs'" class="card">
          <h6>{{departmentData.programs_count._id}}</h6>
          <h4>Programs</h4>
        </router-link>
      </div>
      <div class="card-content-bottom">
        <router-link
          v-if="departmentData.news[0]"
          :to="'/news/' + departmentData.news[0].uid"
          :style="{ 'background-image': 'url(' + departmentData.news[0].image + ')' }"
          class="news-card card">
          <h4>{{timeFix(departmentData.news[0].date)}}</h4>
          <h3 v-if="departmentData.news[0]">{{departmentData.news[0].title}}</h3>
        </router-link>
        <div class="events-card card">
          <router-link :to="'/events'" v-if="departmentData.events[0]">{{departmentData.events[0].id}}</router-link>
          <router-link :to="'/events'" v-if="departmentData.events[1]">{{departmentData.events[1].id}}</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import format from 'date-fns/format'

export default {
  name: 'department-card',
  props: ['departmentData'],

  methods: {
    timeFix (arg) {
      return format(arg, 'MMMM DD, YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/circle.scss';

.card{
  overflow: hidden;
}

.news-card{
  background-position: center;
  background-size: cover;
  position: relative;
  h3, h4{
    z-index: 100;
    opacity: .8;
    color: white;
    transition: .2s;
  }
  &:after{
    background: rgba(255,255,255,.9);
    width: 100%;
    height: 100%;
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    transition: .2s opacity;
    opacity: 0;
    z-index: -10;
  }
  &:hover{
    h3, h4{
      color: black;
      transition: .2s opacity;
      opacity: 1;
    }
  }
  &:hover:after{
    transition: .2s;
    opacity: 1;
  }
}

.card-content-bottom .card{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
}

.department-card{
  display: flex;
  margin-bottom: $base-line-height;
  border-bottom: 1px solid darken($primary-grey, 10%);
  &:last-child{
    border-bottom: 0;
    margin-bottom: 0;
  }
}
.department-link {
  h2{
    font-weight: 900;
  }
}

.department-card:nth-child(even) {
  justify-content: flex-end;
  flex-direction: row-reverse;
  .department-link {
    padding-left: $base-line-height;
    .image {
      margin-bottom: 0;
    }
  }
  .card-content-top{
    padding-right: $base-line-height;
    .card{
      width: 100%;
      &:nth-child(1), &:nth-child(2){
        margin-right: $base-line-height;
      }
    }
  }
  .card-content-bottom{
    margin-right: $base-line-height;
    .card:nth-child(2){
      margin-left: $base-line-height;
    }
  }
}

.department-card:nth-child(odd) {
  justify-content: flex-start;
  .department-link {
    padding-right: $base-line-height;
    .image {
      left: auto;
      right: 0;
      margin-bottom: 0;
    }
  }
  .card-content-top{
    padding-left: $base-line-height;
    padding-bottom: 0;
    .card{
      width: 100%;
      &:nth-child(1), &:nth-child(2){
        margin-right: $base-line-height;
      }
    }
  }
  .card-content-bottom{
    margin-left: $base-line-height;
    .card:nth-child(2){
      margin-left: $base-line-height;
    }
  }
}

.department-card > .card-container{
  &:nth-child(1){
    width: calc(100% / 3 * 1);
  }
  &:nth-child(2){
    width: calc(100% / 3 * 2);
    display: flex;
    flex-direction: column;
  }
}

.card-container:nth-child(2){
  .card-content-top, .card-content-bottom{
    display: flex;
    flex: 1;
    justify-content: space-around;
  }
  .card-content-top{
    text-transform: uppercase;
    .card{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h4{
        padding-bottom: 0;
        letter-spacing: .1rem;
      }
    }
  }
}

header{
  margin-left: -$base-line-height;
  margin-top: -$base-line-height;
  width: calc(100% + #{$base-line-height * 2});
  margin-bottom: $base-line-height;
  padding: $base-line-height 0 $base-line-height $base-line-height;
  background-size: cover;
}

p{
  color: $black;
}

</style>
