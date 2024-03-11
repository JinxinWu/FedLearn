import VueRouter from 'vue-router';

// 登陆界面
import Login from "@/pages/Login";

// 客户端界面
import Connect from "@/pages/client/Connect"; // 连接中央服务器
import Apply from "@/pages/client/Apply"; // 模型应用
import Privacy from "@/pages/client/Privacy"; // 隐私保护
import Preprocess from "@/pages/client/Preprocess"; // 数据预处理
import Chat from "@/pages/client/Chat"
import Test from "@/pages/client/Test";

// 服务端界面
import Message from "@/pages/server/Message"; // 消息管理
import Manage from "@/pages/server/Manage"; // 管理客户端
import Syn from "@/pages/server/Syn"; // 同步算法
import Poly from "@/pages/server/Poly"; // 模型聚合

const router = new VueRouter({
  routes: [
    {
      path: '/client/Connect',
      name: 'Connect',
      component: Connect,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/client/Apply',
      name: 'Apply',
      component: Apply,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/client/Privacy',
      name: 'Privacy',
      component: Privacy,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/client/Preprocess',
      name: 'Preprocess',
      component: Preprocess,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/client/Chat',
      name: 'Chat',
      component: Chat,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    //默认为登录页面
    {
      path: '/',
      name: '/',
      redirect: '/login',
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/server/Message',
      name: 'Message',
      component: Message,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/server/Manage',
      name: 'Manage',
      component: Manage,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/server/Syn',
      name: 'Syn',
      component: Syn,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/server/Poly',
      name: 'Poly',
      component: Poly,
      meta: {
        requireAuth: true
      },
    },
  ],
});

export default router;


//登录拦截
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       //如果需要就执行下面的代码
//       var num=sessionStorage.getItem("isLogin");//登录页面设置
//       if (num==1) {
//           //如果登录了，就跳转到'/index'路径
//           next();
//       }
//   else {
//           next({
//               path: '/login',//返回登录界面
//               // query: {redirect: to.fullPath}
//           })
//       }
//   }
//   else {
//       next();
//   }
// })
