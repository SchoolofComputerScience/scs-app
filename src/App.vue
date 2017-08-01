<template>
  <main id="app" class="app-shell">
    <main-header class="main-header"></main-header>
    <main class="main-body">
      <transition name="fade">
        <router-view class="main-view" :key="$route.fullPath"></router-view>
      </transition>
    </main>
    <main-footer class="main-footer"></main-footer>
  </main>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'

export default {
  name: 'scsmain',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style lang="scss">
@import './assets/scss/global';

.main-body{
  margin: 0 auto;
  padding: $base-line-height;
  top: 0;
}

.main-footer{
  margin: 0 auto $base-line-height auto;
  padding:$base-line-height;
  background: white;
}

.main-header{
  margin: $base-line-height auto;
  padding: 0 $base-line-height;
  margin-top: 0;
  margin-bottom: $base-line-height * 2;
  background: white;
  box-shadow: $box-shadow-inert;
}
</style>
