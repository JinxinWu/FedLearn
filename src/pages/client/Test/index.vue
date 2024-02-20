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
            <div id="bar" style="width: 382px; height: 300px"></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="pie" style="width: 382px; height: 300px"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">
          <!-- <div
            ref="chartPanel"
            id="chart-panel"
            style="width: 382px; height: 300px"
          ></div> -->
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="classPie" style="width: 382px; height: 300px"></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div class="Echarts">
            <div id="heatmap" style="width: 382px; height: 300px"></div>
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
import "echarts-gl";
import Header from "@/components/Header";
import { getPie3D } from "@/utils/echarts";

export default {
  components: {
    Header,
  },
  data() {
    return {
      optionData: [
        {
          name: "医药研发",
          value: 12,
          itemStyle: {
            opacity: 0.2,
            color: "#D6476C",
          },
        },
        {
          name: "生物科技",
          value: 16,
          itemStyle: {
            opacity: 0.2,
            color: "#017DC1",
          },
        },
        {
          name: "房地产",
          value: 14,
          itemStyle: {
            opacity: 0.2,
            color: "#804BC6",
          },
        },
        {
          name: "互联网科技",
          value: 81,
          itemStyle: {
            opacity: 0.2,
            color: "#44BA9C",
          },
        },
        {
          name: "软件外包",
          value: 66,
          itemStyle: {
            opacity: 0.2,
            color: "#3F14C9",
          },
        },
        // {
        //   name: "林地面积统计",
        //   value: 10000,
        //   itemStyle: {
        //     opacity: 0.2,
        //     color: "#22c4ff",
        //   },
        // },
        // {
        //   name: "草地面积统计",
        //   value: 12116,
        //   itemStyle: {
        //     opacity: 0.2,
        //     color: "#aaff00",
        //   },
        // },
      ],
    };
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
    draw3d() {
      // 基于准备好的dom，初始化echarts实例
      let chartPanel = echarts.init(document.getElementById("chart-panel"));
      for (let i = 0; i < this.optionData.length; i++) {
        delete this.optionData[i].itemStyle.opacity;
      }
      // 传入数据生成 option
      let series = getPie3D(this.optionData, 2);
      let option = {
        tooltip: {
          formatter: (params) => {
            // console.log(params)
            if (
              params.seriesName !== "mouseoutSeries" &&
              params.seriesName !== "pie2d"
            ) {
              return `<div style="padding:0 10px">${params.seriesName}：${(
                option.series[params.seriesIndex].pieData.proportion * 100
              ).toFixed(2)}%</div>`;
            }
          },
        },
        // legend: {
        //   data: legendData,
        //   width: "90%",
        //   itemGap: 25,
        //   bottom: "bottom",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 14,
        //   },
        // },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false, //是否显示三维笛卡尔坐标系。
          boxHeight: 20, //三维笛卡尔坐标系在三维场景中的高度
          top: "-12.5%",
          // bottom: "80%",
          // environment: "#021041", //背景
          viewControl: {
            //用于鼠标的旋转，缩放等视角控制
            alpha: 50, //角度
            distance: 250, //调整视角到主体的距离，类似调整zoom 重要
            rotateSensitivity: 0, //设置为0无法旋转
            zoomSensitivity: 0, //设置为0无法缩放
            panSensitivity: 0, //设置为0无法平移
            autoRotate: false, //自动旋转
          },
        },
        series: series,
      };
      chartPanel.setOption(option);

      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      option.series.push({
        name: "pie2d",
        type: "pie",
        label: {
          color: "#000",
          fontSize: 16,
          // position: 'inner',
          // formatter: "{b}\n\n",
          // padding: [0, -40],
          formatter: (item) => {
            //  console.log(item)
            return item.data.name + ":" + item.data.value + "家" + "";
          },
        },
        labelLine: {
          length: 20,
          length2: 20,
          lineStyle: {
            color: "#000000",
            width: 1.5,
          },
        },
        startAngle: 321, //起始角度，支持范围[0, 360]。 //重要
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["25%", "50%"],
        center: ["50%", "50%"],
        data: this.optionData,
        itemStyle: {
          opacity: 0,
        },
        top: "-20%",
        avoidLabelOverlap: true, //防止标签重叠
      });
      chartPanel.setOption(option);
    },
  },
  mounted() {
    this.heatmap();
    this.bar();
    this.pie();
    this.classPie();
    this.draw3d();
    this.$nextTick(() => {
      let parent = document.getElementById("chart-panel"); // 获取父元素
      let canvas = parent.getElementsByTagName("canvas"); // 获取父元素下面的所有canvas元素
      console.log(canvas);
      canvas[1].style.transform = "rotateX(30deg)";
    });
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