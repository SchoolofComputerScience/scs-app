<template>
  <main id="app" class="app-shell">
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
  }
}
</script>

<style lang="scss">
@import './assets/scss/global';

.main-body{
  margin: 0 auto;
  padding: $base-line-height;
  background: white;
}

.main-footer{
  margin: 0 auto $base-line-height auto;
  padding:$base-line-height;
  // max-width: map-get($breakpoints, full);
  background: white;
}

.main-header{
  margin: $base-line-height auto;
  padding: 0 $base-line-height;
  // max-width: map-get($breakpoints, full);
  margin-top: 0;
  margin-bottom: $base-line-height * 2;
  background: white;
}
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
