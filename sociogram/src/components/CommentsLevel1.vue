<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <div
          v-for="(comment, index) in getComments"
          :key="index"
          class="card p-3"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center">
              <img
                :src="userImageUrlList[index]"
                width="30"
                class="user-img rounded-circle mr-2"
              />
              <span
                ><small class="font-weight-bold text-primary">
                  <b>{{ userNameList[index] }} </b></small
                >
                <small class="font-weight-bold">{{
                  comment.commentText
                }}</small></span
              >
            </div>

            <small>2 days ago</small>
          </div>

          <div
            class="action d-flex justify-content-between mt-2 align-items-center"
          >
            <div class="reply px-4">
              <small @click="deleteComment(comment)">Remove</small>
              <span class="dots"></span>
              <span class="dots"></span>
              <small @click="showCommentsLevel2(comment)">View Replies</small>
            </div>
            <form @submit.prevent="addCommentLevel2(comment)">
              <input
                v-model="commentLevel2"
                type="text"
                placeholder="Reply..."
              />
              <button>Reply</button>
            </form>
            <div></div>

            <div class="icons align-items-center">
              <i class="fa fa-star text-warning"></i>
              <i class="fa fa-check-circle-o check-icon"></i>
            </div>
          </div>
        </div>
        <comments-level-2 :replies="replies"></comments-level-2>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CommentsLevel2 from "@/components/CommentsLevel2.vue";
export default {
  data() {
    return {
      commentLevel2: "",
      replies: undefined,
    };
  },
  components: { CommentsLevel2 },
  props: {
    getComments: {
      type: Array,
      default: () => [],
      required: true,
    },
    userList: {
      type: Array,
      default: () => [],
      required: true,
    },
    userNameList: {
      type: Array,
      default: () => [],
      required: true,
    },
    userImageUrlList: {
      type: Array,
      default: () => [],
      required: true,
    },
    userName: {},
    userImageUrl: {},
  },
  methods: {
    async addCommentLevel2(comment) {
      console.log(comment);
      const response = await axios.post(
        "http://10.20.5.50:8081/commentLevel2/addCommentLevel2",
        {
          commentId: comment.commentId,
          commentLevel2Text: this.commentLevel2,
          postId: comment.postId,
          userId: localStorage.getItem("userId"),
        }
      );
      console.log(response.data);
      window.location.reload();
    },
    async showCommentsLevel2(comment) {
      await axios
        .get(
          "http://10.20.5.50:8081/commentLevel2/getCommentsLevel2/" +
            comment.commentId
        )
        .then((res) => {
          console.log(res.data);
          this.replies = res.data;
        });
    },
    async deleteComment(comment) {
      console.log(comment);
      await axios
        .delete(
          "http://10.20.5.50:8081/comment/deleteComment/" +
            comment.postId +
            "/" +
            comment.commentId +
            "/" +
            localStorage.getItem("userId")
        )
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f7f6f6;
}
.comments-container {
  display: flex;
  flex-direction: column;
  margin-top: 114px;
  margin-left: 1.2px;
  width: 100%;
}

.card {
  border: none;
  box-shadow: 5px 6px 6px 2px #e9ecef;
  border-radius: 4px;
}

.dots {
  height: 4px;
  width: 4px;
  margin-bottom: 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.badge {
  padding: 7px;
  padding-right: 9px;
  padding-left: 16px;
  box-shadow: 5px 6px 6px 2px #e9ecef;
}

.user-img {
  margin-top: 4px;
}

.check-icon {
  font-size: 17px;
  color: #c3bfbf;
  top: 1px;
  position: relative;
  margin-left: 3px;
}

.form-check-input {
  margin-top: 6px;
  margin-left: -24px !important;
  cursor: pointer;
}

.form-check-input:focus {
  box-shadow: none;
}

.icons i {
  margin-left: 8px;
}
.reply {
  margin-left: 12px;
}

.reply small {
  color: #b7b4b4;
}

.reply small:hover {
  color: green;
  cursor: pointer;
}
</style>
