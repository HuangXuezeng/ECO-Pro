<template>
  <div class="past" ref="past" >
    <router-link tag="div" class="paper" :to="{name: 'pastMag', query: {id: item.id}}" v-for="(item, i) in list" :key="i" >
      <p align="center" >{{item.name}}</p>
    </router-link>
  </div>
</template>

<script>
import { getHistory } from './api.js'
export default {
  data () {
    return {
      list: [],
      page: 1,
      totalPage: 0,
    }
  },
  created () {
    getHistory(1).then(res => {
      this.list = res.data.itemList
      console.log(this.list)
      this.totalPage = res.data.totalPage
    })
  },
  mounted () {
    this.listen()
  },
  methods: {
    updata () {
      this.page ++
      if (this.page <= this.totalPage) {
        getHistory(this.page).then(res => {
          this.list.push(...res.data.itemList)
          console.log(this.list)
        })
      }
    },
    listen () {
      this.past = this.$refs.past
      this.past.addEventListener('scroll', () => {
        let h = this.past.scrollTop
        let vh = this.past.clientHeight
        let totalH = this.past.scrollHeight
        if ((h + vh) == totalH) {
          console.log('end')
          this.updata()
        }
      })
    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  .past {
    height: 92vh
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 20px 15px
    .paper {
      border 1px solid #666
      border-radius 10px
      padding 15px 20px
      margin-bottom 20px
      p {
        line-height 24px
      }
    }
  }
</style>