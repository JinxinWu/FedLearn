<template>
  <div>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
        :style="{ backgroundColor: methColor == 1 ? '#409EFF' : '' }"
      >
        <span style="font-size: 18px">{{ methName }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <div class="text item">
        {{ methContent }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MethCard",
  data() {
    return {
      methName: this.myMeth.methName,
      methContent: this.myMeth.methContent,
      methColor: this.myMeth.methColor,
    };
  },
  methods: {},
  props: ["myMeth"],
};
</script>

<style lang="scss" scoped>
// Card
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

// .clearfix {
//   background-color: #409eff;
// }

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

// .box-card {
//   width: 480px;
// }
</style>