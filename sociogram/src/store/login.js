import axios from "axios";
export default {
  state: {
    login: "",
  },
  getters: {
    getLogin: (state) => {
      return state.login;
    },
  },
  mutations: {
    setLogin: (state, value) => {
      state.login = value;
    },
  },
  actions: {
    async LOGIN({ commit }, { payload }) {
      const response = await axios.post("/oauth/api/auth/login", payload);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);
      console.log(response);
      commit("setLogin", response);
    },
  },
};
