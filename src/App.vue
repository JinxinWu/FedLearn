<template>

<el-row  style="height: 100%;">
    <el-col v-if="menu" :span="3" style="height: 100%">
      <headerDemo></headerDemo> </el-col
  >
  <el-col :span="viewSpan" style="height: 100%" >
    <router-view>

    </router-view>
  </el-col>

</el-row>
  
</template>

<script>
import headerDemo from "@/components/headerDemo";

export default {
  name: "App",
  components: {
    headerDemo,
  },
  data() {
    return {
      menu:true,
      viewSpan:21,
    }
  },
  methods: {
    urlCheck(){
      if (this.$route.path.includes("login")|| this.$route.path.includes("/test")) {
      this.menu=false;
      this.viewSpan=24;
    }else{
      this.menu=true;
      this.viewSpan=21;
    }
    }
  },
  mounted() {
    this.urlCheck();
  },
  updated(){
    this.urlCheck();
  }
};
</script>

<style lang="less">
html{
  height: 100%;
}
@import "@/assets/css/client.less";
</style>
