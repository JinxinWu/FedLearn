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
            >用户操作日志</el-col
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
            <span style="margin-right: 10px; font-size: 15px">时间区间</span>
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
          style="width: 85%; margin: auto"
          :default-sort="{ prop: 'date', order: 'descending' }"
          :header-cell-style="{ text: 'center', background: '#f5f7fa' }"
          :data="
            this.dataList.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            ) &&
            this.dataList.filter(
              (data) =>
                (!this.from ||
                  !this.to ||
                  (data.date.toLowerCase() >= this.from &&
                    data.date.toLowerCase() <= this.to)) &&
                (!this.user ||
                  data.user.toLowerCase().includes(this.user.toLowerCase()))
            )
          "
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
            prop="action"
            header-align="center"
            align="center"
            width="350"
            label="操作"
          >
          </el-table-column>
          <el-table-column
            prop="ip"
            header-align="center"
            align="center"
            width="350"
            label="优先级"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, dataList)"
                type="text"
                size="small"
              >
                移除
              </el-button>
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
    </el-main>
  </el-container>
</template>
    
    <script>
import Header2 from "@/components/Header2";
export default {
  data() {
    return {
      dataForm: {},
      dataList: [
        {
          date: "2023.11.17",
          user: "a",
          action: "fesfef",
          ip: "SFEF",
        },
        {
          date: "2023.11.18",
          user: "b",
          action: "fesfef",
          ip: "SFEF",
        },
        {
          date: "2023.11.19",
          user: "c",
          action: "fesfef",
          ip: "SFEF",
        },
        {
          date: "2023.11.20",
          user: "d",
          action: "fesfef",
          ip: "SFEF",
        },
        {
          date: "2023.11.21",
          user: "e",
          action: "fesfef",
          ip: "SFEF",
        },
      ],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
      //筛选
      user: "", //当前选择的user
      from: "", //起始时间
      to: "", //终止时间
      dataListLoading: false,
      addOrUpdateVisible: false,
    };
  },
  components: {
    Header2,
  },
  activated() {
    this.getDataList();
  },
  methods: {
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
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
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