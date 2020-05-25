<template>
  <div class="operate" >
    <div class="box">
      <div class="content">
        <cube-input v-model="nickName" ></cube-input>
        <p>好的名字可以让你的朋友更容易记住你。</p>
      </div>
      <cube-button class="btn" @click="save" >保存</cube-button>
    </div>
  </div>
</template>

<script>
import { updataUserInfo, nickIsHave } from './api'
export default {
  data () {
    return {
      data: '',
      nickName: ''
    }
  },
  computed: {

  },
  created () {
    this.nickName = this.$store.state.user.nickName
    this.data = this.$store.state.user
  },
  methods: {
    save () {
      // 是否修改昵称
      if (this.data.nickName == this.nickName) {
        this.$router.push({
          name: 'me'
        })
      } else {
        if (this.nickName == '') {
          this.$createDialog({
            type: 'alert',
            content: '昵称不能为空'
          }).show()
          return
        }
        nickIsHave(this.nickName).then(res => {
          if (res.code == 1000) {
            this.data.nickName = this.nickName
            this.data.avatar = this.data.diyAvatar
            // console.log(this.data)
            updataUserInfo(this.data).then(res => {
              this.$router.push({
                name: 'me'
              })
            })
          } else {
            this.$createDialog({
              type: 'alert',
              content: '昵称已存在'
            }).show()
          }
        })
      }
    },
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  .operate {
    position fixed
    width 100%
    max-width: 400px;
    top 0
    bottom 0
    z-index 10
    background #fff
  }
  .box {
    height 100%
    width 100%
    position relative
    .content {
      box-sizing border-box
      padding 10px
      p {
        margin-top 15px
        color #333
      }
    }
    .btn {
      position absolute
      width 100%
      bottom 0
    }
  }

</style>