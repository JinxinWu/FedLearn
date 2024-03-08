<template>
  <div>
    <el-menu
      style="height: 100%"
      active-text-color="000"
      background-color="#fff"
      text-color="#000"
      router
    > 
      <!-- <el-submenu index="1"> -->
      <!-- <template slot="title"> -->
      <!-- </template> -->
      <!-- <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu> -->
      <!-- </el-submenu> -->
   
      <!-- 服务端 -->
      <div>
        <div class="header">
        <div class="header_logo"></div>
        <div
        class="header_title"
        >
          项目名称
        </div>
      </div>
        <el-menu-item index="/server/Message" style="margin-top: 20px;">
          <i class="el-icon-message-solid" style="color: black;margin-right: 10px;"></i>
          <span slot="title">消息管理</span>
        </el-menu-item>
        <el-menu-item index="/server/Manage">
          <i class="el-icon-s-platform" style="color: black;margin-right: 10px;"></i>
          <span slot="title">客户端管理</span>
        </el-menu-item>
        <el-menu-item index="/server/Syn">
          <i class="el-icon-upload" style="color: black;margin-right: 10px;"></i>
          <span slot="title">同步算法</span>
        </el-menu-item>
        <el-menu-item index="/server/Poly">
          <i class="el-icon-s-data" style="color: black;margin-right: 10px;"></i>
          <span slot="title">模型聚合</span>
        </el-menu-item>
        <el-menu-item index="1">
          <i class="el-icon-s-tools" style="color: black;margin-right: 10px;"></i>
          <span slot="title">设置</span>
        </el-menu-item>
        <el-menu-item index="/test">
        <span slot="title">测试页面</span>
      </el-menu-item>
        <el-menu-item index="/login" style="position: absolute;;bottom: 0;width: 100%;">
          <i class="el-icon-s-home" style="color: black;margin-right: 10px;"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
      </div>
     
      
    </el-menu>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
el-menu-ite {
  font-size: 16px;
}
.header {
  width: 100%;
  height: 18%;
}
.header_logo {
  width: 70px;
  height: 70px;
  background-color: #409be3;
  border-radius: 10%;
  margin: 20px auto 10px 60px;
}
.header_title {
  color: #409be3;
  margin: 10px auto 10px 55px;
  font-size: 20px;
  font-weight: 600;
}
//导航项被激活时的背景
.el-menu-item.is-active {
  background-color: #D6D6D6 !important;
}
</style>