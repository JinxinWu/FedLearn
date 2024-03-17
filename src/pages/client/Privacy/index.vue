<template>
  <div>
    <p class="title">模型训练</p>
    <el-divider></el-divider>
    <!-- 组件+步骤 -->
    <el-row>
    <el-col v-if="true" :span="11.5" :offset="6">
        <el-table
          v-loading="loading"
          element-loading-text="正在等待中央服务器的同步消息"
          element-loading-background="#ffffff"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="algori" label="算法" width="180">
          </el-table-column>
          <el-table-column prop="compress" label="压缩算法" width="180">
          </el-table-column>
          <el-table-column prop="chafen" label="差分隐私算法" width="180">
          </el-table-column>
          <el-table-column prop="jiami" label="加密算法" width="180">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 一串文字 -->
    <el-row class="menu" style="margin-bottom: 20px;margin-top: 20px;border: none;">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">聚合轮次</div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 20px;">
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
      <el-row class="menu" style="margin-bottom: 20px;margin-top: 20px;border: none;">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">聚合过程结果</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <div id="drawLine" style="width: 100%; height: 300px"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  
<script>
import MyButton from "@/components/MyButton";
import InputCom from "@/components/InputCom";
import * as echarts from "echarts";

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
      tableData: [
        {
          algori: this.$store.state.tableData[0].algori,
          compress: this.$store.state.tableData[0].compress,
          chafen: this.$store.state.tableData[0].chafen,
          epochs: this.$store.state.tableData[0].epochs,
          jiami: this.$store.state.tableData[0].jiami,
        },
      ],
      show: this.$store.state.show,//显示哪个弹出框

      // 总轮次
      allRound: 100,
      // 目前轮次
      nowRound: 1,
    };
  },
  mounted() {
    console.log(this.tableData[0].epochs);
    console.log(typeof(this.tableData[0].epochs));
    this.drawLine();
  },
  watch: {},
  methods: {
    drawLine() {
      var chartDom = document.getElementById("drawLine");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "正确率变化",
        },
        tooltip: {
          trigger: "axis",
          formatter:
            "{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br />{a3}: {c3}%<br />{a4}: {c4}%", //展示百分比  五条折线
        },
        legend: {
          // data: ["类1", "类2", "类3", "类4", "类5"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} %",
          },
        },
        series: [],
      };

      setInterval(function () {
        // 这里是可以参考的后端传过来的数据格式
        var lineChartData = [
          {
            name: "类1",
            accuracy: [12, 13, 10, 13, 90, 23, 21],
          },
          {
            name: "类2",
            accuracy: [22, 18, 19, 23, 29, 33, 31],
          },
          {
            name: "类3",
            accuracy: [15, 23, 20, 15, 19, 33, 41],
          },
          {
            name: "类4",
            accuracy: [32, 33, 30, 33, 39, 33, 32],
          },
          {
            name: "类5",
            accuracy: [82.3, 93, 90, 93, 12, 13, 13],
          },
        ];

        // 获取第一个对象的正确率数组长度
        const accuracyLength = lineChartData[0].accuracy.length;
        // 生成从1开始，长度与accuracy相同的数组
        const xdata = Array.from(
          { length: accuracyLength },
          (_, index) => index + 1
        );

        // 使用 map 方法转换数据格式
        const formattedData = lineChartData.map((item) => ({
          name: item.name,
          type: "line",
          data: item.accuracy,
        }));

        myChart.setOption({
          xAxis: {
            data: xdata,
          },
          series: formattedData,
        });
        /*$.ajax({
          url: "后台的URL",
          data: {},
          async: true,
          dataType: "json",

          // 回调函数
          success: function (result) {
            // 这里用来交换数据
          },
          error: function () {
            console.log("error");
          },
        });*/
      }, 1000);

      option && myChart.setOption(option);
    },
  },
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