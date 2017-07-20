<template>
  <transition name="loading" appear>
    <div>
      <div class="b1"></div>
      <div class="b2"></div>
      <div class="b3"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'spinner',
}
</script>

<style lang="scss" scoped>
// .spinner {
//   width: 3em;
//   position: absolute;
//   display: inline;
//   top: 3em;
// }
//
// .spinner > div{
//   width: 6px;
//   height: 24px;
//   margin-right: 2px;
//   background: #C41230;
//   display: inline-block;
//   -webkit-animation: bouncedelay 1s infinite ease-in-out both;
//   animation: bouncedelay 1s infinite ease-in-out both;
// }
//
// .spinner{
//   .b1{
//     -webkit-animation-delay: -0.32s;
//     animation-delay: -0.32s;
//   }
//   .b2{
//     -webkit-animation-delay: -0.16s;
//     animation-delay: -0.16s;
//   }
// }
//
// @keyframes bouncedelay{
//   0%, 80%, 100%{
//     -webkit-transform: scale(0.4);
//     transform: scale(0.4);
//   }
//   40%{
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
// }
</style>
