<template>
  <div>
    <navPosts />
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
          autofocus
          required
        >
        </textarea>
      </div>
      <!-- Affichage de l'image du post avant publication-->
      <div class="formGroup">
        <div class="imgPostUpdate" v-if="posts.attachment">
          <img :src="posts.attachment" class="w-50 rounded" />
        </div>
        <div v-else>
          <img
            style="height: 15rem; width: 25rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            class="avatarPost"
            src="../assets/Icons/BiCardImg.svg"
            alt=""
          />
        </div>
      </div>
    </form>
    <p class="alert alert-info text-danger">{{ mesgError }}</p>
    <!-- Choix de l'image du post -->
    <div class="formGroup">
      <label for="file"></label><br />
      <input
        class="formFilePublich"
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
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";

export default {
  name: "PostsUpdate",
  components: { navPosts },
  data: function () {
    return {
      mesgError: "",
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
    //Je récupère le post choisi
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
        .get("/")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //Modifier un post (Methode "update"(id, data){})
    postUpdate: function () {
      const dataPost = new FormData();
      dataPost.append("title", this.posts.title);
      dataPost.append("content", this.posts.content);
      dataPost.append("image", this.file);
      if (window.confirm("Voulez-vous vraiment modifier votre post ?")) {
        this.apiPosts
          .put(
            "http://localhost:3000/api/posts/" + this.$route.params.id,
            dataPost
          )
          .then((response) => {
            if (!response.data) {
              return (this.mesgError = error.response.data.message);
            } else {
              window.location.reload();
              this.$router.push("/posts/");
              this.getPostOne();
            }
          })
          .catch((error) => {
            alert((this.mesgError = error.response.data.message));
          });
      }
    },
  },
};
</script>

<style>
</style>