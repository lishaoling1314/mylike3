import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Yzg from '@/pages/yzg/Yzg'
import Service from '@/pages/service/Service'
import Me from '@/pages/me/Me'
import Login from '@/pages/login/Login'
import Fenlei from '@/pages/fenlei/Fenlei'

Vue.use(Router)

//注意：
//用了上面的const router，
//下面一定要加个export default router;
//不然会报错"export 'default' (imported as 'router') was not found in './router'
const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: '/home',
      children: [
          { path: 'home', component:Home, name: '首页' }
      ]
    },
    {
      path: "/yzg",
      name: "yzg",
      component: Yzg,
    },
    {
      path: "/service",
      name: "service",
      component: Service
    },
    {
      path: "/me",
      name: "me",
      component: Me,
      meta: {
        isLogin: true
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/fenlei",
      name: "fenlei",
      component: Fenlei
    },
  ]
})
export default router;