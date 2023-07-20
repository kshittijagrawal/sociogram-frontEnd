<template>
  <div>
    <div
      v-for="(reply, index) in replies"
      :key="index"
      class="comment-container"
    >
      <p>{{ reply.commentLevel2Text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentsLevel2",
  props: {
    replies: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>

<style scoped></style>
