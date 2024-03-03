<template>
  <div style="display: inline-block; margin: 10px">
    <div>
      <svg
        t="1709394524808"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7665"
        width="80"
        height="80"
      >
        <path
          d="M432.786 745.119l-18.294-30.725h-96.024l-18.284 30.725-18.273 30.801h169.163z"
          fill="#384244"
          p-id="7666"
        ></path>
        <path
          d="M69.436 309.795h594.108v417.173H69.436zM563.146 801.395H169.824l17.293-25.475h358.746z"
          fill="#384244"
          p-id="7667"
        ></path>
        <path
          d="M97.994 337.816h536.987v361.063H97.994z"
          fill="#FFFFFF"
          p-id="7668"
        ></path>
        <path
          d="M709.114 244.5H979.27v553.222H709.114z"
          fill="#384244"
          p-id="7669"
        ></path>
        <path
          d="M733.242 309.795h221.885v47.074H733.242zM733.242 494.723h221.885v33.991H733.242zM733.242 550.918h221.885v33.99H733.242z"
          fill="#696F70"
          p-id="7670"
        ></path>
        <path
          d="M878.814 725.476h-69.249v-69.253h69.249v69.253z m-60.61-8.643h51.962v-51.957h-51.962v51.957z"
          fill="#20A5D5"
          p-id="7671"
        ></path>
        <path
          d="M825.268 671.92h37.858v37.865h-37.858z"
          fill="#FFFFFF"
          p-id="7672"
        ></path>
        <path
          d="M915.496 321.582h23.476v23.499h-23.476z"
          fill="#20A5D5"
          p-id="7673"
        ></path>
      </svg>
    </div>
    <el-tag
      closable
      :disable-transitions="false"
      @close="handleClose()"
    >
      {{ dynamicTag }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "Computer",
  props: ["dynamicTag"],
  data() {
    return {

    };
  },
  methods: {
    handleClose() {
      this.$emit('deleteTag', this.dynamicTag);
    },
  },
};
</script>

<style>
</style>