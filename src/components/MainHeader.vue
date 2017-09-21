<template>
  <header v-bind:class="{ 'main-nav-is-burger': isMenuHamburger }">
    <div class="logo">
      <router-link to="/"><img src="../assets/img/cmu-school-main.svg" alt="CMU School of Computer Science"></router-link>
    </div>
    <nav class="main-nav">
      <mobile-toggle :scrollhandler="scroll"></mobile-toggle>
      <ul v-bind:class="{ open: open}" class="main-nav-list">
        <nav-leaf
          v-for="(childItems, navTitle) in navLinks"
          :key="navTitle"
          :navTitle="navTitle"
          :currentLeaf="currentLeaf"
          :childItems="childItems"
          v-on:updateCurrentLeaf="setCurrentLeaf">
        </nav-leaf>
      </ul>
    </nav>
  </header>
</template>

<script>
import NavLeaf from '../components/NavLeaf.vue'
import MobileToggle from '../components/MobileToggle.vue'

export default {
  name: 'main-header',

  components: {
    NavLeaf,
    MobileToggle
  },

  computed: {
    open () {
      return this.$store.state.navigation.navState
    }
  },

  data: function () {
    return {
      currentLeaf: null,
      isMenuHamburger: false,
      // Menu links as an object
      // Each top level section is an object
      // If that item is a link include the "navLink" key with the URL as a value
      // Child items should have link text as key and link URL as value
      navLinks: {
        "Home": {
          "navLink": "/",
        },
        "Departments": {
          "Computational Biology Department": "/departments/compbio",
          "Computer Science Department": "/departments/csd",
          "Human-Computer Interaction Institute": "/departments/hcii",
          "Institute for Software Research": "/departments/isr",
          "Language Technologies Institute": "/departments/lti ",
          "Machine Learning Department": "/departments/mld",
          "Robotics Institute": "/departments/ri",
          "Dean's Business Office": "/departments/deans_office",
        },
        "Directory": {
          "navLink": "/directory",
        },
        "About": {
          "navLink": "/about",
          "Alumni Engagement": "/alumni",
          "Donate": "/donate",
          "Outreach": "/outreach",
          "SCS Partnerships": "/corporate",
          "International Students": "/international-students",
          "Diversity and Inclusion": "/diversity-and-inclusion",
          "Computing Facilities": "http://www.cs.cmu.edu/~help/",
          "Faculty Awards": "http://www.cs.cmu.edu/~scsfacts/awards.html",
          "Student Awards": "http://www.cs.cmu.edu/~scsfacts/studentawards.html",
        },
        "Programs": {
          "navLink": "/programs",
          "Undergraduate": "/undergraduate-programs",
          "Masters": "/masters-programs",
          "Doctoral": "/doctoral-programs",
        },
        "Admissions": {
          "navLink": "/admissions",
          "Undergraduate": "/undergraduate-admissions",
          "Masters": "/masters-admissions",
          "Doctoral": "/doctoral-admissions",
        },
        "Courses":  {
          "navLink": "/courses/F17",
        },
        "News": {
          "navLink": "/news",
        },
        "Events": {
          "navLink": "/events"
        },
        "Research": {
          "navLink": "/research",
        }
      }
    }
  },

  watch: {
    '$route' (to, from) {
      this.$store.commit('SET_NAVIGATION_STATE', false);
    }
  },

  methods:{
    scroll: function() {
      const offsetTop = this.$el.querySelector('.main-nav').getBoundingClientRect().top;
      const logoHeight = document.querySelector('.logo').clientHeight;
      if (offsetTop < -1 || window.scrollY > logoHeight) {
        this.$el.querySelector('.main-nav').classList.add('stuck');
      } else {
        this.$el.querySelector('.main-nav').classList.remove('stuck');
      }
    },
    scrollTest(){
      window.requestAnimationFrame(this.scroll);
    },
    resize: function() {
      var header = this.$el;
      var headerBoundingRect = header.getBoundingClientRect();
      var menu = header.querySelector('.main-nav');
      var menuBoundingRect = menu.getBoundingClientRect();
      var lastMenuItemBoundingRect = header.querySelector('.main-nav-list > li:last-child').getBoundingClientRect();
      var shouldHamburger = true;

      if (typeof lastMenuItemBoundingRect.x !== 'undefined' && lastMenuItemBoundingRect.x + lastMenuItemBoundingRect.width < menu.clientWidth + menu.getBoundingClientRect().x) {
        shouldHamburger = false;
      } else if (typeof lastMenuItemBoundingRect.left !== 'undefined' && lastMenuItemBoundingRect.left + lastMenuItemBoundingRect.width < menu.clientWidth + menu.getBoundingClientRect().left) {
        shouldHamburger = false;
      }

      console.log('shouldHamburger', shouldHamburger);

      // If the last menu item is popping out of the header, then it's burger time
      if (shouldHamburger) {
        this.isMenuHamburger = true;
        // Make sure the nav is stuck with appropriate styling based on the page
        this.scrollTest();
        // Unable to revert back to desktop menu since nav will be skinnier than viewport in mobile mode,
        // So adding an else will cause the menu to flip back and forth between burger/not burger rapidly
        // So kill our listener
        window.removeEventListener('resize', this.resizeTest);
      }
      console.log('resize!!');
    },
    resizeTest() {
      window.requestAnimationFrame(this.resize);
    },
    setCurrentLeaf: function(currentLeaf) {
      this.currentLeaf = currentLeaf;
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrollTest);
    window.addEventListener('resize', this.resizeTest);
    // Fire the functions once on load
    this.scrollTest();
    this.resizeTest();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollTest);
    window.removeEventListener('resize', this.resizeTest);
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/mixins.scss';

.logo {
  max-height: $base-line-height * 4;
  width: 15rem;
  padding: $base-line-height 0;
  @include breakpoint-max(phone) {
    width: 14rem;
    padding: $base-line-height / 2;
    padding-left: 0;
    padding-right: 0;
  }
  img{
    max-height: $base-line-height * 2;
  }
}

.main-nav {
  width: 100%;
  position: absolute;
  z-index: 200;
  background: white;
  padding: 0 $base-line-height;
  margin-left: -$base-line-height;
  border-top: 1px solid $primary-grey;
  box-shadow: $box-shadow-inert;

  a {
    @include type-setting(0);
    color: $black;
    display: block;
    padding: $base-line-height / 2;
    &:hover, &.router-link-active {
      color: $red;
    }
  }
  &.stuck {
    position: fixed;
    top: 0;
    transition: all .2s;
    z-index: 100;
  }
  > ul{
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include breakpoint-min(desktop) {
      max-width: map-get($breakpoints, desktop);
    }
  }
  li {
    display: inline-block;
    align-self: flex-start;
  }
  .mobile-toggle{
    display: none;
  }
}

/**
 * Burger styles
 * Triggered by class that's added when nav doesn't fit in it's space
 */
.main-nav-is-burger {
  &.main-header {
    margin-bottom: 0;
    border-bottom: 1px solid $primary-grey;
  }
  .main-nav {
    position: fixed;
    top: $base-line-height * 0.75;
    right: 0;
    width: $base-line-height * 3; // Should be greater than burger size in MobileToggle.vue
    padding: 0;
    border: 0;
    background: none;
    box-shadow: none;

    &:after{
      content: ' ';
      opacity: 0;
      transition: .2s linear;
    }

    &.stuck {
      z-index: 100;
      top: $base-line-height;
      transition: all .2s;

      &:hover{
        top: calc(#{$base-line-height} - 2px);
        transition: .2s linear;
      }

      .mobile-toggle:before{
        content: ' ';
        position: absolute;
        left: 50%;
        top: 50%;
        width: $base-line-height * 3.2;
        height: $base-line-height * 3.2;
        transform: translate(-50%, -50%);
        background: white;
        box-shadow: $box-shadow-inert;
        border-radius: 100%;
        transition: .2s linear;
        opacity: 1;
      }

      .mobile-toggle.open:before {
        display: none;
      }
    }

    &:hover.stuck:after{
      box-shadow: $box-shadow-hover;
    }
    a.router-link-active{
      color: white;
      font-weight: 900;
    }
    > ul {
      z-index: 10;
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: $red;
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      &.open{
        opacity: 1;
        pointer-events: all;
        transition: .25s opacity ease-in-out;
      }
      &:after{
        content: ' ';
        width: 100%;
        background: linear-gradient(to bottom, rgba(196,18,48,0) 0%, rgba(196,18,48,1)100%);
        height: 2em;
        position: fixed;
        display: block;
        bottom: 0;
        opacity: 1;
        pointer-events: none;
      }
      &:before{
        content: ' ';
        width: 100%;
        background: linear-gradient(to top, rgba(196,18,48,0) 0%, rgba(196,18,48,1) 100%);
        height: 2em;
        position: fixed;
        display: block;
        top: 0;
        opacity: 1;
        pointer-events: none;
      }
      > li{
        width: 100%;
        border-bottom: 1px solid lighten($red, 5%);
        color: white;
        display: block;
        > a{
          @include type-setting(0);
          padding: $base-line-height * .5 $base-line-height;
          color: white;
          display: block;
          &:hover{
            color: white;
          }
        }
      }
      > li:first-child{
        margin-top: $base-line-height;
        border-top: 1px solid lighten($red, 5%);
      }
      > li:last-child{
        margin-bottom: $base-line-height;
      }
    }
    .mobile-toggle{
      position: relative;
      display: block;
    }
  }
}

@include breakpoint-max(phone) {
  .main-nav {
    top: 3px;
    &.stuck:hover{
      top: 3px;
      transition: none;
    }
    &:hover.stuck:after{
      box-shadow: $box-shadow-inert;
    }
    &:after{
      content: ' ';
      opacity: 0;
      transition: .2s linear;
    }
    &.stuck {
      top: 13px;
      right: 10px;
    }
  }
}

</style>
