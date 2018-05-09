<template>
  <div id="app" class="app-shell">
    <main-header class="main-header"></main-header>
    <main class="main-body">
      <transition name="fade">
        <router-view class="main-view" :key="$route.fullPath"></router-view>
      </transition>
    </main>
    <main-footer class="main-footer"></main-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import VueMaterial from 'vue-material'

/*
  TODO: When we move to production, only import components we will use.
        Additionally, once material design is in place, remove bootstrap.
*/

Vue.use(VueMaterial);

export default {
  name: 'scsmain',

  components: {
    MainHeader,
    MainFooter,
  },
}
</script>

<style lang="scss">
@import './assets/scss/global';
@import '../node_modules/vue-material/dist/vue-material.min.css';
@import '../node_modules/vue-material/dist/theme/black-green-light.css';

.main-body{
  margin: 5rem auto auto auto;
  top: 0;

  > * {
    // Pushes default page spacing to direct child of main-body
    // This way those pages can disable the default page spacing
    padding: $base-line-height;
  }
}

.main-footer{
  margin: 0 auto $base-line-height auto;
  padding:$base-line-height;
  background: white;
}

.main-header{
  margin: $base-line-height auto;
  margin-top: 0;
  margin-bottom: $base-line-height * 2;
  background: white;
  box-shadow: $box-shadow-inert;
  position: fixed;
  top: 0;
  z-index: 10000;
  width: 100%;

  @include breakpoint-max(tablet) {
    &.mobile-menu {
      height: 100%;
      overflow-y: auto;
    }
  }

  @include breakpoint-max(phone) {
    padding: 0;
  }
}
</style>
