import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

// 下面引入并给Vue添加方法后就可以通过this的方式来引入axios
import axios from 'axios'
Vue.prototype.axios = axios;

//定义一个全局的过滤器，用于把接口返回的图片地址中"w.h"替换
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});
import Scroller from '@/components/Scroller'
//注册为全局组件，方便使用
Vue.component('Scroller',Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
