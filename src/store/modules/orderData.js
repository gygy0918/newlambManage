import { asyncRouterMap, constantRouterMap } from 'src/router';

const orderData = {
  state: {
    logs: [],
  },

  mutations: {
    ADD_LOG: (state, log) => {
      state.logs.unshift(log);
    },
  },

  actions: {
    AddLog({ commit }, log) {
      commit('ADD_LOG', log);
    },
  }
};


export default orderData;
