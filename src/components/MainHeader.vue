<template>
  <header v-bind:class="{ 'mobile-menu': mobileMenu }">
    <nav class="navbar navbar-expand-custom navbar-light">
      <router-link to="/" class="navbar-brand logo">
        <span class="u-sr-only">Carnegie Mellon School of Computer Science</span>
      </router-link>
      <button class="navbar-toggler" type="button" v-on:click="toggleMenu" ref="menuButton" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="#" id="depDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Departments
            </a>
            <div class="dropdown-menu" aria-labelledby="depDropdown">
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments">All Departments</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/compbio">Computational Biology Department</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/csd">Computer Science Department</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/hcii">Human-Computer Interaction Institute</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/isr">Institute for Software Research</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/lti">Language Technologies Institute</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/mld">Machine Learning Department</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/ri">Robotics Institute</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/departments/deans_office">Dean's Business Office</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-on:click.native="menuButtonClick" to="/directory">Directory</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="#" id="aboutDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              About
            </a>
            <div class="dropdown-menu" aria-labelledby="aboutDropdown">
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/about">About SCS</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/alumni">Alumni Engagement</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/donate">Donate</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/outreach">Outreach</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/corporate">SCS Partnerships</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/international-students">International Students</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/diversity-and-inclusion">Diversity and Inclusion</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" target="_blank" v-on:click="menuButtonClick" href="http://www.cs.cmu.edu/~help/">Computing Facilities</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" target="_blank" v-on:click="menuButtonClick" href="http://www.cs.cmu.edu/~scsfacts/awards.html">Faculty Awards</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" target="_blank" v-on:click="menuButtonClick" href="http://www.cs.cmu.edu/~scsfacts/studentawards.html">Student Awards</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="#" id="programsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Programs
            </a>
            <div class="dropdown-menu" aria-labelledby="programsDropdown">
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/programs">All Programs</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/undergraduate-programs">Undergraduate</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/masters-programs">Masters</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/doctoral-programs">Doctoral</router-link>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="#" id="admissionsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admissions
            </a>
            <div class="dropdown-menu" aria-labelledby="admissionsDropdown">
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/undergraduate-admissions">Undergraduate</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/masters-admissions">Masters</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" v-on:click.native="menuButtonClick" to="/doctoral-admissions">Doctoral</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-on:click.native="menuButtonClick" to="/courses/S18">Courses</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-on:click.native="menuButtonClick" to="/news">News</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-on:click.native="menuButtonClick" to="/events">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-on:click.native="menuButtonClick" to="/research">Research</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'main-header',

  data () {
    return {
      mobileMenu: false
    }
  },
  methods: {
    toggleMenu: function() {
      this.mobileMenu = !this.mobileMenu;
    },
    menuButtonClick: function() {
      if (this.mobileMenu)
        this.$refs.menuButton.click();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/mixins.scss';

.navbar {
  padding: 0;
  @include breakpoint-min(full) {
    justify-content: center;
  }
}

.navbar-nav {
  .nav-link {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    color: $black;
    font-size: 1rem;
    border-bottom: 3px solid transparent;

    &:hover, &:focus {
      color: $red;
    }

    &:active {
      color: $red;
      border-bottom: 3px solid $red;
    }
  }

  .dropdown-menu {
    background: $red;
  }

  .dropdown-item {
    color: #fff;
    padding: 0.5rem 1.5rem;

    &:hover, &:focus {
      color: $red;
      background: #fff;
    }
  }
}

.navbar-toggler {
  border: none;
  background-color: transparent;
  padding: 0;
  margin-right: 1rem;
}

.navbar-toggler-icon {
  width: 2.5em;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='5 5 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(196, 18, 48)' stroke-width='3' stroke-linecap='square' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E"); 
}

.navbar-brand {
  margin-right: 0;
}

.dropdown-menu {
  left: initial;
  padding: 0;
  border: none;
}

.navbar-expand-custom {
  .navbar-collapse {
    @include breakpoint-min(full) {
      display: flex !important;
      flex: unset;
    }
  }

  .navbar-toggler {
    @include breakpoint-min(full) {
      display: none;
    }
  }

  .navbar-nav {
    @include breakpoint-min(full) {
      flex-direction: row;

      .dropdown-menu {
        position: absolute;
      }
    }
  }
}

.dropdown-divider {
  border-top: 1px solid #fff;
  margin: 0;
}


.u-content-container {
  @include breakpoint-min(laptop) {
    padding: 0 $default-gutter;
  }
}

.logo {
  max-height: $base-line-height * 4;
  width: 15rem;
  display: block;
  background: url(../assets/img/components/MainHeader/cmu-school-main.svg) no-repeat;
  background-size: 100% auto;
  margin-left: 1rem;
  margin-top: 0.5rem;

  &:before {
    content: '';
    display: block;
    box-sizing: content-box;
    width: 100%;
    height: 0;
    padding-bottom: 43 / 240 * 100%;
  }
  @include breakpoint-max(phone) {
    width: 14rem;
    max-width: calc(100vw - 7.5rem);
    padding-left: 0;
    padding-right: 0;
  }
}



</style>
