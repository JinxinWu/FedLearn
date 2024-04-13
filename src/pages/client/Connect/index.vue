<template>
  <div>
    <p class="title">中央服务器连接</p>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8" :offset="8">
        <div style="margin: 0px"></div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="120px"
          class="ruleForm"
          :disabled="formDisabled"
        >
          <el-form-item label="中央服务器IP" prop="ip">
            <el-input v-model="ruleForm.ip"></el-input>
          </el-form-item>
          <el-form-item label="客户端名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-select
              v-model="ruleForm.department"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <el-option label="一号车间" value="一号车间"></el-option>
              <el-option label="二号车间" value="二号车间"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >请求连接</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>

      <el-col v-if="show" :span="8" :offset="8" v-show="agreeShow">
        <el-result
          v-loading="agreeLoading"
          element-loading-text="正在等待服务器接受连接"
          element-loading-background="#ffffff"
          :icon="agreeShow ? '' : 'error'"
          :title="agreeShow ? '' : '服务器拒绝连接'"
        >
        </el-result>
      </el-col>

      <el-col v-else :span="15" :offset="5" v-show="messageShow">
        <el-table
          v-loading="loading"
          element-loading-text="正在等待中央服务器的同步消息"
          element-loading-background="#ffffff"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="algori" label="差分隐私" width="180">
          </el-table-column>
          <el-table-column prop="compress" label="同态加密" width="180">
          </el-table-column>
          <el-table-column prop="chafen" label="压缩方法" width="180">
          </el-table-column>
          <el-table-column prop="jiami" label="联邦方法" width="180">
          </el-table-column>
          <el-table-column prop="epochs" label="聚合轮次" width="180">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {},
  data() {
    return {
      userId: this.$store.state.userId,      
      ip: this.$store.state.ip,

      show: this.$store.state.show,//显示哪个弹出框
      agreeShow: this.$store.state.agreeShow,//服务器是否同意
      agreeLoading: this.$store.state.agreeLoading,
      ruleForm: this.$store.state.ruleForm,

      messageShow: this.$store.state.messageShow,
      loading: this.$store.state.loading,
      formDisabled: this.$store.state.formDisabled,
      
      tableData: [
        {
          algori: this.$store.state.tableData[0].algori,
          compress: this.$store.state.tableData[0].compress,
          chafen: this.$store.state.tableData[0].chafen,
          epochs: this.$store.state.tableData[0].epochs,
          jiami: this.$store.state.tableData[0].jiami,
        },
      ],
      

      rules: {
        ip: [
          {
            required: true,
            message: "请填写中央服务器IP地址",
            trigger: "blur",
          },
          // 这里可以自定义规则，有空可以添加
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],
      },
      token: null,
      socket: null,
    };
  },
  created() {
    // this.$store.dispatch("")
  },
  mounted() {
    this.init();
  },
  methods: {
    onOpen(event) {
      // 向服务端发送请求连接信息http://192.168.43.34:7000/connect/getConnection
      console.log("onopen----------------");
      console.log(this.ip);
      console.log(this.userId);
      console.log(this.ruleForm.name);
      console.log(this.ruleForm.department);
      console.log("-----------------------");
      axios({
        method: "post",
        url: `http://192.168.43.34:7000/connect/getConnection`,
        headers: {
          token: this.token,
        },
        data: {
          ip: this.ip,
          userId: this.userId,
          clientName: this.ruleForm.name,
          department: this.ruleForm.department,
        },
        timeout: 30000,
      }).then((res) => {
        this.$message({
          message: "请求连接信息发送成功",
          type: "success",
          offset: 100,
        });
        // this.agreeShow = true; // 开始转圈等待同意连接
        this.agreeShow = true;
        this.$store.commit("setAgreeShow", true);
      });
    },
    onMessage(event) {
      // 如果是请求处理信息，收到已经同意的信息，转圈等待停止，显示连接成功；如果是拒绝的信息，就关闭websocket
      console.log("onMessage--------" + event.data);
      if (event.data.split(",")[0] == "1") {
        this.$notify({
          title: "来自中央服务器的连接消息",
          message: "连接成功",
          duration: 0,
          offset: 100,
        });

        this.show = false;
        this.$store.commit("setShow",this.show);
        this.messageShow = true;
        this.$store.commit("setMessageShow",this.messageShow);
        // 可以禁用表单，可以优化成刷新仍然禁用
        this.formDisabled = true;
        this.$store.commit("setFormDisabled",this.formDisabled);
      }

      // 如果是方法同步信息，则赋值给tableData
      if (event.data.split(",")[0] == "2") {
        // 2,服务端同步信息已发送,1,5,10,10
        this.loading = false; // 停止转圈获取到了服务器同步方法信息
        this.$store.commit("setLoading", false);
        this.$notify({
          title: "来自中央服务器的同步方法消息",
          message: "获取同步方法",
          duration: 0,
          offset: 100,
        });
        let trans_data = event.data.split(";")[1];
        console.log("trans_data----" + trans_data);
        let trans_dataArray = trans_data.split(",");
        console.log("trans_dataArray----" + trans_dataArray);
        let tableData = [
          {
            algori: null,
            compress: null,
            chafen: null,
            jiami: null,
            epochs: null,
          },
        ];
        axios({
          method: "get",
          url: `http://192.168.43.34:7000/component/getMethodName/${trans_dataArray[0]}`,
          headers: {
            token: this.token,
          },
          timeout: 30000,
        }).then((res) => {
          tableData[0].algori = res.data.methodName;
        });
        axios({
          method: "get",
          url: `http://192.168.43.34:7000/component/getMethodName/${trans_dataArray[1]}`,
          headers: {
            token: this.token,
          },
          timeout: 30000,
        }).then((res) => {
          tableData[0].compress = res.data.methodName;
        });
        axios({
          method: "get",
          url: `http://192.168.43.34:7000/component/getMethodName/${trans_dataArray[2]}`,
          headers: {
            token: this.token,
          },
          timeout: 30000,
        }).then((res) => {
          tableData[0].chafen = res.data.methodName;
        });
        axios({
          method: "get",
          url: `http://192.168.43.34:7000/component/getMethodName/${trans_dataArray[3]}`,
          headers: {
            token: this.token,
          },
          timeout: 30000,
        }).then((res) => {
          tableData[0].jiami = res.data.methodName;
        });
        tableData[0].epochs = trans_dataArray[4];
        console.log("tableDate----"+tableData[0]);

        this.$store.commit("setTableData", tableData[0]);
        console.log(this.$store.state.tableData[0]);
        this.tableData = tableData;
        console.log("-------------")
      }

      // this.message = event.data;
      // console.log('Received message: ' + this.message);
    },
    onClose(event) {
      // 还未测试
      console.log("close....");
      axios({
        method: "post",
        url: `http://192.168.43.34:7000/connect/deleteConnection`,
        headers: {
          token: this.token,
        },
        data: {
          userId: this.userId,
        },
        timeout: 30000,
      }).then((res) => {
        console.log("删除成功");
      });
    },
    onError(event) {
      // 还未测试
      console.error("WebSocket error: " + event);
      axios({
        method: "post",
        url: `http://192.168.43.34:7000/connect/deleteConnection`,
        headers: {
          token: this.token,
        },
        data: {
          userId: this.userId,
        },
        timeout: 30000,
      }).then((res) => {});
    },
    init() {
      if (!this.userId) {
        this.getUserId();
      }
      if (!this.ip) {
        this.getUserIP((ip) => {
          this.ip = ip
        });
        this.ip = '10.128.4.13'
      }
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
        })
          .then((res) => {
            this.userId = res.data.userId;
            // this.userId = res.data.userId;
            console.log(res.data.userId);
          })
          .catch((action) => {
            return;
          });
      }
    },
    getUserIP(onNewIP) {
      let MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      let pc = new MyPeerConnection({
        iceServers: [],
      });
      let noop = () => {};
      let localIPs = {};
      let ipRegex =
        /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
      let isFirstIPFound = false; // 添加一个标志来判断是否已经找到第一个IP
      let iterateIP = (ip) => {
        if (!isFirstIPFound) {
          // 只在第一个IP找到时调用回调函数
          onNewIP(ip);

          isFirstIPFound = true;
        }
        localIPs[ip] = true;
      };
      // let iterateIP = (ip) => {
      //   if (!localIPs[ip]) onNewIP(ip);
      //   localIPs[ip] = true;
      // };
      pc.createDataChannel("");
      pc.createOffer()
        .then((sdp) => {
          sdp.sdp.split("\n").forEach(function (line) {
            if (line.indexOf("candidate") < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch((reason) => {
          return;
        });
      pc.onicecandidate = (ice) => {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let url = "http://" + this.ruleForm.ip + "/server/" + this.userId;
          let url = "http://192.168.43.34:8000/server/" + this.userId;
          // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          // 等同于socket = new WebSocket("ws://192.168.43.34:8000/server");
          let socketUrl = url.replace("https", "ws").replace("http", "ws");
          this.$store.dispatch("createWebSocket", socketUrl);
          console.log(socketUrl);
          this.socket = this.$store.getters.websocket;
          this.$store.commit("setWebSocketEvent", {
            event: "onopen",
            handler: (event) => {
              this.onOpen(event);
            },
          });
          this.$store.commit("setWebSocketEvent", {
            event: "onmessage",
            handler: (event) => {
              this.onMessage(event);
            },
          });
          this.$store.commit("setWebSocketEvent", {
            event: "onerror",
            handler: (event) => {
              this.onError(event);
            },
          });
          this.$store.commit("setRuleForm", formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    agreeMessage() {
      this.$notify({
        title: "提示",
        message: "方法已启用",
        duration: 0,
        offset: 100,
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setUserId", this.userId);
    this.$store.commit("setShow", this.show);
    this.$store.commit("setIp", this.ip);
    this.$store.commit("setRuleForm", this.ruleForm);
    this.$store.commit("setMessageShow", this.messageShow);
    this.$store.commit("setAgreeShow", this.agreeShow);
    this.$store.commit("setTableData", this.tableData[0]);
    this.$store.commit("setFormDisabled", this.formDisabled);
    this.$store.commit("setAgreeLoading", this.agreeLoading);
    this.$store.commit("setLoading", this.loading);

    console.log("set----->" + this.userId);
    console.log("set----->" + this.show);
    console.log("set----->" + this.ip);
    console.log("set----->" + this.ruleForm);
    console.log("set----->" + this.messageShow);
    console.log("set----->" + this.agreeShow);
    console.log("set----->" + this.tableData[0]);
    console.log("set----->" + this.formDisabled);
    console.log("set----->" + this.agreeLoading);
    console.log("set----->" + this.loading);
    next();
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，以防止内存泄漏
    clearInterval(this.timer);
  },
};
</script>

<style lang='less' scoped>
.title {
  margin-top: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 2em;
  text-align: center;
}

// Loading
body {
  margin: 0;
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
  margin-bottom: 20px;
}
</style>