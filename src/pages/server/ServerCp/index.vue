<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="message-box">
          <p class="title">数据对比</p>
          <div style="margin: 10px 0px; text-align: left">
            <span style="margin-right: 10px; margin-left: 10px"
              >已选中{{ checkedNum }}项</span
            >
            <el-button size="small" @click="manyHadRead()"
              >批量选择对比</el-button
            >
            <el-button size="small" @click="toggleSelection()"
              >取消选择</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            border
            :header-cell-style="{
              background: '#f5f7fa',
              color: '#909399',
              padding: '8px 0px',
            }"
            :cell-style="{ padding: '8px 0px' }"
            :data="currentMessage"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column
              prop="chafen"
              label="差分隐私"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="jiami"
              label="同态加密"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="yasuo"
              label="压缩算法"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="method"
              label="联邦方法"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="accuracy" label="准确率" width="80">
            </el-table-column>
            <el-table-column prop="duration" label="训练时间" width="80">
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间">
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <a
                  style="color: #409eff"
                  @click="handleDelete(scope.$index, scope.row)"
                  >详情</a
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin: 20px 0px 0px 0px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="allMessage.length"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="数据对比" :visible.sync="dialogTableVisible" width="80%">
      <div style="font-size: 18px;">
        请选择对比类别：
        <el-select v-model="initValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
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
    </el-dialog>
  </div>
</template>

<script>
import Messages from "@/components/Messages";
import DrawLine from "@/components/DrawLine";
import axios from "axios";

