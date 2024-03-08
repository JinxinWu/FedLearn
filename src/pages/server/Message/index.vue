<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="message-box" style="margin-top: 5%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
              <div slot="label">
                请求消息
                <span :style="{ color: messages.length > 10 ? 'red' : '' }"
                  >({{ messages.length }})</span
                >
              </div>
              <Messages which="ask" :getMessage="messages"></Messages>
            </el-tab-pane>
            <el-tab-pane label="其他消息" name="second">
              <div slot="label">
                其他消息
                <span :style="{ color: messages.length > 10 ? 'red' : '' }"
                  >({{ messages.length }})</span
                >
              </div>
              <Messages which="other" :getMessage="messages"></Messages>
            </el-tab-pane>
          </el-tabs>
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
      // 上面选择全部消息/未读消息/已读消息的数据
      activeName: "first",
      // 从服务端接收到的全部数据
      messages: [
        {
          date: "1",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 1,
        },
        {
          date: "2",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 0,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 1,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 0,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 1,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 0,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄",
          type: 1,
        },
      ],
      // 未读消息的数据
      unreadMessage: [],
      // 已读消息的数据
      readMessage: [],
    };
  },
  activated() {},
  methods: {
    // 上面选择全部消息/未读消息/已读消息的方法
    handleClick(tab, event) {
      // console.log(tab, event);
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
    this.$nextTick(() => {
      // this.getTicket();
    });
  },
};
</script>

<style lang='less' scoped>
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
}
</style>