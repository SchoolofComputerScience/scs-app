<template>
  <button class="mobile-toggle" v-bind:class="{open: open}" v-on:click="openNav">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span class="sr-only">Toggle Menu</span>
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
  $width: $base-line-height * 2.625;
  position: relative;
  width: $width;
  height: $width;
  z-index: 200;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  border: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  span {
    $burger-width: $base-line-height * 1.75;
    display: block;
    position: absolute;
    left: ($width - $burger-width) / 2; // Center burger bits
    height: 5px;
    width: $burger-width;
    background: $red;
    border-radius: 6px;
    opacity: 1;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }
}

span:nth-child(1) {
  top: 14px;
}

span:nth-child(2), span:nth-child(3) {
  top: 26px;
}

span:nth-child(4) {
  top: 39px;
}

.open span {
  background: #fff;
}

.open span:nth-child(1) {
  top: 19px;
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
  top: 19px;
  width: 0%;
  left: 50%;
}
</style>
