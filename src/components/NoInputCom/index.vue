<template>
  <el-popover
    placement="top"
    :title=name
    width="200"
    trigger="hover"
    :content=content
    style="position: relative;"
    :open-delay="500"
  >
    <div v-if="step !== 7 " class="hf-button" slot="reference" style="width: 120px;" @mousedown="startDrag" ref="draggable" draggable="true">{{ this.name }}</div>
    <div v-else class="hf-button" slot="reference" style="width: 100px;" @mousedown="startDrag" ref="draggable" draggable="true">{{ this.name }}</div>
  </el-popover>
</template>
  
<script>
import { Autocomplete } from "element-ui";
export default {
  name: "NoInputCom",
  data() {
    return {
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
        color: "#f2f5fa",
      };
      // 开始拖拽
      this.$emit('start-drag', dragData);
    },
  },
  props: ['comData'],

};
</script>
  
<style lang='less' scoped>
@height: 25px;
.hf-button {
  margin: 2.5px 5px;
  // 圆角
  border-radius:6px;
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
</style>