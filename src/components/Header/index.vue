<template>
  <el-row style="box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.1)">
    <el-col :span="8">
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
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
          <el-menu-item index="/train">数据训练</el-menu-item>
          <el-menu-item index="/predict">模型应用</el-menu-item>
          <el-menu-item index="/chat">智聊自助</el-menu-item>
          <el-submenu index="/">
            <template slot="title">日志</template>
            <el-menu-item index="/modellog">模型日志</el-menu-item>
            <el-menu-item index="/applylog">应用日志</el-menu-item>
          </el-submenu>
          <el-menu-item index="/login" v-if="!hasToken()"
            >登录/个人信息</el-menu-item
          >
          <el-menu-item style="background-color: white !important" v-if="hasToken()">
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

img {
  width: 33%;
  margin-left: 200px;
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