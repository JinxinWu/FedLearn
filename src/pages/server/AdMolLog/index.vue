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
            style="font-size: 40px; font-weight: bold; line-height: 40px"
            >模型操作日志</el-col
          >
          <!-- 时间查询 -->
          <el-col :span="10" :offset="3" style="font-size: 15px">
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
          <el-col :span="4">
            <el-button @click="tableVisible = true">新增</el-button>
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
            prop="modelId"
            header-align="center"
            align="center"
            width="200"
            label="模型id"
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
            prop="modelUrl"
            header-align="center"
            align="center"
            label="模型地址"
          >
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, dataList)"
                type="text"
                size="small"
              >
                删除
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
          <el-form-item label="模型id">
            <span>{{ details.modelId }}</span>
          </el-form-item>
          <el-form-item label="时间">
            <span>{{ details.date }}</span>
          </el-form-item>
          <el-form-item label="模型地址">
            <span>{{ details.modelUrl }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="新增项目"
        :visible.sync="tableVisible"
        :show-close="false"
        :append-to-body="true"
      >
        <el-form label-position="left" :model="newItem">
          <el-form-item label="时间">
            <el-input
              v-model="newItem.data"
              style="width: 260px; margin-left: 28px"
            ></el-input>
          </el-form-item>
          <el-form-item label="模型地址">
            <el-input
              v-model="newItem.modelUrl"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel()">取消</el-button>
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
      tableVisible: false,
      dialogTableVisible: false,
      dataList: [
        {
          modelId: "fcefefed",
          date: "2023.11.17 00:00:00",
          modelUrl: "http://1.com",
        },
        {
          modelId: "fcefefed",
          date: "2023.11.18 00:00:00",
          modelUrl: "http://2.com",
        },
        {
          modelId: "fcefefed",
          date: "2023.11.19 00:00:00",
          modelUrl: "http://3.com",
        },
        {
          modelId: "fcefefed",
          date: "2023.11.20 00:00:00",
          modelUrl: "http://4.com",
        },
        {
          modelId: "fcefefed",
          date: "2023.11.21 00:00:00",
          modelUrl: "http://5.com",
        },
      ],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
      //筛选
      from: "", //起始时间
      to: "", //终止时间
      details: {
        modelId: "",
        date: "",
        modelUrl: "",
      },
      newItem: {
        date: "",
        modelUrl: "",
      },
    };
  },
  components: {
    Header2,
  },
  methods: {
    //取消
    cancel() {
      this.tableVisible = false;
      this.newItem = {
        date: "",
        modelUrl: "",
      };
    },
    //新建信息
    onSubmit() {
      console.log(this.newItem);
      const item = this.newItem;
      this.dataList.push(item);
      //axios 写这里
      //this.tableVisible=false;
    },
    //获取当前展示的内容
    getDataList() {
      const sorted_dataList = this.dataList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      const result = sorted_dataList.filter(
        (data) =>
          !this.from ||
          !this.to ||
          (data.date.toLowerCase() >= this.from &&
            data.date.toLowerCase() <= this.to)
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