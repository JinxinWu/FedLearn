<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header2></Header2>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="message-box" style="min-height: 653.28px">
            <p class="title">客户端管理</p>
            
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
    
<script>
import Header2 from "@/components/Header2";
import Messages from "@/components/Messages";
import axios from "axios";

export default {
  components: {
    Header2,
    Messages,
  },
  data() {
    return {
      
    };
  },
  activated() {},
  methods: {
    
  },
  mounted() {
    
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

.el-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0;
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
</style>