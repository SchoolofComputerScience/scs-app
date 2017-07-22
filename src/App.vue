<template>
  <main id="app" class="app-shell">
    <div class="baseline-grid">
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
    </div>
    <main-header class="main-header"></main-header>
    <main class="main-body">
      <transition name="loading" >
        <router-view class="main-view" :key="$route.fullPath"></router-view>
      </transition>
    </main>
    <main-footer class="main-footer"></main-footer>
  </main>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import { router } from './app'

export default {
  name: 'scsmain',

  components: {
    MainHeader,
    MainFooter,
  },

  computed: {
    title () {
      return this.$store.getters.title
    },
  }
}
</script>

<style lang="scss">
@import './assets/scss/global';

.main-body, .main-header, .main-footer{
  // margin: $base-line-height auto;
  // @include breakpoint(phone) {
  //   outline:1px solid yellow;
  //   width: 100%;
  // }
  // @include breakpoint(tablet) {
  //   border: 1px solid orange;
  // }
  // @include breakpoint(laptop) {
  //   border: 1px solid red;
  // }
  // @include breakpoint(desktop) {
  //   border: 1px solid blue;
  // }
  // @include breakpoint(full) {
  //   border: 1px solid green;
  // }
  max-width: 80%;
}
// .body {
//   position: relative;
// }
//
// .view {
//   margin: 0 auto;
//   max-width: 62em;
//   min-height: 100px;
// }
//
// @media screen and (max-width: 62em) {
//   html{
//     background: white;
//   }
// }
//
// @media screen and (max-width: 768px) {
//   body {
//     font-size: 14px;
//   }
// }
//
// @media screen and (min-width: 89em) {
//   body {
//     font-size: 18px;
//   }
// }
</style>
