<template>
  <div>
    <!-- {{ postList[0].likes }} -->
    <div
      class="post-container"
      @click="emitParent(post)"
      v-for="(post, index) in postList"
      :key="index"
    >
      <div @click="openProfile(post)" class="post-header">
        <p>
          <img class="dp" :src="userImageUrl[index]" alt="image not found" />
        </p>
        <p class="username">{{ userNameList[index] }}</p>
      </div>
      <div class="post-content">
        <p>
          <img
            class="post-img"
            :src="post.filePostedURL"
            alt="image not found"
          />
        </p>
      </div>
      <div class="post-footer">
        <div class="footer-actions">
          <img
            class="heart"
            src="../assets/images/heart.png"
            alt="image not found"
            @click="likePost(post)"
          />
          <img
            class="comment"
            src="../assets/images/comment.png"
            alt="image not found"
          />
          <img
            class="share"
            src="../assets/images/send.png"
            alt="image not found"
          />
        </div>
        <div class="likes">
          <p v-if="post.likes === null">0 likes</p>
          <p v-else>{{ post.likes.length }} likes</p>
        </div>
        <div
          @click="showComments(post, userNameList[index], userImageUrl[index])"
          class="view-comments"
        >
          <p v-if="post.commentIds === null">No comments</p>
          <p v-else>View all {{ post.commentIds.length }} comments</p>
        </div>
        <div class="add-comment">
          <form @submit.prevent="handleSubmit(post)">
            <input
              v-model="comment"
              type="text"
              placeholder="Add a comment..."
            />
            <button>Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostList",
  data() {
    return {
      comment: "",
    };
  },
  emits: ["parent-emit"],
  props: {
    postList: {
      type: Array,
      default: () => [],
      required: true,
    },
    userImageUrl: {
      type: Array,
      default: () => [],
      required: true,
    },
    userNameList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    emitParent(post) {
      console.log(post.postId);
      this.$emit("parent-emit", post);
    },
    async likePost(post) {
      console.log(post.postId);
      await axios.post(
        "http://10.20.5.50:8081/post/likePost/" +
          post.postId +
          "/" +
          localStorage.getItem("userId")
      );
      // window.location.reload();
    },

    async handleSubmit(post) {
      console.log(post.postId);
      await axios.post("http://10.20.5.50:8081/comment/addComment", {
        postId: post.postId,
        userId: localStorage.getItem("userId"),
        commentText: this.comment,
      });
      window.location.reload();
    },
    async openProfile(post) {
      await axios.post(
        "http://10.20.5.50:8080/user/getProfileByUserId?userId=" + post.userId
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //     userId: localStorage.getItem("userId"),
        //   },
        // }
      );
      this.$router.push("/friendprofile");
      localStorage.setItem("friendId", post.userId);
    },
    showComments(post, userName, userImageUrl) {
      localStorage.setItem("post", JSON.stringify(post));
      localStorage.setItem("userName", userName);
      localStorage.setItem("userImageUrl", userImageUrl);
      this.$router.push("/viewcomments");
    },
  },
};
</script>
<style scoped>
.post-container {
  margin-left: 230px;
  width: 460px;
  margin-bottom: 15px;
  /* margin-top: 200px; */
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  /* border-radius: 5ps; */
}
.post-header {
  width: 150px;
  display: flex;
  padding-bottom: 2px;
}
.post-header:hover {
  cursor: pointer;
}
.dp {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.username {
  padding-top: 8px;
  padding-left: 8px;
  font-weight: bold;
}
.post-img {
  height: 450px;
  width: 460px;
  border-radius: 3px;
  border: 1px solid lightgray;
}
.post-footer {
  width: 460px;
  display: flex;
  flex-direction: column;
}
.footer-actions {
  display: flex;
}
.heart {
  padding: 8px 8px 8px 0px;
  height: 24px;
  width: 24px;
}
.heart:hover {
  cursor: pointer;
}
.comment {
  padding: 7px;
  height: 27px;
  width: 28px;
}
.share {
  padding: 8px;
  padding-top: 10px;
  height: 24px;
  width: 24px;
}
.likes {
  display: flex;
  font-weight: bold;
  padding-top: 5px;
}
.view-comments {
  padding-top: 5px;
  display: flex;
  font-size: 87%;
  color: gray;
  width: 150px;
}
.view-comments:hover {
  cursor: pointer;
}
.add-comment {
  padding-top: 5px;
  display: flex;
  font-size: 87%;
  color: gray;
}
.add-comment form input {
  width: 400px;
  border: none;
  text-decoration: none;
}
input:focus {
  outline: none;
}
</style>
