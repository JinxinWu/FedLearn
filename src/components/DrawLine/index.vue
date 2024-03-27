<template>
  <div :id="chartId" style="width: 100%; height: 300px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "DrawLine",
  props: {
    chartId: {
      type: String,
      required: true
    },
  },
  data() {
    return {};
  },
  methods: {
    drawLine() {
      var chartDom = document.getElementById(this.chartId);
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
          min: 80,
          max: 100,
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
            name: "类别1",
            accuracy: [
              0.92631579, 0.99122807, 0.99298246, 0.99122807, 0.99298246,
              0.99473684, 0.99473684, 0.99824561, 0.99824561, 0.99649123,
            ],
          },
          {
            name: "类别2",
            accuracy: [
              0.84534271, 0.94727592, 0.94551845, 0.97188049, 0.96836555,
              0.96660808, 0.97891037, 0.97891037, 0.98769772, 0.9771529,
            ],
          },
          {
            name: "类别3",
            accuracy: [
              0.96660808, 0.98945518, 0.99297012, 0.99297012, 1, 0.99648506,
              0.99297012, 0.99648506, 0.99297012, 0.99824253,
            ],
          },
          {
            name: "类别4",
            accuracy: [
              0.88927944, 0.98769772, 0.98242531, 0.99648506, 0.99297012,
              0.98594025, 0.99824253, 0.99824253, 0.99824253, 0.99824253,
            ],
          },
          {
            name: "类别8",
            accuracy: [0.98774081, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          },
          {
            name: "类别9",
            accuracy: [
              0.93497364, 0.98242531, 0.98066784, 0.98945518, 0.99297012,
              0.99472759, 0.99648506, 0.99297012, 0.99121265, 0.99824253,
            ],
          },
          {
            name: "类别10",
            accuracy: [
              0.9543058, 0.99297012, 0.99824253, 0.99648506, 1, 0.99824253,
              0.99824253, 0.99824253, 1, 1,
            ],
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
          data: item.accuracy.map((item) => (item * 100).toFixed(2)),
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
  mounted() {
    this.drawLine();
  },
};
</script>

<style>
</style>