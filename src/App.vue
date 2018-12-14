<template lang="pug">
  #app.app-shell
    router-view.main-view(:key="$route.fullPath")
</template>

<script>
import Vue from 'vue'
// import MainHeader from './components/MainHeader.vue'
// import MainFooter from './components/MainFooter.vue'
// import VueMaterial from 'vue-material'

/*
  TODO: When we move to production, only import components we will use.
        Additionally, once material design is in place, remove bootstrap.
*/

// Vue.use(VueMaterial);

export default {
  name: 'scsmain',

  components: {
    // MainHeader,
    // MainFooter,
  },
  mounted() {
    window.$ = require('jquery');
    $('body').on('click', function (e) {

      var container = $(".slider_nav_container, .open_menu");

      if (!container.is(e.target) && container.has(e.target).length === 0)
      {
        $('main, header').removeClass('nav_open');
        $('.slider_nav_container').removeClass('open');
        $('.open_menu').removeClass('on');
      }
    });

  }
}
</script>


<style>
  @import './assets/css/vendor/normalize.css';
  @import './assets/css/base.css';
</style>
