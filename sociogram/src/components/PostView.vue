<template>
  <div class="posts-container">
    <div class="posts" v-for="post in getAllPosts" :key="post.postId">
      <p>
        <img :src="post.filePostedURL" alt="Loading ... " class="post-image" />
      </p>
      <p><button @click="deletePost(post)">Delete</button></p>
      <br />
      <!-- {{ user.userName }} -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "PostsView",
  components: {},
  data() {
    return {
      postsList: [],
    };
  },
  computed: {
    ...mapGetters(["getAllPosts"]),
  },
  methods: {
    ...mapActions(["GET_ALL_POSTS"]),
    async deletePost(post) {
      await axios
        .delete(
          "/instaUser/user/deletePost?postId=" +
            post.postId +
            "&userId=" +
            localStorage.getItem("userId"),
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              userId: localStorage.getItem("userId"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      window.location.reload();
    },
  },
  created: function () {
    this.$store.dispatch("GET_ALL_POSTS");
  },
};
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 17vw;
}
.products {
  margin: 30px 100px 100px 100px;
  height: max-content;
}
.post-image {
  width: 20vw;
  height: 30vh;
  margin: 10px;
}
li {
  list-style: none;
}

.productMargin {
  margin: 3.5rem 3.5rem;
}

.product-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
