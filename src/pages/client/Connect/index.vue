<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
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
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择部门">
                <el-option label="计算机学院" value="computer"></el-option>
                <el-option label="网络空间安全学院" value="websec"></el-option>
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
import Header from "@/components/Header";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {
    Header,
  },
  data() {
    return {
      userId:"",
      ruleForm: {
        ip: "",
        name: "",
        region: "",
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
        region: [{ required: true, message: "请选择部门", trigger: "change" }],
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
      socket:null
    };
  },
  mounted() {
    this.getUserId()
  },
  watch: {
    connection(newValue, oldValue) {
      if (newValue === true && oldValue === false) {
        // 当 connection 从 false 变为 true 时执行逻辑
        // 这里执行与服务器进行websocket连接
        this.openSocket()
        this.$notify({
                  title: "来自中央服务器的消息",
                  message: "连接成功",
                  duration: 0,
                  offset: 50,
                });
          // 可以禁用表单，可以优化成刷新仍然禁用
          this.formDisabled = true;
          // 进入loading状态
          this.messageShow = true;
      }
    }
  },
  methods: {
    openSocket(url) {
        // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        // 等同于socket = new WebSocket("ws://localhost:8000/server");
        // var socketUrl="http://localhost:8000/server/"+$("#userId").val();
        let socketUrl=url.replace("https","ws").replace("http","ws");
        console.log(socketUrl);
        if(this.socket!=null){
            this.socket.close();
            this.socket=null;
        }
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket.onopen = function() {
            this.connection = true
            // socket.send("这是来自客户端的消息"+ new Date());
        };
        //获得消息事件
        this.socket.onmessage = function(msg) {
            console.log(msg.data);
            this.loading = false;
            
            //发现消息进入,开始处理前端触发逻辑
        };
        //关闭事件
        this.socket.onclose = function() {
            console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
            console.log("websocket发生了错误");
        }
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
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO:这里向服务器发送ajax请求，请求服务器建立连接,服务器出现消息请求，点击同意后才能继续向下
          let url = "http://localhost:8000/server/" + this.userId
          this.openSocket(url)
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