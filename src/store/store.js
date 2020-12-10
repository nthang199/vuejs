import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    userName: ""
  },getters: {
    userName: state => {
      return state.userName;
    }
  }, mutations: {
    saveUserName(state,userName) {
      state.userName = userName;
    }
    
  }, actions: {
    handleSaveUserName(context, userName) {
      context.commit('saveUserName', userName);
    }
  }
})