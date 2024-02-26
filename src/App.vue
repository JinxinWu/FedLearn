<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
  //   if (this.$route.path.includes("client")) {
  //     console.log("client");
  //     import("@/assets/css/client.less");
  //   } else if (this.$route.path.includes("server")) {
  //     console.log("server");
  //     import("@/assets/css/server.less");
  //   }
  },
};
</script>

<style lang="less">
@import "@/assets/css/client.less";
</style>
