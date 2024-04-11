<template>
  <div :id="chartId" style="width: 100%; height: 300px; margin-top: 20px;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Compare",
  props: {
    chartId: {
      type: String,
      required: true,
    },
    Linedata: {
      type: Array,
      required: true,
    },
    textContent: {
      type: String,
      required: true,
    },
    yAxisAdd: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataMax: 0,
      dataMin: 0,
    };
  },
  methods: {
    drawLine() {
      var chartDom = document.getElementById(this.chartId);
      var myChart = echarts.init(chartDom);
      var option;

      // 这里是可以参考的后端传过来的数据格式
      var lineChartData = this.Linedata;
      var yAxisAdd = this.yAxisAdd;
      // 获取第一个对象的准确率数组长度
      const mydataLength = lineChartData[0].mydata.length;
      // 生成从1开始，长度与mydata相同的数组
      const xdata = Array.from(
        { length: mydataLength },
        (_, index) => index + 1
      );

      // 使用 map 方法转换数据格式
      const formattedData = lineChartData.map((item) => ({
        name: item.name,
        type: "line",
        data: item.mydata.map((item) => item.toFixed(2)),
      }));
      // 遍历lineChartData，取出mydata数组中的最大和最小值
      this.dataMax = Math.max(
        ...lineChartData.map((item) => Math.max(...item.mydata))
      );
      this.dataMin = Math.min(
        ...lineChartData.map((item) => Math.min(...item.mydata))
      );

      option = {
        title: {
          text: this.textContent,
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var result = "第" + params[0].axisValue + "轮";
            // 遍历params数组，拼接出提示框内容
            for (var i = 0; i < params.length; i++) {
              result +=
                "</br>" +
                params[i].marker +
                params[i].seriesName +
                " : " +
                params[i].value;
            }
            return result;
          },
        },
        legend: {
          // data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
          data: xdata,
        },
        yAxis: {
          type: "value",
          min: this.dataMin,
          max: this.dataMax,
          axisLabel: {
            formatter: function (value) {
              return value + yAxisAdd;
            },
          },
        },
        series: formattedData,
      };

      option && myChart.setOption(option, true);
    },
  },
  watch: {
    // 监视props中LineData的变化
    Linedata(newValue, oldValue) {
      this.drawLine();
    },
  },
  mounted() {
    this.drawLine();
  },
};
</script>

<style>
</style>