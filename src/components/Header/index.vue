<template>
  <el-row style="box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.1)">
    <el-col :span="5">
      <img
        style="width: 50%; margin-left: 140px"
        src="@/assets/logo.png"
        alt=""
      />
    </el-col>
    <el-col :span="2">
      <svg
        t="1708935372544"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6170"
        width="30"
        height="30"
        style="margin-bottom: 6px"
      >
        <path
          d="M510.7 565c-101.6 0-184.3-82.7-184.3-184.3s82.7-184.3 184.3-184.3S695 279.1 695 380.7 612.3 565 510.7 565z m0-326c-78.1 0-141.6 63.5-141.6 141.7s63.5 141.7 141.6 141.7 141.7-63.5 141.7-141.7S588.8 239 510.7 239z"
          fill="#2C4FFF"
          p-id="6171"
        ></path>
        <path
          d="M795.1 827.6H226.3v-21.4c0.3-156.5 127.9-283.9 284.5-283.9 156.4 0 283.9 127.3 284.2 283.9l0.1 21.4zM270 785h481.4c-11.1-123.1-114.8-220-240.5-220C385 565 281.1 661.9 270 785z"
          fill="#2C4FFF"
          p-id="6172"
        ></path>
        <path
          d="M196.5 793.6H85.3c-5.7 0-11.1-2.3-15.1-6.3s-6.2-9.5-6.2-15.1c0.2-100.1 62.8-186 150.9-220.6-41.5-27.9-68.8-75.3-68.8-128.9 0-85.6 69.7-155.3 155.3-155.3 11.8 0 22.1 9.5 22.1 21.3s-8.8 21.3-20.6 21.3c-63.6 0-114.1 50.5-114.1 112.6s50.5 112.6 112.6 112.6c11.8 0 21.3 9.5 21.3 21.3s-9.5 21.3-21.3 21.3c-99.9 0-182.6 75.8-193.5 172.9h88.6c11.8 0 21.3 9.5 21.3 21.3 0 12.1-9.5 21.6-21.3 21.6zM938.7 793.6H827.5c-11.8 0-21.3-9.5-21.3-21.3s9.5-21.3 21.3-21.3h88.6c-10.8-97.2-93.6-173-193.5-173-11.8 0-21.3-9.5-21.3-21.3s9.5-21.3 21.3-21.3c62.1 0 112.6-50.5 112.6-112.6s-50.5-112.6-112.6-112.6c-11.8 0-22.1-9.5-22.1-21.3s8.8-21.3 20.6-21.3h1.5c85.6 0 155.3 69.7 155.3 155.3 0 53.6-27.3 101-68.8 128.9 88.1 34.6 150.7 120.4 150.9 220.6 0 5.7-2.3 11.1-6.3 15.1-3.9 3.9-9.4 6.1-15 6.1z"
          fill="#2C4FFF"
          p-id="6173"
        ></path>
      </svg>
      <span style="font-size: 20px">客户端</span>
    </el-col>

    <el-col :span="16" style="padding-left: 240px">
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409EFF"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/client/train">数据训练</el-menu-item>
          <el-menu-item index="/client/predict">模型应用</el-menu-item>
          <el-menu-item index="/client/chat">智聊自助</el-menu-item>
          <el-submenu index="/">
            <template slot="title">日志</template>
            <el-menu-item index="/client/modellog">模型日志</el-menu-item>
            <el-menu-item index="/client/applylog">应用日志</el-menu-item>
          </el-submenu>
          <el-menu-item index="/login" v-if="!hasToken()"
            >登录/个人信息</el-menu-item
          >
          <el-menu-item
            style="background-color: white !important"
            v-if="hasToken()"
          >
            <div style="margin-top: -10px">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </div>
            <!-- <img :src="userAvatar" alt="User Avatar" /> -->
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      userAvatar: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    hasToken() {
      let token = VueCookies.get("token");
      if (token) {
        axios({
          method: "get",
          url: `/guo/account/user/getAvatar`,
          headers: {
            token: token,
          },
          timeout: 30000,
        }).then((res) => {
          this.userAvatar = res.data.userAvatar;
        });
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  background-color: #fff;
  &:last-child {
    margin-bottom: 0;
  }
}

//第一个el-col的样式
// .el-row .el-col:first-child {
//   background-color: #004088;
//   border-radius: 20px 0 0 0;
// }

//logo盒子的样式
// .logo {
// width: auto;
// height: auto;
// color: white;
// font-weight: 600;
// font-size: 24px;
// margin-left: 25%;
// font-family: "Microsoft YaHei", sans-serif;
// }

//菜单样式
//定位
.menu {
  margin-right: 100px;
}
.el-menu-demo {
  font-size: 18px !important;
}
//去除默认下边线
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
//菜单内容样式
.el-menu-demo .el-menu-item {
  margin-right: 10px;
  color: black;
  font-size: 16px !important;
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
  border-radius: 10px;
}
.el-menu-demo .el-menu-item:hover {
  font-weight: 600;
  color: white !important;
  background-color: #004088 !important;
  border-radius: 10px;
}

/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  margin-right: 10px;
  color: black;
  font-size: 16px !important;
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
  border-radius: 10px;
}

/deep/.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  font-weight: 600;
  color: white !important;
  background-color: #004088 !important;
  border-radius: 10px;
}
</style>