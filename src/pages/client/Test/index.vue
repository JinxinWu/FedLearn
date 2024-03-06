<template>
  <el-row style="height: 100%;">
    <el-col :span="4" style="height: 100%">
      <ServerHeader :style="{ height: windowHeight+ 'px' }"></ServerHeader> </el-col
  ></el-row>
<!-- <ClientHeader></ClientHeader> -->



</template>

<script>
import ServerHeader from "@/components/ServerHeader";
import ClientHeader from "@/components/ClientHeader";


export default {
  components: {
    ServerHeader,
    ClientHeader,
  },
  data() {
    return {
      windowHeight: document.documentElement.clientHeight, 
    };
  },
  methods: {
    setHeight(){

    }
  },
  mounted() {

  },
};
</script>

<style lang='less' scoped>
html {
  height: 100%;
}
</style>