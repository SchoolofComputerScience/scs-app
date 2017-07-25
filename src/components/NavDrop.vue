<template>
  <li v-on:mouseover="active = !active" v-on:mouseout="active = !active" class="drop-container">
    <router-link :to="navlink">{{navtitle}}</router-link>
    <ul class="drop-inner" v-bind:class="{ active: active }">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'nav-drop',

  props: ['navlink', 'navtitle'],

  data: function () {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
@import '../assets/scss/mixins.scss';

a{
  @include type-setting(0);
  color: $black;
  display: block;
  padding: $base-line-height / 2 0;
  &:hover{
    color: $red;
  }
}

.drop-container{
  position: relative;
}

.drop-inner{
  border-bottom: 4px solid $red;
  border-top: 0;
  padding: $base-line-height;
  position: absolute;
  background: white;
  left: -$base-line-height * 1.2;
  transition: .2s;
  opacity: 0;
  pointer-events: none;
  box-shadow: $box-shadow-inert;
  li{
    display: block;
    transition: .2s;
    min-width: $base-line-height * 6;
  }
  &.active{
    opacity: 1;
    transition: .2s;
    left: -$base-line-height;
    pointer-events: all;
    li{
      transition: .2s;
    }
  }
}

@include breakpoint-max(tablet) {
  .drop-inner{
    border: none;
    position: relative;
    opacity: 1;
    padding: 0;
    background: none;
    left: 0;
    box-shadow: none;
    li{
      display: block;
      width: 100%;
      border-bottom: 1px solid lighten($red, 5%);
      position: relative;
      left: 0;
      &:after{
        content: '> ';
        color: white;
        left: $base-line-height;
        top: 25%;
        bottom: 0;
        position: absolute;
      }
    }
    li > a{
      color: white;
      padding-left: $base-line-height * 2;
      &:hover{
        color: white;
      }
    }
    li:first-child{
      border-top: 1px solid lighten($red, 5%);
    }
    &.active{
      left: 0;
    }
  }
  a{
    @include type-setting(0);
    padding: $base-line-height / 2 $base-line-height;
    color: white;
    display: block;
    &:hover{
      color: white;
    }
  }
}
</style>
