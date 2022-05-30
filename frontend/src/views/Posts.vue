<template>
  <div class="postForm">
    <navPosts />
    <div class="form-control-input">
      <div class="post-card-wrap">
        <div class="containerRecent">
          <h1>Publication récentes</h1>
          <div class="post-cards">
            <h1>joseph</h1>
            <PostCards v-for="post in posts" :key="post.id" :postId="post.id" />
          </div>
        </div>
      </div>
      <div>
        <div class="publierForm">
          <!-- Formulaire de création d'un post-->
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
                class="btn btn-primary btnPublication"
                @click="postCreate()"
                :class="{ 'btn--disabled': !validatedFields }"
              >
                <span v-if="status == 'loading'">Publication en cours....</span>
                <span v-else>Nouvelle publication</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Afficher la liste des posts-->
        <div class="col-md-8 col-xl-6 middle-wrapper">
          <div class="row">
            <div
              v-show="posts.length > 0"
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
                        <div class="avatar" v-if="post.user.attachment">
                          <img
                            style="height: 65px; width: 55px"
                            x="0"
                            y="0"
                            height="100%"
                            width="100%"
                            class="imgUser"
                            alt="Image du profil"
                            v-bind:src="post.user.attachment"
                            loading="lazy"
                          />
                        </div>
                        <div class="avatar" v-else>
                          <img
                            style="height: 55px; width: 55px"
                            x="0"
                            y="0"
                            height="100%"
                            width="100%"
                            class="avatarProfil"
                            src="../assets/Icons/user-alt-light.svg"
                            alt="avatar"
                          />
                        </div>
                        <div>
                          <div class="userPost">
                            <p class="textUser">{{ post.user.username }}</p>
                          </div>
                          <!-- <br /> -->
                          <div class="datePost">
                            <p>Posté le : {{ post.createdAt }}</p>
                          </div>
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
                  <img
                    class="imgPost"
                    :src="post.attachment"
                    alt="Image du post"
                  />
                </div>
                <!-- Gestion du post -->
                <div class="card-footer">
                  <div class="d-flex post-actions">
                    <!-- <PostLikes
                      v-bind:to="'/PostLikes/' + post.id"
                      :postId="post.id"
                    /> -->
                    <div class="menuPost">
                      <div class="linkPost">
                        <routeur-link
                          v-bind:to="'/PostLikes/' + postId"
                          class="d-flex align-items-center text-muted mr-4"
                          ><svg
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
                          <button
                            type="button"
                            class="btn btn-like"
                            @click="postLikeCreate()"
                            :postId="post.id"
                            :class="{ 'btn--disabled': !validatedFields }"
                          >
                            <span v-if="status == 'loading'">Like ....</span>
                            <span v-else>
                              <p class="d-none d-md-block ml-2">
                                {{ post.likes.length }} J'aime <br />
                              </p>
                            </span>
                          </button>
                        </routeur-link>
                      </div>
                      <div class="linkPost">
                        <router-link v-bind:to="'/ModalComent/' + postId">
                          <div class="linkModal">
                            <div>
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
                            </div>
                            <div>
                              <p class="d-none d-md-block ml-2">
                                {{ post.coments.length }} Commentaire <br />
                              </p>
                            </div>
                          </div>
                        </router-link>
                      </div>
                      <div class="linkPost">
                        <div class="dropdown" data-dropdown>
                          <button class="link" data-dropdown-button>
                            Menus
                          </button>
                          <div class="dropdown-menu information-grid">
                            <div class="dropdown-heading"></div>
                            <div class="dropdown-links">
                              <!-- Supprimer un post -->

                              <a
                                href="javascript:;"
                                class="d-flex align-items-center text-muted"
                              >
                                <div class="flexMenu">
                                  <div>
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
                                      <polyline
                                        points="16 6 12 2 8 6"
                                      ></polyline>
                                      <line
                                        x1="12"
                                        y1="2"
                                        x2="12"
                                        y2="15"
                                      ></line>
                                    </svg>

                                    <!-- <div class="btnFooter"> -->
                                    <!-- type="button" -->
                                    <button
                                      class="link"
                                      data-dropdown-button
                                      @click="postDeleted(post.id)"
                                      :class="{
                                        'btn--disabled': !validatedFields,
                                      }"
                                    >
                                      <span v-if="status == 'loading'"
                                        >Suppression en cours....</span
                                      >
                                      <span v-else>Supprimer</span>
                                    </button>
                                  </div>
                                  <!-- </div> -->
                                  <!-- Modifier un post -->
                                  <div class="btnFooter">
                                    <router-link
                                      v-bind:to="'/PostsUpdate/' + post.id"
                                    >
                                      <button
                                        type="button"
                                        class="btn"
                                        @click="postModify()"
                                        :postId="post.id"
                                        :class="{
                                          'btn--disabled': !validatedFields,
                                        }"
                                      >
                                        <span v-if="status == 'loading'"
                                          >Modification en cours....</span
                                        >
                                        <span v-else>Modifier</span>
                                      </button>
                                    </router-link>
                                  </div>
                                  <!-- <p class="d-none d-md-block ml-2">Supprimer</p> -->
                                  <!-- Details d'un post -->
                                  <div class="btnFooter">
                                    <router-link
                                      v-bind:to="'/PostDetails/' + post.id"
                                    >
                                      <button
                                        type="button"
                                        class="btn"
                                        @click="postDetails()"
                                        :postId="post.id"
                                        :class="{
                                          'btn--disabled': !validatedFields,
                                        }"
                                      >
                                        <span v-if="status == 'loading'"
                                          >Ouverture du formulaire en
                                          cours....</span
                                        >
                                        <span v-else>Details du post</span>
                                      </button>
                                    </router-link>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <comentsCreate :postId="post.id" />
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
//Barre de navigation
import navPosts from "@/components/NavPosts.vue";
//Les views
import postDetails from "@/views/PostDetails.vue";
import postsCards from "@/views/PostsCards.vue";
//Les components
import postsUpdate from "@/components/PostsUpdate.vue";
import postCardRecent from "@/components/PostCardRecent.vue";
import comentsCreate from "@/components/ComentsCreate.vue";
import modalComent from "@/components/ModalComent.vue";
import PostLikes from "@/components/PostLikes.vue";

