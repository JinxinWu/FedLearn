<template>
  <div>
    <div class="message-box" style="min-height: 653.28px; margin: auto">
      <el-row>
        <el-col :span="18" :offset="3">
          <p class="title">联邦同步</p>
          <div style="text-align: center">
            <el-transfer
              style="text-align: left; display: inline-block"
              v-model="value"
              filterable
              :left-default-checked="[]"
              :right-default-checked="[]"
              :titles="['可选客户端', '已选客户端']"
              :button-texts="['删除所选', '添加所选']"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}',
              }"
              @change="handleChange"
              :data="options"
            >
              <span slot-scope="{ option }"
                >{{ option.clientName }} - {{ option.department }} - {{ option.label }}</span
              >
            </el-transfer>
          </div>
        </el-col>
      </el-row>
      <el-row class="menu" style="margin-top: 20px">
        <el-col :span="8">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
              font-size: 14px;
            "
          >
            <div>差分隐私</div>
            <div style="margin-top: 5px">
              <MyButton
                v-for="item in [securityCom.csvImport, securityCom.ExcelImport]"
                :comData="item"
                :key="item.id"
                ref="myButton"
                @click.native="changeColor(item.id, item.step)"
              ></MyButton>
            </div>
            <div style="margin-bottom: 5px">
              <MyButton
                v-for="item in [
                  securityCom.DBImport,
                  securityCom.unstructuredImport,
                ]"
                :comData="item"
                :key="item.id"
                ref="myButton"
                @click.native="changeColor(item.id, item.step)"
              ></MyButton>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
              font-size: 14px;
            "
          >
            <div>同态加密</div>
            <div style="margin-top: 5px">
              <MyButton
                v-for="item in [securityCom.delMisCol, securityCom.zeroCom]"
                :comData="item"
                :key="item.id"
                ref="myButton"
                @click.native="changeColor(item.id, item.step)"
              ></MyButton>
            </div>
            <div style="margin-bottom: 5px">
              <MyButton
                v-for="item in [securityCom.meanCom]"
                :comData="item"
                :key="item.id"
                ref="myButton"
                @click.native="changeColor(item.id, item.step)"
              ></MyButton>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
              font-size: 14px;
            "
          >
            <div>压缩方法</div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <MyButton
                v-for="item in [securityCom.delError, securityCom.bcTrans]"
                :comData="item"
                :key="item.id"
                ref="myButton"
                @click.native="changeColor(item.id, item.step)"
              ></MyButton>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              margin: 5px auto 5px auto;
              border: 1px dashed #4874cb;
              width: 80%;
              font-size: 14px;
            "
          >
            <div>聚合方法</div>
            <div style="margin-top: 5px; margin-bottom: 5px">
              <MyButton
                v-for="item in [securityCom.Model_Parameter_Averaging, securityCom.Gradient_Averaging,securityCom.Election_based_Aggregation,securityCom.Hierarchical_Aggregation]"
                :comData="item"
                :key="item.id"
                ref="myButton"
                @click.native="changeColor(item.id, item.step)"
              ></MyButton>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <span style="font-size: 14px; margin-right: 10px;">聚合轮次</span>
        
        <el-input v-model="num" style="width: 100px;height: 30px !important;"></el-input>
        
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col
          ><el-button type="primary" round @click="sendMessage()"
            >发送同步信息</el-button
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>
    
<script>
import Messages from "@/components/Messages";
import MyButton from "@/components/MyButton";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {
    Messages,
    MyButton,
  },
  data() {
    // 这里的待选数据要通过axios请求获取，应该是一个数组里面包含json
    // const generateData = (_) => {
    //   const data = [];
    //   for (let i = 1; i <= 15; i++) {
    //     data.push({
    //       key: i,
    //       label: `备选项 ${i}`,
    //     });
    //   }
    //   return data;
    // };
    return {
      options:[],  // key设计为userId, clientName设计为客户名，department设计为部门，label设计为IP
      value: [],
      securityCom: this.$store.state.securityCom,
      token: null,
      num:null,
      userId:null
    };
  },
  activated() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {  // 获取服务端的userId以及获取所有同意后的客户端信息
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
          axios({  // 从connection表中获取所有的已连接的clientId以及客户的一些信息
            method: "get",
            url: `http://localhost:7000/connect/getClient/${this.userId}`,
            headers: {
              token: this.token,
            },
          }).then((res) => {
            this.options = res.data.data,
            console.log(this.options)
          })
        });
      }
    },
    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys);
    },
    changeColor(id, step) {
      this.$refs.myButton.forEach((item) => {
        if (item.step === step && item.id === id) {
          item.isChange = !item.isChange;
        } else if (item.step === step) {
          item.isChange = false;
        }
      });
    },
    sendMessage() {
      // 获取所有isChange为true的按钮
      const arr = this.$refs.myButton.filter((item) => item.isChange);
      console.log(arr, this.value);
      if (this.value.length === 0) {
        this.$message({
          message: "请选择客户端",
          type: "warning",
        });
        return;
      } else if (arr.length === 0) {
        this.$message({
          message: "请选择相关技术",
          type: "warning",
        });
        return;
      } else {
        // 这里发送axios请求
        var methodsArray = []; // 用于存储收集到的methods的 id 属性值的数组
        for (var i = 0; i < arr.length; i++) {
          methodsArray.push(arr[i].id);
        }
        var methodsId = methodsArray.join(','); // 使用 join() 方法将数组元素连接成一个用逗号隔开的字符串
        console.log(methodsId)
        var clientIdsArray = this.value.join(',')
        console.log(clientIdsArray)
        axios({  // 这里将同步方法和发送给的client保存到一张表里
          method: 'post',
          url: "http://localhost:8000/async/addAsync",
          data: {
            severId: this.userId,
            clientIds: clientIdsArray,
            methods: methodsId,
            epochs: this.num
          },
          headers: {
            token: this.token
          }
        }).then((res) => {
          axios({
            method: "post",
            url: "http://localhost:8000/Server/pushToGroup",
            data: {
              toUserIds: this.value,
              message: `2,服务端同步信息已发送;${methodsId},${this.num}`
            },
            headers: {
              token: this.token
            }
          }).then((res) => {
            this.$message({
              message: "服务端同步信息发送成功",
              type: "success",
            });
          })
        })
      }
    },
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

/* 穿梭框外框高宽度 */
/deep/ .el-transfer-panel {
  width: 300px;
  height: 375px;
}
/* 穿梭框内部展示列表的高宽度 */
// /deep/ .el-transfer-panel__list {
//   height: 375px;
// }

//表格最左边的div
.rowDiv {
  background-color: #2468f1;
  width: 100px;
  height: 25px;
  margin: 10px auto;
  color: white;
  border-radius: 5px;
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
}

// Layout
.el-main .menu {
  width: 80%;
  margin: 0px auto;
  border: 1px dashed #4874cb;
  display: flex;
  align-items: center; /* 垂直居中 */
  font-size: 13px;
}

// el-row
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>