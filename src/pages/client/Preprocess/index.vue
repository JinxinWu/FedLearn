<template>
  <div>
    <p class="title">数据预处理</p>
    <el-divider></el-divider>
    <!-- 数据集上传 -->
    <div
      style="
        width: 80%;
        margin: 0px auto;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">数据集上传</div>
        </el-col>
      </el-row>
      <el-row>
        <el-upload
          class="upload-demo"
          style="padding-bottom: 20px"
          drag
          :http-request="uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :accept="fileType"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传excel文件，且不超过500Mb
          </div>
        </el-upload>
      </el-row>
    </div>
    <!-- 预处理之前数据状态 -->
    <div
      style="
        width: 80%;
        margin: 50px auto;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">预处理之前数据状态</div>
        </el-col>
        <el-col :span="1" :offset="0">
          <el-button
            style="margin-top: 20px"
            type="mini"
            @click="moreInfoVisible = true"
            >更多详情</el-button
          >
        </el-col>
      </el-row>
      <el-row class="menu">
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div style="width: 382px; height: 250px">
              <p style="font-size: 20px; padding-top: 80px">总样本数量：{{ n }}</p>
              <p style="font-size: 20px">样本类别种类：{{ n2 }}</p>
              <p style="font-size: 20px">特征数量：{{ n3 }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="bar" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="pie" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
      </el-row>
      <el-row class="menu">
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="Nightingale" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="classPie" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="heatmap" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 预处理指引建议 -->
    <div
      style="
        width: 80%;
        margin: 50px auto;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        min-height: 200px;
      "
    >
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">预处理指引建议</div>
        </el-col>
      </el-row>
      <el-row class="menu">
        <div id="reply" ref="reply" style="text-align: left"></div>
      </el-row>
    </div>
    <!-- 组件+步骤 -->
    <div
      style="
        width: 80%;
        margin: 50px auto;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">预处理拖拉选择方法</div>
        </el-col>
      </el-row>
      <el-row class="menu">
        <el-col :span="4" style="line-height: 25px"
          ><div class="rowDiv">数据预处理</div></el-col
        >
        <el-col :span="8">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
            "
          >
            <div>缺失值处理</div>
            <div style="margin-top: 5px">
              <NoInputCom
                v-for="item in [myComponents.delMisCol, myComponents.zeroCom]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
            <div style="margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.meanCom, myComponents.interCom]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </div>
          <div style="margin-top: 5px; margin-bottom: 5px">
            <InputCom
              :comData="myComponents.datasetPart"
              @start-drag="drag"
            ></InputCom>
          </div>
        </el-col>

        <el-col :span="4">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
            "
          >
            <div>异常值处理</div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                v-for="item in [
                  myComponents.delError,
                  myComponents.bcTrans,
                  myComponents.ltTrun,
                ]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
            "
          >
            <div>数据转换</div>
            <div style="margin-top: 5px">
              <NoInputCom
                v-for="item in [myComponents.normal, myComponents.standard]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
            <div>
              <NoInputCom
                v-for="item in [myComponents.onehot, myComponents.label]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
            <div style="margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.equi, myComponents.ordi]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="menu">
        <el-col :span="4" style="line-height: 25px"
          ><div class="rowDiv">不平衡工程</div></el-col
        >
        <el-col
          :span="4"
          v-for="item in [
            myComponents.randomUnder,
            myComponents.ennUnder,
            myComponents.repeatedOver,
            myComponents.smoteOver,
            myComponents.ganOver,
          ]"
          :key="item.id"
        >
          <InputCom :comData="item" @start-drag="drag"></InputCom>
        </el-col>
      </el-row>
      <el-row class="menu" style="padding-bottom: 20px">
        <el-col :span="4" style="line-height: 25px"
          ><div class="rowDiv">特征工程</div></el-col
        >
        <el-col
          :span="4"
          v-for="item in [
            myComponents.pca,
            myComponents.lda,
            myComponents.correlation,
            myComponents.cif,
          ]"
          :key="item.id"
        >
          <InputCom :comData="item" @start-drag="drag"></InputCom>
        </el-col>
      </el-row>

      <!-- 画布模块模块 -->
      <div
        id="flowWrap"
        ref="flowWrap"
        class="flow-wrap menu"
        style="background: rgba(221, 221, 221, 0.3); margin: 0px auto"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <div id="flow">
          <div
            v-show="auxiliaryLine.isShowXLine"
            class="auxiliary-line-x"
            :style="{
              width: auxiliaryLinePos.width,
              top: auxiliaryLinePos.y + 'px',
              left: auxiliaryLinePos.offsetX + 'px',
            }"
          ></div>
          <div
            v-show="auxiliaryLine.isShowYLine"
            class="auxiliary-line-y"
            :style="{
              height: auxiliaryLinePos.height,
              left: auxiliaryLinePos.x + 'px',
              top: auxiliaryLinePos.offsetY + 'px',
            }"
          ></div>
          <div
            v-for="item in data.nodeList"
            :id="item.uid"
            :key="item.uid"
            :node="item"
            class="node-anchor item"
            @changeLineState="changeLineState"
            @contextmenu.prevent="handleContextMenu(item, $event)"
            :style="{
              width: item.width + 'px',
              height: item.height + 'px',
              left: item.left,
              top: item.top,
              background: item.color,
            }"
          >
            <!-- 四锚点 -->
            <div class="node-anchor anchor-top"></div>
            <div class="node-anchor anchor-bottom"></div>
            <div class="node-anchor anchor-right"></div>
            <div class="node-anchor anchor-left"></div>
            {{ item.name }}
          </div>
          <!-- 画布中的按钮 -->
          <p
            v-show="!data.nodeList.length"
            style="
              font-size: 16px;
              text-align: left;
              z-index: 999;
              position: absolute;
              color: black;
              top: 50px;
              left: 115px;
            "
          >
            预处理提示：<br />
            选择上方拖拉拽小组件建立预处理流程，请按照数据预处理->不平衡工程->特征工程的顺序选择合适的组件。
          </p>

          <el-upload
            class="upload-demo"
            action
            :http-request="uploadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :accept="fileType"
          >
            <!-- <el-button
              size="medium"
              round
              style="
                z-index: 999;
                position: absolute;
                color: white;
                background-color: #004088;
                top: 200px;
                left: 780px;
              "
              >加载数据</el-button
            > -->
            <div
              v-show="fileType !== ''"
              slot="tip"
              class="el-upload__tip"
              style="z-index: 999; position: absolute; top: 175px; left: 780px"
            >
              只能上传{{ fileType }}文件
            </div>
          </el-upload>
          <el-button
            size="medium"
            round
            @click="preprocess"
            style="
              z-index: 999;
              position: absolute;
              color: white;
              background-color: #004088;
              top: 200px;
              left: 890px;
            "
            >预处理</el-button
          >
          <!-- 添加一个数据下载按钮 -->
          <el-button
            size="medium"
            round
            @click="dataDownload"
            style="
              z-index: 999;
              position: absolute;
              color: white;
              background-color: #004088;
              top: 200px;
              left: 980px;
            "
            >数据下载</el-button
          >
          <!-- 添加一个清空画布按钮 -->
          <el-button
            size="medium"
            round
            @click="deleALL"
            style="
              z-index: 999;
              position: absolute;
              color: white;
              background-color: #004088;
              top: 200px;
              left: 1080px;
            "
            >清空画布</el-button
          >
        </div>
      </div>
    </div>
    <!-- 预处理之后数据状态 -->
    <div
      style="
        width: 80%;
        margin: 0px auto;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <el-row class="menu" style="margin-bottom: 20px">
        <el-col :span="8" :offset="8">
          <div class="title" style="font-size: 20px">预处理之后数据状态</div>
        </el-col>
        <el-col :span="1" :offset="0">
          <el-button
            style="margin-top: 20px"
            type="mini"
            @click="moreInfoVisible = true"
            >更多详情</el-button
          >
        </el-col>
      </el-row>
      <el-row class="menu">
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div style="width: 382px; height: 250px">
              <p style="font-size: 20px; padding-top: 80px">总样本数量：{{  }}</p>
              <p style="font-size: 20px">样本类别种类：</p>
              <p style="font-size: 20px">特征数量：</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="bar" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="pie" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
      </el-row>
      <el-row class="menu">
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="Nightingale" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="classPie" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
        <el-col :span="8" :offset="0">
          <div class="Echarts">
            <div id="heatmap" style="width: 382px; height: 250px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Loading :visible.sync="visible"></Loading>
    <el-dialog title="更多详情" :visible.sync="moreInfoVisible">
      <el-descriptions
        title="垂直带边框列表"
        direction="vertical"
        :column="4"
        border
      >
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地" :span="2"
          >苏州市</el-descriptions-item
        >
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址"
          >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
        >
      </el-descriptions>
    </el-dialog>
  </div>
