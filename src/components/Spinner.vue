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
@import '../assets/scss/vars.scss';

.spinner {
  margin: $base-line-height 0;
  text-align: center;
}

.spinner div {
  width: 26px;
  height: 26px;
  background-color: $red;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.7s infinite ease-in-out both;
  margin-right: 8px;
}

.spinner .b1 {
  animation-delay: -0.60s;
}

.spinner .b2 {
  animation-delay: -0.40s;
}

.spinner .b3 {
  animation-delay: -0.20s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0;
  } 40% {
    transform: scale(1.0);
    opacity: 1;
  }
}

</style>
