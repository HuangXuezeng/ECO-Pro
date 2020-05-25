<template>
  <div id="app">
    <!-- 头部部分 -->
    <!-- <mt-header title="投诉直通车">
      <router-link to="/" slot="left">
        <mt-button  @click="back" style="z-index:999 ;" icon='back'>返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" style="z-index:999;"></mt-button>
    </mt-header> -->
  <!-- 内容部分 -->
 <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
  </keep-alive> -->
<!-- 底部部分 -->

    <div class="container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
    <!-- <m-tab></m-tab> -->
  </div>
</template>

<script>
import MTab from "@/components/m-tab";
import { setDDConfig } from "@/api/dd";
import { mapMutations } from "vuex";
import fetch from "@/api/fetch";
export default {
  name: "app",
  created() {
    // 获取用户 id
    setDDConfig().then(res => {
      var that = this;
      let data = res;
      var is_mobi =
        navigator.userAgent
          .toLowerCase()
          .match(
            /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
          ) != null;
      if (!is_mobi) {
        // PC
        console.log("pc");
        DingTalkPC.ready(() => {
          DingTalkPC.runtime.permission.requestAuthCode({
            corpId: data.corpId, //企业ID
            onSuccess: function(result) {
              let url =
                "/kukacms/visitor/getDingUserInfo.htm?accessToken=" +
                data.token +
                "&code=" +
                result.code;
              fetch({
                url: url,
                method: "get"
              }).then(res => {
                console.log(res);
                that.save_userId(res.data.userId);
                that.save_userName(res.data.uesrName)
              });
            },
            onFail: function(err) {
              window.location.reload();
            }
          });
        });
      } else {
        // 移动
        console.log("mobile");
        dd.ready(() => {
          dd.ui.webViewBounce.disable();
          dd.runtime.permission.requestAuthCode({
            corpId: data.corpId,
            onSuccess: function(result) {
              let url =
                "/kukacms/visitor/getDingUserInfo.htm?accessToken=" +
                data.token +
                "&code=" +
                result.code;
              fetch({
                url: url,
                method: "get"
              }).then(res => {
                console.log(res);
                that.save_userId(res.data.userId);
                that.save_userName(res.data.userName)
              });
            },
            onFail: function(err) {
              window.location.reload();
            }
          });
        });
      }
    });
  },
  methods: {
    ...mapMutations({
      save_userId: "save_userId"
    }),
    back(){
      this.$router.go(-1);//返回上一层
    }
  },
  components: {
    MTab
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
  /* overflow: hidden; */
}
.container {
  /* margin-top: 40px; */
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
* {
  -webkit-overflow-scrolling: touch;
}
.mint-header{
  background-color: #eee ;
  color: #333
  
}


</style>
