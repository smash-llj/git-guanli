import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Main from '../../views/Main.vue'
import home from '../../views/home/index.vue'
import user from '../../views/user/index.vue'
import goods from '../../views/goods/index.vue'
import login from '../../views/Login/Login.vue'
const router = new VueRouter({  //创建路由接口
  mode: 'history',
  routes: [
    {
      path: '/', name: 'Main', component: Main,
      redirect: '/home', //默认进入到/home路由界面
      children: [
        { name: 'home', path: 'home', component: home },
        { name: 'user', path: 'user', component: user },
        { name: 'goods', path: 'goods', component: goods },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router//暴露
