import VueRouter from 'vue-router';

// 登陆界面
import Login from "@/pages/Login";

// 客户端界面
import Connect from "@/pages/client/Connect"; // 连接中央服务器
import Apply from "@/pages/client/Apply"; // 模型应用
import Privacy from "@/pages/client/Privacy"; // 隐私保护
import Train from "@/pages/client/Train";
import ModelLog from "@/pages/client/ModelLog";
import ApplyLog from "@/pages/client/ApplyLog";
import Chat from "@/pages/client/Chat";
import Predict from "@/pages/client/Predict";
import Test from "@/pages/client/Test";

// 服务端界面
import Administrator from "@/pages/server/Administrator";
import AdLog from "@/pages/server/AdLog";
import AdMolLog from "@/pages/server/AdMolLog";

const router = new VueRouter({
  routes: [
    {
      path: '/Connect',
      name: 'Connect',
      component: Connect,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Apply',
      name: 'Apply',
      component: Apply,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Privacy',
      name: 'Privacy',
      component: Privacy,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Train',
      name: 'Train',
      component: Train,
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
      path: '/ModelLog',
      name: 'ModelLog',
      component: ModelLog,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/ApplyLog',
      name: 'ApplyLog',
      component: ApplyLog,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Predict',
      name: 'Predict',
      component: Predict,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/Administrator',
      name: 'Administrator',
      component: Administrator,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/AdLog',
      name: 'AdLog',
      component: AdLog,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/AdMolLog',
      name: 'AdMolLog',
      component: AdMolLog,
      meta: {
				requireAuth: true
			},
    }
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
