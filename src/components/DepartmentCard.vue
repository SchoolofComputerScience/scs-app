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
        <router-link :to="'/courses/F17'" class="card">
          <h6>{{departmentData.course_count._id}}</h6>
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
          <h3 v-if="departmentData.news[0]">{{departmentData.news[0].title}}</h3>
        </router-link>
        <div class="events-card">
          <router-link v-if="departmentData.events.length === 2" v-for="event in departmentData.events" :to="'/events/' + event.uid" :key="event.uid" class="card">
            <h5 class="type">{{event.type}}</h5>
            <h5>{{timeFix(event.startDate)}}</h5>
            <p>{{event.title}}</p>
          </router-link>
          <p class="small" v-if="departmentData.events.length !== 2">No {{departmentData.uid}} Events</p>
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
      return format(arg, 'MMMM Do YYYY, h:mm a')
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

.events-card{
  color: $black;
  position: relative;
  a{
    justify-content: center;
  }
  .small{
    font-size: .7rem;
    text-transform: uppercase;
    letter-spacing: .1rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .type{
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    font-size: .5rem;
    background: $red;
    padding-bottom: 0;
    padding: 0 $base-line-height / 4;
    text-transform: uppercase;
  }
  p{
    padding-bottom: 0;
  }
}

.news-card{
  background-position: center;
  background-size: cover;
  position: relative;
  h3{
    text-shadow: .05rem .05rem .1rem rgba(0,0,0,.7);
    z-index: 100;
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
    h3{
      color: black;
      transition: .2s opacity;
      opacity: 1;
      text-shadow: none;
    }
  }
  &:hover:after{
    transition: .2s;
    opacity: 1;
  }
}

.card-content-bottom .news-card{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-content-bottom > .events-card{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 $base-line-height $base-line-height;
  a{
    width: 100%;
    flex: 1;
    max-width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    &:nth-child(1){
      margin-bottom: $base-line-height;
    }
  }
}

// DEP CARD / EVEN //

.department-card:nth-child(even){
  justify-content: flex-end;
  flex-direction: row-reverse;
  @include breakpoint-max(laptop) {
    flex-direction: column;
  }
  .department-link {
    padding-left: $base-line-height;
    .image {
      margin-bottom: 0;
    }
  }
  .card-content-top{
    padding-right: $base-line-height;
    @include breakpoint-max(laptop) {
      padding-right: 0;
    }
    max-height: 40%;
    .card{
      width: 100%;
      &:nth-child(1), &:nth-child(2){
        margin-right: $base-line-height;
      }
    }
  }
  .card-content-bottom{
    margin-right: $base-line-height;
    @include breakpoint-max(laptop) {
      margin-right: 0;
    }
    > .card:nth-child(2){
      margin-left: $base-line-height;
    }
  }
}

// DEP CARD / ODD //

.department-card:nth-child(odd){
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
    max-height: 40%;
    @include breakpoint-max(laptop) {
      padding-left: 0;
    }
    .card{
      width: 100%;
      &:nth-child(1), &:nth-child(2){
        margin-right: $base-line-height;
      }
    }
  }
  .card-content-bottom{
    margin-left: $base-line-height;
    @include breakpoint-max(laptop) {
      margin-left: 0;
    }
    > .card:nth-child(2){
      margin-left: $base-line-height;
    }
  }
}

// TWO SECTION CONTAINER //

.department-card > .card-container{
  &:nth-child(1){
    width: calc(100% / 3 * 1);
    @include breakpoint-max(laptop) {
      width: 100%;
    }
  }
  &:nth-child(2){
    width: calc(100% / 3 * 2);
    @include breakpoint-max(laptop) {
      width: 100%;
    }
    display: flex;
    flex-direction: column;
  }
}

// INFO SECTION //

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

.department-card{
  display: flex;
  margin-bottom: $base-line-height;
  border-bottom: 1px solid darken($primary-grey, 10%);
  width: 100%;
  @include breakpoint-max(laptop) {
    flex-direction: column;
  }
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
