import axios from "axios";
export default {
  state: {
    register: "",
  },
  getters: {
    getRegister: (state) => {
      return state.register;
    },
  },
  mutations: {
    setRegister: (state, value) => {
      state.register = value;
    },
  },
  actions: {
    async REGISTER({ commit }, { payload, successCallBack }) {
      const response = await axios.post("/oauth/api/auth/register", payload);
      console.log(response);
      commit("setRegister", response);
      localStorage.setItem("token", response.data.accessToken);
      if (response.data != "User Exists") successCallBack(response);
    },
  },
};
