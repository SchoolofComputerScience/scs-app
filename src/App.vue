<template>
  <div id="app" class="app-shell">
    <main-header class="main-header"></main-header>
    <main class="main-body" :class="{ 'no-gutter': removePageGutter }">
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
  store.dispatch('GET_PROGRAMS')
  return store.dispatch('GET_RESEARCH_AREAS');
}

export default {
  name: 'scsmain',

  preFetch: fetchGlobalData,

  components: {
    MainHeader,
    MainFooter
  },

  computed: {
    removePageGutter: function() {
      // Array of paths to remove content gutter on
      const pathsWithNoGutter = [
        '/',
      ];

      if (pathsWithNoGutter.indexOf(this.$route.fullPath) !== -1) {
        return true;
      }
      return false;
    },
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
  padding: $base-line-height;
  top: 0;

  &.no-gutter {
    padding: 0;
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
