<template>
  <component
    :is="mainTag"
    class="virtual-scroller"
    @scroll="updateVisibleItems"
    v-observe-visibility="handleVisibilityChange">
    <slot name="before-container"></slot>
    <component
      :is="containerTag"
      class="item-container"
      :class="containerClass"
      :style="itemContainerStyle">
      <slot name="before-content"></slot>
      <component
        :is="contentTag"
        class="items"
        :class="contentClass"
        :style="itemsStyle">
        <template v-if="renderers">
          <component
            class="item"
            v-for="(item, index) in visibleItems"
            :key="keysEnabled && item[keyField]"
            :is="renderers[item[typeField]]"
            :item="item"
            :item-index="_startIndex + index">
          </component>
        </template>
        <template v-else>
          <slot
            class="item"
            v-for="(item, index) in visibleItems"
            :item="item"
            :item-index="_startIndex + index"
            :item-key="keysEnabled && item[keyField]">
          </slot>
        </template>
      </component>
      <slot name="after-content"></slot>
    </component>
    <slot name="after-container"></slot>
    <resize-observer @notify="updateVisibleItems" />
  </component>
</template>

<script>
import ResizeObserver from './ResizeObserver.vue'
import ObserveVisibility from '../directives/observe-visibility.js'

export default {
  name: 'virtual-scroller',

  components: {
    ResizeObserver,
  },

  directives: {
    ObserveVisibility,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    renderers: {
      default: null,
    },
    typeField: {
      type: String,
      default: 'type',
    },
    keyField: {
      type: String,
      default: 'id',
    },
    mainTag: {
      type: String,
      default: 'div',
    },
    containerTag: {
      type: String,
      default: 'div',
    },
    containerClass: {
      default: null,
    },
    contentTag: {
      type: String,
      default: 'div',
    },
    contentClass: {
      default: null,
    },
    pageMode: {
      type: Boolean,
      default: false,
    },
    buffer: {
      type: [Number, String],
      default: 2,
    },
    poolSize: {
      type: [Number, String],
      default: 1,
    }
  },

  data: () => ({
    visibleItems: [],
    itemContainerStyle: null,
    itemsStyle: null,
    keysEnabled: true,
    windowWidth: 0,
    rowIndex: 4,
    itemHeight: 0
  }),

  watch: {
    items () {
      this.updateVisibleItems()
    },
    pageMode () {
      this.applyPageMode()
      this.updateVisibleItems()
    }
  },

  methods: {
    getScroll () {
      const el = this.$el
      let scroll

      const rect = el.getBoundingClientRect()

      let top = -rect.top
      let height = window.innerHeight
      if (top < 0) {
        height += top
        top = 0
      }
      if (top + height > rect.height) {
        height = rect.height - top
      }
      scroll = {
        top: top,
        bottom: top + height,
      }

      if (scroll.bottom >= 0 && scroll.top <= scroll.bottom) {
        return scroll
      } else {
        return null
      }
    },

    updateVisibleItems () {
      const l = this.items.length
      const scroll = this.getScroll()
      if (scroll) {
        let startIndex_start = Math.floor((Math.floor(scroll.top / this.itemHeight) - this.buffer) / this.poolSize) * this.poolSize
        let endIndex_start = Math.floor((Math.ceil(scroll.bottom / this.itemHeight) + this.buffer) / this.poolSize) * this.poolSize

        let startIndex = Math.ceil( startIndex_start / this.rowIndex ) * this.rowIndex
        let endIndex = Math.ceil( endIndex_start / this.rowIndex ) * this.rowIndex

        if (startIndex <= 0) {
          startIndex = 0
        }
        if (endIndex >= l) {
          endIndex = l
        }
        if (startIndex !== this._startIndex || endIndex !== this.endIndex) {
          this.keysEnabled = !(startIndex > this._endIndex || endIndex < this._startIndex)
          this._startIndex = startIndex
          this._endIndex = endIndex
          this.visibleItems = this.items.slice(startIndex, endIndex)
          this.itemContainerStyle = {
            height: ((l * this.itemHeight) + 400 ) + 'px',
          }
          this.itemsStyle = {
            marginTop: startIndex * this.itemHeight + 'px',
          }
        }
      }
    },

    scrollToItem (index) {
      this.$el.scrollTop = index * this.itemHeight
    },

    handleVisibilityChange (isVisible, entry) {
      if (isVisible || entry.boundingClientRect.width !== 0 || entry.boundingClientRect.height !== 0) {
        this.$nextTick(() => {
          this.updateVisibleItems()
        })
      }
    },

    applyPageMode () {
      if (this.pageMode) {
        this.addWindowScroll()
      } else {
        this.removeWindowScroll()
      }
    },

    addWindowScroll () {
      window.addEventListener('scroll', this.updateVisibleItems, true)
    },

    removeWindowScroll () {
      window.removeEventListener('scroll', this.updateVisibleItems, true)
    },

    rowIndexSet(){
      if(this.windowWidth < 1024){
        this.itemHeight = (106 + 10)
        this.rowIndex = 2
      }else{
        this.itemHeight = 82
        this.rowIndex = 4
      }
    },

    windowResize (e) {
      if(e){
        this.windowWidth = e.currentTarget.innerWidth;
        this.rowIndexSet()
      }else{
        this.windowWidth = window.innerWidth;
        this.rowIndexSet()
      }
    }
  },

  mounted () {
    this.updateVisibleItems()
    this.applyPageMode()
    this.windowResize()
    window.addEventListener('resize', this.windowResize);

  },

  beforeDestroy () {
    this.removeWindowScroll()
    window.removeEventListener('resize', this.windowResize);
  },
}
</script>

<style lang="scss">
.item-container {
  box-sizing: border-box;
  width: 100%;
  min-height: 60em;
  display: flex;
  justify-content: space-between;
}

.items{
  width: 100%;
  line-height: 0;
}
</style>
