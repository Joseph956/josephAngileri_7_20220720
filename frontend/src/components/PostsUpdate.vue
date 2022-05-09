<template>
  <div>
    <navProfil />
    <!-- TEMPLATE MODIFICATION D'UN POST-->
    <h1>Modifier un post</h1>
    <form enctype="multipart/form-data">
      <!-- Titre du post -->
      <div class="form-group">
        <label for="title">Modifier le titre de votre message</label>
        <input
          ref="firstfield"
          v-model="posts.title"
          type="text"
          id="title"
          class="form-control"
          placeholder="Modifier le titre de votre message"
        />
      </div>
      <!-- Contenu du post -->
      <div class="form-group">
        <label for="content">Modifier le contenu du message</label>
        <textarea
          v-model="posts.content"
          type="text"
          id="content"
          class="form-control"
          placeholder="Modifier le contenu du message"
        />
      </div>
      <!-- Affichage de l'image du post avant publication-->
      <div class="formGroup">
        <img :src="posts.attachment" class="w-50 rounded" />
      </div>
      <!-- Choix de l'image du post -->
      <div class="formGroup">
        <label for="file"></label><br />
        <input
          class="fileFormCtrl"
          id="file"
          ref="file"
          type="file"
          name="image"
          accept="image/*"
          @change="onFileSelected()"
        />
      </div>
      <!-- Publier un post -->
      <div class="formGroup">
        <button
          type="button"
          class="btn btn-primary"
          @click="postUpdate()"
          :class="{ 'btn--disabled': !validatedFields }"
        >
          <span v-if="status == 'loading'">Publication en cours....</span>
          <span v-else>Modifier la publication</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";

export default {
  name: "PostsUpdate",
  components: { navProfil },
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
        title: null,
        attachment: null,
        content: null,
      },
    };
  },
  beforeMount() {
    //Je récupère la liste des posts
    this.getPostOne();
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "publication") {
        if (this.title != "" && this.content != "" && this.attachment != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.title != "" && this.content != "") {
          return true;
        } else {
          return false;
        }
      }
    },
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
        .catch(function () {});
    },
    //Modifier un post (Methode "update"(id, data){})
    postUpdate: function () {
      const dataPost = new FormData();
      dataPost.append("title", this.posts.title);
      dataPost.append("content", this.posts.content);
      dataPost.append("image", this.file);
      this.apiPosts
        .put(
          "http://localhost:3000/api/posts/" + this.$route.params.id,
          dataPost
        )
        .then(() => {
          window.location.reload();
          this.$router.push("/posts/");
          this.getPostOne();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>