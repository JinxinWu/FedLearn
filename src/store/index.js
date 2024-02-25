import Vue from 'vue'
import Vuex from 'vuex'

import myComponents from '../store/myComponents.json'
import securityCom from '../store/securityCom.json'

Vue.use(Vuex)

// 用于相应组件中的动作
const actions = {
    // jia(context, value) {
    //     context.commit('JIA', value)
    // }
}

// 用于操作数据
const mutations = {
    // JIA(state, value) {
    //     state.sum += value
    // }
}

// 用于存储数据
const state = {
    // sum: 0,
    myComponents,
    securityCom,
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
})

export default store