<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <p class="title">模型应用中心</p>
      <el-divider></el-divider>
      <!-- 应用 -->
      <el-row
        type="flex"
        class="row-bg"
        justify="center"
        v-for="(o, index) in Math.ceil(models.length / 3)"
        :key="index.modelId"
      >
        <el-col
          :span="5"
          v-for="(model, index) in index == Math.ceil(models.length / 3) - 1
            ? models.slice(index * 3)
            : models.slice(index * 3, index * 3 + 3)"
          :key="index"
          :offset="index > 0 ? 1 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img :src="model.coverUrl" class="image" />
            <div style="padding: 14px">
              <span style="font-size: 18px">{{ model.name }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="showdialog(model)"
                  >立即体验</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog
        title="应用体验"
        :visible.sync="dialogVisible"
        :append-to-body="true"
      >
        <div style="font-size: 18px; margin-bottom: 10px">
          <p>{{ this.reactModel.modelInform }}</p>
        </div>
        <el-upload class="upload-demo" drag :http-request="uploadFile" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传后请耐心等待</div>
        </el-upload>
        <div
          v-show="resultShow"
          style="font-size: 18px; margin-top: 20px; margin-bottom: 10px"
        >
          <p>请下载结果文件</p>
        </div>
        <a v-show="resultShow" :href="resultUrl"
          ><el-button type="primary" icon="el-icon-download"
            >结果文件</el-button
          ></a
        >
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/Header/index.vue";
import axios from "axios";

export default {
  components: {
    Header,
  },
  data() {
    return {
      dialogVisible: false,
      resultShow: false,
      resultUrl: "",
      models: [
        {
          name: "应用名称",
          url: "应用网图地址",
          modelId: "应用id",
          modelInform: "应用说明",
        },
        {
          name: "iajdiajid",
          url: "oijadiajdoai",
          modelId: "ahdiaihd",
          modelInform: "应用说明2",
        },
        {
          name: "iajdiajid",
          url: "oijadiajdoai",
          modelId: "ahdiaihd",
          modelInform: "应用说明3",
        },
        {
          name: "iajdiajid",
          url: "oijadiajdoai",
          modelId: "ahdiaihd",
          modelInform: "应用说明4",
        },
        {
          name: "iajdiajid",
          url: "oijadiajdoai",
          modelId: "ahdiaihd",
          modelInform: "应用说明5",
        },
      ],
      reactModel: "",
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "/guo/test/getModel",
      headers: this.headers,
      timeout: 30000,
    }).then((res) => {
      this.models = res.data.models;
    });
  },
  methods: {
    uploadFile(item) {
      console.log("文件上传中........");
      const suffix = item.file.name.slice(
        ((item.file.name.lastIndexOf(".") - 1) >>> 0) + 1
      );
      //文件类型转化
      const type = 0;
      if (suffix == ".csv") {
        type = 1;
      } else if (suffix == ".xlsx") {
        type = 2;
      } else if (suffix == ".db") {
        type = 3;
      } else {
        type = 4;
      }
      console.log(type);

      if (!this.isValidFile(item.file)) {
        this.$message.warning(`文件格式不符合要求！`);
      } else {
        //上传文件的需要formdata类型;所以要转
        let FormDatas = new FormData();
        FormDatas.append("file", item.file);
        axios({
          method: "post",
          url: "/guo/test/upload?user_id=" + this.user_id,
          headers: this.headers,
          timeout: 30000,
          data: FormDatas,
        }).then((res) => {
          const result = res.data;
          if (result.msg.includes("文件上传成功")) {
            this.$message.success("文件上传成功");
            //将后端传来的数据存储
            this.trainId = result.trainId;
            this.data_url = result.url;
            axios({
              method: "get",
              url: `/guo/test/upload?url=${this.data_url}&type=${type}`,
              headers: this.headers,
            }).then((res) => {
              const reply = res.data.reply;
            });
          } else {
            this.$message.warning(`文件上传失败，请重新上传`);
          }
        });
      }
    },
    showdialog(model) {
      console.log(model);
      this.reactModel = model;
      this.dialogVisible = true;
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.title {
  margin-top: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 2em;
  text-align: center;
}

.el-card {
  transition: all 0.5s;
}

.el-card:hover {
  margin-top: -5px;
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
  // height: calc(100vh - 170px); // 设置主体 main 高度
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
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  // background-color: #f9fafc;
}

// Card
.time {
  font-size: 13px;
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
  width: 293px;
  height: 147px;
  display: block;
  object-fit: contain;
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