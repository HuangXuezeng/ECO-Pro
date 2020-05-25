<template>
  <div>
    <div class="magazine" v-if="active" >
      <div class="tab-box" >
        <cube-scroll
          ref="scroll"
          :data="list"
          direction="horizontal">
          <cube-tab-bar v-model="active" showSlider >
            <cube-tab v-for="item in list" :label="item.id" :key="item.id" class="item" >
              {{item.name}}
            </cube-tab>
          </cube-tab-bar>
        </cube-scroll>
      </div>
      <cube-tab-panels v-model="active" >
        <cube-tab-panel v-for="item in list" :label="item.id" :key="item.id" >
          <swiper v-if="list[0].id == item.id" ></swiper>
          <router-link tag="div" v-for="news in item.magList" :key="news.id" class="content" :to="{name:'news', query: {id: news.id}}" >
            <div class="l-box">
              <p class="title" >{{news.name}}</p>
              <p class="desc" >{{news.summary}}</p>
              <p class="plus" >
                <span> <i class="cubeic-eye-visible icon" ></i> {{news.pageViewNum}}</span>
                <span> <i class="cubeic-message icon" ></i> {{news.commentNum}}</span>
              </p>
            </div>
            <div class="r-box">
              <img v-lazy="news.covers" alt="">
            </div>
          </router-link>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>


  </div>
</template>

<script>
import { getNav, getDocumentList } from './api'
import Swiper from './swiper/swiper'
export default {
  props: {
    Mag: false
  },
  data() {
    return {
      active: '',
      list: [],
    }
  },
  created () {
    if (this.Mag) {
      getNav().then(res => {
        this.list = res
        for (let i in res) {
          let id = res[i].id
          getDocumentList(id, 1).then(res => {
            this.list[i].magList = res.data.itemList
            if (res.data.totalPage > 1) {
              for (let n = 2; n <= res.data.totalPage; n ++) {
                getDocumentList(id, n).then(res => {
                  this.list[i].magList.push(...res.data.itemList)
                })
              }
            }
            let n = + i + 1
            if (n == this.list.length) {
              this.active = this.list[0].id
            }
          })
        }
      })
    }
  },
  components: {
    Swiper
  }
}
</script>

<style lang="stylus" scoped>
  .magazine {
    height: 92vh
    overflow hidden
  }
  .tab-box {
    height: 6vh
    .cube-tab-bar {
      height: 6vh
    }
    .item {
      padding 10px 5px
      min-width 90px
      display flex
      justify-content center
    }
    .cube-tab_active {
      color #d9261d
    }
  }
  .cube-tab-panel {
    height: 86vh
    overflow hidden
    overflow-y auto
  }
  .content {
    display flex
    box-sizing border-box
    padding 10px 8px 5px 8px
    border-bottom 1px solid #E6E6E6
    .l-box {
      flex 2
      box-sizing border-box
      padding-right 5px
      p {
        line-height 20px
      }
      .title {
        color #333333
      }
      .desc {
        margin-top 10px
        color #66677C
        font-size 14px
      }
      .plus {
        margin-top 5px
        span {
          font-size 12px
          margin-right 10px
        }
      }
      // background green
    }
    .r-box {
      flex 1
      img {
        width 100%
      }
      // background red
    }
  }
  .icon {
    font-size 12px
    color rgba(0, 0, 0, .5)
  }
</style>

<style>
  .tab-box .cube-scroll-content {
    display: inline-block
  }
</style>