export default {
  name: "Posts",
  components: {
    navPosts,
    postsUpdate,
    postsCards,
    postCardRecent,
    postDetails,
    comentsCreate,
    modalComent,
    PostLikes,
  },
  props: ["postlikes"],

  data: function () {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
        user: null,
        admin: null,
      },

      //Lister tous les posts
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      posts: [], //Permet l'affichage des posts sur le front.
    };
  },
  // async mounted() {
  //   const res = await axios.get(
  //     `api/posts/${this.$route.params.id}/like/${this.$store.state.user.userId}`
  //   );
  //   this.likes = res.like;
  // },
  beforeMount() {
    //Je récupère la liste des posts
    this.getPostList();
  },
  beforeMount() {
    //Je récupère la liste des likes
    this.getLikeList();
  },
  computed: {
    postCardRecent() {
      return this.$store.state.postCardRecent;
    },
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
    getLikeList() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    postLikeCreate: function (req, res) {
      this.apiPosts
        .put(
          `http://localhost:3000/api/posts/${this.$route.params.id}/like/${this.$store.state.user.userId}`,
          {
            postId: this.$route.params.id,
            userId: this.userId,
            likes: this.like,
          }
        )
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getLikesList();
        })
        .catch(function () {});
    },
    //Afficher un post (Methode "get"(show id){})
    getPostOne() {
      console.log("tst");
      this.apiPosts
        .get("")
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
          window.location.reload();
          this.$router.push("/posts");
          this.getPostList();
        })
        .catch(function () {});
    },
    //Supprimer un post (Methode "delete"(id){})
    postDeleted: function (id) {
      this.apiPosts
        .delete("http://localhost:3000/api/posts/" + id)
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getPostList();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
/************************ 
Voir les posts récents 
************************/
.blog-card-wrap,
h1 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

.updates,
.container {
  padding: 0px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  @media (min-width: 800px) padding: 125px 25px;
  display: block;
  flex-direction: row;
}

.router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
  @media (min-width: 800px) {
    margin-left: auto;
  }
}

h2 {
  font-weight: 300;
  font-size: 32px;
  /* max-width: 425px; */
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  @media (min-width: 800px) {
    text-align: initial;
    font-size: 40px;
  }
}
/***************************
fin Voir les posts recents 
***************************/

.btn-warning {
  margin: 0 5px;
}
.containerRecent {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  border-radius: 1rem;
}

/***********************************
Formulaire de publication des posts
***********************************/
.publierForm {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  margin-bottom: 2.2rem;
  border-radius: 1rem;
}
.formGroup {
  display: flex;
  flex-direction: column-reverse;
  width: auto;
}
.form-control {
  display: flex;
  width: auto;
  margin: 0 1rem 0 1rem;
}
.formFilePublich {
  display: flex;
  width: 100%;
}
.btnPublication {
  border: none;
  color: #141313;
  background: white;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 0.375rem 0.75rem;
  font-weight: 700;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}

/**********************************
Affichage de la liste des posts
**********************************/
.col-md-8 {
  width: auto;
  margin: 5px;
}
.row {
  padding-left: 0;
  padding-right: 0;
}
img {
  margin: auto;
}
/********************************
***********Card header***********
*********************************/
.card-header {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  /* padding: 0px 0px 5px 5px; */
  border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
}
.justify-content-between {
  justify-content: space-around;
}
.justify-content {
  justify-content: space-around;
  margin: auto;
}
.ml-2 {
  display: flex;
}
.avatar {
  display: contents;
}
.imgUser {
  border-radius: 5rem;
}
.avatarProfil {
  width: auto;
  height: auto;
}
.userPost {
  display: flex;
  align-content: center;
  align-items: center;
  margin: 1rem 0 0 1rem;
}
.textUser {
  margin: 0;
}
.datePost {
  margin: 0 0 0 1rem;
}
.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  opacity: 0;
}
/*******************************
***********Card body************
********************************/
.card-body {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}
.imgPost {
  width: 40%;
}
/*******************************
***********Card footer**********
********************************/
.card-footer {
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}
.post-actions {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
}
.menuPost {
  display: flex;
  align-items: center;
  align-content: center;
  margin: auto;
}
.linkPost {
  margin: 0 7rem 0 2rem;
}
.d-none {
  margin-bottom: 0;
}
.linkModal {
  display: flex;
}
.link {
  background: none;
  border: none;
  text-decoration: none;
  color: #777;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0;
}
.information-grid {
  display: grid;
  /* grid-template-columns: repeat(2, -webkit-max-content); */
  grid-template-columns: repeat(2, max-content);
  gap: 1rem;
}
.dropdown-links {
  display: flex;
  flex-direction: column;
}
.flexMenu {
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