</template>
  
<script>
import * as echarts from "echarts/core";
import NoInputCom from "@/components/NoInputCom";
import InputCom from "@/components/InputCom";
//导入jsplumb
import { jsPlumb } from "jsplumb";
//导入jsplumb的一些配置，（data中声明）
import {
  jsplumbSetting,
  jsplumbConnectOptions,
  jsplumbSourceOptions,
  jsplumbTargetOptions,
} from "@/utils/commonConfig";
//导入基本函数，在method中声明
import methods from "@/utils/methods";
//引入axios
import axios from "axios";
import Loading from "@/components/Loading";
import VueCookies from "vue-cookies";

export default {
  name: "Train",
  components: {
    InputCom,
    NoInputCom,
    Loading,
  },
  data() {
    return {
      n: null,
      n2: null,
      n3: null,
      x1: null, 
      y1: null,
      r1: null,
      r2: null,
      r3: null, 
      r21: null,
      r22: null,
      c1: null,
      c2: null,
      columns: null,
      arr: null,
      userId: null,
      // 更多详情的弹出设置
      moreInfoVisible: false,
      // 更多详情的数据

      // 小组件的相关数据
      myComponents: this.$store.state.myComponents,
      visible: false,
      fileType: "",
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      jsPlumb: null,
      currentItem: null,
      jsplumbSetting: jsplumbSetting,
      jsplumbConnectOptions: jsplumbConnectOptions,
      jsplumbSourceOptions: jsplumbSourceOptions,
      jsplumbTargetOptions: jsplumbTargetOptions,
      auxiliaryLine: { isShowXLine: false, isShowYLine: false }, //对齐辅助线是否显示
      auxiliaryLinePos: {
        width: "100%",
        height: "100%",
        offsetX: 0,
        offsetY: 0,
        x: 20,
        y: 20,
      },
      commonGrid: [5, 5], //节点移动最小距离
      selectModuleFlag: false, //多选标识

      //存储所有小组件的信息
      // listAll: [],
      //画布中的数据
      data: {
        nodeList: [],
        lineList: [],
      },
      token: "",
      trainId: "0",
      user_id: "1",
      data_url: "",
      preprocess_data: "",
      //弹窗等待
      visible: false,
      message: "",
    };
  },
  mounted() {
    this.jsPlumb = jsPlumb.getInstance();
    this.jsPlumb.setContainer(this.$refs.flowWrap);
    this.fixNodesPosition();
    this.$nextTick(() => {
      this.init();
    });
    this.getUserId();
  },
  watch: {
    data: {
      handler(newval, oldval) {
        newval.nodeList.forEach((item) => {
          if (item.id <= 4) {
            const type = [".csv", ".xlsx", ".db", ".txt"];
            this.fileType = type[item.id - 1];
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    getUserId() {
      // 从cookie中获取id
      this.token = VueCookies.get("token");
      if (this.token) {
        axios({
          method: "get",
          url: `http://localhost:7000/User/user/getUserId`,
          headers: {
            token: this.token,
          },
          timeout: 30000,
        }).then((res) => {
          this.userId = res.data.userId;
          console.log(this.userId);
        });
      }
    },
    bar() {
      var chartDom = document.getElementById("bar");
      var myChart = echarts.init(chartDom);

      // 2.指定配置项和数据
      var option = {
        title: {
          text: "样本数据类别",
          left: "center",
        },
        color: ["#2f89cf"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        // 修改图表位置大小
        grid: {
          left: "0%",
          top: "30px",
          right: "0%",
          bottom: "10%",
          containLabel: true,
        },
        // x轴相关配置
        xAxis: [
          {
            type: "category",
            // data: ["S", "C", "Q"],
            data: this.x1,
            axisTick: {
              alignWithLabel: true,
            },
            // x轴样式不显示
            axisLine: {
              show: false,
            },
          },
        ],
        // y轴相关配置
        yAxis: [
          {
            type: "value",
          },
        ],
        // 系列列表配置
        series: [
          {
            name: "样本数据量",
            type: "bar",
            barWidth: "35%",
            // ajax传动态数据
            // data: [644, 169, 78],
            data: this.y1,
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5,
            },
          },
        ],
      };

      option && myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    pie() {
      var chartDom = document.getElementById("pie");
      var myChart = echarts.init(chartDom);

      var option = {
        title: {
          text: "缺失值与异常值",
          left: "center",
        },
        color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          // 垂直居中,默认水平居中
          // orient: 'vertical',

          bottom: 20,
          left: "center",
          // 小图标的宽度和高度
          itemWidth: 10,
          itemHeight: 10,
          // 修改图例组件的文字为 12px
          textStyle: {
            color: "rgba(0,0,0,.5)",
            fontSize: "10",
          },
        },
        series: [
          {
            name: "数量与比例",
            type: "pie",
            // 设置饼形图在容器中的位置
            center: ["50%", "50%"],
            // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            // 图形上的文字
            label: {
              show: false,
              position: "center",
            },
            // 链接文字和图形的线
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.r1,
                name: "缺失值",
              },
              {
                value: this.r2,
                name: "异常值",
              },
              {
                value: this.r3,
                name: "既不是缺失值也不是异常值",
              },
            ],
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
          top: "20%",
          left: "center",
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "80%"],
            // adjust the start and end angle
            startAngle: 180,
            endAngle: 360,
            data: [
              {
                value: this.c1,
                name: "连续特征",
              },
              {
                value: this.c2,
                name: "离散特征",
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
      const hours = this.columns;
      // const hours = ['PassengerId', 'Survived', 'Pclass', 'Age', 'SibSp', 'Parch', 'Fare'];
      // prettier-ignore
      // const days = ['PassengerId', 'Survived', 'Pclass', 'Age', 'SibSp', 'Parch', 'Fare'];
      const days = this.columns;
      // prettier-ignore
      const data =
      // [[ 0.000e+00,  0.000e+00,  1.000e+00],
      //  [ 0.000e+00,  1.000e+00, -5.000e-03],
      //  [ 0.000e+00,  2.000e+00, -3.510e-02],
      //  [ 0.000e+00,  3.000e+00,  3.680e-02],
      //  [ 0.000e+00,  4.000e+00, -5.750e-02],
      //  [ 0.000e+00,  5.000e+00, -1.700e-03],
      //  [ 0.000e+00,  6.000e+00,  1.270e-02],
      //  [ 1.000e+00,  0.000e+00, -5.000e-03],
      //  [ 1.000e+00,  1.000e+00,  1.000e+00],
      //  [ 1.000e+00,  2.000e+00, -3.385e-01],
      //  [ 1.000e+00,  3.000e+00, -7.720e-02],
      //  [ 1.000e+00,  4.000e+00, -3.530e-02],
      //  [ 1.000e+00,  5.000e+00,  8.160e-02],
      //  [ 1.000e+00,  6.000e+00,  2.573e-01],
      //  [ 2.000e+00,  0.000e+00, -3.510e-02],
      //  [ 2.000e+00,  1.000e+00, -3.385e-01],
      //  [ 2.000e+00,  2.000e+00,  1.000e+00],
      //  [ 2.000e+00,  3.000e+00, -3.692e-01],
      //  [ 2.000e+00,  4.000e+00,  8.310e-02],
      //  [ 2.000e+00,  5.000e+00,  1.840e-02],
      //  [ 2.000e+00,  6.000e+00, -5.495e-01],
      //  [ 3.000e+00,  0.000e+00,  3.680e-02],
      //  [ 3.000e+00,  1.000e+00, -7.720e-02],
      //  [ 3.000e+00,  2.000e+00, -3.692e-01],
      //  [ 3.000e+00,  3.000e+00,  1.000e+00],
      //  [ 3.000e+00,  4.000e+00, -3.082e-01],
      //  [ 3.000e+00,  5.000e+00, -1.891e-01],
      //  [ 3.000e+00,  6.000e+00,  9.610e-02],
      //  [ 4.000e+00,  0.000e+00, -5.750e-02],
      //  [ 4.000e+00,  1.000e+00, -3.530e-02],
      //  [ 4.000e+00,  2.000e+00,  8.310e-02],
      //  [ 4.000e+00,  3.000e+00, -3.082e-01],
      //  [ 4.000e+00,  4.000e+00,  1.000e+00],
      //  [ 4.000e+00,  5.000e+00,  4.148e-01],
      //  [ 4.000e+00,  6.000e+00,  1.597e-01],
      //  [ 5.000e+00,  0.000e+00, -1.700e-03],
      //  [ 5.000e+00,  1.000e+00,  8.160e-02],
      //  [ 5.000e+00,  2.000e+00,  1.840e-02],
      //  [ 5.000e+00,  3.000e+00, -1.891e-01],
      //  [ 5.000e+00,  4.000e+00,  4.148e-01],
      //  [ 5.000e+00,  5.000e+00,  1.000e+00],
      //  [ 5.000e+00,  6.000e+00,  2.162e-01],
      //  [ 6.000e+00,  0.000e+00,  1.270e-02],
      //  [ 6.000e+00,  1.000e+00,  2.573e-01],
      //  [ 6.000e+00,  2.000e+00, -5.495e-01],
      //  [ 6.000e+00,  3.000e+00,  9.610e-02],
      //  [ 6.000e+00,  4.000e+00,  1.597e-01],
      //  [ 6.000e+00,  5.000e+00,  2.162e-01],
      //  [ 6.000e+00,  6.000e+00,  1.000e+00]]
      this.arr
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
          height: "60%",
          top: "15%",
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
          bottom: "0%",
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
      var option = {
        title: {
          text: "特征值中的字符总体比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 0,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "rgba(0,0,0,.5)",
            fontSize: 10,
          },
        },
        series: [
          {
            name: "特征值中数据类型分布",
            type: "pie",
            radius: ["10%", "60%"],
            // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
            center: ["50%", "50%"],
            itemStyle: {
              borderRadius: 5,
            },
            // 半径模式  area面积模式
            roseType: "radius",
            // 图形的文字标签
            label: {
              fontsize: 10,
            },
            // 引导线调整
            labelLine: {
              // 连接扇形图线长(斜线)
              length: 6,
              // 连接文字线长(横线)
              length2: 8,
            },
            data: [
              {
                value: this.r21,
                name: "字符数量",
              },
              {
                value: this.r22,
                name: "非字符数量",
              }
            ],
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      // console.log(file);
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}`);
    },
    uploadFile(item) {
      console.log("文件上传中........");
      // item.file.name获取的是完整的文件名
      const suffix = item.file.name.slice(
        ((item.file.name.lastIndexOf(".") - 1) >>> 0) + 1
      );
      const dataName = item.file.name.slice(
        0,
        ((item.file.name.lastIndexOf(".") - 1) >>> 0) + 1
      );
      let type = "0";
      if (suffix == ".csv") {
        type = "1";
      } else if (suffix == ".xlsx") {
        type = "2";
      } else if (suffix == ".db") {
        type = "3";
      } else {
        type = "4";
      }
      //上传文件的需要formdata类型;所以要转
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      axios({
        method: "post",
        url: `http://localhost:9000/file/upload?user_id=${this.userId}&data_name=${dataName}`,
        headers: this.headers,
        timeout: 30000,
        data: FormDatas,
      }).then((res) => {
        const result = res.data;
        if (result.msg.includes("文件上传成功")) {
          this.$message.success("文件上传成功");
          // 将后端传来的数据存储
          this.trainId = result.trainId;
          this.data_url = result.url;
          this.message = "文件上传成功,正在分析，请稍作等待";
          this.visible = true;
          axios({
            method: "get",
            url: `http://localhost:9000/file/showDetail?url=${this.data_url}&type=${type}`,
            headers: this.headers,
          })
            .then((res) => {
              // 在这里展示图表,可视化数据
              this.n = res.data.n;
              this.n2 = res.data.n2;
              this.n3 = res.data.n3;
              this.x1 = res.data.x1;
              this.y1 = res.data.y1;
              this.r1 = res.data.r1;
              this.r2 = res.data.r2;
              this.r3 = res.data.r3;
              this.r21 = res.data.r21;
              this.r22 = res.data.r22;
              this.c1 = res.data.c1;
              this.c2 = res.data.c2;
              this.columns = res.data.columns;
              this.arr = res.data.arr;
              this.message = "";
              this.visible = false;
              this.heatmap();
              this.bar();
              this.pie();
              this.classPie();
              this.Nightingale();
              this.$refs.reply.innerHTML = res.data.reply;
            })
            .catch((err) => {
              this.message = "";
              this.visible = false;
            });
        } else {
          this.$message.warning(`文件上传失败，请重新上传`);
        }
      });
    },
    //导入methods中的函数
    ...methods,
    //传输画布中的信息给后端
    preprocess() {
      this.message = "正在预处理数据集，请稍作等待……";
      this.visible = true;
      // 创建一个空数组来存储拓扑排序后的节点列表
      const sortedNodeList = [];
      // 创建一个字典来存储每个节点的入度（即指向该节点的边的数量）
      const inDegrees = {};
      // 初始化每个节点的入度为0
      this.data.nodeList.forEach((node) => {
        inDegrees[node.uid] = 0;
      });
      // 计算每个节点的入度
      this.data.lineList.forEach((line) => {
        const toNodeId = line.to;
        inDegrees[toNodeId]++;
      });
      // 创建一个队列来存储入度为0的节点
      const queue = this.data.nodeList.filter(
        (node) => inDegrees[node.uid] === 0 && this.isNodeConnected(node.uid)
      );
      // 进行拓扑排序
      while (queue.length > 0) {
        const node = queue.shift(); // 取出队列中的第一个节点
        sortedNodeList.push(node);
        // 遍历与该节点相邻的节点
        this.data.lineList.forEach((line) => {
          if (line.from === node.uid) {
            const toNode = this.data.nodeList.find(
              (node) => node.uid === line.to
            );
            inDegrees[toNode.uid]--;
            // 如果相邻节点的入度变为0，将其加入队列
            if (inDegrees[toNode.uid] === 0) {
              queue.push(toNode);
            }
          }
        });
      }
      const idArray = sortedNodeList.map((node) => node.id);
      const idString = idArray.join(",");
      axios({
        method: "get",
        url: `http://localhost:9000/process/train?trainId=${this.trainId}&idString=${idString}`,
        headers: this.headers
      })
        .then((res) => {
          this.message = "";
          this.visible = false;
          this.preprocess_data = res.data.retInfo;  // 返回了预处理完后的数据集的url
          console.log(result);
        })
        .catch((err) => {
          this.message = "";
          this.visible = false;
        });
    },
    //下载辅助函数
    download(filename, link) {
      let DownloadLink = document.createElement("a");
      DownloadLink.style = "display: none"; // 创建一个隐藏的a标签
      DownloadLink.download = filename;
      DownloadLink.href = link;
      document.body.appendChild(DownloadLink);
      DownloadLink.click(); // 触发a标签的click事件
      document.body.removeChild(DownloadLink);
    },
    //下载函数
    dataDownload() {
      if (this.trainId) {
        axios({
          method: "get",
          url: `http://localhost:9000/file/getModelUrlByTrainId?trainId=${this.trainId}`,
          // url: "/guo/test/modelDownload?trainId=4a432dddeb77f581be8d250380ab49b9",
          headers: this.headers,
        })
          .then((res) => {
            const url = res.data.preprocessDataUrl;
            if (url) {
              this.download("preprocessData", url);
              window.URL.revokeObjectURL(url);
              this.$message.success("预处理数据集下载成功");
            } else {
              this.$message.warning(`未存在已预处理好的数据集`);
            }
          })
          .catch((err) => {});
      }
    },
    //判断节点是否被连接
    isNodeConnected(nodeId) {
      // 遍历 lineList，检查该节点是否作为源节点或目标节点出现在任何连线中
      for (const line of this.data.lineList) {
        if (line.from === nodeId || line.to === nodeId) {
          return true; // 如果该节点在任何连线中出现，则返回 true
        }
      }
      return false; // 如果该节点未在任何连线中出现，则返回 false
    },
    //右键菜单，删除节点
    handleContextMenu(item, $event) {
      this.$contextmenu({
        x: $event.x,
        y: $event.y,
        customLayoutClass: "customLayoutClass",
        items: [
          {
            icon: "el-icon-delete",
            label: "删除",
            onClick: () => {
              this.deleteNode(item);
            },
          },
        ],
        zIndex: 3,
        minWidth: 100,
      });
    },
    //清空画布
    deleALL() {
      this.data.nodeList.some((v, index) => {
        this.jsPlumb.remove(v.uid);
      });
      this.data.nodeList = [];
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

.jtk-connector.active {
  z-index: 9999;
  path {
    stroke: #150042;
    stroke-width: 1.5;
    animation: ring;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    stroke-dasharray: 5;
  }
}
@keyframes ring {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
}

//节点
.item {
  position: absolute;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  line-height: 25px;
}
//节点的锚点
.node-anchor {
  width: 7px;
  height: 7px;
  border: 1px solid #a9a9a9;
  z-index: 333;
}
.anchor-top {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 48%;
  margin-top: -7px;
}
.anchor-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 48%;
  margin-bottom: -7px;
}
.anchor-right {
  position: absolute;
  right: 0;
  margin-right: -7px;
  top: 35%;
}
.anchor-left {
  position: absolute;
  left: 0;
  margin-left: -7px;
  top: 35%;
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
//组件
.node {
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
}
//画布
.flow-wrap {
  height: 250px;
  position: relative;
  overflow: hidden;
  outline: none !important;
  flex-grow: 1;
  margin: 10px auto auto auto;
  #flow {
    position: relative;
    width: 100%;
    height: 100%;
    .auxiliary-line-x {
      position: absolute;
      border: 0.5px dashed #2ab1e8;
      z-index: 9999;
    }
    .auxiliary-line-y {
      position: absolute;
      border: 0.5px dashed #2ab1e8;
      z-index: 9999;
    }
  }
}

// 自己写的
.el-popover__reference {
  margin-right: 10px;
  margin-bottom: 10px;
}

.box-card {
  height: 300px;
}

// Layout
.el-main .menu {
  margin: 0px auto;
  display: flex;
  align-items: center; /* 垂直居中 */
  font-size: 13px;
}

// el-card
.text {
  font-size: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 240px;
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