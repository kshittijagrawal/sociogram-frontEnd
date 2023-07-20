<template>
  <div class="registerView">
    <div class="registerViewChild">
      <div class="registerChild">
        <form @submit.prevent="registerUser">
          <input
            v-model="formData.username"
            type="text"
            placeholder="username"
          /><br />
          <input
            v-model="formData.password"
            type="text"
            placeholder="password"
          /><br />
          <input
            v-model="formData.firstName"
            type="text"
            placeholder="firstName"
          /><br />
          <input
            v-model="formData.lastName"
            type="text"
            placeholder="lastName"
          /><br />
          <input
            v-model="formData.phoneNumber"
            type="tel"
            placeholder="phone number"
          /><br />
          <input
            v-model="formData.email"
            type="email"
            placeholder="email"
          /><br />
          <input
            v-model="formData.dob"
            type="text"
            placeholder="Date Of Birth"
          /><br />
          <input
            v-model="formData.accountType"
            type="radio"
            id="isprivate"
            value="private"
            name="private"
          />
          <label>isPrivate</label>
          <input
            v-model="formData.accountType"
            type="radio"
            id="ispublic"
            value="public"
            name="private"
          />
          <label>isPublic</label><br />
          <input
            v-model="formData.categories"
            type="checkbox"
            id="music"
            value="music"
            name="cat"
          />
          <label>Music</label><br />
          <input
            v-model="formData.categories"
            type="checkbox"
            id="food"
            value="food"
            name="cat"
          />
          <label>Food</label><br />
          <input
            v-model="formData.categories"
            type="checkbox"
            id="sports"
            value="sports"
            name="cat"
          />
          <label>Sports</label><br />
          <input
            v-model="formData.categories"
            type="checkbox"
            id="travel"
            value="travel"
            name="cat"
          />
          <label>Travel</label><br />
          <input
            v-model="formData.categories"
            type="checkbox"
            id="entertainment"
            value="entertainment"
            name="cat"
          />
          <label>Entertainment</label><br />
          <input
            v-model="formData.categories"
            type="checkbox"
            id="fashion"
            value="fashion"
            name="cat"
          />
          <label>Fashion</label><br />

          <button>Register</button> <br />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "RegisterPage",
  components: {},
  data() {
    return {
      formData: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        dob: "",
        accountType: "",
        categories: [],
        token: localStorage.getItem("token"),
      },
      show: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions(["REGISTER"]),
    registerUser() {
      const payload = {
        username: this.formData.username,
        password: this.formData.password,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        phoneNumber: this.formData.phoneNumber,
        email: this.formData.email,
        dob: this.formData.dob,
        platformId: "insta",
        isPrivate: this.formData.accountType == "public" ? false : true,
        categories: this.formData.categories,
      };
      const successCallBack = (response) => {
        console.log(response);
        axios.post(
          "http://10.20.5.50:8080/user/insertUser?userId=" +
            response.data.userId +
            "&username=" +
            this.formData.username
        );
      };
      console.log("before register action");
      this.$store.dispatch("REGISTER", {
        payload,
        successCallBack,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
input {
  width: 240px;
  height: 30px;
  border-radius: 9px;
}

#isprivate,
#ispublic,
#music,
#food,
#entertainment,
#fashion,
#sports,
#travel {
  width: 2vw;
  height: 2vh;
}

.registerView {
  display: flex;
  justify-content: center;
}

h1 {
  color: #1e6ee6;
  margin-top: 33%;
  margin-bottom: 30px;
}

.registerViewChild {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 70vh;
  width: 60vw;
  border-radius: 13px;
  transition: box-shadow 0.6s ease-in-out;
}

.registerViewChild:hover {
  box-shadow: rgba(30, 110, 230, 0.2) 0px 4px 12px;
}

.registerLeft {
  margin: 0 30px;
  text-align: center;
  width: 400px;
}

.registerRight {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 0 30px;
}

p {
  font-size: 28px;
  letter-spacing: 2px;
  line-height: 30px;
}

label {
  font-size: 20px;
}

button {
  font-size: 18px;
  margin: 12px 0;
  height: 40px;
  width: 255px;
  border-radius: 9px;
  border: none;
  transition: background-color 0.6s ease-in-out;
}

button:hover {
  background: #b0c5e7;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
</style>
