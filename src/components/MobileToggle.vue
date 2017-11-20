<template>
  <button class="mobile-toggle" v-bind:class="{open: open}" v-on:click="openNav">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span class="u-sr-only">Toggle Menu</span>
  </button>
</template>

<script>
export default {
  name: 'mobile-toggle',

  props: ['scrollhandler'],

  computed: {
    open () {
      return this.$store.state.navigation.navState
    }
  },

  beforeMount () {
    this.query = this.$store.state.navigation.navState
  },

  watch: {
    open: function () {
      this.$store.commit('SET_NAVIGATION_STATE', this.open)
    }
  },

  methods: {
    openNav(){
      this.scrollhandler();
      this.$store.commit('SET_NAVIGATION_STATE', !this.$store.state.navigation.navState);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.mobile-toggle {
  $width: $base-line-height * 2.25;
  position: relative;
  width: $width;
  height: $width;
  z-index: 200;
  border: 0;
  font-size: 0.75rem;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;

  span {
    $burger-width: $base-line-height * 1.5;
    display: block;
    position: absolute;
    left: ($width - $burger-width) / 2; // Center burger bits
    height: 0.33333em;
    width: $burger-width;
    border-radius: 0.375em;
    background: $red;
    opacity: 1;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  @include breakpoint-min(phablet) {
    $width: $base-line-height * 2.625;
    $burger-width: $base-line-height * 1.75;
    width: $width;
    height: $width;
    font-size: 1rem;

    span {
      left: ($width - $burger-width) / 2; // Center burger bits
      width: $burger-width;
      height: 0.3125em;
    }
  }
}

span:nth-child(1) {
  top: 1.25em;
  @include breakpoint-min(phablet) {
    top: 0.875em;
  }
}

span:nth-child(2), span:nth-child(3) {
  top: 2em;
  @include breakpoint-min(phablet) {
    top: 1.625em;
  }
}

span:nth-child(4) {
  top: 2.8125em;
  @include breakpoint-min(phablet) {
    top: 2.4375em;
  }
}

.open span {
  background: #fff;
}

.open span:nth-child(1) {
  top: 1.1875em;
  width: 0%;
  left: 50%;
}

.open span:nth-child(2) {
  transform: rotate(45deg);
}

.open span:nth-child(3) {
  transform: rotate(-45deg);
}

.open span:nth-child(4) {
  top: 1.1875em;
  width: 0%;
  left: 50%;
}
</style>
