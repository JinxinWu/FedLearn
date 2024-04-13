<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="message-box" style="margin-top: 5%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
              <div slot="label">
                客户端连接日志
                <!-- <span :style="{ color: messages.length > 10 ? 'red' : '' }"
                  >({{ messages.length }})</span
                > -->
              </div>
              <MyLog
                which="ask"
                :getMessage="messages"
                @getConnectMessage="getConnectMessage"
              ></MyLog>
            </el-tab-pane>
            <el-tab-pane label="其他消息" name="second">
              <div slot="label">模型聚合日志</div>
              <MyLog
                which="other"
                :getMessage="messages"
                @getConnectMessage="getConnectMessage"
              ></MyLog>
            </el-tab-pane>
            <el-tab-pane label="其他消息" name="thrid">
              <div slot="label">服务端参数同步</div>
              <MyLog
                which="other"
                :getMessage="messages"
                @getConnectMessage="getConnectMessage"
              ></MyLog>
            </el-tab-pane>
            <el-tab-pane label="其他消息" name="forth">
              <div slot="label">客户端参数同步</div>
              <MyLog
                which="other"
                :getMessage="messages"
                @getConnectMessage="getConnectMessage"
              ></MyLog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
    
<script>
import MyLog from "@/components/MyLog";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {
    MyLog,
  },
  data() {
    return {
      // 上面选择全部消息/未读消息/已读消息的数据
      activeName: "first",
      // 从服务端接收到的全部数据
      messages: [
        {
          ip: "192.168.1.1",
          clientName: "wjx",
          department: "车间1",
          time: "2024/4/13 14:49",
          status: "已加入",
        },
        {
          ip: "192.168.1.1",
          clientName: "xby",
          department: "车间2",
          time: "2024/4/13 14:49",
          status: "已加入",
        },
        {
          ip: "192.168.1.1",
          clientName: "gxr",
          department: "车间3",
          time: "2024/4/13 14:49",
          status: "已加入",
        },
        {
          ip: "192.168.1.1",
          clientName: "hxy",
          department: "车间4",
          time: "2024/4/13 14:49",
          status: "已加入",
        },
        {
          ip: "192.168.1.1",
          clientName: "fyb",
          department: "车间5",
          time: "2024/4/13 14:49",
          status: "已加入",
        },
      ],
      // 未读消息的数据
      unreadMessage: [],
      // 已读消息的数据
      readMessage: [],
      token: null,
    };
  },
  activated() {},
  created() {
    this.getConnectMessage();
  },
  methods: {
    getConnectMessage() {
      this.token = VueCookies.get("token");
      console.log(this.token);
      axios({
        method: "get",
        url: "http://192.168.43.34:7000/connect/getConnectionMessage",
        headers: { token: this.token },
      })
        .then((res) => {
          console.log(res);
          this.messages = res.data.message;
        })
        .catch((action) => {
          return;
        });
    },
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
          console.log(this.userId);
        });
      }
    },
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