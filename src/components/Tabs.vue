<template lang="pug">
div
  section(class="content_filter")
    button(
      v-for="tab, i in tabs"
      v-bind:key="tab.name"
      v-bind:class="['filter_item', { active: currentTab === i }]"
      v-on:click="currentTab = i"
    )  #[span {{tab.name}}] #[span {{tab.dataCount}}]

  section(class="content_list")
    component(
      v-bind:is="currentTabComponent"
    )
</template>

<script>

export default {
  name: 'tab-view',
  props: [
    "tabs"
  ],
  data: function () {
    return {
      currentTab: 0
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.tabs[this.currentTab].component;
    }
  }
}
</script>
