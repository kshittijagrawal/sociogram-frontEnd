<template>
  <div class="left-home">
    <div class="brand-name">
      <p>Instagram</p>
    </div>
    <div class="nav-items">
      <div class="first-nav">
        <img src="../assets/images/home.png" alt="home img here" />
        <p>
          <router-link
            style="text-decoration: none; color: black"
            to="/homepage"
            >Home</router-link
          >
        </p>
      </div>
      <div class="second-nav">
        <img src="../assets/images/profile.png" alt="profile img here" />
        <p>
          <router-link
            style="text-decoration: none; color: black"
            to="/profileview"
            >Profile</router-link
          >
        </p>
      </div>
      <div @click="showSearchModal = true" class="third-nav">
        <img src="../assets/images/search.png" alt="search img here" />
        <p>Search</p>
      </div>
      <div class="forth-nav">
        <img
          src="../assets/images/notification.png"
          alt="notification img here"
        />
        <p>Notification</p>
      </div>
      <div class="fifth-nav">
        <img src="../assets/images/create.png" alt="create img here" />
        <p>
          <router-link
            style="text-decoration: none; color: black"
            to="/imageupload"
            >Create</router-link
          >
        </p>
      </div>
      <div class="fifth-nav">
        <img src="../assets/images/logout.png" alt="create img here" />
        <p>
          <button
            @click="logout()"
            style="text-decoration: none; color: black"
            to="/"
          >
            Logout
          </button>
        </p>
      </div>
    </div>
    <div class="theme-toggle">
      <p>Toggle here</p>
    </div>
    <SearchModal
      v-show="showSearchModal"
      @close-modal="showSearchModal = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import SearchModal from "./SearchModal.vue";

export default {
  components: {
    SearchModal,
  },
  data() {
    return {
      showSearchModal: false,
    };
  },
  methods: {
    logout() {
      axios.post("/oauth/api/auth/logout", {
        username: localStorage.getItem("username"),
        password: "",
        platformId: "instagram",
      });
      localStorage.clear();
      this.$router.push("/");
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
  width: 17%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 0.5px solid lightgray;
  height: 100%;
}

.mid-home {
  position: relative;
  width: 68%;
  left: 16%;
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

.modal {
  background-color: rgba(0, 176, 234, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
