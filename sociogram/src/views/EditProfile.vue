<template>
  <div>
    <div class="registerChild">
      <form @submit.prevent="editProfile">
        <label>Bio : </label>
        <input v-model="formData.bio" type="text" /><br /><br />

        <!-- <label>Profile picture : </label>
        <input v-model="formData.imageURL" type="url" /><br /><br /> -->
        <input type="file" ref="inputs" @change="HandleFileChange" />

        <button @click="upload">Submit</button> <br />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { storage } from "@/firebase";
// import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import "firebase/storage";
export default {
  name: "EditProfile",
  components: {},
  data() {
    return {
      url: "",
      formData: {
        bio: "",
        imageURL: "",
        userId: localStorage.getItem("userId"),
      },
    };
  },
  computed: {
    ...mapGetters(["getAddProfile"]),
  },
  methods: {
    ...mapActions(["ADD_PROFILE"]),
    editProfile() {
      const payloadData = this.formData;
      console.log(payloadData);
      this.$store.dispatch("ADD_PROFILE", { payload: payloadData });
    },
    HandleFileChange(e) {
      const file = e.target.files[0];
      // const file = this.$refs.file.files[0];

      if (!file) {
        e.preventDefault();
        alert("No file chosen");
        return;
      } else if (file.size > 1024 * 1024) {
        e.preventDefault();
        alert("File too big (> 1MB)");
        return;
      }
      this.fileName = file.name;
    },
    async upload() {
      const storageRef = ref(storage, `Images/${this.fileName}`);
      await uploadBytes(storageRef, this.$refs.inputs.file).then((res) => {
        console.log("From upload");
        console.log(res);
      });
      await getDownloadURL(ref(storage, `Images/${this.fileName}`)).then(
        (res) => {
          //   debugger;
          this.url = res;
          console.log("from download");
          console.log(this.url);
          this.formData.imageURL = this.url;
        }
      );
    },
  },
};
</script>
