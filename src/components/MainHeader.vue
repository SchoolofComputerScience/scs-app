<template>
  <header>
    <div class="logo">
      <router-link to="/"><img src="../assets/img/cmu-school-main.svg" alt="CMU School of Computer Science"></router-link>
    </div>
    <nav class="main-nav">
      <mobile-toggle></mobile-toggle>
      <ul v-bind:class="{ open: open}">
        <li>
          <router-link to="/" exact>Home</router-link>
        </li>
        <li>
          <router-link to="/directory">Directory</router-link>
        </li>
        <li>
          <router-link to="/research">Research</router-link>
        </li>
        <nav-drop navlink="/corporate" navtitle="Corporate">
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
        </nav-drop>
        <li>
          <router-link to="/courses">Courses</router-link>
        </li>
        <li>
          <router-link to="/programs">Programs</router-link>
        </li>
        <li>
          <router-link to="/alumni">Alumni</router-link>
        </li>
        <li>
          <router-link to="/outreach">Outreach</router-link>
        </li>
        <nav-drop navlink="/donate" navtitle="Donate">
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
          <li><router-link to="/alumni">test</router-link></li>
        </nav-drop>
        <li>
          <router-link to="/news">News</router-link>
        </li>
        <li>
          <router-link to="/events">Events</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import NavDrop from '../components/NavDrop.vue'
import MobileToggle from '../components/MobileToggle.vue'

export default {
  name: 'main-header',

  components: {
    NavDrop,
    MobileToggle
  },

  computed: {
    open () {
      return this.$store.state.navigation.navState
    }
  },

  watch: {
    '$route' (to, from) {
      this.$store.commit('SET_NAVIGATION_STATE', false)
    }
  },

  methods:{
    scroll(){
      let offsetTop = this.$el.querySelector('.main-nav').getBoundingClientRect().top
      let logoHeight = document.querySelector('.logo').clientHeight
      if(offsetTop < -1 || window.scrollY > logoHeight)
        this.$el.querySelector('.main-nav').classList.add('stuck')
      else
        this.$el.querySelector('.main-nav').classList.remove('stuck')
    },
    scrollTest(){
      window.requestAnimationFrame(this.scroll)
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrollTest);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollTest);
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
    padding: $base-line-height / 2 0;
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
    @include breakpoint-min(full) {
      max-width: map-get($breakpoints, full);
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

@include breakpoint-max(tablet) {
  .main-header {
    margin-bottom: 0;
    border-bottom: 1px solid $primary-grey;
  }
  .main-nav {
    border: 0;
    position: absolute;
    top: $base-line-height;
    right: $base-line-height;
    width: $base-line-height * 2;
    padding: 0;
    background: none;
    position: fixed;
    box-shadow: none;
    &.stuck {
      transition: all .2s;
      z-index: 100;
      top: $base-line-height;
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
      transition: .25s opacity ease-in-out;
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
</style>
