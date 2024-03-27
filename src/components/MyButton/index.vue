<template>
  <el-popover
    placement="top"
    :title="name"
    width="200"
    trigger="hover"
    :content="content"
    style="position: relative"
    :open-delay="500"
  >
    <div
      :class="{ myButton: !isChange, myChange: isChange }"
      slot="reference"
      style="width: 120px"
      ref="myButton"
    >
      {{ this.name }}
    </div>
  </el-popover>
</template>
  
<script>
export default {
  name: "NoInputCom",
  data() {
    return {
      isChange: this.comData.isChange,
      step: this.comData.step,
      id: this.comData.id,
      name: this.comData.name,
      type: this.comData.type,
      content: this.comData.content,
      width: 100,
      height: 25,
      data: "",
    };
  },
  methods: {
  },
  props: ["comData"],
};
</script>
  
<style lang='less' scoped>
@height: 25px;
.myButton {
  margin: 2.5px auto;
  // 圆角
  border-radius: 6px;
  // 小手形状
  cursor: pointer;
  background-color: #f2f5fa;
  font-size: 14px;
  color: black;
  border: none;
  // height与line-height相同时文字居中
  height: @height;
  line-height: @height;
  // 行内块
  display: inline-block;
}

.myChange {
  margin: 2.5px 5px;
  // 圆角
  border-radius: 6px;
  // 小手形状
  cursor: pointer;
  background-color: #2468f1;
  font-size: 14px;
  color: black;
  border: none;
  // height与line-height相同时文字居中
  height: @height;
  line-height: @height;
  // 行内块
  display: inline-block;
}
</style>