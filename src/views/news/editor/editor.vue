<template>
  <div class="editor" v-if="isWrite" @click="isWrite = false" >
    <div class="comment-box" @click.stop >
      <div class="btns">
        <div class="btn" @click="isWrite = false" >取消</div>
        <div class="btn" @click="submit" >评论</div>
      </div>
      <div class="text-box">
        <textarea v-model="comment" rows="4"></textarea>
      </div>
      <div class="emotion-box">
        <emotion :height="140" @emotion="handleEmotion" ></emotion>
      </div>
    </div>
  </div>
</template>

<script>
import Emotion from '@/components/Emotion/index'
import { toComment } from './api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isWrite: false,
      comment: '',
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  methods: {
    handleEmotion (i) {
      this.comment += i
    },
    show () {
      this.isWrite = !this.isWrite
    },
    submit () {
      if (this.comment == '') {
        alert("写点评论嘛")
      } else {
        let data = {
					documentId: this.$route.query.id,
          userId: this.userId,
					comment: this.comment,
					url: ''
        }
        toComment(data).then(() => {
          this.$emit('updata')
          this.comment = ''
          this.show()
        })
      }
    }
  },
  components: {
    Emotion
  }
}
</script>
<style lang="stylus" scoped>
  .editor {
    position fixed
    top 0
    width 100%
    max-width 400px
    bottom 0
    background rgba(0, 0, 0, 0.5)
    z-index 50
  }
  .comment-box {
    position fixed
    bottom 0
    width 100%
    max-width 400px
    z-index 51
    background #D9D9D9
    .btns {
      display flex
      background #D9261D
      .btn {
        flex 1
        text-align center
        padding 8px 0
        color #fff
        letter-spacing 5px
        text-indent 5px
      }
    }
    .text-box {
      padding 10px
      box-sizing border-box
      display flex
      textarea {
        flex 1
        border none
        outline none
        resize none
        font-size 16px
        padding 5px
      }
    }
    .emotion-box {
      padding-bottom 10px
    }
  }
</style>