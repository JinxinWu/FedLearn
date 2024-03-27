<template>
  <div>
    <div>
      <h1
        class="text-center m-b-lg"
      >
        建模知多少
      </h1>
    </div>
    <el-divider></el-divider>

    <!-- :style="{ 'background-color': idx % 2 === 0 ? '' : '#ececf1' }" -->
    <el-row
      v-for="(item, idx) in chatMessages"
      style="padding-top: 15px; padding-bottom: 15px"
      :key="item.id"
    >
      <el-col :span="1" :offset="7"
        ><div class="size-icon">
          <img
            v-if="item.role === 'assistant'"
            src="https://nlp-eb.cdn.bcebos.com/static/eb/asset/robin.e9dc83e5.png"
            alt="头像"
          />
          <i v-else class="el-icon-user-solid"></i></div
      ></el-col>
      <el-col :span="8"
        ><div>
          <p class="chat">
            {{ item.content }}
          </p>
        </div></el-col
      >
    </el-row>
    <div class="input-group ipt" style="width: 650px">
      <div class="col-xs-12" style="width: 95%">
        <textarea
          placeholder="Send a message"
          id="chatInput"
          class="form-control"
          rows="1"
          v-model="textareaData"
          @keyup.enter="sendMessage"
        ></textarea>
      </div>
      <button
        id="chatBtn"
        type="button"
        :disabled="textareaData.length === 0"
        @click="sendMessage"
        :style="{ 'background-color': buttonColor }"
      >
        <svg
          t="1690170211730"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2290"
          width="16"
          height="16"
        >
          <path
            d="M0 1024l106.496-474.112 588.8-36.864-588.8-39.936L0 0l1024 512z"
            :fill="fill"
            p-id="2291"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/ClientHeader/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies"

export default {
  components: {
    Header,
  },
  data() {
    return {
      token: null,
      fill: "#cdcdcd",
      buttonColor: "",
      textareaData: "",
      chatMessages: [
        {
          id: 1,
          role: "assistant",
          content: "你好，很高兴和你交流。有什么我可以帮助你的吗？",
        },
      ],
      id: 1,
    };
  },
  mounted() {
    // 从cookie中获取id
    this.token = VueCookies.get("token");
  },
  methods: {
    sendMessage() {
      console.log(this.textareaData.length);
      const textWithoutEnter = this.textareaData.replace(/\n/g, "");
      if (textWithoutEnter.length > 0) {
        const message = textWithoutEnter;
        this.chatMessages.push({
          id: this.id + 1,
          role: "user",
          content: message,
        });
        this.id = this.id + 1;
        this.textareaData = "";
        axios
          .post("http://localhost:9000/chat/message", {
            message: message,
          },
          {
            headers: {
              token: this.token,
            }
          })
          .then((response) => {
            console.log(response.data);
            this.chatMessages.push({
              id: this.id + 1,
              role: "assistant",
              content: response.data.reply,
            });
            this.id = this.id + 1;
          })
          .catch((error) => {
            this.chatMessages.push({
              id: this.id + 1,
              role: "assistant",
              content: "好的",
            });
            this.id = this.id + 1;
          });
      } else {
        console.log("error");
      }
    },
  },
  watch: {
    textareaData() {
      if (this.textareaData.length > 0) {
        this.buttonColor = "#409eff";
        this.fill = "#ffffff";
      } else {
        this.buttonColor = "";
        this.fill = "#cdcdcd";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "assets/bootstrap.min.css";
//
.chat {
  font-size: 1rem;
}

* {
  word-spacing: 0.5px;
  // line-height: 20px;
  font-family: "Microsoft Yahei";
}

.answer {
  width: 100%;
  position: relative;
  height: 70vh;
}

.ipt {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 40px;
  margin: auto;
  padding-right: 15px;
  border-radius: 15px;
  width: calc(100% - 30px);
  height: 50px;
  border: 1px solid #e7eaec;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  left: 0;
  right: 0;
  background: white;
}

.ipt textarea {
  resize: none;
  overflow-y: auto;
  border: none;
  box-shadow: none;
  font-size: 14px;
  text-indent: 8px;
  overflow: hidden;
}

.ipt textarea:focus {
  border: none !important;
  box-shadow: none !important;
}

button {
  border-style: none;
  background-color: #ffffff;
  width: 31px;
  height: 31px;
  border-radius: 5px;
}

// .icon {
//   margin-bottom: 31px;
// }

.size-icon {
  width: 26px;
  height: 26px;
  font-size: 25px;
  color: #409eff;
  text-align: center;
  line-height: 25px;
}

img {
  width: 100%;
  height: 100%;
}

#input {
  width: 768px;
  margin: auto;
  max-height: 200px;
  overflow-y: hidden;
}
</style>
