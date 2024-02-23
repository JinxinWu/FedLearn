<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <p class="title">数据预处理</p>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="6" :offset="2"> </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="bar" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="pie" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">
          <div class="Echarts">
            <div id="Nightingale" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="classPie" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="heatmap" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div
          ref="chartPanel"
          id="chart-panel"
          style="width: 100%; height: 600px"
        ></div>
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
  data() {
    return {};
  },
  methods: {
    bar() {
      var chartDom = document.getElementById("bar");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          top: 20,
          left: "center",
          text: "样本数据类别",
        },
        xAxis: {
          type: "category",
          data: ["S", "C", "Q"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [644, 169, 78],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    pie() {
      var chartDom = document.getElementById("pie");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          top: 20,
          text: "样本总体缺失值、异常值比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "23%",
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              {
                value: 864,
                name: "缺失值",
                itemStyle: {
                  color: "ac2026",
                },
              },
              {
                value: 67,
                name: "异常值",
                itemStyle: {
                  color: "fa8080",
                },
              },
              {
                value: 8870,
                name: "既不是缺失值也不是异常值",
                itemStyle: {
                  color: "f8cb7f",
                },
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    classPie() {
      var chartDom = document.getElementById("classPie");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          top: 0,
          left: "center",
          text: "数据类型分布",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "15%",
          left: "center",
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "70%"],
            // adjust the start angle
            startAngle: 180,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + " (" + param.percent * 2 + "%)";
              },
            },
            data: [
              {
                value: 7,
                name: "连续特征",
                itemStyle: {
                  color: "95a2ff",
                },
              },
              {
                value: 4,
                name: "离散特征",
                itemStyle: {
                  color: "#efa666",
                },
              },
              {
                // make an record to fill the bottom 50%
                value: 7 + 4,
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: "none",
                  decal: {
                    symbol: "none",
                  },
                },
                label: {
                  show: false,
                },
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    heatmap() {
      var chartDom = document.getElementById("heatmap");
      var myChart = echarts.init(chartDom);
      var option;

      // prettier-ignores
      const hours = [
        "PassengerId",
        "Survived",
        "Pclass",
        "Age",
        "SibSp",
        "Parch",
        "Fare",
      ];
      // prettier-ignore
      const days = ['PassengerId', 'Survived', 'Pclass', 'Age', 'SibSp', 'Parch', 'Fare'];
      // prettier-ignore
      const data =[[ 0.000e+00,  0.000e+00,  1.000e+00],
       [ 0.000e+00,  1.000e+00, -5.000e-03],
       [ 0.000e+00,  2.000e+00, -3.510e-02],
       [ 0.000e+00,  3.000e+00,  3.680e-02],
       [ 0.000e+00,  4.000e+00, -5.750e-02],
       [ 0.000e+00,  5.000e+00, -1.700e-03],
       [ 0.000e+00,  6.000e+00,  1.270e-02],
       [ 1.000e+00,  0.000e+00, -5.000e-03],
       [ 1.000e+00,  1.000e+00,  1.000e+00],
       [ 1.000e+00,  2.000e+00, -3.385e-01],
       [ 1.000e+00,  3.000e+00, -7.720e-02],
       [ 1.000e+00,  4.000e+00, -3.530e-02],
       [ 1.000e+00,  5.000e+00,  8.160e-02],
       [ 1.000e+00,  6.000e+00,  2.573e-01],
       [ 2.000e+00,  0.000e+00, -3.510e-02],
       [ 2.000e+00,  1.000e+00, -3.385e-01],
       [ 2.000e+00,  2.000e+00,  1.000e+00],
       [ 2.000e+00,  3.000e+00, -3.692e-01],
       [ 2.000e+00,  4.000e+00,  8.310e-02],
       [ 2.000e+00,  5.000e+00,  1.840e-02],
       [ 2.000e+00,  6.000e+00, -5.495e-01],
       [ 3.000e+00,  0.000e+00,  3.680e-02],
       [ 3.000e+00,  1.000e+00, -7.720e-02],
       [ 3.000e+00,  2.000e+00, -3.692e-01],
       [ 3.000e+00,  3.000e+00,  1.000e+00],
       [ 3.000e+00,  4.000e+00, -3.082e-01],
       [ 3.000e+00,  5.000e+00, -1.891e-01],
       [ 3.000e+00,  6.000e+00,  9.610e-02],
       [ 4.000e+00,  0.000e+00, -5.750e-02],
       [ 4.000e+00,  1.000e+00, -3.530e-02],
       [ 4.000e+00,  2.000e+00,  8.310e-02],
       [ 4.000e+00,  3.000e+00, -3.082e-01],
       [ 4.000e+00,  4.000e+00,  1.000e+00],
       [ 4.000e+00,  5.000e+00,  4.148e-01],
       [ 4.000e+00,  6.000e+00,  1.597e-01],
       [ 5.000e+00,  0.000e+00, -1.700e-03],
       [ 5.000e+00,  1.000e+00,  8.160e-02],
       [ 5.000e+00,  2.000e+00,  1.840e-02],
       [ 5.000e+00,  3.000e+00, -1.891e-01],
       [ 5.000e+00,  4.000e+00,  4.148e-01],
       [ 5.000e+00,  5.000e+00,  1.000e+00],
       [ 5.000e+00,  6.000e+00,  2.162e-01],
       [ 6.000e+00,  0.000e+00,  1.270e-02],
       [ 6.000e+00,  1.000e+00,  2.573e-01],
       [ 6.000e+00,  2.000e+00, -5.495e-01],
       [ 6.000e+00,  3.000e+00,  9.610e-02],
       [ 6.000e+00,  4.000e+00,  1.597e-01],
       [ 6.000e+00,  5.000e+00,  2.162e-01],
       [ 6.000e+00,  6.000e+00,  1.000e+00]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
      option = {
        title: {
          top: 0,
          left: "center",
          text: "特征之间的关联系数",
        },
        tooltip: {
          position: "top",
        },
        grid: {
          height: "50%",
          top: "10%",
        },
        xAxis: {
          type: "category",
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: days,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: -1,
          max: 1,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "30%",
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    Nightingale() {
      var chartDom = document.getElementById("Nightingale");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          top: 0,
          left: "center",
          text: "特征值中的字符总体比例",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.heatmap();
    this.bar();
    this.pie();
    this.classPie();
    this.Nightingale();
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