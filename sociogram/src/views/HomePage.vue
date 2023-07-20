<template>
  <div class="insta">
    <div class="mid-home">
      <!-- <div class="modal">
      <add-post @close="toggleModal" :modalActive="modalActive">
        <div class="modal-content"></div>
      </add-post>
    </div> -->
      <!-- <story-list :storyList="storyList" @parent-emit="selected"></story-list> -->

      <post-list
        :postList="postList"
        :userImageUrl="userImageUrl"
        :userNameList="userNameList"
        @parent-emit="selected"
      ></post-list>
    </div>
    <div class="right-home">
      <div class="right-home-header">
        <p>Suggested for you</p>
      </div>
      <div class="right-home-body"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { ref } from "vue";
import PostList from "@/components/PostList.vue";
// import StoryList from "@/components/StoryList.vue";
// import AddPost from "@/components/AddPost.vue";
export default {
  name: "HomePage",
  components: { PostList },
  // setup() {
  //   const modalActive = ref(true);

  //   const toggleModal = () => {
  //     modalActive.value = !modalActive.value;
  //   };

  //   return { modalActive, toggleModal };
  // },
  data() {
    return {
      changeColour: true,
      postList: undefined,
      storyList: undefined,
      userIdList: [],
      userImageUrl: [],
      userNameList: [],
      // token: localStorage.getItem("token"),
    };
  },
  async created() {
    await axios
      .get(
        "instaUser/following/getAllPostsOfFollowing?userId=" +
          // "63de379e3f88fa3ca684339e"
          localStorage.getItem("userId"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      )
      .then((res) => {
        this.postList = res.data;
        console.log(this.postList);
      });

    let i = 0;
    for (i = 0; i < this.postList.length; i++) {
      this.userIdList.push(this.postList[i].userId);
    }
    console.log(this.userIdList);

    for (i = 0; i < this.userIdList.length; i++) {
      await axios
        .post(
          "http://10.20.5.50:8080/user/getProfileByUserId?userId=" +
            this.userIdList[i],
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              userId: localStorage.getItem("userId"),
            },
          }
        )
        .then((res) => {
          this.userImageUrl.push(res.data.imageURL);
          this.userNameList.push(res.data.username);
        });
    }
    // console.log(this.userImageUrl);
    // console.log(this.userImageUrl);

    // await axio.get("")
    // await axios
    //   .get(
    //     "http://localhost:8081/story/getAllStoriesOfFollowing/63d9524f130ce2134b2aa8d4"
    //   )
    //   .then((res) => {
    //     this.storyList = res.data;
    //     console.log(this.storyList);
    //   });
  },
  methods: {
    selected(post) {
      console.log("This is from parent " + post);
      console.log(post);
    },
  },
};
</script>

<style scoped>
LeftPane * {
  margin: 0;
  padding: 0;
  border: 0;
}

.insta {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}

.left-home {
  position: fixed;
  left: 0;
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 0.5px solid lightgray;
  height: 100%;
}

.mid-home {
  position: relative;
  width: 68%;
  left: 14%;
  /* align-items: center; */
}

.brand-name {
  padding-top: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand-name p {
  font-size: 35px;
}

.nav-items {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 10%;
}

.nav-items p {
  font-size: 17px;
}

.first-nav,
.second-nav,
.third-nav,
.forth-nav,
.fifth-nav {
  display: flex;
  align-items: center;
}

.left-home img {
  height: 42%;
  width: 36%;
  padding-right: 15px;
}

.theme-toggle {
  padding-bottom: 8%;
}

.right-home {
  width: 16vw;
  position: absolute;
  right: 0;
  height: 100vh;
  padding-left: 0.25%;
  border-left: 0.5px solid lightgrey;
  display: flex;
  flex-direction: column;
}

.right-home-header {
  padding-top: 8%;
  padding-bottom: 3%;
}

.right-home-header p {
  text-align: left;
  opacity: 0.5;
}

.right-home-body {
  height: 100vh;
}

/* .comment:hover {
  cursor: pointer;
} */
</style>
