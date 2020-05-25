<template>
  <div class="operate" >
    <div class="box">
      <div class="header">
        <p class="center">
          <img v-if="data.diyAvatar" :src="pic" >
          <img v-else :src="default_pic" >
        </p>
        <p class="userNC" >预览</p>
      </div>

      <cube-upload
        v-model="files"
        :action="action"
        @file-success="addedHandler"
      >
        <cube-upload-btn :multiple="false" >
          <div class="cell" >
            <span class="content" >上传头像</span>
            <span class="icon" align="right" >
              <i class="cubeic-arrow" ></i>
            </span>
          </div>
        </cube-upload-btn>
      </cube-upload>

      <cube-button class="btn" @click="save" >保存</cube-button>
    </div>
  </div>
</template>

<script>
import { updataUserInfo } from './api'
export default {
  data () {
    return {
      data: '',
      default_pic: require('@/assets/default_avtar.jpg'),
      files: [],
      pic: '',
      action: {
        target: '/kukacms/visitor/picUpload.htm?type=5',
        fileName: 'files'
      }
    }
  },
  created () {
    this.data = this.$store.state.user
    this.pic = this.$store.state.user.diyAvatar
  },
  methods: {
    addedHandler (i) {
      console.log(i.response.data[1])
      this.pic = i.response.data[1]
      this.data.avatar = this.pic
    },
    save () {
      updataUserInfo(this.data).then(res => {
        this.$router.push({
          name: 'me'
        })
      })
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
  .header {
    box-sizing border-box
    padding 5px
    height: 35vh;
    border-bottom: 1px solid #D9D9D9;
    .center {
      text-align: center;
      padding-top: 20px;
      color: #fff;
      font-size: 18px;
    }
    .center img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #fff;
    }
    .userNC {
      text-align: center;
      margin-top: 10px
    }
  }
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