<template>
  <button class="mobile-toggle" v-bind:class="{open: open}" v-on:click="openNav">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script>
export default {
  name: 'mobile-toggle',

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
      this.$store.commit('SET_NAVIGATION_STATE', !this.$store.state.navigation.navState)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.mobile-toggle {
  width: $base-line-height * 1.75;
  height: $base-line-height * 1.75;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  border: 0;
  -webkit-appearance: none;
  background: none;
  outline: none;
  z-index: 200;
  @include breakpoint-max(phone) {
    width: 1.9em;
  }
}

span {
  display: block;
  position: absolute;
  height: 5px;
  width: 100%;
  background: $red;
  border-radius: 6px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
  @include breakpoint-max(phone) {
    height: 3px;
    border-radius: 3px;
  }
}

span:nth-child(1) {
  top: 6px;
  @include breakpoint-max(phone) {
    top: 10px;
  }
}

span:nth-child(2), span:nth-child(3) {
  top: 19px;
  @include breakpoint-max(phone) {
    top:20px;
  }
}

span:nth-child(4) {
  top: 32px;
  @include breakpoint-max(phone) {
    top: 30px;
  }
}
.open span{
  background: white;
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
