<template>
  <div>
    <!-- <img :src="url" class="post-image" /> -->
    <input type="file" ref="inputs" @change="HandleFileChange" />
    <button @click="upload">Upload</button>
  </div>
</template>

<script>
import { storage } from "@/firebase";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import "firebase/storage";
// import PostInfo from "../views/PostInfo.vue";
export default {
  data() {
    return {
      userId: localStorage.getItem("userId"),
      datePosted: "",
      fileType: "",
      filePostedURL: "",
      caption: "MAc Book Pro !!!",
      url: "",
      file: "",
      fileName: "",
    };
  },
  components: {
    // PostInfo,
  },
  methods: {
    HandleFileChange(event) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      if (this.file.type.startsWith("image")) {
        console.log("File type is Image");
        this.fileType = "images";
        localStorage.setItem("fileType", this.fileType);
        return;
      } else if (this.file.type.startsWith("video")) {
        console.log("File Type is Video");
        this.fileType = "videos";
        localStorage.setItem("fileType", this.fileType);
      }
    },
    async upload(event) {
      // const file = event.target.files[0];
      const maxfilesize = 6 * 1024 * 1024;
      if (this.file.size > maxfilesize) {
        alert("Max file size of 3 MB exceeded!!");
        return;
      }
      if (!this.file) {
        event.preventDefault();
        alert("No file chosen");
        return;
      }
      let storageRef = ref(storage, `Images/${this.fileName}`);
      if (this.fileType === "videos") {
        let storageRef = ref(storage, `Videos/${this.fileName}`);
        console.log(storageRef);
      }

      await uploadBytes(storageRef, this.$refs.inputs.files[0]).then((res) => {
        console.log("From upload");
        console.log(res);
      });
      await getDownloadURL(ref(storage, `Images/${this.fileName}`)).then(
        (res) => {
          this.url = res;
          console.log("from download");
          localStorage.setItem("fileURL", this.url);
          // console.log(localStorage.getItem("fileURL"));
          // debugger;
          this.$router.push("/postinfo");
          console.log("After Routing");
          console.log(localStorage.getItem("fileURL"));
          // debugger;
          console.log(this.url);
        }
      );
      await axios.post("http://10.20.5.50:8080/user/addPost", {
        userId: this.userId,
        datePosted: new Date(),
        fileType: this.fileType,
        filePostedURL: this.url,
        caption: this.caption,
      });
    },
  },
};
</script>
<style scoped>
.post-image {
  width: 30vw;
  height: 50vh;
}
</style>
