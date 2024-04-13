<template>
  <div>
    <!-- 默认聚合客户端 -->
    <div class="myBox" style="margin-top: 0px">
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">默认聚合客户端</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="2">
          <Computer
            @deleteTag="deleteTag"
            v-for="tag in dynamicTags"
            :key="tag"
            :dynamicTag="tag"
          ></Computer>
        </el-col>
        <el-col :span="2">
          <el-button
            class="button-new-tag"
            size="medium"
            @click="dialogTableVisible = true"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </div>
    <!-- 聚合方法 -->
    <!-- <div class="myBox">
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">聚合方法</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">
          <MethCard :myMeth="methCard[0]"></MethCard>
        </el-col>
        <el-col :span="6" :offset="1">
          <MethCard :myMeth="methCard[1]"></MethCard>
        </el-col>
        <el-col :span="6" :offset="1">
          <MethCard :myMeth="methCard[2]"></MethCard>
        </el-col>
      </el-row>
    </div> -->
    <!-- 聚合轮次 -->
    <div class="myBox">
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">聚合轮次</div>
        </el-col>
      </el-row>
      <el-row>
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
    </div>
    <!-- 聚合过程结果 -->
    <div class="myBox">
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">聚合过程结果</div>
        </el-col>
      </el-row>
      <el-row v-if="accuracyData.length != 0">
        <el-col :span="20" :offset="2">
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
    <!-- 聚合结果 -->
    <!-- <div class="myBox">
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">聚合结果</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="2">
          <div style="margin-top: 25px">
            <el-button>验证数据集</el-button>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="title" style="font-size: 16px; margin-bottom: 10px">
            验证准确率
          </div>
          <el-descriptions direction="vertical" :column="6" border>
            <el-descriptions-item label="类1"
              >{{ rightRate[1] }}%</el-descriptions-item
            >
            <el-descriptions-item label="类2"
              >{{ rightRate[2] }}%</el-descriptions-item
            >
            <el-descriptions-item label="类3"
              >{{ rightRate[3] }}%</el-descriptions-item
            >
            <el-descriptions-item label="类4"
              >{{ rightRate[4] }}%</el-descriptions-item
            >
            <el-descriptions-item label="类5"
              >{{ rightRate[5] }}%</el-descriptions-item
            >
            <el-descriptions-item label="总体"
              >{{ rightRate[6] }}%</el-descriptions-item
            >
          </el-descriptions>
        </el-col>
      </el-row>
    </div> -->

    <el-dialog
      title="添加客户端"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
    >
      <el-table
        ref="multipleTable"
        :data="allClient"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="client" label="用户名" show-overflow-tooltip>
        </el-table-column
        ><el-table-column prop="ip" label="IP" show-overflow-tooltip>
        </el-table-column
        ><el-table-column prop="area" label="部门" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="addComputer()">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    
<script>
import MethCard from "@/components/MethCard";
import Computer from "@/components/Computer";
import DrawLine from "@/components/DrawLine";
import * as echarts from "echarts";
import axios from "axios";

export default {
  components: {
    MethCard,
    Computer,
    DrawLine,
  },
  data() {
    return {
      // Tag
      dynamicTags: ["192.168.43.74", "192.168.43.59", "192.168.43.238"],
      dialogTableVisible: false,
      // Card
      methCard: [
        {
          methName: "方法一",
          methContent: "平均聚合",
          methColor: 0,
        },
        {
          methName: "方法二",
          methContent: "加权聚合",
          methColor: 0,
        },
        {
          methName: "方法三",
          methContent: "增量聚合",
          methColor: 0,
        },
      ],
      // 总轮次
      allRound: 1000,
      // 目前轮次
      nowRound: 1,
      // 准确率
      rightRate: [85.8, 92.5, 87.6, 96.4, 95.2],
      // 选择客户端的数据
      allClient: [
        {
          client: "王五",
          manager: "王小虎",
          area: "计算机学院",
          ip: "192.168.1.1",
          gpu: "NVIDIA GeForce GTX 1080",
          cpu: "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
          memory: "16GB",
          alive: "是",
        },
        {
          client: "王五",
          manager: "王小虎",
          area: "计算机学院",
          ip: "192.168.1.1",
          gpu: "NVIDIA GeForce GTX 1080",
          cpu: "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
          memory: "16GB",
          alive: "是",
        },
        {
          client: "王五",
          manager: "王小虎",
          area: "计算机学院",
          ip: "192.168.1.1",
          gpu: "NVIDIA GeForce GTX 1080",
          cpu: "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
          memory: "16GB",
          alive: "是",
        },
      ],
      multipleSelection: [],
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
          "类别6",
          "类别7",
          "类别8",
          "类别9",
          "类别10",
        ],
        data: [
          {
            turn: 1,
            accuracy: [81.9, 82.5, 78.4, 75.6, 84.2],
            loss: 12.4,
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
  activated() {},
  created() {
    this.init();
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

        const lastLoss =
          this.tempMessage.data[this.tempMessage.data.length - 1].loss;
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
    // Tag
    deleteTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
    // 选择客户端的方法
    addComputer() {
      this.multipleSelection.forEach((item, index) => {
        this.dynamicTags.push(item.ip);
      });
      this.dialogTableVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  watch: {
    // nowRound() {
    //   this.timer();
    // },
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
};
</script>

<style lang='less' scoped>
/deep/ .el-statistic .head {
  font-size: 14px;
}

/deep/ .el-statistic .con .number {
  font-size: 14px;
}

// Descriptions
::v-deep
  .el-descriptions__body
  .el-descriptions__table
  .el-descriptions-item__cell {
  text-align: center;
}

// Tag
::v-deep .el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-top: 85px;
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

// 每个小环节的box
.myBox {
  width: 80%;
  min-height: 150px;
  margin: 30px auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 2em;
  text-align: center;
}

// Layout
.el-main .menu {
  margin: 0px auto;
  display: flex;
  align-items: center; /* 垂直居中 */
}

// el-row

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