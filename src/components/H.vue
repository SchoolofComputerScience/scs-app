<script>
// Custom heading component
// Allows heading level to be passed as variable for a dynamic heading tag

import Vue from 'vue';

export default {
  name: 'H',
  render: function(createElement) {
    return createElement(
      'h' + this.headingLevel,  // tag name
      this.$slots.default       // array of children
    );
  },

  props: {
    headingLevel: {
      required: true,
      validator: function (value) {
        if (typeof value === 'string') {
          value = Number(value)
        }
        if (typeof value === 'number' && value > 0 && value < 7) {
          return true;
        }
        return false;
      }
    },
  },
}
</script>
