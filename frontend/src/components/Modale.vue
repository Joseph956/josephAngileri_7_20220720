<template>
  <!-- v-if="revele" -->
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" @click="toggleModale">
      <div class="modale card">
        <div @click="toggleModale" class="btn-modale btn btn-danger">X</div>
        <div class="modal-content">
          <h2>Module d'image</h2>
          <div class="modal-photo">
<!-- <img v-bind:src="post.attachment" alt=""> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapState } from "vuex";
export default {
  name: "Modale",
  props: ["revele", "toggleModale"],
  data: function () {
    return {
      //Afficher les infos du post à modifier
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      posts: {
        attachment: null,
      },
    };
  },
  beforeMount() {
    //Je récupère le post choisi
    this.getPostOne();
  },
  computed: {
    ...mapState(["status"]),    
  },
  methods: {
    //methode définition image
    onFileSelected() {
      this.file = this.$refs.file.files[0];
      this.posts.attachment = URL.createObjectURL(this.file);
    },
    //Afficher un post (Methode "get"(show id){})
    getPostOne() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  background: rgba(219, 216, 216, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  border-radius: 2rem;
  position: fixed;
  top: 50%;
  left: 38%;
}
.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>