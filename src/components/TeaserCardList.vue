<template>
  <div class="wrapper" :class="{ 'has-call-to-action': typeof this.callToAction === 'object' }">
    <div class="u-content-container">
      <header class="header" v-if="$slots.default">
        <slot name="header"></slot>
      </header>
      <ul class="card-list">
        <li class="item" v-for="(card, cardID) in cards" :key="cardID">
          <TeaserCard
            :headline="card.title"
            :subhead="card.subhead"
            :label="card.__typename"
            :imageURL="card.image"
            :linkURL="getCardLink(cardID)">
          </TeaserCard>
        </li>
      </ul>
      <slot name="footer"></slot>
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
      type: Array,
      validator: function(value) {
        if (value.length > 1) {
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

  methods: {
    getCardLink(cardID) {
      const card = this.cards[cardID];
      if (typeof card.linkURL === 'string') {
        return card.linkURL;
      } else if (typeof card.uid === 'string') {
        if (card.__typename === 'News') {
          return '/news/' + card.uid;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
.wrapper {
  padding: #{$default-gutter } 0 #{$default-gutter * 2};
  @include breakpoint-min(phablet) {
    padding: #{$default-gutter * 2} $default-gutter;
  }
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 #{$default-gutter * 0.75};
  @include breakpoint-min(desktop) {
    flex-wrap: nowrap;
  }
}

.item {
  width: 100%;
  padding: 0 #{$default-gutter / 2} #{$default-gutter / 2};
  @include breakpoint-min(phablet) {
    padding: 0 #{$default-gutter / 2} $default-gutter;
  }
  @include breakpoint-min(tablet) {
    display: flex;
    width: 50%;
  }
  @include breakpoint-min(desktop) {
    width: 33.333%
  }

  a {
    display: block;
  }
}

.footer {
  text-align: center;
}

.button-simple {
  position: static;
  font-size: 0.875em;
}

</style>
