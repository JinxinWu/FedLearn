<template>
  <div>
    <p class="title">模型应用</p>
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
          <img :src="model.coverUrl" class="image" style="margin: 5px auto auto auto;"/>
          <div style="padding: 10px">
            <span style="font-size: 18px">{{ model.name }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="showdialog(model)"
                >立即上传</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 结果显示 -->
    <el-row v-show="getfile">
      <el-col :span="13" :offset="6" v-show="messageShow">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="accuracy" label="精确率" width="150">
          </el-table-column>
          <el-table-column prop="precision" label="准确率" width="150">
          </el-table-column>
          <el-table-column prop="recall" label="召回率" width="150" > </el-table-column>
          <el-table-column prop="specificity" label="特异性" width="150"> </el-table-column>
          <el-table-column prop="sensitivity" label="灵敏度" width="150"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog

      title="应用体验"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="35%"
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
  <Loading :visible="visible" :message="message"></Loading>
    
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading"
export default {
  components: {Loading},
  data() {
    return {
      dialogVisible: false,
      resultShow: false,
      resultUrl: "",
      //显示最终结果
      getfile:false,
      models: [
        {
          name: "请上传测试集文件",
          url: "应用网图地址",
          modelId: "应用id",
          modelInform: "应用说明",
          coverUrl:"https://ai.bdstatic.com/file/8087B9E9A29849CD8821FE0311EDA333",
        },
      ],
      reactModel: "",
      tableData: [
        {
          accuracy: "95%",
          precision: "98%",
          recall: "84.6%",
          specificity: "95.1%",
          sensitivity: "50%",
        },
      ],
      // 先直接显示
      messageShow: true,
      //loading 弹窗等待
      visible:false,
      message:"正在处理,请稍作等待",
    };
  },
  methods: {
    uploadFile(item) {
      console.log("文件上传中........");
      this.dialogVisible=false;
      this.visible = true;
      setTimeout(() => {
      const randomTime = Math.floor(Math.random() * 5000);
      setTimeout(() => {
        this.visible = false;
        this.getfile = true;
      }, randomTime);
    }, 5000);



      // const suffix = item.file.name.slice(
      //   ((item.file.name.lastIndexOf(".") - 1) >>> 0) + 1
      // );
      // //文件类型转化
      // const type = 0;
      // if (suffix == ".csv") {
      //   type = 1;
      // } else if (suffix == ".xlsx") {
      //   type = 2;
      // } else if (suffix == ".db") {
      //   type = 3;
      // } else {
      //   type = 4;
      // }
      // console.log(type);

      // if (!this.isValidFile(item.file)) {
      //   this.$message.warning(`文件格式不符合要求！`);
      // } else {
      //   //上传文件的需要formdata类型;所以要转
      //   let FormDatas = new FormData();
      //   FormDatas.append("file", item.file);
      //   axios({
      //     method: "post",
      //     url: "/guo/test/upload?user_id=" + this.user_id,
      //     headers: this.headers,
      //     timeout: 30000,
      //     data: FormDatas,
      //   }).then((res) => {
      //     const result = res.data;
      //     if (result.msg.includes("文件上传成功")) {
      //       this.$message.success("文件上传成功");
      //       //将后端传来的数据存储
      //       this.trainId = result.trainId;
      //       this.data_url = result.url;
      //       axios({
      //         method: "get",
      //         url: `/guo/test/upload?url=${this.data_url}&type=${type}`,
      //         headers: this.headers,
      //       }).then((res) => {
      //         const reply = res.data.reply;
      //       });
      //     } else {
      //       this.$message.warning(`文件上传失败，请重新上传`);
      //     }
      //   });
      // }
    },
    showdialog(model) {
      console.log(model);
      this.reactModel = model;
      this.dialogVisible = true;
    },
  },

};
</script>

<style lang="less" scoped>
.title {
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