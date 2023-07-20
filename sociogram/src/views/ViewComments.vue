<template>
  <div class="body">
    <div class="post-container">
      <div @click="openProfile(post, index)" class="post-header">
        <p>
          <img class="dp" :src="userImageUrl" alt="image not found" />
        </p>
        <p class="username">{{ userName }}</p>
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
            @click="likePost()"
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
        <div @click="showComments()" class="view-comments">
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
    <div class="comments-container">
      <comments-level-1
        :getComments="getComments"
        :userList="userList"
        :userNameList="userNameList"
        :userImageUrlList="userImageUrlList"
        :userImageUrl="userImageUrl"
        :userName="userName"
      ></comments-level-1>
    </div>
  </div>
</template>

<script>
import CommentsLevel1 from "@/components/CommentsLevel1.vue";
import axios from "axios";
export default {
  name: "ViewComments",
  data() {
    return {
      post: {},
      userName: undefined,
      userImageUrl: undefined,
      comment: "",
      getComments: undefined,
      userList: [],
      userNameList: [],
      userImageUrlList: [],
    };
  },
  components: { CommentsLevel1 },
  async created() {
    this.post = JSON.parse(localStorage.getItem("post"));
    this.userName = localStorage.getItem("userName");
    this.userImageUrl = localStorage.getItem("userImageUrl");
    await axios
      .get("/instaPosts/comment/getComments/" + this.post.postId, {
        headers: {
          Authorization: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        this.getComments = res.data;
        console.log(this.getComments);
      });
    for (let i = 0; i < this.getComments.length; i++) {
      //   console.log(this.getComments[i].userId);
      await axios
        .post(
          "http://10.20.5.50:8080/user/getProfileByUserId?userId=" +
            this.getComments[i].userId
        )
        .then((res) => {
          this.userNameList.push(res.data.username);
          //   console.log(this.userNameList[i]);
          this.userImageUrlList.push(res.data.imageURL);
          //   console.log(this.userList);
        });
    }
  },

  emits: ["parent-emit"],
  methods: {
    async likePost() {
      console.log(this.post.postId);
      await axios.post(
        "/instaPosts/post/likePost/" +
          this.post.postId +
          "/" +
          localStorage.getItem("userId"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      window.location.reload();
    },

    async handleSubmit() {
      console.log(this.post.postId);
      await axios.post(
        "/instaPosts/comment/addComment",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        },
        {
          postId: this.post.postId,
          userId: localStorage.getItem("userId"),
          commentText: this.comment,
        }
      );
      window.location.reload();
    },
    async openProfile() {
      await axios.post(
        "/instaUser/user/getProfileByUserId?userId=" + this.post.userId,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      this.$router.push("/friendprofile");
      localStorage.setItem("imageURL", this.userImageUrl);
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
}
.comments-container {
  display: flex;
  flex-direction: column;
  margin-top: 114px;
  margin-left: 1.2px;
  width: 100%;
}
.post-container {
  margin-top: 50px;
  margin-left: 300px;
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

<div v-for="(comm, index) in getComments" :key="index">
        <p>{{ comm.commentText }}</p>
      </div>
