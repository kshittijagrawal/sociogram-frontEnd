<template>
  <div class="body">
    <div class="maindiv">
      <div class="dp">
        <img
          :src="userDetails.imageURL"
          alt="image not found"
          class="dpimage"
        />
      </div>
      <div class="div2">
        <p class="class1">
          {{ userDetails.username }}
          <router-link to="/EditProfile">Edit Profile </router-link>
          <router-view />
          <a href="" class="settings">&#9881;</a>
        </p>
        <br />
        <p class="class2">
          Posts <router-link to="/followersView">Followers</router-link>
          <router-link to="/followingView">Following</router-link>
          <router-view />
        </p>
        <br />
        <p>{{ userDetails.bio }}</p>
      </div>
    </div>
    <post-view></post-view>
  </div>
</template>

<script>
import axios from "axios";
import PostView from "@/components/PostView.vue";
export default {
  name: "ProfileView",
  props: {},
  data() {
    return {
      userDetails: undefined,
    };
  },
  components: {
    PostView,
  },
  watch: {},
  computed: {},
  methods: {},
  async created() {
    localStorage.setItem("friendId", localStorage.getItem("userId"));
    await axios
      .post(
        "http://10.20.5.50:8080/user/getProfileByUserId?userId=" +
          localStorage.getItem("userId")
        // {
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //     userId: localStorage.getItem("userId"),
        //   },
        // }
      )
      .then((res) => {
        // console.log(res.data);
        this.userDetails = res.data;
        console.log(this.userDetails);
      });
  },
};
</script>

<style scoped>
.body {
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
