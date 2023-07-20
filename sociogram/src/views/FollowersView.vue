<template>
  <div class="followers">
    <div>
      follower
      <ul>
        <li v-for="user in getAllFollowers" :key="user.userId">
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
  name: "FollowersView",
  components: {},
  data() {
    return {
      followersList: [],
    };
  },
  computed: {
    ...mapGetters(["getAllFollowers"]),
  },
  methods: {
    ...mapActions(["GET_ALL_FOLLOWERS"]),
  },
  created: function () {
    this.$store.dispatch("GET_ALL_FOLLOWERS");
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
