<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  name: 'vue-scroll',
  props: {
    /**
     * 当 probeType 为 1 的时候，会在屏幕滑动停止的时候派发 scroll 事件；
     * 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
     * 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 当设置为 true，better-scroll 会阻止浏览器的原生 click 事件，并自己派发一个 click 事件。
     * 为了区分和原生 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
     */
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  destroyed () {
    this.$refs.scroll && this.$refs.scroll.destroy()
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }

      let options = {
        probeType: this.probeType,
        click: this.click
      }
      this.scroll = new BScroll(this.$refs.wrapper, options)
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          console.log('emit scroll')
          _this.$emit('scroll', pos)
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>
