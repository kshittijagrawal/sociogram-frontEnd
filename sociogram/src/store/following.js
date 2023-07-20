import axios from "axios";

export default {
  state: {
    AllFollowing: [],
  },
  getters: {
    getAllFollowing: (state) => {
      return state.AllFollowing;
    },
  },
  mutations: {
    setAllFollowing(state, value) {
      state.AllFollowing = value;
    },
  },
  actions: {
    GET_ALL_FOLLOWING: async ({ commit }) => {
      // debugger;
      const response = await axios.get(
        "/instaUser/following/getListOfFollowing/" +
          localStorage.getItem("friendId"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      console.log("Get All Followings", response.data);
      commit("setAllFollowing", response.data);
    },
  },
};
