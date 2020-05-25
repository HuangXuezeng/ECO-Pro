import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from '@/store/index'


//使用mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index'

Vue.use(MintUI)

//使用mui
import './lib/mui/css/mui.min.css'
// import './lib/mui/js/mui.js'



















Vue.use(Cube)

// 兼容 ES6
import 'babel-polyfill'
// 查看大图
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
var options={
  fullscreenEl: false, //关闭全屏按钮
  isClickableElement : function(el){
    return el.tagName === 'A' || el.tagName === 'IMG';
  },
  tapToClose: true,
}
Vue.use(preview, options)
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // error:'./static/error.png',
    // loading:'./static/loading.gif'
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
