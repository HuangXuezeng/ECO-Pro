<template>
  <div class="one-box" >
    <div class="paper-box" v-for="(item, i) in list" :key="i" >
      <p align="center" class="time">{{item.strTime}}</p>
      <router-link tag="div" class="paper" :to="{name: 'news', query: {id: item.id}}" >
        <div class="paper-img">
          <img v-lazy="item.covers" alt="" >
        </div>
        <div class="text-box" >
          <p class="title" >{{item.name}}</p>
          <p class="desc" >{{item.summary}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getOneList } from './api'
export default {
  props: {
    one: false
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    let word = window.location.href.replace(/\=|\#/gi,'')
    if (this.one) {
      getOneList().then(res => {
        this.list = res.data
      })
    }
  },
  methods: {

  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  .one-box {
    height: 92vh
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 5px
    .paper-box {
      .time {
        color #999
        font-size 12px
        margin 5px 0
      }
      .paper {
        box-sizing border-box
        border 1px solid rgba(0, 0, 0, .1)
        margin-bottom 20px
        .paper-img {
          height 200px
          border-bottom 1px solid rgba(0, 0, 0, .1)
          img {
            width 100%
            height 200px
          }
        }
        .text-box {
          box-sizing border-box
          padding 5px 10px 10px 10px
          .title {
            font-size 16px
            font-weight bold
            line-height 30px
          }
          .desc {
            font-size 14px
            color #666
            line-height 20px
          }
        }

      }
    }
  }
</style>