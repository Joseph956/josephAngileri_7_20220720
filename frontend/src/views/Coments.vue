<template>
  <div class="cardComents">
    <h1 class="comentTitle">Commenter un post</h1>
    <p class="comentSubtitle">Le commentaire de :</p>
    <h1>{{ post.coments.coment }}</h1>
    <img v-bind:src="user.attachment" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Coments",
  data() {
    return {
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/coments",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
      likes: [],
    };
  },
  mounted: function () {
    if (this.$store.state.UUID === -1) {
      this.$router.push("/coments");
      return;
    }
    this.$store.dispatch("getComentInfos");
  },
  beforeMount() {
    //Je récupère la liste des coments
    this.getComentList();
  },
  methods: {
    getComentList() {
      this.apiComents
        .get("")
        .then((response) => {
          this.coments = response.data;
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>