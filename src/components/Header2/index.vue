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
        t="1708930500470"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5159"
        width="30"
        height="30"
        style="margin-bottom: 6px"
      >
        <path
          d="M750 97H278c-99 0-180 81-180 180v502c0 99 81 180 180 180h472c99 0 180-81 180-180V277c0-99-81-180-180-180zM158 414h712v196.2H158V414z m120-257h472c66.2 0.3 119.7 53.8 120 120v77H158v-77c0.3-66.2 53.8-119.7 120-120z m472 742H278c-66.2-0.3-119.7-53.8-120-120V670.2h712V779c-0.3 66.2-53.8 119.7-120 120z"
          fill=""
          p-id="5160"
        ></path>
        <path
          d="M676 255.5a46.5 46.5 0 1 0 93 0 46.5 46.5 0 1 0-93 0zM676 512a46.5 46.5 0 1 0 93 0 46.5 46.5 0 1 0-93 0zM676 768.5a46.5 46.5 0 1 0 93 0 46.5 46.5 0 1 0-93 0z"
          fill=""
          p-id="5161"
        ></path>
      </svg>
      <span style="font-size: 20px">服务端</span>
    </el-col>

    <el-col :span="16">
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409EFF"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/server/AdLog">用户操作日志</el-menu-item>
          <el-menu-item index="/server/Administrator">用户建模日志</el-menu-item>
          <el-menu-item index="/server/AdMolLog">模型操作日志</el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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

// //第一个el-col的样式
// .el-row .el-col:first-child {
//   background-color: #004088;
//   border-radius: 20px 0 0 0;
// }

// //logo盒子的样式
// .logo {
//   width: auto;
//   height: auto;
//   color: white;
//   font-weight: 600;
//   font-size: 24px;
//   margin-left: 25%;
//   font-family: "Microsoft YaHei", sans-serif;
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
  float: right;
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
</style>