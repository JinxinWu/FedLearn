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
            :value="allRound"
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
      <el-row v-if="accuracyData.length != 0">
        <el-col :span="16" :offset="4">
          <DrawLine
            chartId="accuracyChart"
            :Linedata="accuracyData"
            textContent="准确率变化"
            yAxisAdd="%"
          ></DrawLine>
          <DrawLine
            chartId="lossChart"
            :Linedata="lossData"
            textContent="loss变化"
            yAxisAdd=""
          ></DrawLine>
          <DrawLine
            chartId="timeChart"
            :Linedata="timeData"
            textContent="通信时间变化"
            yAxisAdd="s"
          ></DrawLine>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  
<script>
import MyButton from "@/components/MyButton";
import InputCom from "@/components/InputCom";
import DrawLine from "@/components/DrawLine";

//引入axios
import axios from "axios";
import { format } from "echarts";

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
      allRound: 1000,
      // 目前轮次
      nowRound: 1,
      // 图表的数据
      tempMessage: {
        id: 1,
        chafen: "本地高斯噪声",
        jiami: "/",
        yasuo: "Huffman压缩",
        method: "平均联邦",
        accuracy: "90%",
        duration: "1.2h",
        start_time: "2021-06-01 12:00:00",
        end_time: "2021-06-01 12:00:00",
        label: [
          "类别1",
          "类别2",
          "类别3",
          "类别4",
          "类别5",
        ],
        data: [
          {
            turn: 1,
            accuracy: [81.5, 82.5, 76.4, 78.9, 85.6, 83.2],
            loss: 14.13,
            time: 13,
          },
        ],
      },
      graphMessage: {
        id: 1,
        chafen: "本地高斯噪声",
        jiami: "/",
        yasuo: "Huffman",
        method: "平均联邦",
        accuracy: "90%",
        duration: "1.2h",
        start_time: "2021-06-01 12:00:00",
        end_time: "2021-06-01 12:00:00",
        data: [],
      },
      // 准确率图表数据
      accuracyData: [],
      lossData: [],
      timeData: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  watch: {
    graphMessage: {
      handler() {
        this.dataFormat();
      },
      deep: true,
    },
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    init() {
      this.addData();
      this.timer();
    },
    addData() {
      for (let i = 0; i < 1000; i++) {
        const lastTurn =
          this.tempMessage.data[this.tempMessage.data.length - 1].turn;
        const newTurn = lastTurn + 1;
        const lastAccuracy =
          this.tempMessage.data[this.tempMessage.data.length - 1].accuracy;
        const newAccuracy = lastAccuracy.map((acc) => {
          const distanceTo100 = 100 - acc;
          const incrementFactor = 1 + Math.log(distanceTo100); // 距离 100 越远，增长速度越快
          const increment = Math.random() * (incrementFactor / newTurn); // 增长速度
          const fluctuation = Math.random() * 2 - 1; // 随机浮动
          return Math.min(acc + increment + fluctuation, 100); // 确保准确率不超过100%
        });

        const lastLoss = this.tempMessage.data[this.tempMessage.data.length - 1].loss;
        let newLoss;
        if (lastLoss > 1) {
          const distanceTo0 = lastLoss;
          let decrement;
          if (newTurn < 50) {
            decrement =
              Math.random() * (distanceTo0 / newTurn) * (1 + Math.random()); // 前期快速不稳定下降
          } else {
            decrement = Math.random() * (distanceTo0 / newTurn / 10); // 后期缓慢稳定下降
          }
          const decrementDirection = Math.random() < 0.8 ? 1 : -1; // 70% 的概率往下浮动，30% 的概率往上浮动
          newLoss = Math.max(lastLoss - decrement * decrementDirection, 0.2); // 确保损失不低于0
        } else {
          newLoss = Math.max(lastLoss - 0.01, 0.2); // 当损失小于1时，稍微快一点地减小
        }

        const newTime = 10 + Math.random() * 6;
        this.tempMessage.data.push({
          turn: newTurn,
          accuracy: newAccuracy,
          loss: newLoss,
          time: newTime,
        });
      }
    },
    // 这是获取当前轮次的函数
    getData() {
      // 这里发送请求之类的
      this.graphMessage.data = this.tempMessage.data.slice(0, this.nowRound);
    },
    // 这是一个定时器
    timer() {
      return setInterval(() => {
        if (this.nowRound < this.allRound) {
          this.nowRound += 1;
        }
        this.getData();
      }, 500);
    },
    // 分割获取到的图表数据变为折线图数据
    dataFormat() {
      // console.log(this.multipleSelection);
      // 画图的总数据
      var accuracyLineData = [];
      var lossLineData = [];
      var timeLineData = [];

      // 各种指标数组
      var accuracyArray = [];
      var lossArray = [];
      var timeArray = [];

      // 定义一个二维数组, 行为item2的长度, 列为accuracy的长度
      var accuracyArray = [];
      // 遍历 graphMessage.data
      this.graphMessage.data.forEach((item2) => {
        // 获取 item2.accuracy
        accuracyArray.push(item2.accuracy);
        lossArray.push(item2.loss);
        timeArray.push(item2.time);
      });

      // 把accuracyArray转置
      const transposedArray = [];
      for (let i = 0; i < accuracyArray[0].length; i++) {
        transposedArray[i] = [];
        for (let j = 0; j < accuracyArray.length; j++) {
          transposedArray[i][j] = accuracyArray[j][i];
        }
      }

      for (let i = 0; i < transposedArray.length; ++i) {
        var type = this.tempMessage.label[i];
        var accuracyDatajson = {
          name: type,
          mydata: transposedArray[i],
        };
        accuracyLineData.push(accuracyDatajson);
      }

      var lossDatajson = {
        // name: type,
        mydata: lossArray,
      };
      var timeDatajson = {
        // name: type,
        mydata: timeArray,
      };

      lossLineData.push(lossDatajson);
      timeLineData.push(timeDatajson);

      this.accuracyData = accuracyLineData;
      this.lossData = lossLineData;
      this.timeData = timeLineData;
      // console.log(this.accuracyData);
    },
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