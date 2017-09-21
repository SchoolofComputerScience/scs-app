// Simple Link Component
// Figures out if link is internal or external to decide if router-link is necessary
// Does not take behaviors (e.g. focus and hover)
<template>
  <router-link v-if="isInternalLink(url)" :to="url" exact>
    <slot></slot>
  </router-link>
  <a v-else :href="url">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'ALink',

  props: ['url'],

  methods: {
    isInternalLink: function(linkURL) {
      if (linkURL.substring(0, 4) === 'http' || linkURL.substring(0, 2) === '//' || linkURL.substring(0, 1) === '#') {
        return false;
      }
      return true;
    }
  }
}
</script>
