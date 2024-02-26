<template>
  <div class="main-container" style="background-size: 100% 100%">
    <el-row style="width: 100vw"
      ><el-col :span="10" :offset="13"
        ><div class="login-main">
          <el-row class="login-title">
            <el-col align="center">
              <img src="@/assets/logo.png" style="height: 80px" />
            </el-col>
          </el-row>
          <el-row class="login-swicth" type="flex">
            <el-col :span="24" align="center">
              <el-radio-group v-model="userType">
                <el-radio-button label="user">用户登录</el-radio-button>
                <el-radio-button label="admin">管理员登录</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
            status-icon
          >
            <el-form-item prop="userName">
              <el-input
                v-model="dataForm.userName"
                placeholder="帐号"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="dataForm.password"
                type="password"
                placeholder="密码"
                prefix-icon="el-icon-view"
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20" type="flex" align="middle">
                <el-col :span="9">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="15" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row type="flex">
                <el-col :span="24" align="center"
                  ><el-button
                    class="login-btn-submit"
                    type="primary"
                    @click="dataFormSubmit()"
                    >登录</el-button
                  ></el-col
                >
              </el-row>
              <el-row
                ><el-col align="right">
                  <span class="sign-up-text">注册账号</span>
                </el-col></el-row
              >
            </el-form-item>
          </el-form>
        </div></el-col
      ></el-row
    >
  </div>
</template>

<script>
import { getUUID } from "@/utils";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      BaseUrl: "http://localhost:7000/",
      loginApi: {
        login: "User/user/login",
        captcha: "User/captcha.jpg",
      },
      userType: "user",
      dataForm: {
        userName: "",
        password: "",
        uuid: "",
        captcha: "",
      },
      dataRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      captchaPath: "",
    };
  },
  created() {
    this.getCaptcha();
  },
  watch: {
    userType: {
      handler(val) {
        this.getCaptcha();
      },
    },
  },

  methods: {
    // 提交表单
    dataFormSubmit() {
      let _this = this;
      if (this.userType === "user") {
        this.$refs["dataForm"].validate((valid) => {
          if (valid) {
            let param = {
              username: this.dataForm.userName,
              password: this.dataForm.password,
              uuid: this.dataForm.uuid,
              captcha: this.dataForm.captcha,
            };
            axios
              .post(this.BaseUrl + this.loginApi["login"], param)
              .then((res) => {
                if (res.status === 200) {
                  if (res.data.msg === "登录成功" && res.data.type == "0") {
                    // this.$message.success("登录成功")
                    // 用户端
                    //登录记录
                    sessionStorage.setItem("isLogin", 1);
                    // console.log(res.data.token)
                    VueCookies.set("token", res.data.token);
                    // console.log(VueCookies.get("token")) // 实测可以拿到token
                    this.$router.replace({ name: "Connect" });
                    
                  } else {
                    this.$message.error("用户名或者密码错误")
                    _this.getCaptcha();
                    _this.$message.error(data.msg);
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      } else if (this.userType === "admin") {
        this.$refs["dataForm"].validate((valid) => {
          if (valid) {
            let param = {
              username: this.dataForm.userName,
              password: this.dataForm.password,
              uuid: this.dataForm.uuid,
              captcha: this.dataForm.captcha,
            };
            axios
              .post(this.BaseUrl + this.loginApi["login"], param)
              .then((res) => {
                if (res.status === 200) {
                  if (res.data.msg === "登录成功" && res.data.type == "1") {
                    // 用户端
                    //登录记录
                    sessionStorage.setItem("isLogin", 1);
                    VueCookies.set("token", res.data.token);
                    this.$router.replace({ name: "Message" });
                  } else {
                    _this.getCaptcha();
                    _this.$message.error(data.msg);
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      axios
        .get(
          this.BaseUrl +
            this.loginApi["captcha"] +
            "?uuid=" +
            this.dataForm.uuid,
          { responseType: "blob" }
        )
        .then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], { type: "image/jpeg" });
            this.captchaPath = window.URL.createObjectURL(blob);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scope>
.main-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("assets/login_cover.png");
  .login-card {
    height: 500px;
    width: 500px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .login-main {
    width: 350px;
    margin: auto;
  }
  .login-title {
    height: 110px;
    padding: 10px;
  }
  .login-swicth {
    margin-bottom: 20px;
  }
  .login-btn-submit {
    margin-top: 20px;
    width: 100%;
    font-size: 20px;
  }
  .bg {
    animation: slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
    bottom: 0;
    left: -50%;
    opacity: 0.5;
    position: fixed;
    right: -50%;
    top: 0;
    z-index: -1;
  }

  .bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  .bg3 {
    animation-duration: 5s;
  }

  .content {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.25em;
    box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    left: 50%;
    padding: 10vmin;
    position: fixed;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    font-family: monospace;
  }

  @keyframes slide {
    0% {
      transform: translateX(-25%);
    }
    100% {
      transform: translateX(25%);
    }
  }
}

.sign-up-text {
  color: #999;
  cursor: pointer;
}
.sign-up-text:hover {
  color: #333;
}
</style>