export default {
  name: "ServerCp",
  components: {
    Messages,
    DrawLine,
  },
  data() {
    return {
      // 选择查看类别
      initOptions: [
        {
          value: 0,
          label: "总体",
        },
        {
          value: 1,
          label: "类别1",
        },
        {
          value: 2,
          label: "类别2",
        },
        {
          value: 3,
          label: "类别3",
        },
        {
          value: 4,
          label: "类别4",
        },
        {
          value: 5,
          label: "类别5",
        },
      ],
      options: [],
      initValue: 0,
      // 准确率图表数据
      accuracyData: [],
      lossData: [],
      timeData: [],
      // 对话框
      dialogTableVisible: false,
      // 全部消息的数据
      allMessage: [
        {
          id: 1,
          chafen: "/",
          jiami: "/",
          yasuo: "/",
          method: "平均联邦",
          accuracy: "96.64%",
          duration: "4.16h",
          start_time: "2024-03-21 12:19:21",
          end_time: "2024-03-21 16:31:57",
          data: [
            {
              turn: 1,
              accuracy: [84.5, 82.7, 91.4, 84.2, 86.2, 81.2, 92.3, 90.2, 87.4, 88.6, 83.8],
              loss: 12.25,
              time: 13,
            }
          ],
        },
        {
          id: 2,
          chafen: "本地高斯噪声",
          jiami: "/",
          yasuo: "/",
          method: "平均联邦",
          accuracy: "96.29%",
          duration: "4.22h",
          start_time: "2024-03-22 23:36:42",
          end_time: "2024-03-23 3:48:51",
          data: [
            {
              turn: 1,
              accuracy: [84.5, 82.7, 91.4, 84.2, 86.2, 81.2, 92.3, 90.2, 87.4, 88.6, 83.8],
              loss: 16.24,
              time: 13,
            }
          ],
        },
        {
          id: 3,
          chafen: "本地高斯噪声",
          jiami: "/",
          yasuo: "Huffman压缩",
          method: "平均联邦",
          accuracy: "96.16%",
          duration: "4.12h",
          start_time: "2024-03-23 13:12:21",
          end_time: "2024-03-23 17:24:32",
          data: [
            {
              turn: 1,
              accuracy: [84.5, 82.7, 91.4, 84.2, 86.2, 81.2, 92.3, 90.2, 87.4, 88.6, 83.8],
              loss: 15.27,
              time: 13,
            }
          ],
        },
        {
          id: 4,
          chafen: "/",
          jiami: "CKKS",
          yasuo: "/",
          method: "平均联邦",
          accuracy: "96.47%",
          duration: "4.32h",
          start_time: "2024-03-23 18:08:12",
          end_time: "2024-03-23 22:20:38",
          data: [
            {
              turn: 1,
              accuracy: [84.5, 82.7, 91.4, 84.2, 86.2, 81.2, 92.3, 90.2, 87.4, 88.6, 83.8],
              loss: 16.42,
              time: 13,
            }
          ],
        },
        {
          id: 5,
          chafen: "/",
          jiami: "CKKS",
          yasuo: "Huffman压缩",
          method: "平均联邦",
          accuracy: "96.42%",
          duration: "4.17h",
          start_time: "2024-03-23 22:18:38",
          end_time: "2024-03-24 2:31:26",
          data: [
            {
              turn: 1,
              accuracy: [84.5, 82.7, 91.4, 84.2, 86.2, 81.2, 92.3, 90.2, 87.4, 88.6, 83.8],
              loss: 17.38,
              time: 13,
            }
          ],
        },
        {
          id: 5,
          chafen: "/",
          jiami: "/",
          yasuo: "Huffman压缩",
          method: "平均联邦",
          accuracy: "96.08%",
          duration: "3.98h",
          start_time: "2024-03-24 14:25:32",
          end_time: "2024-03-24 18:24:26",
          data: [
            {
              turn: 1,
              accuracy: [84.5, 82.7, 91.4, 84.2, 86.2, 81.2, 92.3, 90.2, 87.4, 88.6, 83.8],
              loss: 17.38,
              time: 13,
            }
          ],
        },
      ],
      // checkbox选中的数据
      multipleSelection: [],
      // checkbox为true的数量
      checkedNum: 0,
      // 当前页面的消息
      currentMessage: [],
      // 分页的数据
      currentPage: 1,
      pagesize: 10,
    };
  },
  activated() {},
  mounted() {
    this.generateData()
    // 初始化数据
    this.getPageInfo();
  },
  methods: {
    generateData() {
      for (let i = 0; i < 100; i++) {  // 第一个基准数据集的产生
        const lastTurn = this.allMessage[0].data[this.allMessage[0].data.length - 1].turn;
        const newTurn = lastTurn + 10;
        const lastAccuracy = this.allMessage[0].data[this.allMessage[0].data.length - 1].accuracy;

        let newAccuracy;
        if (newTurn < 900) { // 前几十轮整体向上增长，内部有小的起伏
            newAccuracy = lastAccuracy.map(acc => {
                const distanceTo100 = 400 - acc;
                const incrementFactor = 1 + Math.log(distanceTo100); // 距离 100 越远，增长速度越快
                const increment = Math.random() * (incrementFactor / (newTurn * 2)); // 增长速度
                const fluctuation = Math.random() * 2 - 0.7; // 随机浮动
                return Math.min(acc + increment + fluctuation, 96.64); // 向上增长，但不超过 96.6
            });
        } else { // 后期稳定上涨
            newAccuracy = lastAccuracy.map(acc => {
                const distanceTo100 = 400 - acc;
                const incrementFactor = 1 + Math.log(distanceTo100) / 10; // 后期增长速度变慢
                const increment = Math.random() * (incrementFactor / newTurn); // 增长速度
                const fluctuation = Math.random() * 0.5; // 随机浮动
                return Math.min(acc + increment + fluctuation, 96.64); // 向上增长，但不超过 96.6
            });
        }

        const lastLoss = this.allMessage[0].data[this.allMessage[0].data.length - 1].loss;
        let newLoss;
        let decrement;
        if (newTurn < 1000) {
          const decrementDirection = Math.random() < 0.9 ? 1 : -1; // 80% 的概率往下浮动，20% 的概率往上浮动
          decrement = Math.random() * lastLoss * (1 + Math.random()) * (7 / newTurn); // 前期快速下降
          decrement = decrement * decrementDirection
        } else {  
          decrement = Math.random() * lastLoss * 500 / newTurn; // 后期缓慢下降
        }
        newLoss = Math.max(lastLoss - decrement, 0.2); // 确保损失不低于1

        
        const newTime = 10 + Math.random() * 6;
        this.allMessage[0].data.push({
          turn: newTurn,
          accuracy: newAccuracy,
          loss: newLoss,
          time: newTime
        });
      }

      // 比基准数据集高一点的产生
      for (let j = 1; j < 3; j++) {
        for (let i = 0; i < 100; i++) {
            const existingData = this.allMessage[0].data;
            const lastTurn = existingData[i].turn;
            const newTurn = lastTurn + 10;

            const lastAccuracy = existingData[i].accuracy;
            let newAccuracy;
            if (newTurn < 600) {
                newAccuracy = lastAccuracy.map(acc => {
                    const fluctuation = Math.random() * 2;
                    const diff = Math.random() < 0.1 ? Math.random() : -Math.random();
                    return Math.min(acc + fluctuation * diff, 100); // 确保准确率不超过100%
                });
            } else {
                const fluctuation = Math.random() * 0.2 - 0.1;
                newAccuracy = lastAccuracy.map(acc => {
                  return acc + fluctuation
                });
            }

            const lastLoss = existingData[i].loss;
            let newLoss;
            if (newTurn < 600) {
                const fluctuation = Math.random() * 2;
                const diff = Math.random() < 0.9 ? Math.random() : -Math.random();
                newLoss = Math.max(lastLoss + fluctuation * diff, 0);
            } else {
                const fluctuation = Math.random() * 0.2 - 0.1;
                newLoss = lastLoss + fluctuation
            }
            
            const newTime = 10 + Math.random() * 6;
            
            this.allMessage[j].data.push({
                turn: newTurn,
                accuracy: newAccuracy,
                loss: newLoss,
                time: newTime
            });
        }
      }
    },
    // 批量选择后作图
    manyHadRead() {
      // 数据类别选项
      this.options = this.initOptions.slice(0, this.allMessage[0].accuracy.length - 1);
      // console.log(this.multipleSelection);
      // 画图的总数据
      var accuracyLineData = [];
      var lossLineData = [];
      var timeLineData = [];

      // 遍历
      this.multipleSelection.forEach((item) => {
        var type = "";
        if (item.method != "/") type = item.method;
        if (item.chafen !== "/") type += "+" + item.chafen;
        if (item.jiami !== "/") type += "+" + item.jiami;
        if (item.yasuo !== "/") type += "+" + item.yasuo;

        // 各种指标数组
        var accuracyArray = [];
        var lossArray = [];
        var timeArray = [];

        // 遍历item.data
        item.data.forEach((item2) => {
          // 获取item2.accuracy
          accuracyArray.push(item2.accuracy[this.initValue]);
          lossArray.push(item2.loss);
          timeArray.push(item2.time);
        });
        var accuracyDatajson = {
          name: type,
          mydata: accuracyArray,
        };
        var lossDatajson = {
          name: type,
          mydata: lossArray,
        };
        var timeDatajson = {
          name: type,
          mydata: timeArray,
        };
        accuracyLineData.push(accuracyDatajson);
        lossLineData.push(lossDatajson);
        timeLineData.push(timeDatajson);
        // console.log(accuracyLineData);
      });
      this.accuracyData = accuracyLineData;
      this.lossData = lossLineData;
      this.timeData = timeLineData;
      // console.log(this.lossData);
      this.dialogTableVisible = true;
    },
    // 全部消息的方法
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.checkedNum = val.length;
      this.multipleSelection = val;
    },
    // 操作的方法
    handleDelete(index, row) {
      this.$confirm("是否确认删除此项？", "删除信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "放弃",
      })
        .then(() => {
          // 这里发送axios请求，将数据删除，然后重新获取数据
          this.$message({
            type: "info",
            message: "删除成功",
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃删除此项" : "放弃删除此项目",
          });
        });
      console.log(index, row);
    },
    // 分页的方法
    // 获取当前页的数据信息
    getPageInfo() {
      //清空currentMessage中的数据
      this.currentMessage = [];
      // 获取当前页的数据
      for (
        let i = (this.currentPage - 1) * this.pagesize;
        i < this.allMessage.length;
        i++
      ) {
        //把遍历的数据添加到currentMessage里面
        this.currentMessage.push(this.allMessage[i]);
        //判断是否达到一页的要求
        if (this.currentMessage.length === this.pagesize) break;
      }
    },
    handleSizeChange(val) {
      this.currentMessage = this.allMessage.slice(0, val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //修改当前的页码
      this.currentPage = val;
      //数据重新分页
      this.getPageInfo();
    },
  },  
  watch: {
    initValue(val) {
      // 重新获取数据
      this.manyHadRead();
    },
  },
};
</script>

<style lang='less' scoped>
.title {
  margin-top: 0px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1.5em;
  text-align: center;
}

label {
  margin-bottom: 0px !important;
}

.el-autocomplete {
  padding: 0;
  height: 30px;
}

.message-box {
  min-height: 653.28px;
  margin-top: 0px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.block {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 10px;
}
</style>