<template>
    <div>
        <ul>
            <li :key="i" v-for="(o,i) in userList">{{o.username}}</li>
        </ul>
        <v-pagination :totalPage="totalPage" :pageIndex="pageIndex" :pageSize="pageSize" :total="total"
                      :from="from" :to="to"
                      @pagechange="pageChange"></v-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
import Pagination from '@/components/pc/Pagination/Pagination'
export default {
  components: {
    'v-pagination': Pagination
  },
  data () {
    return {
      totalPage: 6,
      pageIndex: 1,
      pageSize: 2,
      total: 10,
      from: 1,
      to: 0,
      userList: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      fetch(`http://localhost:3000/user?_page=${this.pageIndex}&_limit=${this.pageSize}`)
        .then(res => res.json())
        .then(res => {
          this.from = (this.pageIndex - 1) * this.pageSize + 1
          this.to += res.length
          this.totalPage = Math.ceil(this.total / this.pageSize)
          this.userList = res
        })
    },
    pageChange (page) {
      this.pageIndex = page
      this.getUserList()
    }
  }
}
</script>
