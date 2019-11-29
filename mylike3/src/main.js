import Vue from 'vue'
import App from './App.vue'
import router from './router.js' /**不加这个会报[Vue warn]: Unknown custom element: <router-view>．．．**/

Vue.config.productionTip = false
import CommonFooter from "./components/footer/Footer.vue"/**加载共用的底部悬浮组件**/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fastclick from 'fastclick'
import 'css/reset.css' /*引入公共样式*/
import 'css/iconfont.css'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'/*****图片懒加载*****/

import axios from 'axios'/**引入共用的axios**/
import { Store } from 'vuex'
Vue.prototype.axios = axios/**为了让别的组件能用axios,这句加上**/

Vue.component('common-footer',CommonFooter);/**加载共用的底部悬浮组件**/

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)/*****图片懒加载*****/

//router.beforeEach记得要写在new Vue的前面，不然不执行
router.beforeEach((to, from, next) => {
  //console.log(to.meta.isLogin);
  if (to.meta.isLogin) {
    if(localStorage.getItem("username")){ //如果获取到用户名，则next()
        next();
    } else { //不然就跳转到登录；
        next('/login');
    }
  } else {
      next();
  }
})

new Vue({
  el: '#app',
  router,
  axios,/**引入共用axios**/
  render: h => h(App),
}).$mount('#app')
