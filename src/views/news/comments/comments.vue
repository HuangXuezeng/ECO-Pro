<template>
  <div ref="comment" >
    <div class="comments" v-for="(item, i) in list" :key="i" >
      <div class="l-comment">
        <template v-if="item.nickIsAble == 0" >
          <div class='avatar' >
            <p align="center" >{{item.name}}</p>
          </div>
        </template>
        <template v-else >
          <img v-if="item.diyAvatar" :src="item.diyAvatar" alt="">
          <div v-else class='avatar' >
            <p align="center" >{{item.name}}</p>
          </div>
        </template>
      </div>
      <div class="r-comment">
        <p class="name" >
          <span v-if="item.nickIsAble == 0" >{{item.name}}</span>
          <span v-else >{{item.nickName}}</span>
          <span class="zan" align="right" >
            <i class="cubeic-good" :class="{'active' : item.isDianZan > 0}" @click="setGood(i)" >
              <span>{{item.dianzanNum}}</span>
            </i>
          </span>
        </p>

        <p class="content" v-html="item.comment.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)" ></p>
        <p class="reply" v-if="item.reply" >
          <span style="color: red" >顾家人：</span>
          <span style="color: #666" v-html="item.reply.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)" ></span>
        </p>
        <p class="time" >{{item.stime}}</p>
      </div>
    </div>
    <fieldset class="field" v-if="currPage >= totalPage" >
      <legend align="center" >
        <span>我是有底线的</span>
      </legend>
    </fieldset>
    <fieldset class="field" v-else >
      <legend align="center" >
        <span>加载更多</span>
      </legend>
    </fieldset>
  </div>
</template>

<script>
import { getComment, commentDianZan } from './api.js'
export default {
  data () {
    return {
      list: [],
      currPage: 1,
      totalPage: 0,
    }
  },
  created () {
    getComment(this.$route.query.id, 1).then(res => {
      // console.log(res.data)
      this.list = res.data.itemList
      this.totalPage = res.data.totalPage
    })
  },
  methods: {
    loadComment () {
      this.currPage ++
      // console.log(this.currPage)
      if (this.currPage <= this.totalPage) {
        getComment(this.$route.query.id, this.currPage).then(res => {
          this.list.push(...res.data.itemList) 
          this.totalPage = res.data.totalPage
        })
      }
    },
    updataComment () {
      getComment(this.$route.query.id, 1).then(res => {
        // console.log(res.data)
        this.list = res.data.itemList
        this.totalPage = res.data.totalPage
      })
    },
    // 点赞
    setGood (i) {
      if (this.list[i].isDianZan == 0) {
        commentDianZan(this.list[i].id, this.userId, 1).then(res => {
          this.list[i].isDianZan = 1
          this.list[i].dianzanNum ++
        })
      } else {
        commentDianZan(this.list[i].id, this.userId, 1).then(res => {
          this.list[i].isDianZan = 0
          this.list[i].dianzanNum --
        })
      }
    },
    // 将匹配结果替换表情图片
    emotion (res) {
      let word = res.replace(/\#|\;/gi,'')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      let index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`   
    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  .comments {
    display flex
    padding-top 5px
    border-top 1px solid #E6E6E6
    .l-comment {
      img {
        width 50px
        height 50px
      }
      .avatar {
        background: #4f92d4; 
        display: flex;
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
        p {
          color: #fff;
          box-sizing: border-box;
          padding: 0 3px;
        }
      }
    }
    .r-comment {
      flex 1
      box-sizing border-box
      padding-left 10px
      .name {
        color #4f92d4
        display flex
        margin 4px 0 0 0;
        .zan {
          flex 1
          color rgb(102, 102, 102)
          span {
            margin 0 5px
          }
        }
      }
      .content {
        margin-top 10px
        line-height 20px
        // display flex
        // align-items center
      }
      .time {
        margin 15px 0 5px 0
        font-size 12px
        color #999999
      }
      .reply {
        line-height 20px
        margin-top 10px
      }
    }
  }
  .field {
    font-size: 18px;
    color #666
    border-top: 1px solid #999;
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin 10px 0
    span {
      margin-left 10px
      margin-right 10px
    }
  }
  .active {
    color red
  }
</style>