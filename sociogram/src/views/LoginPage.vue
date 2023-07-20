<template>
  <div class="loginView">
    <div class="loginViewChild">
      <p>Instagram</p>
      <form @submit.prevent="loginHandler">
        <input
          type="text"
          v-model="formData.username"
          placeholder="email,username or phone Number"
          required
        /><br /><br />
        <input
          type="password"
          v-model="formData.password"
          placeholder="password"
          required
        /><br />
        <button>Login</button> <br />
        <a @click="registerHandler">New user? create an account</a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginHandler() {
      const payloadData = {
        username: this.formData.username,
        password: this.formData.password,
      };
      this.$store.dispatch("LOGIN", { payload: payloadData });
      localStorage.setItem("username", this.formData.username);
      this.$router.push("/homepage");
    },
    registerHandler() {
      this.$router.push("/registerpage");
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

.loginView {
  display: flex;
  justify-content: center;
}

.loginViewChild {
  height: 50vh;
  width: 30vw;
  border-radius: 16px;
  transition: box-shadow 0.6s ease-in-out;
}

.loginViewChild:hover {
  box-shadow: rgba(30, 110, 230, 0.2) 0px 4px 12px;
}

.loginLeft {
  margin: 0 30px;
  text-align: center;
  width: 400px;
}

.loginRight {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70vw;
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

a {
  cursor: pointer;
  margin-top: 16px;
  font-size: 16px;
  text-decoration: none;
}
</style>
