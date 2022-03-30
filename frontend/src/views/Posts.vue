<template>
  <div class="postForm">
    <div class="form-control_input">
      <div>
        <div>
          <!-- TEMPLATE CREATION D'UN POST-->
          <form>
            <div>
              <button
                type="button"
                class="btn btn-warning"
                @click="PostCreate()"
              >
                <span v-if="status == 'loading'">Publication en cours....</span>
                <span v-else>Nouvelle publication</span>
              </button>
            </div>
            <div class="form-group">
              <label for="title"></label>
              <input
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
              <label class="labelFile">Ajouter une image à votre post</label
              ><br />
              <input
                ref="postImage"
                type="file"
                name="postImage"
                id="imageInput"
                accept="attachment/*"
                @change="onFileSelected"
              />
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
                <div class="card-header">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center">
                      <div class="ml-2 justify-content">
                        <div class="avatar">
                          <input type="image" />
                          <img
                            class="imgUser"
                            alt=""
                            :src="post.attachment"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div class="userPost">
                            <p>{{ post.user.username }}</p>
                            <p>{{ post.createdAt }}</p>
                          </div>
                          <br />
                          <div class="datePost"></div>
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
                <div class="card-body">
                  <p class="mb-3 tx-14">{{ post.title }}</p>
                  <p class="mb-3 tx-14">{{ post.content }}</p>
                  <img class="imgPost" :src="post.attachment" alt="" />
                  <!-- Créer un commentaire -->
                  <div class="form-group">
                    <label for="coment"></label>
                    <textarea
                      v-model="coment"
                      type="text"
                      id="coment"
                      class="form-control"
                      placeholder="Coment"
                    />
                  </div>
                  <button @click="comentCreate" class="btn btn-warning">
                    Commenter le post
                  </button>
                  <p
                    v-for="coment in post.coments"
                    :key="coment"
                    class="comentPost"
                  >
                    {{ coment.coment }}
                  </p>
                </div>
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
                      <p class="d-none d-md-block ml-2">Supprimer</p>
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

export default {
  name: "Posts",

  data() {
    return {
      title: null,
      content: null,
      file: null,
      username: null,
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
    if (this.$store.state.UUID === -1) {
      this.$router.push("/posts");
      return;
    }
  },
  beforeMount() {
    //Je récupère la liste des post
    this.getPostList();
  },
  methods: {
    //methode définition image
    onFileSelected() {
      this.file = this.$refs.postImage.files[0];
    },
    //Lister tous les posts
    getPostList() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    //Créer un nouveau post
    PostCreate() {
      this.apiPosts
        .post("http://localhost:3000/api/posts", {
          title: this.title,
          content: this.content,
          image: this.file,
          userId: localStorage.getItem("userId"), //@todo récupérer le userId à partir de localstorage
        })
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
          console.log("------> response.data");
        })
        .catch(function () {});
    },

    //Créer un nouveau commentaire
    comentCreate() {
      this.apiComents
        .post("http://localhost:3000/api/coments", {
          id: this.id,
          userId: this.userId,
          postId: this.postId,
          coment: this.coment,
        })
        .then((response) => {
          this.coment = response.data;
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
  /* display: flex; */
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
}
.imgPost {
  width: 100%;
  height: 30vw;
}
img {
  margin: auto;
  border-radius: 5rem;
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
  margin: 2rem 0px;
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