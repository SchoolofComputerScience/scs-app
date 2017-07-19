<template>
  <header class="main-header">
    <div id="cont" class="logo">
      <div>
        <router-link to="/"><img src="../assets/img/cmu-school-main.svg" alt="CMU School of Computer Science"></router-link>
      </div>
    </div>

    <nav class="main-nav">
      <ul>
        <li class="item">
          <router-link to="/" exact>Home</router-link>
        </li>
        <li class="item">
          <router-link to="/directory">Directory</router-link>
        </li>
        <li class="item">
          <router-link to="/research">Research</router-link>
        </li>
        <li class="item">
          <router-link to="/corporate">Corporate</router-link>
        </li>
        <li class="item">
          <router-link to="/courses">Courses</router-link>
        </li>
        <li class="item">
          <router-link to="/programs">Programs</router-link>
        </li>
        <li class="item">
          <router-link to="/alumni">Alumni</router-link>
        </li>
        <li class="item">
          <router-link to="/outreach">Outreach</router-link>
        </li>
        <li class="item">
          <router-link to="/donate">Donate</router-link>
        </li>
        <li class="item">
          <router-link to="/news">News</router-link>
        </li>
        <li class="item">
          <router-link to="/events">Events</router-link>
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
        var classes = element.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);

        element.className = classes.join(' ');
      }
    },
    toggleMenu() {
      var menuButton = this.$el.querySelector('.menu-button');
      this.toggleClass('box-shadow-menu', menuButton);
      this.toggleClass('close', menuButton);
      this.toggleClass('opened', menuButton.parentNode);
      this.toggleClass('viewport-only', document.querySelector('body'));
    },
    scroll(){
      const offsetTop = this.$el.querySelector('.main-nav').getBoundingClientRect().top
      if(offsetTop < -1 || window.scrollY > document.getElementById('cont').clientHeight) {
        this.$el.querySelector('.main-nav').classList.add('stuck');
      }
      else {
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
.main-header{
  display: block;
  width: 100%;
  img {
    height: auto;
    padding: 3vw 0 1vw;
    width: 20em;
    @media screen and (max-width: 600px) {
      width: 15em;
      padding-top: .2em;
    }
  }
  .logo {
    max-width: 62em;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
      padding: 1em;
    }
  }
}

a:hover{
  text-decoration: none;
}

.brand {
  flex: 1;
  font-size: 24px;
  margin: 0;
  a {
    display: inline-block;
    font-weight: 500;
  }
  img, span {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  span {
    margin-left: 5px;
  }
}

ul {
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  line-height: 2.755em;
  position: relative;
  margin-right: 1em;
  &:after {
    display: block;
    position: absolute;
    border-bottom: 0;
    height: 1px;
    width: 100%;
  }
  a {
    font-weight: 400;
    color: #34495e;
    &:hover, &.router-link-active {
      border-bottom: 3px solid;
    }
    &.router-link-active {
      color: #C41230;
    }
  }
}

.main-nav {
  border-top: 1px solid #eee;
  padding: .8em 0 0;
  padding-top: .2em;
  opacity: 1;
  transition: all .2s;
  background: rgba(255, 255, 255, 0);
  width: 100%;
  position: absolute;
  z-index: 200;
  div {
    display: inline-block;
    &:first-child {
      .item:first-child{
        margin-left: 0vw;
      }
    }
    &:last-child {
      .item:last-child{
        margin-right: 0vw;
      }
    }
  }
  &.stuck {
    position: fixed;
    width: inherit;
    top: 0;
    transition: all .2s;
    background: rgba(255, 255, 255, 1);
    z-index: 100;
    max-width: 1520px;
  }
  ul {
    max-width: 62em;
    margin: 0 auto;
    height: 2.85em;
  }
  .item {
    display: inline-block;
    margin: 0 .85em;
    @media only screen and (max-width: 900px) {
      margin: 0 .5em;
    }
    a {
      text-align: center;
      transition: all .1s;
      text-decoration: none;
      display: block;
    }
  }
}

.main-nav:after {
  display: block;
  position: absolute;
  content: " ";
  border-bottom: 1px solid #eee;
  height: 1px;
  width: 100%;
}

#mobileNav {
  display: none;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .box-shadow-menu {
    position: relative;
    padding: 0.6em 2em;
    text-align: center;
    color: #c41230;
    text-transform: uppercase;
    span {
      letter-spacing: .08em;
      font-size: 1em;
    }
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: .8em;
      width: 1.3em;
      height: .14em;
      background: #c41230;
      box-shadow:
        0 0.4em 0 0 #c41230,
        0 0.8em 0 0 #c41230;
      margin-right: 1em;
    }
  }

  .close {
    position: relative;
    padding: 0.6em 2em;
    text-align: center;
    color: #c41230;
    text-transform: uppercase;
    span {
      letter-spacing: .08em;
      font-size: 1em;
    }
    &::before, &::after {
      content: '';
      position: absolute;
      right: .2em;
      top: 1.2em;
      width: 1em;
      background: #c41230;
      height: 2px;
      margin-right: 1em;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }

  .nav {
    text-align: center;
    visibility: hidden;
    opacity: 0;
    height: 0px;
    transition: all .2s;
    background: #c41230;
    a, li {
      display: block;
      font-size: 18px;
    }
    a {
      color: #fff;
      &.router-link-active {
        border-bottom: none;
      }
      &:hover {
        background: #fff;
        color: #c41230;
      }
    }
    li {
      display: block;
      background: #c41230;
      margin: 0;
      z-index: 10000;
    }
  }

  &.stuck {
    position: fixed;
    left: 0;
    top: 0;
    transition: all .2s;
    background: #fff;
    z-index: 100;
    width: 100%;
    margin: 0px;
  }

  &.opened {
    .nav {
      visibility: visible;
      transition: opacity .2s, height 0.2s;
      opacity: 1;
      height: 800px;
    }

    &:after {
      position: absolute;
      right: 0.75em;
      top: 1.45em;
      width: 1em;
      height: 0.15em;
      background: #c41230;
      margin-right: 1em;
    }
  }
}

@media only screen and (max-width: 768px) {
  #mobileNav {
    display: block;
  }
  #mnav {
    display: none;
  }
}
</style>
