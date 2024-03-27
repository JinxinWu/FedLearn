<template>
  <el-popover
    placement="right"
    width="160"
    trigger="click"
    :title="name"
    style="position: relative"
  >
    <p>{{ content }}</p>
    <div
      v-for="option in options"
      :class="option.value === value ? 'opts-click' : 'opts'"
      @click="chooseOpt(option.value)"
      :key="option.value"
    >
      {{ option.label }}
    </div>
    <div
      v-if="step === 2"
      class="hf-button-2"
      slot="reference"
      @mousedown="startDrag"
      ref="draggable"
      draggable="true"
    >
      {{ this.name }}
    </div>
    <div
      v-else
      class="hf-button-3"
      slot="reference"
      @mousedown="startDrag"
      ref="draggable"
      draggable="true"
    >
      {{ this.name }}
    </div>
  </el-popover>
</template>

<script>
import { Autocomplete } from "element-ui";
export default {
  data() {
    return {
      step: this.comData.step,
      id: this.comData.id,
      name: this.comData.name,
      type: this.comData.type,
      content: this.comData.content,
      options: this.comData.options,
      width: 120,
      height: 25,
      value: 0, // 传递option的value
    };
  },
  props: ["comData"],
  methods: {
    //将信息传给父组件
    startDrag(event) {
      // 当鼠标按下时触发拖拽操作
      const draggableElement = this.$refs.draggable;

      // 将拖拽数据传递给jsPlumb以创建连接
      const dragData = {
        element: draggableElement,
        step: this.step,
        id: this.id,
        name: this.name,
        type: this.type,
        height: this.height,
        width: this.width,
        value: this.value,
        color: "#409EFF",
      };
      // 开始拖拽
      this.$emit("start-drag", dragData);
    },
    // 选择option，传递value
    chooseOpt(value) {
      this.value = value;
    },
  },
  created() {},
};
</script>
  
<style lang='less' scoped>
// popover的title内文字居中
.el-popover__title {
  text-align: center;
}
// 小组件div的样式
.hf-button-2 {
  cursor: pointer; // 小手图标
  background-color: #409eff;
  font-size: 14px;
  color: black;
  border: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 220px;
}

@height: 25px;
.hf-button-3 {
  margin: 2.5px 5px;
  // 圆角
  // border-radius:6px;
  // 小手形状
  cursor: pointer;
  background-color: #409eff;
  font-size: 14px;
  color: black;
  border: none;
  width: 120px;
  // height与line-height相同时文字居中
  height: @height;
  line-height: @height;
  // 行内块
  display: inline-block;
}
// popover出来内容的样式
.opts {
  cursor: pointer;
  background-color: #a1cdf3;
  font-size: 14px;
  color: black;
  border: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: auto;
}
// hover时的样式
.opts:hover {
  background-color: #458ecd;
}
// 被点击后的样式
.opts-click {
  cursor: pointer;
  background-color: #458ecd;
  font-size: 14px;
  color: black;
  border: none;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: auto;
}
</style>