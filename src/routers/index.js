import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    // 设置路由的重定向，加入路由地址不匹配下执行默认的
    {
      path : '/*',
      redirect : '/movie'
    }
  ]
})
