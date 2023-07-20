import axios from "axios";

export default {
  state: {
    addProfile: false,
  },
  getters: {
    getAddProfile: (state) => {
      return state.addProfile;
    },
  },
  mutations: {
    setAddProfile: (state, value) => {
      state.addProfile = value;
    },
  },
  actions: {
    async ADD_PROFILE({ commit }, { payload }) {
      const response = await axios.post(
        "http://10.20.5.50:8080/user/addProfile",
        payload
        //   {
        //     headers: {
        //       Authorization: localStorage.getItem("token"),
        //       userId: localStorage.getItem("userId"),
        //     },
        //   }
      );
      console.log("Add Profile: ", response);
      commit("setAddProfile", response);
    },
  },
};
