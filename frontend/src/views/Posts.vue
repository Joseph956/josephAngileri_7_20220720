<template>
  <div class="postForm">
    <navPosts />
    <div class="form-control_input">
      <div>
        <div>
          <!-- TEMPLATE CREATION D'UN POST-->
          <h1>Publier un post</h1>
          <form enctype="multipart/form-data">
            <!-- Titre du post -->
            <div class="form-group">
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
            <!-- Contenu du post -->
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
                @click="postCreate()"
                :class="{ 'btn--disabled': !validatedFields }"
              >
                <span v-if="status == 'loading'">Publication en cours....</span>
                <span v-else>Nouvelle publication</span>
              </button>
            </div>
          </form>
        </div>

        <!-- LIST DES POSTS-->
        <div class="col-md-8 col-xl-6 middle-wrapper">
          <div class="row">
            <div
              v-for="post in posts"
              :key="post.id"
              class="col-md-12 grid-margin"
            >
              <div class="card rounded">
                <!-- Infos créateur du post -->
                <div class="card-header">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center">
                      <div class="ml-2 justify-content">
                        <div class="avatar">
                          <input type="text" />
                          <img
                            class="imgUser"
                            alt=""
                            :src="post.user.attachment"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div class="userPost">
                            <p>{{ post.user.username }}</p>
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>
                    <div class="dropdown">
                      <button
                        class="btn p-0"
                        type="button"
                        id="dropdownMenuButton2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-more-horizontal icon-lg pb-3px"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-meh icon-sm mr-2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="8" y1="15" x2="16" y2="15"></line>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                          </svg>
                          <span class="">Unfollow</span></a
                        >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-corner-right-up icon-sm mr-2"
                          >
                            <polyline points="10 9 15 4 20 9"></polyline>
                            <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
                          </svg>
                          <span class="">Go to post</span></a
                        >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-share-2 icon-sm mr-2"
                          >
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line
                              x1="8.59"
                              y1="13.51"
                              x2="15.42"
                              y2="17.49"
                            ></line>
                            <line
                              x1="15.41"
                              y1="6.51"
                              x2="8.59"
                              y2="10.49"
                            ></line>
                          </svg>
                          <span class="">Share</span></a
                        >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-copy icon-sm mr-2"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path
                              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                            ></path>
                          </svg>
                          <span class="">Copy link</span></a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Affichage du post -->
                <div class="card-body">
                  <p class="mb-3 tx-14">{{ post.title }}</p>
                  <p class="mb-3 tx-14">{{ post.content }}</p>
                  <img class="imgPost" :src="post.attachment" alt="" />
                  <div class="datePost">
                    <p>{{ post.createdAt }}</p>
                  </div>
                  <comentsCreate />
                </div>
                <!-- Gestion du post -->
                <div class="card-footer">
                  <div class="d-flex post-actions">
                    <a
                      href="javascript:;"
                      class="d-flex align-items-center text-muted mr-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-heart icon-md"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                        ></path>
                      </svg>
                      <p class="d-none d-md-block ml-2">
                        {{ post.likes.length }}
                      </p>
                    </a>
                    <a
                      href="javascript:;"
                      class="d-flex align-items-center text-muted mr-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-message-square icon-md"
                      >
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        ></path>
                      </svg>
                      <p class="d-none d-md-block ml-2">
                        {{ post.coments.length }} <br />
                      </p>
                    </a>
                    <a
                      href="javascript:;"
                      class="d-flex align-items-center text-muted"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-share icon-md"
                      >
                        <path
                          d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                        ></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                      </svg>
                      <!-- Supprimer un post -->
                      <div class="btnFooter">
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="postDeleted(post.id)"
                          :class="{ 'btn--disabled': !validatedFields }"
                        >
                          <span v-if="status == 'loading'"
                            >Suppression en cours....</span
                          >
                          <span v-else>Supprimer</span>
                        </button>
                      </div>
                      <!-- Modifier un post -->
                      <div class="btnFooter">
                        <router-link to="PostsUpdate">
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="postModify(post.id)"
                            :class="{ 'btn--disabled': !validatedFields }"
                          >
                            <span v-if="status == 'loading'"
                              >Modification en cours....</span
                            >
                            <span v-else>Modifier</span>
                          </button>
                        </router-link>
                      </div>
                      <!-- <p class="d-none d-md-block ml-2">Supprimer</p> -->
                      <div class="btnFooter">
                        <router-link to="PostDetails">
                          <button type="button" class="btn btn-primary">
                            Détails du post
                          </button>
                        </router-link>
                      </div>
                    </a>
                  </div>
                </div>
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
import navPosts from "@/components/NavPosts.vue";
import postDetails from "@/views/PostDetails.vue";
import comentsCreate from "@/components/ComentsCreate.vue";

export default {
  name: "Posts",
  components: {
    comentsCreate,
    navPosts,
    postDetails,
  },

  data: function () {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
      },

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
    //Lister tous les posts (Methode "get"(data){})
    getPostList() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    //Afficher un post (Methode "get"(show id){})
    getPostOne() {
      this.apiPosts
        .get("/:id")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    //Créer un nouveau post (Methode "create"(data){}
    postCreate: function () {
      const dataPost = new FormData();
      dataPost.append("title", this.title);
      dataPost.append("content", this.content);
      dataPost.append("image", this.file);
      dataPost.append("userId", this.$store.state.user.userId);
      this.apiPosts
        .post("http://localhost:3000/api/posts", dataPost)
        .then(() => {
          this.getPostList();
        })
        .catch(function () {});
    },
    //Modifier un post (Methode "update"(id, data){})
    postModify: function (id) {
      const dataPost = new FormData();
      dataPost.append("title", this.title);
      dataPost.append("content", this.content);
      dataPost.append("image", this.file);
      dataPost.append("userId", this.$store.state.user.userId);
      this.apiPosts
        .put("http://localhost:3000/api/posts/" + id, dataPost)
        .then(() => {
          this.getPostList();
        })
        .catch(function () {});
    },
    //Supprimer un post (Methode "delete"(id){})
    postDeleted: function (id) {
      this.apiPosts
        .delete("http://localhost:3000/api/posts/" + id)
        .then(() => {
          this.getPostList();
          this.$router.push("/posts");
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
.btn-warning {
  margin: 0 5px;
}
.card-header {
  padding: 0;
}
.ml-2 {
  display: flex;
}
.col-md-8 {
  width: auto;
  margin: 5px;
}
.justify-content-between {
  justify-content: space-around;
}
.justify-content {
  justify-content: space-around;
  margin: auto;
}
.imgUser {
  width: 10vw;
  height: 10vw;
  border-radius: 5rem;
}
.imgPost {
  width: 40%;
}
img {
  margin: auto;
}
.userPost {
  margin: 1rem 0 0 1rem;
}
.datePost {
  margin: 0 0 0 1rem;
}
.comentPost {
  margin: 1rem;
}
.postForm {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
  flex-wrap: wrap;
}
.form-control_input {
  padding: 2 rem;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-control_input::placeholder {
  color: #a3a2a2;
}
</style>