<template lang="pug">
header(v-bind:class="header_class")
  div(class="container")
    a(href="/")
      img(src="../assets/images/logo-color.svg" class="logo", alt="CMU CS Logo")
    span(v-if="page_title_label" class="section_title") {{page_title_label}}
    nav(class="main_nav")
      button.open_menu(
        href="#"
        v-on:click="openMenu"
      ) Open Menu
      button.launch_explore.js_launch_explore.desktop(
        href="#"
        v-on:click="launchExplore"
      ) Launch Explore
      button.launch_search.js_launch_search.desktop(
        href="#"
        v-on:click="launchSearch"
      ) Launch Search
</template>

<script>

function isSearchExploreOn () {
  if( $('.open_menu').is('.on') ){
    $('.launch_explore, .launch_search, .modal_explore, .modal_search').removeClass('on');
    if( $('.mobile_nav a, .mobile_nav button').is('.on') ){
      $('.mobile_nav a, .mobile_nav button').removeClass('on');
    }
  }
}

function removeBody () {
  if( !$('.modal').is('.on')  ){
    $('body').removeClass('hold');
  } else{
    $('body').addClass('hold');
  }
}

function closeMenu () {
  $('main, header').removeClass('nav_open');
  $('.slider_nav_container').removeClass('open');
  $('.open_menu').removeClass('on');
}


export default {
  name: 'NewHeader',
  props: [
    'page_title_label',
    'header_class'
  ],
  methods: {
    openMenu: function () {
      $('main, header').toggleClass('nav_open');
      $('.slider_nav_container').toggleClass('open');
      $(this.$el).toggleClass('on');
      $('.launch_explore, .launch_search, .modal_explore, .modal_search').removeClass('on');
      removeBody();
    },
    launchExplore: function () {
      $('.modal_search, .launch_search').removeClass('on');
      $('.modal_explore').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      closeMenu();
      removeBody();
    },
    launchSearch: function () {
      $('.modal_explore, .launch_explore').removeClass('on');
      $('.modal_search').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      closeMenu();
      removeBody();
    }
  }
}
</script>
