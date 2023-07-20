<template>
  <div class="friend-container">
    <div class="maindiv">
      <div class="dp">
        <img :src="friendDetails.imageURL" alt="dp" class="dpimage" />
      </div>
      <div class="div2">
        <p class="class1">
          {{ friendDetails.username }}
          <a href="" class="settings">&#9881;</a>
        </p>
        <br />
        <p class="class2">
          {{ friendPosts.length }} Posts
          <router-link to="/followersView">Followers</router-link>
          <router-link to="/followingView">Following</router-link>
          <router-view />
          <button v-if="isFollowing" @click="unfollow">Unfollow</button>
          <button v-else @click="follow">Follow</button>
        </p>
      </div>
    </div>
    <div class="posts">
      <div
        v-for="(post, index) in friendPosts"
        :key="index"
        class="post-container"
      >
        <p>
          <img
            class="image-div"
            :src="post.filePostedURL"
            alt="image not found"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileView",
  props: {},
  data() {
    return {
      isFollowing: true,
      friendDetails: undefined,
      imageURL: "",
      friendPosts: undefined,
      followingList: undefined,
      followingIdList: [],
      userDetails: undefined,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async unfollow() {
      await axios
        .post(
          "http://10.20.5.50:8080/following/unFollow?userId1=" +
            localStorage.getItem("userId") +
            "&userId2=" +
            localStorage.getItem("friendId")
        )
        .then((res) => {
          console.log(res.data);
        });
      window.location.reload();
    },
    async follow() {
      await axios
        .post(
          "http://10.20.5.50:8080/following/addRequest?userId=" +
            localStorage.getItem("friendId"),
          {
            imageURL: this.userDetails.imageURL,
            userId: this.userDetails.userId,
            username: this.userDetails.username,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      window.location.reload();
    },
  },
  async created() {
    await axios
      .post(
        "http://10.20.5.50:8080/user/getProfileByUserId?userId=" +
          localStorage.getItem("friendId")
      )
      .then((res) => {
        this.friendDetails = res.data;
        console.log(this.friendDetails);
      });
    await axios
      .post(
        "http://10.20.5.50:8080/user/getProfileByUserId?userId=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        this.userDetails = res.data;
        console.log(this.userDetails);
      });

    await axios
      .get(
        "/instaPosts/post/getAllPostsByUser/" +
          localStorage.getItem("friendId"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      )
      .then((res) => {
        this.friendPosts = res.data;
        console.log(this.friendPosts);
      });

    await axios
      .get(
        "http://10.20.5.50:8080/following/getListOfFollowing/" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        console.log(res.data);
        this.followingList = res.data;
      });

    for (let i = 0; i < this.followingList.length; i++) {
      this.followingIdList.push(this.followingList[i].userId);
    }
    console.log(this.followingIdList);
    if (this.followingIdList.includes(localStorage.getItem("friendId")))
      this.isFollowing = true;
    else this.isFollowing = false;
    console.log(this.isFollowing);
  },
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-wrap: wrap;
  margin-left: 17vw;
}
.image-div {
  width: 20vw;
  height: 30vh;
  margin: 10px;
}
.friend-container {
  display: flex;
  flex-direction: column;
}
.maindiv {
  display: flex;
  flex-wrap: row-wrap;
  justify-content: center;
  height: 30vh;
  border-bottom: 0.1vh solid gray;
}
.dp {
  width: 20vw;
  height: 25vh;
  /* border: 2vh solid black;
  border-radius: 50%; */
  display: flex;
  justify-content: space-around;
}
.div2 {
  width: 50vw;
}
.dpimage {
  width: 13vw;
  height: 25vh;
  border-radius: 100%;
}
.editprofilebutton {
  width: 20vh;
  height: 3vh;
}
.settings {
  content: \2699;
  font-size: 5vh;
  text-decoration: none;
  color: black;
}
.class1 {
  width: 60vh;
  height: 2vh;
  display: flex;
  justify-content: space-around;
}
.class1 a {
  text-decoration: none;
}
.class2,
.class3 {
  width: 60vh;
  height: 2vh;
  display: flex;
  justify-content: space-around;
}
.class2 a {
  text-decoration: none;
}
.class3 {
  display: flex;
  justify-content: left;
  margin-left: 5vh;
}
</style>
