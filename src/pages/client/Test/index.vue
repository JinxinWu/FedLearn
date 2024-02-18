<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <p class="title">数据预处理</p>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="4" :offset="3">
          <div class="Echarts">
            <div id="heatmap" style="width: 450px; height: 300px"></div>
          </div>
        </el-col>
        <el-col :span="4" :offset="3">
          <div class="Echarts">
            <div id="bar" style="width: 450px; height: 300px"></div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from "echarts/core";
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
  methods: {
    heatmap() {
      var chartDom = document.getElementById("heatmap");
      var myChart = echarts.init(chartDom);
      var option;

      function getVirtualData(year) {
        const date = +echarts.time.parse(year + "-01-01");
        const end = +echarts.time.parse(+year + 1 + "-01-01");
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
            Math.floor(Math.random() * 10000),
          ]);
        }
        return data;
      }
      option = {
        title: {
          top: 30,
          left: "center",
          text: "Daily Step Count",
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 10000,
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          top: 65,
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ["auto", 13],
          range: "2016",
          itemStyle: {
            borderWidth: 0.5,
          },
          yearLabel: { show: false },
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: getVirtualData("2016"),
        },
      };

      option && myChart.setOption(option);
    },
    bar() {
      var chartDom = document.getElementById("bar");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [1200, 2000, 1500, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.heatmap();
    this.bar();
  },
};
</script>

<style lang='less' scoped>
.title {
  margin-top: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 2em;
  text-align: center;
}

// Loading
body {
  margin: 0;
}

// Container
.el-header {
  // background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0;
}

.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  padding: 0;
  //   height: calc(100vh - 170px); // 设置主体 main 高度
  // background-color: #e9eef3;
  color: #333;
  text-align: left;
  // line-height: auto;
}

body > .el-container {
  // height: 96vh;
  margin-bottom: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// Layout
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>