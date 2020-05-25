<template>
  <div class="write" >
    <div class="w-l" @click="openWrite" >
      <p class="input" >
        <i class="cubeic-edit"></i>
        <span>写点评论吧 . . .</span>
      </p>
    </div>
    <div class="w-r">
      <i class="cubeic-good" :class="{'active' : isDian > 0}" @click="dianZan" >
        <div class="num"><span>{{num}}</span></div>
      </i>
      <i class="cubeic-share" @click="sharebtn" ></i>
    </div>
  </div>
</template>

<script>
import { docDianZan } from './api.js'
import { mapState } from 'vuex'
export default {
  props: {
    isDianZan: {
      type: Number,
      default: 0
    },
    dianZanNum: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  data () {
    return {
      num: 0,
      isDian: 0
    }
  },
  created () {

  },
  methods: {
    // 分享按钮
    sharebtn () {
      let that = this
      let myurl = window.location.href
      dd.ready(() => {
        dd.biz.util.share({
            type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: myurl,
            title: that.title,
            content: that.content,
            image: that.image,
            onSuccess : function() {
                //onSuccess将在调起分享组件成功之后回调
                /**/
            },
            onFail : function(err) {}
        })
      })
    },
    // 点赞
    dianZan () {
      if (this.isDian == 0) {
        docDianZan(this.$route.query.id, this.userId, 1).then(res => {
          this.isDian = 1
          this.num ++
        })
      } else {
        docDianZan(this.$route.query.id, this.userId, -1).then(res => {
          this.isDian = 0
          this.num --
        })
      }
    },
    // 打开输入框
    openWrite () {
      this.$emit('open')
    }
  },
  watch: {
    isDianZan () {
      this.isDian = this.isDianZan
    },
    dianZanNum () {
      this.num = this.dianZanNum
    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  .write {
    display flex
    height 100%;
    box-sizing border-box
    padding 0 5px
    .w-l {
      flex 1
      display flex
      align-items center
      .input {
        flex 1
        margin 0 5px
        height 5vh
        border-radius 10px
        background-color #f1f1f1
        display flex
        align-items center
      }
      .cubeic-edit {
        margin 5px 10px
        font-size 20px
        color #333
      }
    }
    .w-r {
      display flex
      align-items center
      .cubeic-good {
        font-size 26px
        margin 0 5px
        position relative
        .num {
          position absolute
          display flex
          align-items center
          justify-content center
          font-size 12px
          top -4px
          right -8px
          background #f74c31
          color #fff
          padding 4px
          border-radius 10px
        }
      }
      .cubeic-share {
        font-size 26px
        margin-left 5px
        color #333
      }
    }
  }
  .cubeic-good {
    color #333
  }
  .active {
    color red
  }
</style>