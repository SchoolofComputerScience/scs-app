<template lang="pug">
  div(class="slider_nav_container")
    nav(class="mobile_nav")
      button(
        class="js_launch_explore"
        v-on:click="clickThing($event); launchExplore()"
        ) Explore
      button(
        class="js_launch_search"
        v-on:click="clickThing($event); launchSearch()"
        ) Search
    nav(class="slider_nav on")
      a(href="#") Academics
      a(href="/departments") Departments
      a(href="/people") People      
      a(href="/research") Research
      a(href="/publications") Publications
      a(href="/news") News
      a(href="/events") Events
      //- a(href="#") School
</template>

<script>

function removeBody () {
  if( !$('.modal').is('.on')  ){
    $('body').removeClass('hold');
  } else{
    $('body').addClass('hold');
  }
}

export default {
  name: 'NewNav',
  methods: {
    clickThing: function (e) {

      if(!$('.mobile_nav a, .mobile_nav button').is('.on')){
        $(e.currentTarget).toggleClass('on');
      } else if ( $(this).is('.on') ) {
        $(e.currentTarget).removeClass('on')
      }
      else{
        $('.mobile_nav a, .mobile_nav button').removeClass('on');
        $(e.currentTarget).toggleClass('on')
      }

    },
    launchExplore: function () {
      $('.modal').removeClass('on');
      $('.modal_explore').addClass('on');
      removeBody();
    },
    launchSearch: function () {
      $('.modal').removeClass('on');
      $('.modal_search').addClass('on');
      removeBody();
    }
  }
}
</script>
