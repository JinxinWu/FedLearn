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
  created() {
    window.addEventListener('beforeunload', () => {
      if (this.$store.state.websocket != null) {
        this.$store.dispatch("closeWebSocket");
      }
    })
  },
  router,
}).$mount('#app')

Vue.filter('formatDateTime', function (value) {
  if (!value) return '';

  // 将传入的日期字符串转换为Date对象
  const date = new Date(value);

  // 使用 Date 对象的方法获取年、月、日、小时、分钟和秒
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  // 拼接日期时间字符串并返回
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});