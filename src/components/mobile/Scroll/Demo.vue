<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div class="recommend-list">
                <ul>
                    <li :key="item.dissid" @click="selectItem(item)" class="item" v-for="item in discList">
                        <div class="icon">
                            <img :src="item.imgurl" width="60" height="60">
                        </div>
                        <div class="text">
                            <h2 class="name">{{item.creator.name}}</h2>
                            <p class="desc">{{item.dissname}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Scroll from './Scroll.vue'
export default {
  data () {
    return {
      discList: []
    }
  },
  created () {
    this.getDiscList()
  },
  methods: {
    getDiscList () {
      fetch('http://localhost:3000/discList')
        .then(res => res.json())
        .then(res => {
          this.discList = res
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        })
    }
  },
  components: {
    Scroll
  }
}
</script>
<style scoped>
    .recommend {
        background: #222;
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 0;
    }
    .recommend-content {
        height: 100%;
        overflow: hidden;
    }
    .recommend-list .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
    }
    .recommend-list .item:first-child {
        padding-top: 20px;
    }
    .recommend-list .item .icon {
        flex: 0 0 60px;
        padding-right: 20px;
    }

    .recommend-list .item .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: 14px;
    }

    .recommend-list .item .text .name {
        margin-bottom: 10px;
        color: #fff;
    }

    .recommend-list .item .text .desc {
        color: rgba(255, 255, 255, 0.3);
    }
</style>
