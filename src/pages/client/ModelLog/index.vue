<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <el-row style="margin-top: 20px">
        <el-col :span="8" :offset="4">
          <span style="font-size: 40px; font-weight: bold"
            >模型日志</span
          ></el-col
        >
        <el-col :span="8" :offset="2"
          ><div>
            <span class="demonstration">按照日期检索</span>
            <el-date-picker
              v-model="value"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker></div
        ></el-col>
      </el-row>
      <el-col :span="18" :offset="3"
        ><div class="grid-content bg-purple-light">
          <el-table
            :data="tableDataShow"
            border
            style="width: 100%; margin: auto"
            :header-cell-style="rowStyle"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column prop="id" label="序号" align="center" width="50">
            </el-table-column>
            <el-table-column
              prop="gmtCreateTime"
              label="时间"
              align="center"
              :formatter="formatDate"
            >
            </el-table-column>
            <el-table-column prop="dataName" label="数据集名称" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.dataName.length <= 6">{{
                  scope.row.dataName
                }}</span>
                <span v-if="scope.row.dataName.length > 6">{{
                  scope.row.dataName.substr(0, 6) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dataAnalysis" label="建模指引">
              <template slot-scope="scope">
                <span v-if="scope.row.dataAnalysis.length <= 16">{{
                  scope.row.dataAnalysis
                }}</span>
                <span v-if="scope.row.dataAnalysis.length > 16">{{
                  scope.row.dataAnalysis.substr(0, 16) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="method" label="模型(算法组合)">
              <template slot-scope="scope">
                <span v-if="scope.row.method.length <= 17">{{
                  scope.row.method
                }}</span>
                <span v-if="scope.row.method.length > 17">{{
                  scope.row.method.substr(0, 17) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="result" label="结果">
              <template slot-scope="scope">
                <span v-if="scope.row.result.length <= 17">{{
                  scope.row.result
                }}</span>
                <span v-if="scope.row.result.length > 17">{{
                  scope.row.result.substr(0, 17) + "..."
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="
                    handleClick(scope.row);
                    dialogTableVisible = true;
                  "
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="showdialog(scope.row)"
                  >应用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
      <el-col :span="10" :offset="14">
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="tableDataPages.length"
          >
          </el-pagination>
        </div>
      </el-col>
      <el-dialog
        title="建模详情"
        :visible.sync="dialogTableVisible"
        :append-to-body="true"
      >
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="序号">
            <span>{{ details.id }}</span>
          </el-form-item>
          <el-form-item label="时间">
            <span>{{ details.gmtCreateTime }}</span>
          </el-form-item>
          <el-form-item label="数据集名称">
            <span>{{ details.dataName }}</span>
          </el-form-item>
          <el-form-item label="建模指引">
            <span v-html="details.dataAnalysis"></span>
          </el-form-item>
          <el-form-item label="算法组合">
            <span>{{ details.method }}</span>
          </el-form-item>
          <el-form-item label="结果">
            <span>{{ details.result }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="应用体验"
        :visible.sync="dialogVisible"
        :append-to-body="true"
      >
        <div style="font-size: 18px; margin-bottom: 10px">
          <p>{{ this.reactModel.modelInform }}</p>
        </div>
        <el-upload class="upload-demo" drag :http-request="uploadFile" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传后请耐心等待</div>
        </el-upload>
        <div
          v-show="resultShow"
          style="font-size: 18px; margin-top: 20px; margin-bottom: 10px"
        >
          <p>请下载结果文件</p>
        </div>
        <a v-show="resultShow" :href="resultUrl"
          ><el-button type="primary" icon="el-icon-download"
            >结果文件</el-button
          ></a
        >
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  components: {
    Header,
  },
  data() {
    return {
      user_id: "1",
      currentPage3: 1,
      details: {},
      dialogTableVisible: false,
      dialogVisible: false,
      reactModel: "",
      value: "",
      tableDataShow: [],
      tableDataPages: [],
      tableData: [
        {
          id: "1",
          gmtCreateTime: "2023-11-02 00:00:00",
          dataName: "王小虎",
          dataAnalysis: "王小虎iuhuihihiuhiuhiuuhiuhiuh",
          method: "上海市普陀区金沙江路 1518 弄",
          result: "成功",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },

  methods: {
    getTableData() {
      axios({
        method: "get",
        url: "/guo/test/getTrainLog?user_id=" + this.user_id,
        headers: this.headers,
        timeout: 30000,
      }).then((res) => {
        this.tableData = res.data.trainLogs;
        this.tableDataPages = this.tableData;
        this.tableDataShow = this.tableData.slice(0, 10);
      });
    },
    // download(filename, link) {
    //     let DownloadLink = document.createElement('a');
    //     DownloadLink.style = 'display: none'; // 创建一个隐藏的a标签
    //     DownloadLink.download = filename;
    //     DownloadLink.href = link;
    //     document.body.appendChild(DownloadLink);
    //     DownloadLink.click(); // 触发a标签的click事件
    //     document.body.removeChild(DownloadLink);
    // },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(row) {
      this.details = row;
      // console.log(this.details);
    },
    rowStyle() {
      return "text-align:center; background-color: #f5f7fa;";
    },
    formatDate(row, column) {
      // 获取单元格数据
      let date = row[column.property];
      if (date == null) {
        return null;
      }
      let dt = new Date(date);
      return dayjs(dt).format("YYYY-MM-DD\nHH:mm:ss");
    },
    showdialog(row) {
      // console.log(model);
      // this.reactModel = model;
      console.log(row);
      this.dialogVisible = true;
    },
    // apply(row) {
    //   this.$confirm("此操作会将此模型加入模型应用中, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       row.isAble = true;
    //       this.$message({
    //         type: "success",
    //         message: "应用成功!",
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消应用",
    //       });
    //     });
    // },
  },
  watch: {
    value(val) {
      if (val == null) {
        this.tableDataPages = this.tableData;
        this.currentPage3 = 1;
        this.tableDataShow = this.tableDataPages.slice(0, 10);
      } else {
        this.tableDataPages = this.tableData.filter((item) => {
          const dt = new Date(item.gmtCreateTime);
          return (
            dt.getTime() >= val[0].getTime() && dt.getTime() <= val[1].getTime()
          );
        });
        this.currentPage3 = 1;
        this.tableDataShow = this.tableDataPages.slice(0, 10);
      }
    },
    currentPage3() {
      this.tableDataShow = this.tableDataPages.slice(
        (this.currentPage3 - 1) * 10,
        this.currentPage3 * 10
      );
    },
  },
  mounted() {
    this.getTableData();
    this.tableDataPages = this.tableData;
    this.tableDataShow = this.tableData.slice(0, 10);
  },
};
</script>

<style lang="less" scoped>
.demonstration {
  font-size: 14px;
  margin-bottom: 10px;
  color: #8492a6;
  display: block;
}

.el-form-item {
  display: block;
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
}
</style>