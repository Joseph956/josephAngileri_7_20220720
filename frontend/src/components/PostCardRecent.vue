<template>
  <div class="post-card">
    <div class="icons">
      <div class="icon">
        <Edit class="edit" />
      </div>
      <div class="icon">
        <Delete class="delete" />
      </div>
    </div>
    <img class="imgPost" :src="post.attachment" alt="" />
    <div class="info">
      <h4>{{ post.title }}</h4>
      <h5>{{ post.content }}</h5>
      <h6>Posté le: {{ post.createdAt }}</h6>
      <router-link class="link" to="#">
        Voir les derniers messages <Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Arrow from "@/assets/Icons/arrow-right-light.svg";
import Edit from "@/assets/Icons/edit-regular.svg";
import Delete from "@/assets/Icons/trash-regular.svg";
export default {
  name: "PostCardRecent",
  props: ["post"],
  components: {
    Arrow,
    Edit,
    Delete,
  },
  data: function () {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
      },
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      posts: [], //Permet l'affichage des posts sur le front.
    };
  },
  computed: {
    ...mapState(["status"]),
  },
  mounted: function () {
    if (this.$store.state.user.userId === -1) {
      this.$router.push("/posts");
      return;
    }
  },
  beforeMount() {
    //Je récupère la liste des posts
    this.getPostList();
  },
  //Lister tous les posts (Methode "get"(data){})
  getPostList() {
    this.apiPosts
      .get("")
      .then((response) => {
        this.posts = response.data;
      })
      .catch(function () {});
  },
};
</script>

<style>
</style>