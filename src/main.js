import Vue from 'vue'
import App from './App.vue'
// 引入store
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui';
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入路由配置
import router from './router';
//导入iview的js文件
import iView from 'iview';
//导入iview的css文件
import 'iview/dist/styles/iview.css';
// 引入echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
//右键菜单
import Contextmenu from "vue-contextmenujs";

import VueCookies from 'vue-cookies';

import dayjs from "dayjs"
Vue.prototype.$dayjs = dayjs;


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Contextmenu);
Vue.use(VueCookies);

new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
}).$mount('#app')
