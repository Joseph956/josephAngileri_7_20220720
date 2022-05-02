<template>
  <div>
    <navProfil />
    <!-- TEMPLATE MODIFICATION D'UN POST-->
    <h1>Modifier un post</h1>
    <form enctype="multipart/form-data">
      <!-- Titre du post -->
      <div class="form-group">
        <label for="title">Modifier le titre</label>
        <input
          ref="firstfield"
          v-model="title"
          type="text"
          id="title"
          class="form-control"
          placeholder="Titre de votre message"
        />
      </div>
      <!-- Contenu du post -->
      <div class="form-group">
        <label for="content"></label>
        <textarea
          v-model="content"
          type="text"
          id="content"
          class="form-control"
          placeholder="Contenu de votre message"
        />
      </div>
      <!-- Affichage de l'image du post avant publication-->
      <div class="formGroup">
        <img :src="image" class="w-50 rounded" />
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
    <!-- Affichage du post -->
    <div class="col-md-8 col-xl-6 middle-wrapper">
      <div class="row">
        <div
          v-show="posts.length > 0"
          v-for="post in posts"
          :key="post.id"
          class="col-md-12 grid-margin"
        >
          <div class="card rounded">
            <div class="card-body">
              <p class="mb-3 tx-14">{{ post.title }}</p>
              <p class="mb-3 tx-14">{{ post.content }}</p>
              <img class="imgPost" :src="post.attachment" alt="" />
              <div class="datePost">
                <p>Posté le :{{ post.createdAt }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";

export default {
  name: "PostsUpdate",
  components: { navProfil },
  props: {
    title: String,
    content: String,
    attachment: String,
    postId: Number,
    userId: Number,
  },
  data: function () {
    return {
      post: {
        title: this.title,
        content: this.content,
        attachment: this.attachment,
        postId: this.postId,
        userId: this.userId,
      },
      //Afficher le post à modifier
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      posts: [],
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId === -1) {
      this.$router.push(`/posts/${id}`);
      return;
    }
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
      this.image = URL.createObjectURL(this.file);
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
      dataPost.append("title", this.title);
      dataPost.append("content", this.content);
      dataPost.append("image", this.file);
      dataPost.append("userId", this.$store.state.user.userId);
      dataPost.append("postId", this.$store.state.user.postId);
      this.apiPosts
        .put("http://localhost:3000/api/posts/" + id, dataPost)
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getPostOne();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>