import axios from "axios";

export default {
  state: {
    AllFollowers: [],
  },
  getters: {
    getAllFollowers: (state) => {
      return state.AllFollowers;
    },
  },
  mutations: {
    setAllFollowers(state, value) {
      state.AllFollowers = value;
    },
  },
  actions: {
    GET_ALL_FOLLOWERS: async ({ commit }) => {
      // debugger;
      const response = await axios.get(
        "/instaUser/follower/getListOfFollowers/" +
          localStorage.getItem("friendId"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      console.log("Get All Followers", response.data);
      commit("setAllFollowers", response.data);
    },
  },
};
