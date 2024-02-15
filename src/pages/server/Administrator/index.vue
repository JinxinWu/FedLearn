<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header2></Header2>
    </el-header>
    <el-main>
      <div class="mod-menu" style="">
        <!-- 操作按钮 -->
        <div
          style="
            margin-top: 20px;
            margin-bottom: 20px;
            width: 100%;
            height: 40px;
          "
        >
          <el-col
            :span="4"
            :offset="3"
            style="font-size: 40px; font-weight: bold ; line-height: 40px"
            >用户建模日志</el-col
          >
          <el-col
            :span="2"
            :offset="1"
            style="font-size: 15px; line-height: 40px"
            >快速搜索：</el-col
          >
          <!-- 用户查询 -->

          <el-col :span="4">
            <span style="font-size: 15px; margin-right: 10px">用户名</span>
            <el-autocomplete
              class="inline-input"
              v-model="user"
              :fetch-suggestions="userSearch"
              placeholder=""
              clearable
              style="width: 140px; font-size: 15px"
            ></el-autocomplete>
          </el-col>

          <!-- 时间查询 -->
          <el-col :span="10" style="font-size: 15px">
            <span style="margin-right: 10px; font-size: 15px; color: #8492a6"
              >时间区间</span
            >
            从
            <el-autocomplete
              class="inline-input"
              v-model="from"
              :fetch-suggestions="dateSearch"
              placeholder="请输入起始时间"
              clearable
              style="width: 145px; font-size: 15px"
            ></el-autocomplete>
            到
            <el-autocomplete
              class="inline-input"
              v-model="to"
              :fetch-suggestions="dateSearch"
              placeholder="请输入终止时间"
              clearable
              style="width: 145px; font-size: 15px"
            ></el-autocomplete>
          </el-col>
        </div>
        <!-- 数据显示 -->

        <el-table
          row-key="menuId"
          ref="filterTable"
          border
          style="width: 80%; margin: auto"
          :default-sort="{ prop: 'date', order: 'descending' }"
          :header-cell-style="{ text: 'center', background: '#f5f7fa' }"
          :data="getDataList()"
        >
          <el-table-column
            header-align="center"
            min-width="50"
            type="index"
            :index="indexMethod(0)"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            header-align="center"
            align="center"
            width="200"
            label="时间"
            :formatter="formatDate"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="user"
            header-align="center"
            align="center"
            width="100"
            label="用户"
          >
          </el-table-column>
          <el-table-column
            prop="dataName"
            label="数据集名称"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dataName.length <= 6">{{
                scope.row.dataName
              }}</span>
              <span v-if="scope.row.dataName.length > 6">{{
                scope.row.dataName.substr(0, 6) + "..."
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="guidance" label="建模指引" width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.guidance.length <= 10">{{
                scope.row.guidance
              }}</span>
              <span v-if="scope.row.guidance.length > 10">{{
                scope.row.guidance.substr(0, 10) + "..."
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="model" label="模型(算法组合)" width="260">
            <template slot-scope="scope">
              <span v-if="scope.row.model.length <= 10">{{
                scope.row.model
              }}</span>
              <span v-if="scope.row.model.length > 10">{{
                scope.row.model.substr(0, 10) + "..."
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="modelUrl"
            header-align="center"
            align="center"
            width="200"
            label="模型地址"
          >
          </el-table-column>

          <el-table-column
            prop="result"
            header-align="center"
            align="center"
            width="200"
            label="结果"
            ><template slot-scope="scope">
              <span v-if="scope.row.result.length <= 10">{{
                scope.row.result
              }}</span>
              <span v-if="scope.row.result.length > 10">{{
                scope.row.result.substr(0, 10) + "..."
              }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, dataList)"
                type="text"
                size="small"
              >
                移除
              </el-button>
              <el-button
                @click="
                  handleClick(scope.row);
                  dialogTableVisible = true;
                "
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="margin-top: 15px">
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.dataList.length"
          >
          </el-pagination>
        </div>
      </div>
      <el-dialog
        title="建模详情"
        :visible.sync="dialogTableVisible"
        :append-to-body="true"
      >
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="时间">
            <span>{{ details.date }}</span>
          </el-form-item>
          <el-form-item label="数据集名称">
            <span>{{ details.dataName }}</span>
          </el-form-item>
          <el-form-item label="建模指引">
            <span v-html="details.guidance"></span>
          </el-form-item>
          <el-form-item label="算法组合">
            <span>{{ details.model }}</span>
          </el-form-item>
          <el-form-item label="结果">
            <span>{{ details.result }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </el-container>
</template>
  
  <script>
import Header2 from "@/components/Header2";
import dayjs from "dayjs";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dataForm: {},
      dataList: [
        {
          date: "2023.11.17 00:00:00",
          user: "a",
          dataName: "",
          guidance: "",
          model: "",
          modelUrl: "http://1.com",
          result: "",
        },
        {
          date: "2023.11.18 00:00:00",
          user: "b",
          dataName: "",
          guidance: "",
          model: "",
          modelUrl: "http://2.com",
          result: "",
        },
        {
          date: "2023.11.19 00:00:00",
          user: "c",
          dataName: "",
          guidance: "",
          model: "",
          modelUrl: "http://3.com",
          result: "",
        },
        {
          date: "2023.11.20 00:00:00",
          user: "d",
          dataName: "",
          guidance: "",
          model: "",
          modelUrl: "http://4.com",
          result: "",
        },
        {
          date: "2023.11.21 00:00:00",
          user: "e",
          dataName: "",
          guidance: "",
          model: "",
          modelUrl: "http://5.com",
          result: "",
        },
      ],
      currentPage: 1, // 当前页码
      pageSize: 1, // 每页的数据条数
      //筛选
      user: "", //当前选择的user
      from: "", //起始时间
      to: "", //终止时间
      details: {
        date: "",
        user: "",
        dataName: "",
        guidance: "",
        model: "",
        modelUrl: "",
        result: "",
      },
    };
  },
  components: {
    Header2,
  },
  methods: {
    getDataList() {
      const sorted_dataList = this.dataList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      const result = sorted_dataList.filter(
        (data) =>
          (!this.from ||
            !this.to ||
            (data.date.toLowerCase() >= this.from &&
              data.date.toLowerCase() <= this.to)) &&
          (!this.user ||
            data.user.toLowerCase().includes(this.user.toLowerCase()))
      );
      return result;
    },
    //点击查看详情
    handleClick(row) {
      this.details = row;
      console.log(this.details);
    },
    //时间列的格式转化
    formatDate(row, column) {
      // 获取单元格数据
      let date = row[column.property];
      if (date == null) {
        return null;
      }
      let dt = new Date(date);
      return dayjs(dt).format("YYYY-MM-DD\nHH:mm:ss");
    },
    //用户查询
    userSearch(queryString, cb) {
      var dataList = this.dataList;
      var results = queryString
        ? dataList.filter(this.createUserFilter(queryString))
        : dataList;
      //对结果增加value属性
      results.forEach((item) => {
        item.value = item.user;
      });
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createUserFilter(queryString) {
      return (result) => {
        return (
          result.user.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //时间查询
    dateSearch(queryString, cb) {
      var dataList = this.dataList;
      var results = queryString
        ? dataList.filter(this.createDateFilter(queryString))
        : dataList;
      //对结果增加value属性
      results.forEach((item) => {
        item.value = item.date;
      });
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createDateFilter(queryString) {
      return (result) => {
        return (
          result.date.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //分页代码
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //筛选模型类型
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    //自动增加序号
    indexMethod(index) {
      return index + 1;
    },
    //删除数据
    deleteRow(index, rows) {
      console.log(index, rows);
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0;
}
.el-autocomplete {
  padding: 0;
  height: 30px;
}
</style>