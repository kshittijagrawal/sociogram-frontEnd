import axios from "axios";

export default {
  state: {
    allPosts: [],
  },
  getters: {
    getAllPosts: (state) => {
      return state.allPosts;
    },
  },
  mutations: {
    setAllPosts(state, value) {
      state.allPosts = value;
    },
  },
  actions: {
    GET_ALL_POSTS: async ({ commit }) => {
      // debugger;
      const response = await axios.get(
        "/instaPosts/post/getAllPostsByUser/" + localStorage.getItem("userId"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      console.log("Get All Posts", response.data);
      commit("setAllPosts", response.data);
    },
  },
};
