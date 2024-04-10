<template>
  <el-row style="box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.1); height: 60px">
    <el-col :span="5">
      <img
        style="width: 50%; margin-left: 140px; margin-top: 8px"
        src="@/assets/logo.png"
        alt=""
      />
    </el-col>
    <el-col :span="2" style="display: flex; align-items: center">
      <svg
        t="1711198866397"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1499"
        width="30"
        height="30"
      >
        <path
          d="M1008 512h-112V144a16 16 0 0 0-16-16H352a16 16 0 0 0-16 16v96H144a16 16 0 0 0-16 16v256H16a16 16 0 0 0-16 16v352a16 16 0 0 0 16 16h992a16 16 0 0 0 16-16V528a16 16 0 0 0-16-16zM432 224h368v288H432V224z m-208 112h112v176h-112z m704 464H96V608h832z"
          fill="#8a8a8a"
          p-id="1500"
        ></path>
        <path
          d="M768 656l64 0 0 96-64 0 0-96Z"
          fill="#8a8a8a"
          p-id="1501"
        ></path>
        <path
          d="M656 656l64 0 0 96-64 0 0-96Z"
          fill="#8a8a8a"
          p-id="1502"
        ></path>
        <path
          d="M240 704m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
          fill="#8a8a8a"
          p-id="1503"
        ></path>
        <path
          d="M400 704m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
          fill="#8a8a8a"
          p-id="1504"
        ></path>
        <path
          d="M496 288l240 0 0 64-240 0 0-64Z"
          fill="#8a8a8a"
          p-id="1505"
        ></path>
        <path
          d="M496 384l176 0 0 64-176 0 0-64Z"
          fill="#8a8a8a"
          p-id="1506"
        ></path>
      </svg>
      <span style="font-size: 20px">服务端</span>
    </el-col>

    <el-col :span="17" style="padding-left: 180px">
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409EFF"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/server/Message">
            <span slot="title">消息管理</span>
          </el-menu-item>
          <el-menu-item index="/server/Manage">
            <span slot="title">客户端管理</span>
          </el-menu-item>
          <el-menu-item index="/server/Syn">
            <span slot="title">同步算法</span>
          </el-menu-item>
          <el-menu-item index="/server/Poly">
            <span slot="title">模型聚合</span>
          </el-menu-item>
          <el-menu-item index="/server/ServerCp">
            <span slot="title">数据对比</span>
          </el-menu-item>
          <el-menu-item index="/server/Log">
            <span slot="title">日志</span>
          </el-menu-item>
          <!-- <el-menu-item index="/test">
        <span slot="title">测试页面</span>
      </el-menu-item> -->
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
      activeIndex: this.$route.path,
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
          url: `http://192.168.43.34:7000/User/user/getAvatar`,
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

.el-menu--horizontal > .el-submenu .el-submenu__title {
  margin-right: 10px;
  color: black;
  font-size: 16px !important;
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
  border-radius: 10px;
}

.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  font-weight: 600;
  color: white !important;
  background-color: #004088 !important;
  border-radius: 10px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  font-weight: 600;
  color: white !important;
  background-color: #004088 !important;
  border-radius: 10px;
  border-bottom: none;
}
</style>