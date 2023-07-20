<template>
  <div class="post-info">
    <!-- {{ this.fileURL }} -->
    <img v-if="typeFlag" alt="Loading ...." :src="this.fileURL" />
    <!-- // eslint-disable-next-line vue/no-parsing-error -->
    <video v-else :src="this.fileURL" frameborder="0" controls />
    <input
      type="text"
      placeholder="Place your Caption Here"
      class="post-caption"
    />
    <button class="upload-post" @click="uploadHandle">Done</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userId: localStorage.getItem("userId"),
      datePosted: "",
      typeFlag: false,
      fileType: localStorage.getItem("fileType"),
      fileURL: localStorage.getItem("fileURL"),
      caption: "MAc Book Pro !!!",
      url: "",
      fileName: "",
      iv: undefined,
    };
  },
  created() {
    // debugger;
    this.iv = localStorage.getItem("fileType");
    console.log("type from postinfo :" + this.iv);
    if (this.iv === "images") {
      this.typeFlag = true;
      console.log("Uploaded Images");
    } else {
      this.typeFlag = false;
      console.log("Uploaded Video");
    }
  },
  methods: {
    uploadHandle() {
      //   localStorage.clear();
      const requestbody = {
        userId: localStorage.getItem("userId"),
        datePosted: new Date(),
        fileType: this.fileType,
        filePostedURL: this.url,
        caption: this.caption,
      };
      axios.post("http://10.20.5.50:8080/user/addPost", requestbody);
    },
  },
};
</script>

<style scoped>
.post-image {
  width: 30vw;
  height: 50vh;
}
.post-caption {
  width: 40vw;
  height: 5vh;
  background-color: whitesmoke;
}
.post-info {
  display: flex;
}

.post-upload {
  width: 10vw;
  height: 4vh;
}
.post-video {
  width: 30vw;
  height: 40vh;
}
</style>
