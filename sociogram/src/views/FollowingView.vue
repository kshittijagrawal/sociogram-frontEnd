<template>
  <div class="followers">
    <div>
      following
      <ul>
        <li v-for="user in getAllFollowing" :key="user.userId">
          <img :src="user.imageURL" alt="Loading ... " class="profilepic" />
          <br />
          {{ user.username }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FollowingView",
  components: {},
  data() {
    return {
      followingList: [],
    };
  },
  computed: {
    ...mapGetters(["getAllFollowing"]),
  },
  methods: {
    ...mapActions(["GET_ALL_FOLLOWING"]),
  },
  created: function () {
    this.$store.dispatch("GET_ALL_FOLLOWING");
  },
};
</script>

<style scoped>
.products {
  margin: 30px 100px 100px 100px;
  height: max-content;
}
.profilepic {
  height: 20vh;
  width: 20vw;
}
li {
  list-style: none;
}

.productMargin {
  margin: 3.5rem 3.5rem;
}

.product-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
