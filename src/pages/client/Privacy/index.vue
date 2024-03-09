<template>
  <div>
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
            <MyButton
              v-for="item in [securityCom.csvImport, securityCom.ExcelImport]"
              :comData="item"
              :key="item.id"
            ></MyButton>
          </div>
          <div style="margin-bottom: 5px">
            <MyButton
              v-for="item in [securityCom.DBImport,
                  securityCom.unstructuredImport,]"
              :comData="item"
              :key="item.id"
            ></MyButton>
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
            <MyButton
              v-for="item in [securityCom.delMisCol, securityCom.zeroCom]"
              :comData="item"
              :key="item.id"
            ></MyButton>
          </div>
          <div style="margin-bottom: 5px">
            <MyButton
              v-for="item in [securityCom.meanCom]"
              :comData="item"
              :key="item.id"
            ></MyButton>
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
            <MyButton
              v-for="item in [securityCom.delError, securityCom.bcTrans]"
              :comData="item"
              :key="item.id"
            ></MyButton>
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
  </div>
</template>
  
<script>
import MyButton from "@/components/MyButton";
import InputCom from "@/components/InputCom";
//引入axios
import axios from "axios";

export default {
  name: "Train",
  components: {
    InputCom,
    MyButton,
  },
  data() {
    return {
      securityCom: this.$store.state.securityCom,
    };
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>
  
<style lang="less" scoped>
.title {
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