<template>
  <div>
    <p class="title">模型训练</p>
    <el-divider></el-divider>
    <!-- 组件+步骤 -->
    <el-row>
      <el-col v-if="true" :span="11.5" :offset="6">
        <el-table
          element-loading-text="正在等待中央服务器的同步消息"
          element-loading-background="#ffffff"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="algori" label="差分隐私" width="180">
          </el-table-column>
          <el-table-column prop="compress" label="同态加密" width="180">
          </el-table-column>
          <el-table-column prop="chafen" label="压缩方法" width="180">
          </el-table-column>
          <el-table-column prop="jiami" label="联邦方法" width="180">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 一串文字 -->
    <el-row
      class="menu"
      style="margin-bottom: 20px; margin-top: 20px; border: none"
    >
      <el-col :span="8" :offset="8">
        <div class="title" style="font-size: 20px">聚合轮次</div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="6" :offset="6">
        <div>
          <el-statistic
            group-separator=","
            :value="parseInt(tableData[0].epochs)"
            title="总轮次"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
            group-separator=","
            :value="nowRound"
            title="目前轮次"
          ></el-statistic>
        </div>
      </el-col>
    </el-row>
    <div class="myBox">
      <el-row
        class="menu"
        style="margin-bottom: 20px; margin-top: 20px; border: none"
      >
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">训练过程结果</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <DrawLine chartId="drwaLine1"></DrawLine>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  
<script>
import MyButton from "@/components/MyButton";
import InputCom from "@/components/InputCom";
import DrawLine from '@/components/DrawLine';

//引入axios
import axios from "axios";

export default {
  name: "Train",
  components: {
    InputCom,
    MyButton,
    DrawLine,
  },
  data() {
    return {
      securityCom: this.$store.state.securityCom,
      tableData: [
        {
          algori: this.$store.state.tableData[0].algori,
          compress: this.$store.state.tableData[0].compress,
          chafen: this.$store.state.tableData[0].chafen,
          epochs: this.$store.state.tableData[0].epochs,
          jiami: this.$store.state.tableData[0].jiami,
        },
      ],
      show: this.$store.state.show, //显示哪个弹出框

      // 总轮次
      allRound: 100,
      // 目前轮次
      nowRound: 10,
    };
  },
  mounted() {
    console.log(this.tableData[0].epochs);
    console.log(typeof this.tableData[0].epochs);
  },
  watch: {},
  methods: {
    
  },
};
</script>
  
<style lang="less" scoped>
/deep/ .el-statistic .head {
  font-size: 14px;
}

/deep/ .el-statistic .con .number {
  font-size: 14px;
}

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