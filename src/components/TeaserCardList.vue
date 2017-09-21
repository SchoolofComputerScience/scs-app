<template>
  <div class="card-list-wrapper" :class="{ 'has-call-to-action': typeof this.callToAction === 'object' }">
    <div class="u-content-container">
      <header class="card-list-header" v-if="$slots.default">
        <slot></slot>
      </header>
      <ul class="card-list">
        <li class="card-list-item" v-for="(card, cardID) in cards" :key="cardID">
          <TeaserCard
            :headline="card.headline"
            :subhead="card.subhead"
            :label="card.label"
            :imageURL="card.imageURL"
            :linkURL="card.linkURL">
          </TeaserCard>
        </li>
      </ul>
      <div class="card-list-footer">
        <ALink url="#anchor" class="button button-simple">
          Show more news
        </ALink>
      </div>
    </div>
  </div>
</template>

<script>
import TeaserCard from '../components/TeaserCard.vue';
import ALink from '../components/ALink.vue';

export default {
  name: 'CardList',

  components: {
    TeaserCard,
    ALink
  },

  props: {
    'headline': {},
    'cards': {
      required: true,
      type: Object,
      validator: function(value) {
        if (Object.keys(value).length > 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    'callToAction': {
      type: Object
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
.card-list-wrapper {
  padding: #{$default-gutter * 2} $default-gutter;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
}

.card-list-item {
  flex-basis: 22em;
  min-width: 22em;
  flex-grow: 1;
  padding: 0 #{$default-gutter / 2} $default-gutter;
}

.card-list-footer {
  text-align: center;
}

.button-simple {
  position: static;
  font-size: 0.875em;
}

</style>
