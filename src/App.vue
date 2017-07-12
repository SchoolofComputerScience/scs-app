<template>
  <main id="app">
    <main-header></main-header>
    <main class="body">
      <transition name="view" >
        <router-view class="view" :key="$route.fullPath"></router-view>
      </transition>
    </main>
    <main-footer></main-footer>
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

  data: {
    transitionName: 'view'
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

.body {
  position: relative;
}

.view {
  margin: 0 auto;
  max-width: 62em;
  min-height: 100px;
}

@media screen and (max-width: 62em) {
  html{
    background: white;
  }
}

@media screen and (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

@media screen and (min-width: 89em) {
  body {
    font-size: 18px;
  }
}
</style>
