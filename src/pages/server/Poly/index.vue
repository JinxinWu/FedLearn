<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header2></Header2>
    </el-header>
    <el-main>
      <!-- 默认聚合客户端 -->
      <div class="myBox">
        <el-row class="menu" style="margin-bottom: 20px">
          <el-col :span="8" :offset="8">
            <div class="title" style="font-size: 20px">默认聚合客户端</div>
          </el-col>
        </el-row>
        <el-row>
          <i class="el-icon-s-platform"></i>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </el-row>
      </div>
      <!-- 聚合方法 -->
      <div class="myBox">
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
      </div>
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
      <!-- 聚合结果 -->
      <div class="myBox">
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
              验证正确率
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
      </div>
      <!-- 聚合过程结果 -->
      <div class="myBox">
        <el-row class="menu" style="margin-bottom: 20px">
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
    </el-main>
  </el-container>
</template>
    
<script>
import Header2 from "@/components/Header2";
import MethCard from "@/components/MethCard";
import * as echarts from "echarts";
import axios from "axios";

export default {
  components: {
    Header2,
    MethCard,
  },
  data() {
    return {
      // Tag
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      // Card
      methCard: [
        {
          methName: "方法一",
          methContent: "方法一内容",
          methColor: 1,
        },
        {
          methName: "方法二",
          methContent: "方法二内容",
          methColor: 0,
        },
        {
          methName: "方法三",
          methContent: "方法三内容",
          methColor: 0,
        },
      ],
      // 总轮次
      allRound: 100,
      // 目前轮次
      nowRound: 1,
      // 正确率
      rightRate: [99, 99, 99, 99, 99, 99, 99],
    };
  },
  activated() {},
  created() {
    this.getData();
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 这是获取当前轮次的函数
    getData() {
      // 这里发送请求之类的
    },
    // 这是一个定时器
    timer() {
      return setTimeout(() => {
        this.getData();
      }, 5000);
    },
    // 折线图
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
          data: ["类1", "类2", "类3", "类4", "类5"],
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
          data: ["1", "2", "3", "4", "5", "6", "7"],
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
        var seriesData = {
          类1: [12, 13, 10, 13, 90, 23, 21],
          类2: [22, 18, 19, 23, 29, 33, 31],
          类3: [15, 23, 20, 15, 19, 33, 41],
          类4: [32, 33, 30, 33, 39, 33, 32],
          类5: [82, 93, 90, 93, 12, 13, 13],
        };

        let i = 0;
        let xdata = [];
        while (i < seriesData["类1"].length) {
          xdata.push((i + 1).toString());
          i++;
        }

        myChart.setOption({
          xAxis: {
            data: xdata,
          },
          series: [
            {
              name: "类1",
              type: "line",
              data: seriesData["类1"],
            },
            {
              name: "类2",
              type: "line",
              data: seriesData["类2"],
            },
            {
              name: "类3",
              type: "line",
              data: seriesData["类3"],
            },
            {
              name: "类4",
              type: "line",
              data: seriesData["类4"],
            },
            {
              name: "类5",
              type: "line",
              data: seriesData["类5"],
            },
          ],
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
  watch: {
    nowRound() {
      this.timer();
    },
  },
  mounted() {
    this.drawLine();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang='less' scoped>
@import "@/assets/css/server.less";

// Descriptions
::v-deep
  .el-descriptions__body
  .el-descriptions__table
  .el-descriptions-item__cell {
  text-align: center;
}

// Tag
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
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

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
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