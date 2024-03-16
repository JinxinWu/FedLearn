<template>
  <div>
    <el-dialog
      :title=this.message
      :visible.sync="openCardDialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :modal-append-to-body="false"
    >
        <div class="folding">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div></div
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "请耐心等待",
    },
  },

  computed: {
    openCardDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        console.log(val);
        this.$emit("update:visible", val); // openCardDialog改变的时候通知父组件
      },
    },
  },
};
</script>
<style scoped>
.folding {
  margin-left: auto;
  margin-right: auto;
  width: 20px;
  height: 20px;
  position: relative;
  transform: rotateZ(45deg);
}

.folding .sk-cube {
float: left;
  width: 8px;
  height: 8px;
  position: relative;
  transform: scale(1.1);
  margin-right: 2px; /* 添加了右侧的间隔 */
  margin-top:2px;
}

.folding .sk-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  transform-origin: 100% 100%;
}

.folding .sk-cube2 {
  transform: scale(1.1) rotateZ(90deg);
}

.folding .sk-cube3 {
  transform: scale(1.1) rotateZ(180deg);
}

.folding .sk-cube4 {
  transform: scale(1.1) rotateZ(270deg);
}

.folding .sk-cube2:before {
  animation-delay: 0.3s;
}

.folding .sk-cube3:before {
  animation-delay: 0.6s;
}

.folding .sk-cube4:before {
  animation-delay: 0.9s;
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>