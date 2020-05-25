<template>
  <div>
    <cube-slide :data="list" class="slide" >
      <cube-slide-item v-for="(item, i) in list" :key="i" class="slide-item" >
        <router-link :to="item.url" >
          <!-- <img :src="item.img" alt=""> -->
          <div class="pic" :style="{backgroundImage : 'url(' + item.img + ')' }" ></div>
        </router-link>
        <p class="bg" >
          {{item.title}}
        </p>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
import { getCarouselList } from './api'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    getCarouselList().then(res => {
      this.list = res.data
    })
  },
  methods: {
    changePage () {

    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  .slide-item {
    position relative
    .pic {
      width 100%
      height 180px
      background center center no-repeat
      background-size cover
    }
    img {
      width 100%
      height 180px
    }
    .bg {
      position absolute
      bottom 0
      text-align left
      width 100%
      height 48px
      line-height 50px
      box-sizing border-box
      padding: 0 60px 0 10px 
      color #ffffff
      overflow hidden
      text-overflow ellipsis
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
    }
  }
</style>

<style>
  .slide .cube-slide-dots {
    bottom: 15px;
    color: red;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
    font-size: 16px;
  }
  .slide .cube-slide-dots span {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    color: #d0cdd1;
  }
</style>

 