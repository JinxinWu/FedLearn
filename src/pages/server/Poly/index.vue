<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header2></Header2>
    </el-header>
    <el-main>
      <div class="message-box" style="min-height: 653.28px">
        <p class="title">模型聚合</p>
        <el-row>
          <el-col>
            <div style="margin-bottom: 10px">
              <span style="margin-right: 10px; margin-left: 10px"
                >已选中{{ checkedNum }}项</span
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
                prop="name"
                label="客户端名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="ip" label="IP地址" width="120">
              </el-table-column>
              <el-table-column prop="area" label="部门" width="120">
              </el-table-column>
              <el-table-column
                prop="tag"
                label="是否有参数更新"
                :filters="[
                  { text: '是', value: '是' },
                  { text: '否', value: '否' },
                ]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.tag === '是' ? 'primary' : 'success'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <div class="block" style="margin: 20px 0px 0px 0px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="messages.length"
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="8" :offset="4">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
                text-align: center;
              "
            >
              <div style="font-size: 16px">聚合算法</div>
              <div style="margin-top: 5px">
                <MyButton
                  v-for="item in [alors.csvImport, alors.ExcelImport]"
                  :comData="item"
                  :key="item.id"
                  ref="myButton"
                  @click.native="changeColor(item.id, item.step)"
                ></MyButton>
              </div>
              <div style="margin-bottom: 5px">
                <MyButton
                  v-for="item in [alors.DBImport, alors.unstructuredImport]"
                  :comData="item"
                  :key="item.id"
                  ref="myButton"
                  @click.native="changeColor(item.id, item.step)"
                ></MyButton>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              style="margin-top: 30px"
            >
              <el-form-item label="训练次数">
                <el-input
                  v-model.number="formInline.num"
                  placeholder="训练次数"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="startPoly"
                  >开始聚合</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="message-box" style="margin-top: 50px">
        <p class="title">聚合结果</p>
      </div>
    </el-main>
  </el-container>
</template>
    
<script>
import Header2 from "@/components/Header2";
import Messages from "@/components/Messages";
import MyButton from "@/components/MyButton";
import axios from "axios";

export default {
  components: {
    Header2,
    Messages,
    MyButton,
  },
  data() {
    return {
      // 从服务端接收到的全部数据
      messages: [
        {
          area: "1",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "是",
        },
        {
          area: "2",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "否",
        },
        {
          area: "2016-05-04",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "是",
        },
        {
          area: "2016-05-01",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "否",
        },
        {
          area: "2016-05-08",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "是",
        },
        {
          area: "2016-05-06",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "是",
        },
        {
          area: "2016-05-07",
          ip: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          tag: "是",
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
      // 算法
      alors: {
        csvImport: {
          isChange: false,
          step: 1,
          id: 1,
          name: "csv文件",
          type: "csvImport",
          content: "拖入即可导入csv文件",
        },
        ExcelImport: {
          isChange: false,
          step: 1,
          id: 2,
          name: "Excel文件",
          type: "ExcelImport",
          content: "拖入即可导入Excel文件",
        },
        DBImport: {
          isChange: false,
          step: 1,
          id: 3,
          name: "DB文件",
          type: "DBImport",
          content: "拖入即可导入db文件",
        },
        unstructuredImport: {
          isChange: false,
          step: 1,
          id: 4,
          name: "非结构化数据",
          type: "unstructuredImport",
          content: "拖入即可导入非结构化数据",
        },
      },
      // 表单数据
      formInline: {
        num: "",
      },
    };
  },
  activated() {},
  methods: {
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
    // 过滤器
    filterTag(value, row) {
      return row.tag === value;
    },
    // 分页的方法
    // 获取当前页的数据信息
    getPageInfo() {
      //清空currentMessage中的数据
      this.currentMessage = [];
      // 获取当前页的数据
      for (
        let i = (this.currentPage - 1) * this.pagesize;
        i < this.messages.length;
        i++
      ) {
        //把遍历的数据添加到currentMessage里面
        this.currentMessage.push(this.messages[i]);
        //判断是否达到一页的要求
        if (this.currentMessage.length === this.pagesize) break;
      }
    },
    handleSizeChange(val) {
      this.currentMessage = this.messages.slice(0, val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //修改当前的页码
      this.currentPage = val;
      //数据重新分页
      this.getPageInfo();
    },
    // 改变算法组件颜色
    changeColor(id, step) {
      this.$refs.myButton.forEach((item) => {
        if (item.step === step && item.id === id) {
          item.isChange = !item.isChange;
        } else if (item.step === step) {
          item.isChange = false;
        }
      });
    },
    // 表单提交
    startPoly() {
      console.log(this.formInline);
    },
    // 获取页面的表格所有数据
    // 还未修改的代码
    // getTicket() {
    //   let that = this;
    //   that.$axios
    //     .get(that.baseURL + "PROD/ticket/documents/")
    //     .then(function (res) {
    //       if (res.data.code === 1) {
    //         that.ticket = res.data.data;
    //         //获取返回记录的总行数
    //         that.total = res.data.data.length;
    //         //获取当前页的数据
    //         that.getPageInfo(); //在这里调用获取当前页的数据信息方法
    //         that.$message({
    //           message: "数据加载成功!",
    //           type: "success",
    //         });
    //       } else {
    //         // 失败的提示
    //         that.$message.error(res.data.msg);
    //       }
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    // 初始化数据
    this.getPageInfo();
    this.$nextTick(() => {
      // this.getTicket();
    });
  },
};
</script>

<style lang='less' scoped>
label {
  margin-bottom: 0px !important;
}

.title {
  margin-top: 0px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1.5em;
  text-align: center;
}

.el-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0;
}
.el-autocomplete {
  padding: 0;
  height: 30px;
}

.message-box {
  width: 80%;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>