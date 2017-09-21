<template>
  <a :href="linkURL" class="link-wrapper">
    <article class="card">
      <div class="image" :style="backgroundImageStyle">
      </div>
      <div class="text-wrapper">
        <div class="label" v-if="label">{{ label }}</div>
        <H :headingLevel="headingLevel" class="headline" v-if="headline">
          {{ headline }}
        </H>
        <p v-if="subhead">
          {{ subhead }}
        </p>
      </div>
    </article>
  </a>
</template>

<script>
import H from '../components/H.vue'

export default {
  name: 'TeaserCard',

  props: {
    linkURL: {
      required: true,
      type: String,
    },
    headline: {
      required: true,
      type: String
    },
    headingLevel: {
      default: 2
    },
    subhead: {
      type: String
    },
    label: {
      type: String
    },
    imageURL: {
      required: true
    }
  },

  components: {
    H
  },

  computed: {
    // Returns properly formatted style object
    backgroundImageStyle: function() {
      if (typeof this.imageURL === 'string' && this.imageURL.length > 0) {
        return {'background-image': 'url("' + this.imageURL +'")'};
      } else {
        return {};
      }
    }
  }

//  methods: {
//  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

.card {
  margin: 0;
  padding: 0;
  font-size: 1rem;
}

.link-wrapper {
  color:inherit;
}

.image {
  background-size: cover;

  &:before {
    // Locks the aspect ration of the card image
    content: '';
    display: block;
    box-sizing: content-box;
    padding: 0 0 50%;
  }
}

.text-wrapper {
  padding: $default-gutter * 0.78125;
}

.label {
  margin: 0 0 0.7143em;
  font-size: 0.875em;
  font-weight: 600;
  color: #C7A471;
}

.headline {
  font-size: 1.125em;
  line-height: 1.44;
  font-weight: 600;
  color: inherit;
}

</style>
