<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <!-- Load icon library -->
      <div class="header">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <!-- The form -->
        <form class="example">
          <input type="text" placeholder="Search.." name="search" />
          <button @click="searchHandler">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div class="results"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchData: "",
    };
  },
  methods: {
    searchHandler() {
      axios
        .get("http://10.20.5.50:8080/user/search/" + "charan")
        .then((res) => {
          this.searchData = res.data;
        });
      console.log(this.searchData);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #cbc9c9da;
}

.modal {
  text-align: center;
  height: 5vh;
  width: 30vw;
  margin-top: 1.5%;
}

* {
  box-sizing: border-box;
}

/* Style the search field */
form.example input[type="text"] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

/* Style the submit button */
form.example button {
  float: left;
  width: 20%;
  padding: 10px;
  background: linear-gradient(to right, #e1306c, #833ab4);
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}

form.example button:hover {
  opacity: 0.8;
}

/* Clear floats */
form.example::after {
  content: "";
  clear: both;
  display: table;
}
</style>
