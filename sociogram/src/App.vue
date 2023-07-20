<template>
  <div id="app">
    <left-pane></left-pane>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
// const firebaseConfig2 = {
//   apiKey: "AIzaSyAms2o7UXga55RC80gWbblyYC0o27JFPe0",
//   authDomain: "pushnotification-e8b94.firebaseapp.com",
//   projectId: "pushnotification-e8b94",
//   storageBucket: "pushnotification-e8b94.appspot.com",
//   messagingSenderId: "208170573038",
//   appId: "1:208170573038:web:bfdba70ef87765a9fbe7ff",
//   measurementId: "G-C00FLY3MZG",
// };
// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       const app1 = initializeApp(firebaseConfig2);

//       const messaging = getMessaging(app1);
//       getToken(messaging, {
//         vapidKey:
//           "BD8t-DRpPoK-aDjiTJYocXSs7sUTnTaduR7VKMYcIV1KlDbgKFKozXG0X-1R6r3gLfeul_PM2pgyLoBwhLbcxYI",
//       }).then((currentToken) => {
//         if (currentToken) {
//           console.log("currentToken: ", currentToken);
//         } else {
//           console.log("Can not get token");
//         }
//       });
//     } else {
//       console.log("Do not have permission!");
//     }
//   });
// }

// requestPermission();

import LeftPane from "@/components/LeftPane.vue";
export default {
  components: { LeftPane },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
* {
  margin: 0;
  padding: 0;
}
</style>
