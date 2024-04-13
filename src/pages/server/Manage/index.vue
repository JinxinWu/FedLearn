<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="message-box" style="min-height: 653.28px">
          <p class="title">客户端管理</p>
          <div style="margin: 10px 0px; text-align: left;">
            <span style="margin-right: 10px; margin-left: 10px"
              >已选中{{ checkedNum }}项</span
            >
            <el-button size="small" @click="manyHadRead()"
              >批量断开连接</el-button
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
              prop="client"
              label="客户端名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="area" label="部门"> </el-table-column>
            <el-table-column prop="ip" label="IP"> </el-table-column>
            <el-table-column prop="gpu" label="GPU" show-overflow-tooltip=""> </el-table-column>
            <el-table-column prop="cpu" label="CPU" show-overflow-tooltip=""> </el-table-column>
            <el-table-column prop="memory" label="内存" width="60">
            </el-table-column>
            <el-table-column prop="alive" label="是否在线" width="80">
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <a
                  style="color: #409eff"
                  @click="handleDelete(scope.$index, scope.row)"
                  >断开连接</a
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
  </div>
</template>
    
<script>
import Messages from "@/components/Messages";
import axios from "axios";

export default {
  components: {
    Messages,
  },
  data() {
    return {
      // 全部消息的数据
      allMessage: [
        {
          client: "wjx",
          manager: "王小虎",
          area: "车间1",
          ip: "192.168.43.74",
          gpu: "NVIDIA GeForce GTX 3060",
          cpu: "AMD Ryzen 7 5700U",
          memory: "16GB",
          alive: "是",
        },
        {
          client: "wby",
          manager: "王小虎",
          area: "车间2",
          ip: "192.168.43.59",
          gpu: "NVIDIA GeForce GTX 4060",
          cpu: "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
          memory: "32GB",
          alive: "是",
        },
        {
          client: "gxr",
          manager: "王小虎",
          area: "车间3",
          ip: "192.168.43.238",
          gpu: "NVIDIA GeForce GTX 3060",
          cpu: "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
          memory: "16GB",
          alive: "是",
        },
        {
          client: "hxy",
          manager: "王小虎",
          area: "车间4",
          ip: "192.168.43.125",
          gpu: "NVIDIA GeForce GTX 4060",
          cpu: "Intel(R) Core(TM) i9-7700HQ CPU @ 2.80GHz",
          memory: "32GB",
          alive: "是",
        },
        {
          client: "fyb",
          manager: "王小虎",
          area: "车间5",
          ip: "192.168.43.163",
          gpu: "NVIDIA GeForce GTX 3060",
          cpu: "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
          memory: "16GB",
          alive: "是",
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
  methods: {
    // 批量标为已读
    manyHadRead() {
      console.log(this.multipleSelection);
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
  mounted() {
    // 初始化数据
    this.getPageInfo();
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
  margin-top: 0px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 550.28px;;
}

.block {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 10px;
}
</style>