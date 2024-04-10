<template>
  <el-container v-if="ifServer || ifClient">
    <el-header>
      <ServerHeader v-if="ifServer"></ServerHeader>
      <ClientHeader v-else-if="ifClient"></ClientHeader>
    </el-header>
    <el-main>
      <router-view> </router-view>
    </el-main>
  </el-container>
  <router-view v-else> </router-view>
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
      ifServer: true,
      ifClient: true,
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
        this.ifServer = false;
        this.ifClient = false;
      } else if (this.$route.path.includes("/server")) {
        this.ifServer = true;
        this.ifClient = false;
      } else {
        this.ifServer = false;
        this.ifClient = true;
      }
    },
  },
  mounted() {
    this.urlCheck();
  },
  updated() {
    this.urlCheck();
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        console.log(to, from);
        if (to.path.includes("client")) {
          import("@/assets/css/client.less");
          this.$forceUpdate();
        } else if (to.path.includes("server")) {
          import("@/assets/css/server.less");
          this.$forceUpdate();
        }
      }
    },
  },
  created() {
    if (this.$route.path.includes("client")) {
      import("@/assets/css/client.less");
    } else if (this.$route.path.includes("server")) {
      import("@/assets/css/server.less");
    }
  },
};
</script>

<style lang="less">
// Container
.el-header {
  line-height: 60px;
  padding: 0 !important;
}

.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: auto;
  padding-top: 10px;
}

body > .el-container {
  margin-bottom: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
