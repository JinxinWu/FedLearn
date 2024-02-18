<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <p class="title">隐私保护</p>
        <el-divider></el-divider>
        <!-- 组件+步骤 -->
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">相关技术</div></el-col
          >
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>差分隐私</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>同态加密</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  v-for="item in [csvImport]"
                  :comData="item"
                  :key="item.id"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>压缩方法</div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <NoInputCom
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></NoInputCom>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 一串文字 -->
        <el-row
          style="
            margin: 10px auto;
            color: black;
            font-size: 14px;
            min-height: 100px;
            width: 83%;
            border: 1px solid #dcdcdc;
          "
        >
          <div style="font-size: 16px; margin-top: 5px">xxx方法度量的指标</div>
          <div id="reply" ref="reply" style="text-align: left"></div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import Header from "@/components/Header/index.vue";
import NoInputCom from "@/components/NoInputCom";
import InputCom from "@/components/InputCom";
//引入axios
import axios from "axios";

export default {
  name: "Train",
  components: {
    Header,
    InputCom,
    NoInputCom,
  },
  data() {
    return {
      csvImport: {
        step: 1,
        id: 1,
        name: "xxx方法",
        type: "null",
        content: "拖入即可导入csv文件",
      },
    };
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>
  
<style lang="less" scoped>
.title {
  margin-top: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 2em;
  text-align: center;
}

//表格最左边的div
.rowDiv {
  background-color: #2468f1;
  width: 100px;
  height: 25px;
  margin: 10px auto;
  color: white;
  border-radius: 5px;
}

// Container
.el-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: auto;
  padding-top: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// Layout
.el-main .menu {
  width: 80%;
  margin: 0px auto;
  border: 1px dashed #4874cb;
  display: flex;
  align-items: center; /* 垂直居中 */
  font-size: 13px;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

// el-row
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>