<template>
  <header>
    <div class="logo">
      <router-link to="/"><img src="../assets/img/cmu-school-main.svg" alt="CMU School of Computer Science"></router-link>
    </div>
    <nav class="main-nav">
      <ul>
        <li>
          <p><router-link to="/" exact>Home</router-link></p>
        </li>
        <li>
          <p><router-link to="/directory">Directory</router-link></p>
        </li>
        <li>
          <p><router-link to="/research">Research</router-link></p>
        </li>
        <li>
          <p><router-link to="/corporate">Corporate</router-link></p>
        </li>
        <li>
          <p><router-link to="/courses">Courses</router-link></p>
        </li>
        <li>
          <p><router-link to="/programs">Programs</router-link></p>
        </li>
        <li>
          <p><router-link to="/alumni">Alumni</router-link></p>
        </li>
        <li>
          <p><router-link to="/outreach">Outreach</router-link></p>
        </li>
        <li>
          <p><router-link to="/donate">Donate</router-link></p>
        </li>
        <li>
          <p><router-link to="/news">News</router-link></p>
        </li>
        <li>
          <p><router-link to="/events">Events</router-link></p>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'main-header',

  computed: {
    menu () {
      return this.$store.getters.menu
    },

    navigation () {
      return this.$store.getters.navigation
    }
  },
  methods:{
    toggleClass(className, element) {
      if (element.classList) {
        element.classList.toggle(className);
      } else {
        let classes = element.className.split(' ');
        let existingIndex = classes.indexOf(className);

        if (existingIndex >= 0){
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
        }
        element.className = classes.join(' ');
      }
    },
    toggleMenu() {
      // var menuButton = this.$el.querySelector('.menu-button');
      // this.toggleClass('box-shadow-menu', menuButton);
      // this.toggleClass('close', menuButton);
      // this.toggleClass('opened', menuButton.parentNode);
      // this.toggleClass('viewport-only', document.querySelector('body'));
    },
    scroll(){
      const offsetTop = this.$el.querySelector('.main-nav').getBoundingClientRect().top
      if(offsetTop < -1 || window.scrollY > document.querySelector('.logo').clientHeight) {
        this.$el.querySelector('.main-nav').classList.add('stuck');
      } else {
        this.$el.querySelector('.main-nav').classList.remove('stuck');
      }
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
  padding: 0 $base-line-height;
  margin-left: -$base-line-height;
  height: $base-line-height * 2;
  background: white;
  border-top: 1px solid $primary-grey;
  border-bottom: 1px solid $primary-grey;
  &.stuck {
    position: fixed;
    top: 0;
    transition: all .2s;
    background: rgba(255, 255, 255, 1);
    z-index: 100;
  }
  ul{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $base-line-height * 2;
  }
  li {
    display: inline-block;
  }
  p{
    padding: 0;
  }
}
</style>
