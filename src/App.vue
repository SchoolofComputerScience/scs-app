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
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'

function fetchGlobalData(store) {
  store.dispatch('GET_DIRECTORY');
  store.dispatch('GET_PROGRAMS');
  return store.dispatch('GET_RESEARCH_AREAS');
}

export default {
  name: 'scsmain',

  preFetch: fetchGlobalData,

  components: {
    MainHeader,
    MainFooter,
  },

  beforeMount () {
    fetchGlobalData(this.$store);
  }
}
</script>

<style lang="scss">
@import './assets/scss/global';

.app-shell {
  // Removes horizontal scroll bars
  // Important to not set a height on this element
  overflow: hidden;
}

.main-body{
  margin: 0 auto;
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
  padding: 0 $default-gutter;
  margin-top: 0;
  margin-bottom: $base-line-height * 2;
  background: white;
  box-shadow: $box-shadow-inert;
}
</style>
