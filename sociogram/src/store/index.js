import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./user";
import follower from "./follower";
import following from "./following";
import register from "./register";
import login from "./login";
import post from "./post";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    follower,
    following,
    register,
    login,
    post,
  },
});
