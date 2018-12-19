<template lang="pug">
header(v-bind:class="header_class")
  div(class="container")
    a(href="/")
      img(src="../assets/images/logo-color.svg" class="logo", alt="CMU CS Logo")
    span(v-if="page_title_label, page_title_link" class="section_title")
      a(:href="page_title_link") {{page_title_label}}
    span(v-else class="section_title", v-bind:class="{ has_list: header_list }") {{page_title_label}}
      ul(v-if="header_list")
        li(v-for="item in header_list", :data-anchor="item.anchor") {{ item.title }}
    nav(class="main_nav")
      button.open_menu(
        v-on:click="openMenu"
      ) Open Menu
      button.launch_explore.js_launch_explore.desktop(
        v-on:click="launchExplore"
      ) Launch Explore
      button.launch_search.js_launch_search.desktop(
        v-on:click="launchSearch"
      ) Launch Search
</template>

<script>

function isSearchExploreOn () {
  if( $('.open_menu').is('.on') ){
    $('.launch_explore, .launch_search, .modal_explore, .modal_search').removeClass('on');
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
    'page_title_link',
    'header_class',
    'header_list'
  ],
  methods: {
    openMenu: function () {
      $('main, header').toggleClass('nav_open');
      $('.slider_nav_container').toggleClass('open');
      $('.open_menu, .modal_explore').toggleClass('on');
      $('.launch_explore, .launch_search, .modal_explore, .modal_search, .mobile_nav button').removeClass('on');
      removeBody();
    },
    launchExplore: function () {
      $('.modal_search, .launch_search').removeClass('on');
      $('.js_launch_explore, .modal_explore').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      closeMenu();
      removeBody();
    },
    launchSearch: function () {
      $('.modal_explore, .launch_explore').removeClass('on');
      $('.js_launch_search, .modal_search').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      closeMenu();
      removeBody();
    }
  }
}
</script>
