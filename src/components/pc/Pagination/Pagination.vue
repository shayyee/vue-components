<template>
    <div v-show="total > 0">
        showing<span class="desc">{{from}}</span>to<span class="desc">{{to}}</span>of<span class="desc">{{total}}</span>entries
        <ul class="pagination pagination-sm no-margin pull-right">
            <li v-show="pageIndex > 1"><a @click="prevPage">&larr; Prev</a></li>
            <li v-for="n in showPageBtn" :key="n" :class="[n == pageIndex ? 'active' : '']">
                <a v-if="n" @click="changePage(n, $event)">{{n}}</a>
                <a v-else>···</a>
            </li>
            <li v-show="pageIndex < totalPage"><a @click="nextPage">Next &rarr;</a></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'vue-pagination',
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    pageIndex: {
      type: Number,
      required: true
    },
    total: Number,
    from: Number,
    to: Number
  },
  computed: {
    showPageBtn () {
      let pageNum = this.totalPage
      let index = this.pageIndex
      let arr = []
      if (pageNum <= 5) { // 当总页数不大于5时，显示全部页码
        for (let i = 1; i <= pageNum; i++) {
          arr.push(i)
        }
        return arr
      }
      // 当总页数大于5时，始终显示首尾页码
      if (index <= 2) return [1, 2, 3, 0, pageNum]
      if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      if (index === 3) return [1, 2, 3, 4, 0, pageNum]
      if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      return [1, 0, index - 1, index, index + 1, 0, pageNum]
    }
  },
  methods: {
    prevPage (e) {
      e.preventDefault()
      let curpage = this.pageIndex
      curpage--
      this.$emit('pagechange', curpage)
    },
    nextPage (e) {
      e.preventDefault()
      let curpage = this.pageIndex
      curpage++
      this.$emit('pagechange', curpage)
    },
    changePage (curpage, e) {
      e.preventDefault()
      this.$emit('pagechange', curpage)
    }
  }
}
</script>

<style scoped>
    .desc {
        margin: 0 5px;
        color: #4b286d;
    }
    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
        float: right;
    }
    .pagination>li>a, .pagination>li>span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        color: #333;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }
    .pagination>li {
        display: inline;
    }
    .pagination>li>a {
        background: #fff;
        color: #666;
    }
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
        color: #333;
        background-color: #f5f5f5!important;
        border-color: #ddd;
    }
</style>
