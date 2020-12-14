import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    user:{userName: "",
    password:""}
  },getters: {
    user: state => {
      return state.user;
    },
  }, mutations: {
    saveUser(state,user) {
      state.user.userName = user.userName;
      state.user.password = user.password;
    },
    
    
  }, actions: {
    handleSaveUserName(context, user) {
      context.commit('saveUser', user);
    }
  }
})