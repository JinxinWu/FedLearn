<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header2></Header2>
    </el-header>
    <el-main
      ><div class="message-box" style="min-height: 653.28px; margin: auto">
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
                :data="data"
              >
                <span slot-scope="{ option }"
                  >{{ option.key }} - {{ option.label }}</span
                >
              </el-transfer>
            </div>
          </el-col>
        </el-row>
        <el-row class="menu" style="margin-top: 20px">
          <el-col :span="4" style="line-height: 25px"
            ><div class="rowDiv">相关技术</div></el-col
          >
          <el-col :span="8">
            <div
              style="
                margin: 5px auto 5px auto;
                border: 1px dashed #4874cb;
                width: 80%;
              "
            >
              <div>差分隐私</div>
              <div style="margin-top: 5px">
                <MyButton
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></MyButton>
              </div>
              <div style="margin-bottom: 5px">
                <MyButton
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
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
              "
            >
              <div>同态加密</div>
              <div style="margin-top: 5px">
                <MyButton
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></MyButton>
              </div>
              <div style="margin-bottom: 5px">
                <MyButton
                  v-for="item in [csvImport]"
                  :comData="item"
                  :key="item.id"
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
              "
            >
              <div>压缩方法</div>
              <div style="margin-top: 5px; margin-bottom: 5px">
                <MyButton
                  v-for="item in [csvImport, csvImport]"
                  :comData="item"
                  :key="item.id"
                ></MyButton>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col
            ><el-button type="primary" round>发送同步信息</el-button></el-col
          >
        </el-row>
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
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [1],
      csvImport: {
        step: 1,
        id: 1,
        name: "xxx方法",
        type: "null",
        content: "拖入即可导入csv文件",
      },
    };
  },
  activated() {},
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
  },
  mounted() {},
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

// Container
.el-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background: url("https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/pangu-gallery/assets/personal_center_bg.png")
    rgb(247, 247, 247);
  color: #333;
  text-align: center;
  line-height: auto;
  padding-top: 10px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
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