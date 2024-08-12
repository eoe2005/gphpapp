import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nick_name: "",
    avatar: "",
    admin_id: 0,
  },
  getters: {},
  mutations: {
    setUserInfo(state, data) {
      state.nick_name = data.nick_name;
      state.avatar = data.avatar;
      state.admin_id = data.admin_id;
    },
    clear(state) {
      state.nick_name = "";
      state.avatar = "";
      state.admin_id = 0;
    },
  },
  actions: {},
  modules: {},
});
