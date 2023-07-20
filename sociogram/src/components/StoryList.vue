<template>
  <div class="story-list">
    <div
      @click="emitParent(story)"
      v-for="(story, index) in storyList"
      :key="index"
    >
      <p><img :src="story.imageURL" alt="image not found" /></p>
      <p class="story-name">
        <b
          ><i>{{ story.productName }}</i></b
        >
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoryList",
  emits: ["parent-emit"],
  props: {
    storyList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    emitParent(story) {
      localStorage.setItem("productID", story.productID);
      // this.$router.push("/productdescription");
      //   this.$emit("parent-emit", product);
    },
  },
};
</script>
<style scoped></style>
