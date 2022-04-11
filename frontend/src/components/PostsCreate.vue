<template>
  <div>
    <h1>Création d'un post</h1>
    <div>
          <!-- TEMPLATE CREATION D'UN POST-->
          <!-- class="uploadImg" action="/posts" method="POST" -->
          <form enctype=“multipart/form-data>
            <div class="form-group" >
              <label for="title"></label>
              <input
                ref="firstfield"
                v-model="title"
                type="text"
                id="title"
                class="form-control"
                placeholder="Title"
              />
            </div>
            <div class="form-group">
              <label for="content"></label>
              <textarea
                v-model="content"
                type="text"
                id="content"
                class="form-control"
                placeholder="Content"
              />
            </div>
            <div class="formGroup">
              <label for="postImage"
                >Choisir votre image</label
              ><br />
              <input
                ref="postImage"
                type="file"
                name="postImage"
                accept="image/*"
                @change="onFileSelected"
              />
            </div>
            <div class="formGroup">
              <button
                type="button"
                class="btn btn-primary"
                @click="PostCreate()"
                :class="{ 'btn--disabled': !validatedFields }"
              >
                <span v-if="status == 'loading'">Publication en cours....</span>
                <span v-else>Nouvelle publication</span>
              </button>
            </div>
          </form>
        </div>

  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "PostsCreate",
  data: function () {
    return {
      title: null,
      content: null,
      attachment: null,
      file: null,
      //Lister tous les posts
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
  methods: {
    //Créer un nouveau post
    PostCreate: function () {
      const formDataPost = new FormData();
      this.apiPosts
        .post("http://localhost:3000/api/posts", {
          title: this.title,
          text: this.content,
          image: this.attachment,
          users: this.userId,
          userId: localStorage.getItem("userId"),
        })
        .then((formDataPost) => {
          this.posts = formDataPost.data;
          // localStorage.setItem("user", JSON.stringify(userId));
          console.log(response.data);
          console.log("------> response.data");
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>