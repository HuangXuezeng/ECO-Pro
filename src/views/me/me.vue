<template>
  <div class="me" >
    <m-header :pic="user.diyAvatar" :name="nickName" ></m-header>
    <div class="cell" @click="showName" >
      <span class="content">我的昵称</span>
      <span class="icon" align="right" >
        <i class="cubeic-arrow" ></i>
      </span>
    </div>
    <div class="cell" @click="showAvatar" >
      <span class="content" >我的头像</span>
      <span class="icon" align="right" >
        <i class="cubeic-arrow" ></i>
      </span>
    </div>
    <div class="cell">
      <span class="content" >启用昵称</span>
      <span class="icon" align="right" >
        <cube-switch v-model="nickIsAble" ></cube-switch>
      </span>
    </div>

    <!-- 操作组件 -->
  </div>
</template>

<script>
import MHeader from './m-header/m-header'

import { getUserInfo, updataUserInfo } from './api'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  data () {
    return {
      user: '',
      nickName: '',
      data: '',
      nickIsAble: false,
    }
  },
  created () {
    this.updata()
  },
  methods: {
    showName () {
      // this.$refs.name.show()
      this.$router.push({
        name: 'name'
      })
    },
    showAvatar () {
      // this.$refs.avatar.show()
      this.$router.push({
        name: 'avatar'
      })
    },
    updata () {
      getUserInfo(this.userId).then(res => {
        let data = {
          userId: res.data.userId,
          nickName: res.data.nickName,
          nickIsAble: res.data.nickIsAble,
          avatar: res.data.diyAvatar,
        }
        this.data = data
        this.user = res.data
        this.$store.state.user = res.data
        console.log(this.$store.state.user)
        this.nickName = this.user.nickName
        this.nickIsAble = this.user.nickIsAble == 1? true : false
        if (this.user.nickIsAble != 1) {
          this.user.diyAvatar = this.user.avatar
          this.nickName = this.user.name
        }
      })
    }
  },
  watch: {
    nickIsAble () {
      this.data.nickIsAble = this.nickIsAble ? 1 : 0
      updataUserInfo(this.data).then(res => {
        this.updata()
      })
    }
  },
  components: {
    MHeader,
  }
}
</script>
<style lang="stylus" scoped>
  .me {
    height: 92vh
    overflow hidden
    .cell {
      height 45px
      border-bottom 1px solid #D9D9D9
      box-sizing border-box
      padding 5px 10px
      display flex
      align-items center
      // justify-content center
      .content {
        flex 1
      }
      .input {
        flex 1
        
      }
      .cell-box {

      }
    }
  }
</style>

