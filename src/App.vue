<template>
  <div v-if="ifServer" style="height: 100%;">
    <el-row style="height: 100%">
      <el-col :span="3" style="height: 100%;position: fixed;">
        <ServerHeader :style="{ height: windowHeight+ 'px' }" ></ServerHeader>
      </el-col>
      <el-col :span="21" :push="3" style="height: 100%">
        <router-view> </router-view>
      </el-col>
    </el-row>
  </div>
  <div v-else style="height: 100%;">
    <ClientHeader v-if="ifClient"></ClientHeader>
    <router-view style="height: 100%;"> </router-view>
  </div>
</template>

<script>
import ServerHeader from "@/components/ServerHeader";
import ClientHeader from "@/components/ClientHeader";

export default {
  name: "App",
  components: {
    ServerHeader,
    ClientHeader,
  },
  data() {
    return {
      ifServer:true,
      ifClient:true,
      windowHeight: document.documentElement.clientHeight, 
    };
  },
  methods: {
    urlCheck() {
      if (
        this.$route.path.includes("login") ||
        this.$route.path.includes("/Test") ||
        this.$route.path.includes("/test")
      ) {
        this.ifServer=false;
        this.ifClient=false;
      }else if(this.$route.path.includes("/server")) {
        this.ifServer=true;
        this.ifClient=false;
      }else {
        this.ifServer=false;
        this.ifClient=true;
      }
    },
  },
  mounted() {
    this.urlCheck();
  },
  updated() {
    this.urlCheck();
  },
};
</script>

<style lang="less">
//强制高度与上级一致
html {
  height: 100% !important;
}
body {
  height: 100% !important;
}
.el-main {
  height: 100% !important;
}
.el-container {
  height: 100% !important;
}
@import "@/assets/css/client.less";
</style>
