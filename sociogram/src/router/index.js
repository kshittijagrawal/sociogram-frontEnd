import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import ProfileView from "../views/ProfileView.vue";
import EditProfile from "../views/EditProfile.vue";
import FollowersView from "../views/FollowersView.vue";
import FollowingView from "../views/FollowingView.vue";
import FriendProfile from "../views/FriendProfile.vue";
import ImageUpload from "../views/ImageUpload.vue";
import PostInfo from "../views/PostInfo.vue";
import ViewComments from "../views/ViewComments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/homepage",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/",
    name: "loginpage",
    component: LoginPage,
  },
  {
    path: "/registerpage",
    name: "registerpage",
    component: RegisterPage,
  },
  {
    path: "/profileview",
    name: "profileview",
    component: ProfileView,
  },
  {
    path: "/editprofile",
    name: "editprofile",
    component: EditProfile,
  },
  {
    path: "/followersView",
    name: "followersView",
    component: FollowersView,
  },
  {
    path: "/followingView",
    name: "followingView",
    component: FollowingView,
  },
  {
    path: "/friendprofile",
    name: "friendprofile",
    component: FriendProfile,
  },
  {
    path: "/imageupload",
    name: "imageupload",
    component: ImageUpload,
  },
  {
    path: "/postinfo",
    name: "postinfo",
    component: PostInfo,
  },
  {
    path: "/viewcomments",
    name: "viewcomments",
    component: ViewComments,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
