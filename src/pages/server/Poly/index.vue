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
import * as echarts from "echarts";
import axios from "axios";

export default {
  components: {
    MethCard,
    Computer,
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
      allRound: 2000,
      // 目前轮次
      nowRound: 10,
      // 正确率
      rightRate: [85.8, 92.5, 87.6, 96.4, 95.2, 97.8, 95.4],
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
    };
  },
  activated() {},
  created() {
    this.getData();
  },
  methods: {
    // Tag
    deleteTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
            "第{b0}轮<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br />{a3}: {c3}%<br />{a4}: {c4}%", //展示百分比  五条折线
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
              0.8493915944516348, 0.8432583770278371, 0.8799756467881712,
              0.8946769310496979, 0.907, 0.9168121811819039,
              0.9164844063388819, 0.9202172773913078, 0.9229297852895991,
              0.925,
            ],
          },
          {
            name: "类别2",
            accuracy: [
              0.7532575407039916, 0.7861221709297493, 0.8081653110241617,
              0.813706150482453, 0.827505045974758, 0.83791561651298397,
              0.84378116175318, 0.8601423612588864, 0.8701736059519776,
              0.87673684,
            ],
          },
          {
            name: "类别3",
            accuracy: [
              0.8085095568693151, 0.8537264196721404, 0.8818162887694515,
              0.9407047293831308, 0.9017716194818312, 0.9284335875929344,
              0.9479139003927248, 0.9609815010889285, 0.9555469157618361,
              0.96424561,
            ],
          },
          {
            name: "类别4",
            accuracy: [
              0.8167035023238899, 0.8276373055832423, 0.8883163514626177,
              0.9414272514557291, 0.9268830687477182, 0.9334220815217517,
              0.9384990526372538, 0.9458735475216089, 0.9516933881335418,
              0.95224561,
            ],
          },
          {
            name: "类别5",
            accuracy: [
              0.8062454442511423, 0.8128369062089887, 0.8331756852560508,
              0.9076228393954131, 0.9023782218868792, 0.9456990985894731,
              0.9529793782432896, 0.9643160382744428, 0.9724011318306619,
              0.97849123,
            ],
          },
          // {
          //   name: "类别6",
          //   accuracy: [
          //     0.8771529128981818, 0.8585478551990772, 0.8463302266711984,
          //     0.933472769787068, 0.9053274878331492, 0.9199452432819828,
          //     0.9767962457813878, 0.9743293812801724, 0.9706294371850324,
          //     0.99472759,
          //   ],
          // },
          // {
          //   name: "类别7",
          //   accuracy: [
          //     0.8057496219763897, 0.8117217263582482, 0.8634409131232468,
          //     0.934616190030086, 0.9314396053386466, 0.9463611617559041,
          //     0.9971159141910323, 0.961151565603436, 0.9364253546075972,
          //     0.99648506,
          //   ],
          // },
          // {
          //   name: "类别8",
          //   accuracy: [
          //     0.8697268535791635, 0.8139964689209327, 0.8075997613327792,
          //     0.9053611672364951, 0.9451738223465908, 0.9266632573364041,
          //     0.9790094593465924, 0.9544503323897235, 0.9764074702982046,
          //     0.99297012,
          //   ],
          // },
          // {
          //   name: "类别9",
          //   accuracy: [
          //     0.8154923540661534, 0.8981526337910799, 0.823820434124584,
          //     0.9242381973404629, 0.9261178547166565, 0.9337622401165924,
          //     0.9607833735096267, 0.9912759833886954, 0.9653031500657725,
          //     0.99121265,
          //   ],
          // },
          // {
          //   name: "类别10",
          //   accuracy: [
          //     0.8077105256871372, 0.8405998796238816, 0.8628595934216933,
          //     0.9221423599373448, 0.948022415694338, 0.9143305427245828,
          //     0.9365420741748466, 0.9669168805540214, 0.9636872277249258,
          //     0.99824253,
          //   ],
          // },
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