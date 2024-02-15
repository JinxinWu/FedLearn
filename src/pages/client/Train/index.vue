<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <!-- 组件+步骤 -->
        <el-row class="menu" style="border-top: 1px dashed #4874cb">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv" style="">加载数据</div></el-col
          >
          <el-col
            :span="4"
            style="margin-top: 5px; margin-bottom: 5px"
            v-for="item in [
              myComponents.csvImport,
              myComponents.ExcelImport,
              myComponents.DBImport,
              myComponents.unstructuredImport,
            ]"
            :key="item.id"
          >
            <NoInputCom :comData="item" @start-drag="drag"></NoInputCom>
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
        <el-row class="menu">
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
        <el-row class="menu">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">深度学习</div></el-col
          >
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>卷积神经网络</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  v-for="item in [myComponents.bcnn, myComponents.alexNet]"
                  :comData="item"
                  :key="item.id"
                  @start-drag="drag"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  v-for="item in [myComponents.resNet, myComponents.vgg]"
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
              <div>循环神经网络</div>
              <div style="margin-top: 5px">
                <NoInputCom
                  v-for="item in [myComponents.brnn, myComponents.lstm]"
                  :comData="item"
                  :key="item.id"
                  @start-drag="drag"
                ></NoInputCom>
              </div>
              <div style="margin-bottom: 5px">
                <NoInputCom
                  v-for="item in [myComponents.gru]"
                  :comData="item"
                  :key="item.id"
                  @start-drag="drag"
                ></NoInputCom>
              </div>
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
              <div>图神经网络</div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <NoInputCom
                  v-for="item in [myComponents.bgnn, myComponents.simgnn]"
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
            ><div class="rowDiv">机器学习</div></el-col
          >
          <el-col :span="4"
            ><div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.svm, myComponents.lightgbm]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom></div
          ></el-col>
          <el-col :span="4">
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.nnd, myComponents.xgboost]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.lr, myComponents.catboost]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.dt, myComponents.kmeans]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="margin-top: 5px; margin-bottom: 5px">
              <NoInputCom
                v-for="item in [myComponents.rf]"
                :comData="item"
                :key="item.id"
                @start-drag="drag"
              ></NoInputCom>
            </div>
          </el-col>
        </el-row>
        <el-row class="menu">
          <el-col :span="8" style="line-height: 25px"
            ><div class="rowDiv">评估指标</div></el-col
          >
          <el-col
            :span="5"
            v-for="item in [
              myComponents.accuracy,
              myComponents.precision,
              myComponents.recall,
              myComponents.f1,
              myComponents.auc,
              myComponents.roc,
              myComponents.mse,
              myComponents.mape,
            ]"
            :key="item.id"
          >
            <NoInputCom :comData="item" @start-drag="drag"></NoInputCom>
          </el-col>
        </el-row>

        <!-- 画布模块模块 -->
        <div
          id="flowWrap"
          ref="flowWrap"
          class="flow-wrap"
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
              建模提示：<br />
              先加载数据，再选择算法建立模型。建模时，请按照数据预处理->不平衡工程->特征工程-深度学习->机器学习->评估指标得顺序选择合适的算法。
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
              <el-button
                size="medium"
                round
                style="
                  z-index: 999;
                  position: absolute;
                  color: white;
                  background-color: #004088;
                  top: 200px;
                  left: 810px;
                "
                >加载数据</el-button
              >
              <div
                v-show="fileType !== ''"
                slot="tip"
                class="el-upload__tip"
                style="
                  z-index: 999;
                  position: absolute;
                  top: 175px;
                  left: 810px;
                "
              >
                只能上传{{ fileType }}文件
              </div>
            </el-upload>
            <el-button
              size="medium"
              round
              @click="modelTrain"
              style="
                z-index: 999;
                position: absolute;
                color: white;
                background-color: #004088;
                top: 200px;
                left: 910px;
              "
              >模型训练</el-button
            >
            <el-button
              size="medium"
              round
              @click="modelDownload"
              style="
                z-index: 999;
                position: absolute;
                color: white;
                background-color: #004088;
                top: 200px;
                left: 1000px;
              "
              >模型下载</el-button
            >
            <!-- 添加一个模型下载按钮 -->
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
                left: 1100px;
              "
              >清空画布</el-button
            >
          </div>
        </div>
        <!-- 后端显示模块 -->
        <el-row
          style="
            margin: 10px auto;
            color: black;
            font-size: 14px;
            min-height: 100px;
            width: 83%;
            border: 1px solid #dcdcdc;
          "
        >
          <div style="font-size: 16px; margin-top: 5px">平台提示信息</div>
          <div id="reply" ref="reply" style="text-align: left"></div>
        </el-row>
        <Loading :visible.sync="visible"></Loading>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import Header from "@/components/Header/index.vue";
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

