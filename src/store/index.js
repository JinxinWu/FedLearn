import Vue from 'vue'
import Vuex from 'vuex'

import myComponents from '../store/myComponents.json'
import securityCom from '../store/securityCom.json'

Vue.use(Vuex)

// 用于相应组件中的动作
const actions = {
    // jia(context, value) {
    //     context.commit('JIA', value)
    // }

    //创建ws连接，并存储在store中
    //使用：this.$store.dispatch("createWebSocket",变量名);
    async createWebSocket({ commit }, websocketUrl) {
        try { // 发送请求获取 WebSocket 连接的 URL
            // 创建 WebSocket 连接并保存到 Vuex 中
            let websocket = state.websocket
            if (websocket != null) {
                closeWebSocket();
            }
            websocket = new WebSocket(websocketUrl);

            //这里放默认的ws事件监听函数
            websocket.onopen = () => {
                commit('setWebSocket', websocket);
                if (this.state.websocketEvents.onopen) {
                    this.state.websocketEvents.onopen();
                }
                // 在连接建立成功后执行其他操作
                // 添加额外逻辑代码
            };
            websocket.onmessage = event => {
                if (this.state.websocketEvents.onmessage) {
                    this.state.websocketEvents.onmessage(event);
                }
            };
            websocket.onclose = () => {
                if (this.state.websocketEvents.onclose) {
                    this.state.websocketEvents.onclose();
                }
                commit('setWebSocket', null);
            };
            websocket.onerror = error => {
                if (this.state.websocketEvents.onerror) {
                    this.state.websocketEvents.onerror(error);
                }
            };
        } catch (error) {
            console.error('Failed to fetch WebSocket URL:', error);
        }
    },

    closeWebSocket({ commit, state }) {
        if (state.websocket) {
            state.websocket.close();
            commit('clearWebSocket');
        }
    },

}

// 用于操作数据
const mutations = {
    // JIA(state, value) {
    //     state.sum += value
    // }

    //设置ws，用于action中的函数调用
    setWebSocket(state, websocket) {
        state.websocket = websocket;
    },

    //更改ws事件函数
    setWebSocketEvent(state, { event, handler }) {
        state.websocketEvents[event] = handler;
    },
    // 使用案例 在页面中：
    // mouted() {
    //     this.$store.commit('setWebSocketEvent', {
    //         event: 'onmessage',
    //         handler: event => {
    //             console.log('Received message:', event.data);
    //         }
    //     });
    // }


    //在结束页面的时候可以清理本页面设置的事件监听
    clearWebSocketEvent(state, event) {
        state.websocketEvents[event] = null;
    },
    //使用案例 在页面
    //beforedestroyed(){
    //     this.$store.commit('clearWebSocketEvent', 'onmessage');
    // }


    setUserId(state, userId) {
        state.userId = userId;
    },
    setIp(state, Ip) {
        state.Ip = Ip;
    },
    setShow(state, show) {
        state.show = show;
    },
    setRuleForm(state, ruleForm) {
        state.ruleForm = ruleForm;
    },
    setFormDisabled(state, formDisabled) {
        state.formDisabled = formDisabled;
    },
    setAgreeLoading(state, agreeLoading) {
        state.agreeLoading = agreeLoading;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setMessageShow(state, messageShow) {
        state.messageShow = messageShow;
    },
    setAgreeShow(state, agreeShow) {
        state.agreeShow = agreeShow;
    },
    setTableData(state, tableData) {
        state.tableData[0] = tableData;
    },
}

// 用于存储数据
const state = {
    // sum: 0,
    myComponents,
    securityCom,

    //websocket连接
    websocket: null,
    websocketEvents: {
        onmessage: null,
        onopen: null,
        onclose: null,
        onerror: null
    },

    userId: null,
    ip:null,
    show: true,
    ruleForm: {
        ip: "192.168.43.34:8000",
        name: "",
        department: "",
    },
    tableData: [{
            algori: "CNN",
            compress: "xx算法",
            chafen: "xxx",
            epochs: 2000,
            jiami: "xxxxx"
    }],
    formDisabled: false,
    agreeLoading: true,
    loading: true,
    messageShow: false,
    agreeShow: false,
    
}

//包装state，解耦
const getters = {
    //其他页面获取websocket连接
    websocket(state) {
        return state.websocket;
    }
    //案例 页面js部分
    // computed: {
    //     websocket() {
    //       return this.$store.getters.websocket;
    //     }
    //   },
    //   mounted() {
    //     if (this.websocket) {
    //       console.log('WebSocket connection:', this.websocket);
    //     }
    //   }
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters,

})

export default store