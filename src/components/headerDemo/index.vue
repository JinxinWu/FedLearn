<template>
  <div>
    <h2 style="margin: 10px auto">零时导航</h2>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
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
      <h3 style="margin: 10px auto">客户端</h3>
      <el-menu-item index="/client/Connect">
        <span slot="title">连接服务端</span>
      </el-menu-item>

      <el-menu-item index="/client/Preprocess">
        <span slot="title">数据预处理可视化</span>
      </el-menu-item>
      <el-menu-item index="/client/Privacy">
        <span slot="title">隐私保护（展示）</span>
      </el-menu-item>
      <el-menu-item index="/client/Apply">
        <span slot="title">模型应用</span>
      </el-menu-item>

      <h3 style="margin: 10px auto">服务端</h3>

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
      <h3 style="margin: 10px auto">其他</h3>
      <el-menu-item index="/login">
        <span slot="title">登录</span>
      </el-menu-item>
      <el-menu-item index="/test">
        <span slot="title">测试页面</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  methods: {

  },
};
</script>

<style>
html {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>