export default {
  name: "Train",
  components: {
    Header,
    InputCom,
    NoInputCom,
    Loading,
  },
  data() {
    return {
      dialogLoadVisible: false,
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
      console.log();
      // item.file.name获取的是完整的文件名
      const suffix = item.file.name.slice((item.file.name.lastIndexOf(".") - 1 >>> 0) + 1)
      const dataName = item.file.name.slice(0, (item.file.name.lastIndexOf(".") - 1 >>> 0) + 1)
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
      if (!this.isValidFile(item.file)) {
        this.$message.warning(`文件格式不符合要求！`);
      } else {
        //上传文件的需要formdata类型;所以要转
        let FormDatas = new FormData();
        FormDatas.append("file", item.file);
        axios({
          method: "post",
          url: `/guo/test/upload?user_id=${this.user_id}&data_name=${dataName}`,
          headers: this.headers,
          timeout: 30000,
          data: FormDatas,
        }).then((res) => {
          const result = res.data;
          if (result.msg.includes("文件上传成功")) {
            this.$message.success("文件上传成功");
            //将后端传来的数据存储
            this.trainId = result.trainId;
            this.data_url = result.url;
            this.message = "文件上传成功,正在分析，请稍作等待";
            this.visible = true;
            axios({
              method: "get",
              url: `/guo/test/showDetail?url=${this.data_url}&type=${type}`,
              headers: this.headers,
            })
              .then((res) => {
                this.message = "";
                this.visible = false;
                let reply = res.data.reply;
                this.$refs.reply.innerHTML = reply;
                console.log(reply);
              })
              .catch((err) => {
                this.message = "";
                this.visible = false;
              });
          } else {
            this.$message.warning(`文件上传失败，请重新上传`);
          }
        });
      }
    },
    //文件检测
    isValidFile(file) {
      // 定义允许的文件类型和大小
      const allowedTypes = [this.fileType];
      // 检测文件类型
      if (
        !allowedTypes.includes(
          file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 1)
        )
      ) {
        return false;
      }
      return true;
    },
    //导入methods中的函数
    ...methods,
    //传输画布中的信息给后端
    modelTrain() {
      this.message = "正在构建模型，请稍作等待……";
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
        url: `/guo/test/train?trainId=${this.trainId}&idString=${idString}`,
        headers: this.headers,
        data: idString,
      }).then((res) => {
        this.message = "";
        this.visible = false;
        const result = res.data.retInfo;
        this.$refs.reply.innerHTML = result;
        console.log(result);
      }).catch((err)=>{
        this.message="";
        this.visible=false;
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
    modelDownload() {
      if (this.trainId) {
        axios({
          method: "get",
          url: `/guo/test/modelDownload?trainId=${this.trainId}`,
          // url: "/guo/test/modelDownload?trainId=4a432dddeb77f581be8d250380ab49b9",
          headers: this.headers,
        }).then((res) => {
          const url = res.data.modelUrl;
          if (url) {
            this.download("model", url);
            window.URL.revokeObjectURL(url);
            this.$message.success("模型下载成功");
          } else {
            this.$message.warning(`未存在已训练好的模型`);
          }
        }).catch((err)=>{
          
        });
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
  width: 1230px;
  position: relative;
  overflow: hidden;
  outline: none !important;
  flex-grow: 1;
  margin: 10px auto auto auto;
  border: 1px solid #dcdcdc;

  border-radius: 20px;
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

.el-main {
  color: #333;
  text-align: center;
  line-height: auto;
  padding-top: 10px;
}

body > .el-container {
  margin-bottom: 40px;
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
  width: 80%;
  margin: 0px auto;
  border-right: 1px dashed #4874cb;
  border-left: 1px dashed #4874cb;
  border-bottom: 1px dashed #4874cb;
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