<template>
    <!--轮播组件-->
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
                <!--异步加载过程可能使dom的宽度无法获取-->
            </slot>
        </div>
        <div v-if="showDot" class="dots">
            <span class="dot" :key="index" v-for="(item, index) in dots"
                  :class="{active: currentIndex === index}"></span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'assets/js/dom'
export default {
  name: 'vue-slider',
  props: {
    loop: { // 是否循环播放
      type: Boolean,
      default: true
    },
    autoPlay: { // 是否自动播放
      type: Boolean,
      default: true
    },
    interval: { // 播放间隔时间
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    /**
     * better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
     */
    click: {
      type: Boolean,
      default: true
    },
    threshold: { // 用手指滑动时，大于这个值可以滑动到下一页
      type: Number,
      default: 0.3
    },
    speed: { // 轮播图切换的动画时间
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  mounted () {
    this.update()
  },
  methods: {
    update () {
      if (this.slide) {
        this.slide.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    init () {
      this._setSliderWidth()
      if (this.showDot) {
        this._initDots()
      }
      this._initSlider()
//      if (this.autoPlay) {
//        this._play()
//      }
    },
    _setSliderWidth () {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 false 则关闭动画。
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        bounce: false, // 当滚动超过边缘的时候会有一小段回弹动画。设置为 false 则关闭动画。
        stopPropagation: true,
        click: this.click
      })
    },
    _initDots () {

    },
    _play () {

    }
  }
}
</script>
<style scoped>
    .slider {
        min-height: 1px;
    }

    .slider .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
    }

    .slider .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
    }

    .slider a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
    }

    .slider img {
        display: block;
        width: 100%;
    }

    .slider .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
    }

    .slider .dots .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
    }

    .slider .dots .active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
    }
</style>
