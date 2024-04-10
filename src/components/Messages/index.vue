<template>
  <div>
    <div style="margin-bottom: 10px;text-align: left;">
      <span style="margin-right: 10px; margin-left: 10px;"
        >已选中{{ checkedNum }}项</span
      >
      <el-button v-if="which == 'ask'" size="small" @click="manyHadRead()">批量标为已读</el-button>
      <el-button size="small" @click="toggleSelection()">取消选择</el-button>
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
      <el-table-column prop="ip" label="客户端ip" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="clientName" label="客户端名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="department" label="客户端部分" width="120" align="center">
      </el-table-column>
      <el-table-column label="请求时间" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.gmtCreate | formatDateTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <a
            v-if="which == 'ask'"
            style="color: #409eff"
            @click="accept(scope.$index, scope.row)"
            >同意</a
          >
          <el-divider
            v-if="which == 'ask'"
            direction="vertical"
          ></el-divider>
          <a
            style="color: #409eff"
            @click="decline(scope.$index, scope.row)"
            >拒绝</a
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
        :total="getMessage.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      // 全部消息的数据
      allMessage: [],
      // checkbox选中的数据
      multipleSelection: [],
      // checkbox为true的数量
      checkedNum: 0,
      // 当前页面的消息
      currentMessage: [],
      // 分页的数据
      currentPage: 1,
      pagesize: 10,
      userId: null
    };
  },
  props: {
    which: {
      type: String,
    },
    getMessage: {
      type: Array,
    },
  },
  watch:{
    getMessage(val) {
      this.allMessage = val;
      this.getPageInfo();
    },
  },
  mounted() {
    this.getUserId()
  },
  activated() {},
  methods: {
    getUserId() {
      // 从cookie中获取id
      this.token = VueCookies.get("token");
      if (this.token) {
        axios({
          method: "get",
          url: `http://192.168.43.34:7000/User/user/getUserId`,
          headers: {
            token: this.token,
          },
          timeout: 30000,
        }).then((res) => {
          this.userId = res.data.userId;
          console.log(this.userId)
        });
      }
    },
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
    // 是否同意加入联邦
    accept(index, row) {
      this.$confirm("是否确认加入联邦？", "加入联邦请求", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          // 这里发送axios请求，将数据标为已读，然后重新获取数据

          axios({
            method: "post",
            url: "http://192.168.43.34:7000/connect/confirmConnection",
            data: {
              serverId: this.userId,
              userId: row.userId,
              confirm: "1"
            },
            headers: {
              token: this.token
            }
          }).then((res) => {
            this.$message({
              type: "success",
              message: "成功同意加入联邦",
              offset:100,
            });
            this.$emit('getConnectMessage');
            // 这里向客户端发送信息表明已经同意加入
            axios({
              method: "post",
              url: "http://192.168.43.34:8000/Server/push/" + row.userId,
              data: {
                message: "1,服务端已经同意加入联邦"
              },
              headers: {
                token: this.token
              }
            })
          })
        })
        .catch((action) => {
          this.$message({
            type: "warning",
            message: action === "cancel" ? "放弃同意加入联邦" : "放弃同意加入联邦",
            offset:100,
          });
        });
      console.log(index, row);
    },
    decline(index, row) {
      this.$confirm("是否确认拒绝加入联邦？", "加入联邦请求", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          // 这里发送axios请求，将数据标为已读，然后重新获取数据
          this.$message({
            type: "success",
            message: "成功拒绝加入联邦",
            offset:100,
          });
        })
        .catch((action) => {
          this.$message({
            type: "warning",
            message: action === "cancel" ? "放弃拒绝加入联邦" : "放弃同意加入联邦",
            offset:100,
          });
        });
      console.log(index, row);
    },
    // 标为已读
    handleMark(index, row) {
      this.$confirm("是否将此项标为已读？", "标为已读", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "放弃",
      })
        .then(() => {
          // 这里发送axios请求，将数据标为已读，然后重新获取数据
          this.$message({
            type: "success",
            message: "成功标为已读",
            offset:100,
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃标为已读" : "放弃标为已读",
            offset:100,
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
        i < this.getMessage.length;
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
};
</script>

<style lang='less' scoped>
label {
  margin-bottom: 0px !important;
}
</style>