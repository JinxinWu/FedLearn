<template>

  <el-row style="height: 100%;">
    <el-col :span="3" style="height: 100%">
      <clientHeader style="height: 100%"></clientHeader> </el-col
  >


</el-row>

</template>

<script>
import clientHeader from "@/components/headerDemo";

export default {
  components: {
    clientHeader,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang='less' scoped>
html {
  height: 100%;
}
</style>