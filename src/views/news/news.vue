<template>
  <div class="news">
    <div class="news-box" ref="news" >
      <div class="news-info" v-if="data.mobileContent" ref="section" >
        <section v-html="data.mobileContent.replace(/\r?\n/g, '')" ></section>
      </div>
      <p class="bottomtext" >
        <span>阅读 {{data.pageViewNum}}</span>
        <span align="right" >评论 {{data.commentNum}}</span>
      </p>
      <div class="comment-box">
        <comments ref="comment" ></comments>
      </div>
    </div>
    <div class="write-box">
      <write 
        :title="data.name" 
        :content="data.summary" 
        :image="data.covers" 
        :dianZanNum="data.dianzanNum" 
        :isDianZan="data.isDianZan"
        @open="showEditor"
      ></write>
    </div>
    <editor ref="editor" @updata="updata" ></editor>
    <div class="loading"  v-if="!data.mobileContent" >
      <cube-loading :size="40" ></cube-loading>
    </div>
  </div>
</template>

<script>
import { getDocumentInfo, addPageView } from './api.js'
import { mapState } from 'vuex'
import Write from './write/write'
import Comments from './comments/comments'
import Editor from './editor/editor'
export default {
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  data () {
    return {
      data: [],
    }
  },
  created () {
    console.log(321)
    addPageView(this.userId, this.$route.query.id)
    getDocumentInfo(this.$route.query.id, this.userId).then(res => {
      console.log(res.data)
      this.data = res.data
    })
  },
  mounted () {
    this.listen()
  },
  methods: {
    listen () {
      this.news = this.$refs.news
      this.news.addEventListener('scroll', () => {
        // 偏移高度
        // console.log(this.news.scrollTop)
        // 总高度
        // console.log(this.news.scrollHeight)
        // 可见区域高度
        // console.log(this.news.clientHeight )
        let h = this.news.scrollTop
        let vh = this.news.clientHeight
        let totalH = this.news.scrollHeight
        if ((h + vh) == totalH) {
          console.log('end')
          this.$refs.comment.loadComment()
        }
      })
    },
    // 图片添加点击事件
    addImgClickEvent () {
      var objs = document.getElementsByTagName('img')
      for (let i = 0; i < objs.length; i ++) {
        // objs[i].onclick = function () {
        //   console.log(196)
        //   window.open(this.src)
        // }
        objs[i].setAttribute('preview', i)
        objs[i].setAttribute('class', 'max')
      }
      this.$previewRefresh()
    },
    showEditor () {
      this.$refs.editor.show()
    },
    updata () {
      this.news = this.$refs.news
      let sectionH = this.$refs.section.clientHeight
      let h = window.screen.availHeight
      this.news.scrollTop = sectionH - h + 210
      this.$refs.comment.updataComment()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.addImgClickEvent()
      }, 20)
    },
    '$route' (to, from) {
        if (to.name === 'news') {
          this.$router.go(0)
        }
      }
  },
  components: {
    Write,
    Comments,
    Editor
  }
}
</script>
<style lang="stylus" scoped>
  .news {
    position fixed
    width 100%
    max-width: 400px;
    top 0
    bottom 0
    z-index 10
    background #fff
    .news-box {
      height 92vh
      width 100%
      overflow hidden
      overflow-y auto
      box-sizing border-box
      padding 5px 8px
    }
    .write-box {
      height 8vh
      width 100%
      border-top 1px solid #E6E6E6
    }
  }
  .comment-box {

  }
  .bottomtext {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .bottomtext span {
    flex: 1;
    color: #666;
  }
  .loading {
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0, 0, 0, .3)
    display flex
    align-items center
    justify-content center
    color #fff
  }

</style>

<style>
  .news p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    /* font-size: 16px */
  }
  .news span {
    /* font-size: 16px */
  }
  strong, b {
    font-weight: bold;
  }
  strong span {
    font-weight: bold;
  }
  .max {
    max-width: 100%;
  }
</style>
