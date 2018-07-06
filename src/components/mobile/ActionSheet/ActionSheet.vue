<template>
    <div class="menu-select">
        <transition name="menu">
            <div class="menu" v-if="showFlag" ref="wrapper">
                <ul class="menulist">
                    <li v-for="item in list" :key="item.id" @click.stop.prevent="selectItem(item)">
                        <p>{{item.text}}</p>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="menu-mask" v-show="showFlag" @click="hide"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
export default {
  name: 'menuselect',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  watch: {
    showFlag (val) {
      if (val) {
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    }
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1,
        click: true
      })
    },
    selectItem (item) {
      this.$emit('selectItem', item)
      this.hide()
    },
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>

<style scoped>
    .menu-select {
        height:100%;
    }
    .menu {
        z-index: 10001;
        user-select: none;
        width: 100%;
        background: #fff;
        position: fixed;
        overflow: hidden;
        max-height: 320px;
        bottom: 0;
        border-radius: 8px 8px 0 0;
    }
    .menulist {
        position: relative;
        width: 100%;
        display: table;
        padding: 0;
        margin: 0;
    }
    .menulist li {
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: row;
        padding: 10px 10px;
        margin: 0;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    .menulist li:after {
        display: block;
        width: 100%;
        position: absolute;
        background: rgba(17, 27, 37, 0.1) !important;
        left: 0;
        bottom: 0;
        border-top: 1px solid #e8e8e8 !important;
        content: '';
    }
    .menulist li p {
        width: 100%;
        margin: 0;
        font-size: 16px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
        flex: 1 1 auto;
    }
    .menu-mask {
        z-index: 10000;
        position: fixed;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .menu-enter-active, .menu-leave-active {
        transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .menu-enter, .menu-leave-to {
        transform: translate3d(0, 100%, 0);
    }
</style>