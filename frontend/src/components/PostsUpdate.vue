<template>
  <div>
    <navPosts />
    <!-- TEMPLATE MODIFICATION D'UN POST-->
    <div class="containTitle">
      <div class="logoTransparentUpdateProfile">
        <img
          style="height: 2.5rem; width: 2.5rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          src="../assets/logo_transparent.png"
          alt="logo"
        />
      </div>
      <div class="cardTitle">
        <h1>Modifier votre post</h1>
        <div class="separatorUpdateUser"></div>
      </div>
    </div>
    <div class="imgBottom">
      <div class="containPostUpdate">
        <form enctype="multipart/form-data">
          <!-- Titre du post -->
          <div class="form-group">
            <label for="title">
              <h3 class="titlePostUpdate">Modifier le titre</h3>
            </label>
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
            <label for="content"><h3>Modifier le contenu</h3></label>
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
          <!-- Choix de l'image du post -->
          <div class="selectBottom">
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
          </div>
          <!-- Publier un post -->
          <div class="formGroup">
            <button
              type="button"
              class="btn btn-primary btnPublication"
              @click="postUpdate()"
              :disabled="!validatedFields"
            >
              <span v-if="status == 'loading'">Publication en cours....</span>
              <span v-else>Modifier la publication</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <p class="alert alert-info text-danger">{{ mesgError }}</p>
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
    onFileSelected() {
      this.file = this.$refs.file.files[0];
      this.posts.attachment = URL.createObjectURL(this.file);
    },
    getPostOne() {
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.posts = response.data;
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
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
              this.$router.push("/postdetails/" + this.$route.params.id);
            }
          })
          .catch((error) => {
            this.mesgError = error.response.data.message;
            alert(this.mesgError);
          });
      }
    },
  },
};
</script>

<style>
.containPostUpdate {
  border-radius: 1rem;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 0 #4e51665b;
  border: 0.5px solid #ffd6d6;
}
.titlePostUpdate {
  margin: 0 0 0 0;
}
.imgPostUpdate {
  margin-top: 2rem;
}
</style>