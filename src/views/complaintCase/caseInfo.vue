<template>
  <div class="news">
      <div class="news-box" ref="news" >
          <div class="news-info" v-if="this.content" ref="section" >
              <section v-html="this.content.replace(/\r?\n/g, '')" ></section>
          </div>
      </div>
  </div>
</template>
<script>
import{getCaseinfo} from './caseService'
export default {
  data () {
    return {
        content:''
    };
  },
  created(){
      getCaseinfo(this.$route.query.id).then((res =>{
          console.log(res);
          this.content = res.data.content
          
      }))
  }
}
</script>
<style lang="stylus" scoped>
.news {
    padding-top 20px
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
</style>