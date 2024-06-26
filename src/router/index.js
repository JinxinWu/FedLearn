import VueRouter from 'vue-router';

// 登陆界面
import Login from "@/pages/Login";

// 客户端界面
import Connect from "@/pages/client/Connect"; // 连接中央服务器
import Apply from "@/pages/client/Apply"; // 模型应用
import ModelTrain from "@/pages/client/ModelTrain"; // 隐私保护
import Preprocess from "@/pages/client/Preprocess"; // 数据预处理
import ClientCp from "@/pages/client/ClientCp"; // 客户端对比
import Chat from "@/pages/client/Chat" // 建模智聊
import ClientLog from "@/pages/client/Log" // 客户端日志
import Test from "@/pages/client/Test";

// 服务端界面
import Message from "@/pages/server/Message"; // 消息管理
import Manage from "@/pages/server/Manage"; // 管理客户端
import Syn from "@/pages/server/Syn"; // 同步算法
import Poly from "@/pages/server/Poly"; // 模型聚合
import ServerCp from "@/pages/server/ServerCp"; // 服务端对比
import ServerLog from "@/pages/server/Log"; // 服务端日志

const router = new VueRouter({
  routes: [
    {
      path: '/client/Connect',
      name: 'Connect',
      component: Connect,
      meta: {
        requireAuth: true,
        title: '服务端连接',
      },
    },
    {
      path: '/client/Apply',
      name: 'Apply',
      component: Apply,
      meta: {
        requireAuth: true,
        title: '模型应用',
      },
    },
    {
      path: '/client/ModelTrain',
      name: 'ModelTrain',
      component: ModelTrain,
      meta: {
        requireAuth: true,
        title: '隐私保护',
      },
    },
    {
      path: '/client/Preprocess',
      name: 'Preprocess',
      component: Preprocess,
      meta: {
        requireAuth: true,
        title: '数据预处理',
      },
    },
    {
      path: '/client/ClientCp',
      name: 'ClientCp',
      component: ClientCp,
      meta: {
        requireAuth: true,
        title: '数据对比',
      },
    },
    {
      path: '/client/Chat',
      name: 'Chat',
      component: Chat,
      meta: {
        requireAuth: true,
        title: '建模智聊',
      },
    },
    {
      path: '/client/Log',
      name: 'ClientLog',
      component: ClientLog,
      meta: {
        requireAuth: true,
        title: '日志',
      },
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '用户登录',
      },
    },
    //默认为登录页面
    {
      path: '/',
      name: '/',
      redirect: '/login',
      meta: {
        title: '用户登录',
      },
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
      meta: {
        title: '测试',
      },
    },
    {
      path: '/server/Message',
      name: 'Message',
      component: Message,
      meta: {
        requireAuth: true,
        title: '消息管理',
      },
    },
    {
      path: '/server/Manage',
      name: 'Manage',
      component: Manage,
      meta: {
        requireAuth: true,
        title: '客户端管理',
      },
    },
    {
      path: '/server/Syn',
      name: 'Syn',
      component: Syn,
      meta: {
        requireAuth: true,
        title: '算法同步',
      },
    },
    {
      path: '/server/Poly',
      name: 'Poly',
      component: Poly,
      meta: {
        requireAuth: true,
        title: '模型聚合',
      },
    },
    {
      path: '/server/ServerCp',
      name: 'ServerCp',
      component: ServerCp,
      meta: {
        requireAuth: true,
        title: '数据对比',
      },
    },
    {
      path: '/server/Log',
      name: 'ServerLog',
      component: ServerLog,
      meta: {
        requireAuth: true,
        title: '日志',
      },
    }
  ],
});

router.afterEach((to, from) => {
  document.title = to.meta.title //在全局后置守卫中获取路由元信息设置title
  
})

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
