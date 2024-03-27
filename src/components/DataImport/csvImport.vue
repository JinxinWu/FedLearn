<template>
  <div>{{ this.name }}</div>
</template>
  
  <script>
import { Autocomplete } from "element-ui";
export default {
  data() {
    return {
      step: 0,
      id: 1,
      name: "csv文件",
      type: "csvImport",
      width: 100,
      height: 60,
      x: 0,
      y: 0,
      data: "",
    };
  },
  methods: {
    //将信息传给父组件
    sendMyData() {
      const myDate = {
        step: this.step,
        id: this.id,
        name: this.name,
        type: this.type,
        x: this.x,
        y: this.y,
        height: this.height,
        width: this.width,
      };
      this.$emit("customEvent", myDate);
    },
  },
  created() {
    this.sendMyData();
  },
};
</script>
 
  <style scoped>
div {
  background-color: #d6edf7;
  font-size: 14px;
  color: black;
  border: none;
  height:25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: auto;
}
.el-button:hover {
  background-color: #d6edf7;
  font-size: 14px;
  color: black;
  border: none;
  height:25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}

</style>