<template>
  <el-container>
    <el-main>
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
              <el-select v-model="ruleForm.department" placeholder="请选择部门">
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
        <el-col :span="8" :offset="8" v-show="messageShow">
          <el-table
            v-loading="loading"
            element-loading-text="正在等待中央服务器的同步消息"
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="algori" label="算法" width="180">
            </el-table-column>
            <el-table-column prop="compress" label="压缩算法" width="180">
            </el-table-column>
            <el-table-column prop="address" label="xxx"> </el-table-column>
          </el-table>
          <div style="margin: 20px"></div>
          <el-button
            style="margin-left: 400px"
            type="primary"
            @click="agreeMessage()"
            >方法启用</el-button
          >
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {
  },
  data() {
    return {
      userId:"",
      ruleForm: {
        ip: "",
        name: "",
        department: "",
      },
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
        department: [{ required: true, message: "请选择部门", trigger: "change" }],
      },
      tableData: [
        {
          algori: "CNN",
          compress: "xx算法",
          address: "xxx",
        },
      ],
      formDisabled: false,
      loading: true,
      messageShow: false,
      token: null,
      connection:false,
      socket:null,
      ip:null,
    };
  },
  created() {
    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onClose;
    this.socket.onerror = this.onError;
  },
  mounted() {
    this.init()
  },
  methods: {
    onOpen(event) {
      // 向服务端发送请求连接信息http://localhost:7000/connect/getConnection
      axios({
        method: "post",
        url:`http://localhost:7000/connect/getConnection`,
        headers:{
          token: this.token,
        },
        data: {
          ip: this.ip,
          userId: this.userId,
          clientName: this.ruleForm.name,
          department: this.ruleForm.department
        },
        timeout: 30000
        }).then((res)=>{
          this.$message({
            message: '请求连接信息发送成功',
            type: 'success'
          })
          this.messageShow = true; // 开始转圈等待
      });
    },
    onMessage(event) {
        // 如果是请求处理信息，收到已经同意的信息，转圈等待停止，显示连接成功；如果是拒绝的信息，就关闭websocket

        this.$notify({
                  title: "来自中央服务器的连接消息",
                  message: "连接成功",
                  duration: 0,
                  offset: 50,
                });
        // 可以禁用表单，可以优化成刷新仍然禁用
        this.formDisabled = true;
        
        // 如果是方法同步信息，则赋值给tableData
        
        this.loading = false; // 停止转圈获取到了服务器同步方法信息
        this.$notify({
                  title: "来自中央服务器的同步方法消息",
                  message: "获取同步方法",
                  duration: 0,
                  offset: 50,
                });
        
        // this.message = event.data;
        // console.log('Received message: ' + this.message);
    },
    onClose(event) {
        console.log('WebSocket closed');
    },
    onError(event) {
        console.error('WebSocket error: ' + event);
    },
    init() {
      this.getUserId();
      this.getUserIP((ip) => {
        this.ip = ip;
        console.log(this.ip)
      });
    },
    getUserId() {
      // 从cookie中获取id
      this.token = VueCookies.get("token");
      if (this.token) {
        axios({
          method: "get",
          url: `http://localhost:7000/User/user/getUserId`,
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
    getUserIP(onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        let pc = new MyPeerConnection({
            iceServers: []
          });
        let noop = () => {
          };
        let localIPs = {};
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
        let isFirstIPFound = false; // 添加一个标志来判断是否已经找到第一个IP
        let iterateIP = (ip) => {
          if (!isFirstIPFound) { // 只在第一个IP找到时调用回调函数
            onNewIP(ip);
            isFirstIPFound = true;
          }
          localIPs[ip] = true;
        };
        // let iterateIP = (ip) => {
        //   if (!localIPs[ip]) onNewIP(ip);
        //   localIPs[ip] = true;
        // };
        pc.createDataChannel('');
        pc.createOffer().then((sdp) => {
          sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        }).catch((reason) => {
        });
        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { 
          let url = "http://" + this.ruleForm.ip + "/server/" +this.userId
          // var url="http://localhost:8000/server/"+$("#userId").val();
          // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          // 等同于socket = new WebSocket("ws://localhost:8000/server");
          let socketUrl=url.replace("https","ws").replace("http","ws");
          console.log(socketUrl);
          if(this.socket!=null){
              this.socket.close();
              this.socket=null;
          }
          this.socket = new WebSocket(socketUrl);
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
        offset: 50,
      });
    },
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
  margin-bottom: 20px;
}
</style>