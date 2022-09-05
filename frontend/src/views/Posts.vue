<template>
  <div class="postForm">
    <navPosts />
    <div class="form-grouProfile" v-if="user.imgBottom">
      <img
        style="height: auto; width: 100%"
        x="0"
        y="0"
        height="100%"
        width="100%"
        id="imgBottomUser"
        v-bind:src="user.imgBottom"
        alt="Image de fond compte utilisateur"
      />
    </div>
    <div class="form-grouProfile" v-else>
      <img
        style="height: 25vw; width: 100%"
        x="0"
        y="0"
        height="100%"
        width="100%"
        id="imgBottomAvatarGpm"
        src="../assets/grpm.png"
        alt="avatar"
      />
    </div>
    <div></div>
    <div class="form-control-input">
      <div class="post-card-wrap"></div>
      <div>
        <div class="publierForm">
          <!-- Formulaire de création d'un post-->
          <div class="imgBottom">
            <form class="formPublish" enctype="multipart/form-data">
              <div class="containerLogo">
                <div class="publish">
                  <div class="logoTransparentPost">
                    <img
                      style="height: 2.5rem; width: 2.5rem"
                      x="0"
                      y="0"
                      height="100%"
                      width="100%"
                      src="../assets/logo_transparent.png"
                      alt=""
                    />
                  </div>
                  <div class="titlePublish">
                    <h1>Publications</h1>
                  </div>
                  <div class="iconPencil">
                    <div class="formGroup" v-if="mode == 'publishPost'">
                      <div>
                        <button
                          type="button"
                          class="btn"
                          @click="switchToPost()"
                        >
                          <img
                            src="../assets/Icons/BiPenFill.svg"
                            alt="Créer une publication"
                          />
                          <span v-if="status == 'loading'"
                            >publication....</span
                          >
                          <span v-else></span>
                        </button>
                      </div>
                    </div>
                    <div class="formGroup" v-else>
                      <div>
                        <button
                          type="button"
                          class="btn"
                          @click="switchToNewPost()"
                        >
                          <img
                            src="../assets/Icons/BiPenFill.svg"
                            alt="Créer une publication"
                          />
                          <span v-if="status == 'loading'"
                            >Créer une publication....</span
                          >
                          <span v-else></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="separatorPostsUser"></div>
              </div>

              <!-- Titre du post -->
              <div class="form-group" v-if="mode == 'publication'">
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
              <div class="form-group" v-if="mode == 'publication'">
                <label for="content"></label>
                <textarea
                  v-model="content"
                  type="text"
                  id="content"
                  cols="30"
                  rows="10"
                  class="form-control"
                  placeholder="Contenu de votre message"
                >
                </textarea>
              </div>
              <!-- Affichage de l'image du post avant publication-->
              <div class="formGroup publish" v-if="mode == 'publication'">
                <div class="formGroup">
                  <div class="imgPostForm" v-if="attachment">
                    <img :src="attachment" class="w-50 rounded" />
                  </div>
                  <div v-else>
                    <img
                      style="height: 15rem; width: 100%"
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
              </div>
              <!-- Choix de l'image du post -->
              <div class="selectBottom">
                <div class="formGroup" v-if="mode == 'publication'">
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
                  @click="postCreate()"
                  :disabled="!validatedFields"
                >
                  <span v-if="status == 'loading'"
                    >Publication en cours....</span
                  >
                  <span v-else>Nouvelles Publications</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <!-- ScrollToTop button -->
          <button type="button" class="btnUp" @click="switchToUp()">
            <a
              class="bloc-button btn btn-d scrollToTop"
              @click="switchToUp('1')"
            >
              <span class="fa fa-chevron-up"></span>
            </a>
          </button>
          <!-- ScrollToTop button end-->
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
                            src="../assets/Icons/BiPersonCircle.svg"
                            alt="avatar"
                          />
                        </div>

                        <div class="userPost">
                          <div>
                            <div>{{ post.user.username }} <br /></div>
                            <p class="datePost">
                              Posté le :
                              {{ post.createdAt }}
                              <!-- {{ Dayjs(post.createdAt).locale("fr") }} -->
                              <!-- <span>{{
                                post.createdAt | Dayjs("daysInMonth")
                              }}</span> -->
                              <!-- {{ dayjs(post.createdAt).format("MMMM") }} -->
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="linkPost">
                      <div class="dropdown" data-dropdown>
                        <button
                          class="link"
                          data-dropdown-button
                          @click="dropdown()"
                          type="button"
                        >
                          ...

                          <!-- <img src="../assets/Icons/ariaCircle.svg" alt="" /> -->
                        </button>
                        <div class="dropdown-menu information-grid">
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <img src="../assets/Icons/infollow.svg" alt="" />
                            <span class="">Unfollow</span></a
                          >
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <img src="../assets/Icons/gotopost.svg" alt="" />
                            <span class="">Go to post</span></a
                          >
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <img src="../assets/Icons/share.svg" alt="" />
                            <span class="">Share</span></a
                          >
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <img src="../assets/Icons/copylynk.svg" alt="" />
                            <span class="">Copy link</span></a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Affichage du post -->
                <div class="card-body">
                  <p class="mb-3 tx-14">
                    <!-- Animation du titre -->
                    <router-link
                      class="external"
                      v-bind:to="'/PostDetails/' + post.id"
                    >
                      <div class="infos">
                        <h6 class="aspect">Afficher les détails du post :</h6>
                        {{ post.title }}
                      </div>
                    </router-link>
                    <!-- Fin animation du titre -->
                  </p>
                  <div class="separator"></div>
                  <!-- Texte du post -->
                  <div class="readMore">
                    <p class="mb-3 tx-14">{{ post.content }}</p>
                  </div>
                  <!-- Image du post -->
                  <div class="form-group">
                    <div v-if="post.attachment">
                      <img
                        class="imgPost"
                        style="width: 100%"
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        v-bind:src="post.attachment"
                        alt=""
                      />
                    </div>
                    <div v-else>
                      <img
                        class="imgPost"
                        style="width: 100%"
                        x="0"
                        y="0"
                        width="100%"
                        src="../assets/Icons/BiCardImg.svg"
                        alt="avatar"
                      />
                    </div>
                    <p class="alert alert-info text-danger">{{ mesgError }}</p>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="post-actions">
                    <div class="menuPost">
                      <div class="linksPost">
                        <div class="likesPost">
                          <div class="likes">
                            <routeur-link
                              v-bind:to="'/PostLikes/' + postId"
                              class="d-flex align-items-center text-muted mr-4"
                            >
                              <button
                                type="button"
                                class="btn btn-like"
                                @click="postLikeCreate(post.id)"
                              >
                                <span v-if="status == 'loading'"
                                  >Like ....</span
                                >
                                <span v-else>
                                  <div class="likeFlex">
                                    <img
                                      class="like"
                                      style="height: 1.5rem; width: 1.5rem"
                                      x="0"
                                      y="0"
                                      height="100%"
                                      width="100%"
                                      src="../assets/Icons/BiHandThumbsUpFill.svg"
                                      alt="liker la publication"
                                    />
                                    <div>
                                      <div class="linkLike">
                                        <p class="d-md-block ml-2">
                                          <span v-if="post.likes.length < 2">
                                            - {{ post.likes.length }} - Like<br
                                          /></span>
                                          <span v-else>
                                            - {{ post.likes.length }} - likes<br
                                          /></span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </span>
                              </button>
                            </routeur-link>
                          </div>
                        </div>
                        <div class="comentsPost">
                          <router-link
                            class="displayComents"
                            @click="displayAllComents()"
                            v-bind:to="`/ComentsList/${post.id}`"
                          >
                            <div class="linkItems">
                              <img
                                src="../assets/Icons/coment.svg"
                                alt="commentaires"
                              />
                            </div>
                            <div class="linkComent">
                              <p class="d-md-block ml-2">
                                <span v-if="post.coments.length < 2">
                                  - {{ post.coments.length }} - Commentaire <br
                                /></span>
                                <span v-else>
                                  - {{ post.coments.length }} - Commentaires
                                  <br
                                /></span>
                              </p>
                            </div>
                          </router-link>
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
//Les components
import postsUpdate from "@/components/PostsUpdate.vue";
import comentsCreate from "@/components/ComentsCreate.vue";
import comentsList from "@/components/ComentsList.vue";
import dayjs from "dayjs";

export default {
  name: "Posts",
  components: {
    dayjs,
    navPosts,
    postsUpdate,
    postDetails,
    comentsCreate,
    comentsList,
  },
  data: function () {
    return {
      mesgError: "",
      user: {
        imgBottom: this.imgBottom,
        attachment: this.attachment,
        username: this.username,
        email: this.email,
      },
      post: {
        title: null,
        content: null,
        attachment: null,
        user: null,
        admin: null,
        likes: null,
        revele: false,
      },
      mode: "publishPost",
      title: "",
      content: "",
      attachment: "",

      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      posts: [],
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/coments/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
    };
  },
  beforeMount() {
    this.getPostList();
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "publishPost") {
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
    switchToNewPost: function () {
      this.mode = "publishPost";
    },
    switchToPost: function () {
      this.mode = "publication";
    },
    toggleModale: function () {
      this.revele = !this.revele;
    },
    dropdown: function () {
      document.addEventListener("click", (e) => {
        const isDropdownButton = e.target.matches("[data-dropdown-button]");
        if (!isDropdownButton && e.target.closest("[data-dropdown]") != null)
          return;

        let currentDropdown;
        if (isDropdownButton) {
          currentDropdown = e.target.closest("[data-dropdown]");
          currentDropdown.classList.toggle("active");
        }

        document
          .querySelectorAll("[data-dropdown].active")
          .forEach((dropdown) => {
            if (dropdown === currentDropdown) return;
            dropdown.classList.remove("active");
          });
      });
    },
    onFileSelected() {
      this.file = this.$refs.file.files[0];
      this.attachment = URL.createObjectURL(this.file);
    },
    // dateView: function () {
    //   const datesPosts = document.querySelectorAll(".datePost");
    //   console.log(datesPosts);
    // },
    getPostList() {
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response) {
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
    getComentList() {
      this.apiComents
        .get("/")
        .then((response) => {
          if (!response) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.coments = response.data;
            window.location.reload();
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    //Liker ou disliker une publication
    postLikeCreate: function (postId) {
      this.apiPosts
        .put(
          `http://localhost:3000/api/posts/${postId}/like/${this.$store.state.user.userId}`,
          {
            postId: postId,
            userId: this.userId,
            likes: this.likeId,
          }
        )
        .then((response) => {
          if (!response) {
            return (this.mesgError = error.response.data.message);
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    //Créer une nouvelle publication
    postCreate: function () {
      const dataPost = new FormData();
      dataPost.append("title", this.title);
      dataPost.append("content", this.content);
      dataPost.append("image", this.file);
      dataPost.append("userId", this.$store.state.user.userId);
      this.apiPosts
        .post("http://localhost:3000/api/posts", dataPost)
        .then((response) => {
          if (!response) {
            return (this.mesgError = error.response.data.message);
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    //Lister tous les commentaires d'une publication
    displayAllComents: function () {
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.coments = response.data;
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    switchToUp: function () {
      const btnUp = document.querySelector(".btnUp");
      btnUp.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
    },
    // formatCreatedAt: function () {
    //   const now = dayjs();
    //   console.log(now.format());
    //   now("createdAt").format("MMMM");
    // },
  },
};
</script>

<style>
/************************ 
Voir les posts récents 
************************/

.btnUp {
  height: 3rem;
  width: 3rem;
  background: #4e51665a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  z-index: 1;
}
.icon {
  width: 50px;
}
.blog-card-wrap,
h1 {
  font-weight: 600;
  font-size: 35px;
  margin: 20px 0 20px 0;
}
@media screen and (max-width: 768px) {
  .blog-card-wrap,
  h1 {
    font-size: 25px;
  }
}

.updates,
.container {
  padding: 0px 25px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  display: block;
  flex-direction: row;
}
@media screen and (max-width: 768px) {
  .container {
    /* flex-direction: column; */
    padding-left: 0;
    padding-right: 0;
  }
  .avatarPost {
    width: 100%;
  }
}

.router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
}

@media (min-width: 800px) {
  .router-button {
    margin-left: auto;
  }
}
h2 {
  font-weight: 400;
  font-size: 32px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
@media (min-width: 800px) {
  h2,
  .router-button {
    font-size: 40px;
  }
}
/***************************
fin Voir les posts recents 
***************************/

.containerRecent {
  box-shadow: 0px 0px 10px #ffd7d7, -5px -5px 10px #4e51665a;
  border-radius: 1rem;
  margin: 1rem 0;
}
/***********************************
Formulaire de publication des posts
***********************************/
.publierForm {
  background-color: 4e5166;
  box-shadow: 0px 0px 10px #ffd7d7, -5px -5px 10px #4e51665a;
  margin-bottom: 2.2rem;
  border-radius: 1rem;
  outline: none;
}
.formPublish {
  background: #4e5166;
  border-radius: 1rem;
}
.containerLogo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 1rem;
  padding: 1.5rem 0 1rem 0;
}
@media screen and (max-width: 768px) {
  .containerLogo {
    flex-direction: column;
  }
}
.publish {
  display: flex;
  justify-content: center;
}
.logoTransparentPost {
  display: flex;
}
.titlePublish h1 {
  display: flex;
  margin: 0.7rem 1rem 0.7rem 1rem;
}
.iconPencil {
  display: flex;
  align-items: center;
}
.separatorPostsUser {
  width: 6rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 0 0 0.5rem -5.4rem;
}
@media screen and (max-width: 768px) {
  .separatorPostsUser {
    width: 4rem;
    margin: 0 0 0.5rem -4.4rem;
  }
}
@media screen and (max-width: 393px) {
  .publish {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .separatorPostsUser {
    margin: 0.5rem 0 0.5rem -0.4rem;
  }
}
@media screen and (max-width: 280px) {
  .publish {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .separatorPostsUser {
    margin: 0.5rem 0 0.5rem -0.4rem;
  }
}
.formGroup {
  display: flex;
  flex-direction: column-reverse;
  width: auto;
}
.form-group,
.publish {
  width: 95%;
  margin: 0 auto 0 auto;
}
.form-control {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  border: 0.5px solid #ffd6d6;
  background: #5c5c6c85;
  border-radius: 1rem;
}
.form-controlSignUp {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
}
.formFilePublich {
  display: flex;
  width: 100%;
  margin: 1rem auto 0 auto;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 0 #4e51665a;
  border: 0.5px solid #ffd6d6;
}
#file {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 0 #4e51665b;
  border: 0.5px solid #ffd6d6;
}
#createPost {
  display: flex;
}
.btnPublication {
  border: none;
  color: #4e516674;
  background: white;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 0.375rem 0.75rem;
  font-weight: 700;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e516674;
}

/**********************************
Affichage de la liste des posts
**********************************/
.col-md-8 {
  width: auto;
}
.row {
  padding-left: 0;
  padding-right: 0;
  margin-right: -2px;
  margin-left: -2px;
}
img {
  margin: auto;
}
@media screen and (max-width: 902px) {
  img {
    margin: auto;
  }
}
@media screen and (max-width: 768px) {
  img {
    margin: auto;
  }
}
@media screen and (max-width: 393px) {
  img {
    margin: auto;
  }
}
@media screen and (max-width: 280px) {
  img {
    margin: auto;
  }
}
/********************************
***********Card header***********
*********************************/
.card-header {
  box-shadow: 0px 0px 2px #ffd7d7, -5px -5px 5px #4e51665a;
  border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
}
.justify-content-between {
  justify-content: space-around;
}
.justify-content {
  text-align: left;
  justify-content: space-around;
  margin: auto;
}
.ml-2 {
  display: flex;
}
.avatar {
  display: contents;
}
/* @media screen and (max-width: 768px) {
  .justify-content {
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    flex-wrap: nowrap;
  }
  .ml-2 {
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    flex-wrap: nowrap;
  }
} */
@media screen and (max-width: 372px) {
  .d-flex {
    flex-direction: column-reverse;
  }
  .ml-2 {
    display: flex;
    flex-direction: column;
  }
}

.imgUser {
  border-radius: 5rem;
  object-fit: cover;
}
.avatarProfil {
  width: auto;
  height: auto;
}
.userPost {
  display: flex;
  align-content: center;
  align-items: center;
  flex: 1;
  overflow: hidden;
}
.datePost {
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .userPost {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.nameUser {
  font-weight: inherit;
}

.textUser {
  margin: 0;
}
.datePost {
  margin: 0 0 0 1rem;
}
@media screen and (max-width: 768px) {
  .textUser {
    margin-bottom: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .userPost {
    text-align: left;
    margin: 0 0 0 0.5rem;
  }
  .datePost {
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
}
@media screen and (max-width: 376px) {
  .userPost {
    text-align: center;
    margin: 0 0 0 0;
  }
  .datePost {
    margin: 0 0 0 1rem;
    text-align: left;
    display: contents;
  }
}
@media screen and (max-width: 280px) {
  .userPost {
    margin: 0 0 0 0;
  }
  .datePost {
    margin: 1rem 0 0 0;
    text-align: center;
    display: contents;
  }
}
.dropdown.active > .link,
.link:hover {
  color: black;
}
.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  box-shadow: 0px 0px 10px #ffd7d7, -5px -5px 10px #4e51665a;
  opacity: 0;
  transform: translate(1rem, 10px);
  background-color: #8c8c9f;
  pointer-events: none;
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
}
/* .dropdown.active > .link + .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
} */

.link {
  display: block;
  background: none;
  border: none;
  text-decoration: none;
  color: #777;
  font-family: inherit;
  font-size: 3rem;
  cursor: pointer;
  padding: 0;
}
.dropdown.active > .link + .dropdown-menu {
  opacity: 1;
  /* transform: translateY(0); */
  transform: translateX(-5rem);
  pointer-events: auto;
}
.information-grid {
  /* display: flex; */
  flex-direction: column;
}
.dropdown-links {
  display: flex;
  flex-direction: column;
}

/*******************************
***********Card body************
********************************/
.card-body {
  box-shadow: 0px -3px 0px #ffd7d7, -5px -5px 0px #4e51665a;
}
/******************************
*******Animation du titre******
*******************************/
.external {
  position: relative;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
.infos {
  position: relative;
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
  text-decoration-style: none;
}
.separator {
  width: 4rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 1rem 0 0.5rem 1rem;
}
.aspect {
  display: inline-block;
  width: auto;
  height: 20px;
  font-size: 1.5rem;
  background: #5c5c6c85;
  color: #000;
  text-align: left;
  display: none;
  animation: opac 4s;
}
.infos:hover .aspect {
  display: inline-block;
}
@keyframes opac {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/******************************
******Fin animation titre******
*******************************/
.mb-3 {
  margin: 0 1rem 0 1rem;
  text-align: justify;
}
.imgPost {
  width: 100%;
  height: 70vh;
  object-fit: cover;
  margin: auto;
}
@media screen and (max-width: 902px) {
  .imgPost {
    width: 100%;
    height: 60vw;
  }
}
@media screen and (max-width: 768px) {
  .imgPost {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .imgBottomPost {
    width: 100%;
    height: 100vh;
  }
}
.readMore .addText {
  display: none;
}
/*******************************
***********Card footer**********
********************************/
.card-footer {
  margin: 0 0 0.6rem 0;
  /* box-shadow: 0px 0px 0px #ffd7d7, -5px -5px 0px #4e51665a; */
  border-top: 0px solid rgba(0, 0, 0, 0.125);
  padding: 1rem 2rem 1rem 2rem;
  background: #4e5166;
}
@media screen and (max-width: 768px) {
  .card-footer {
    padding: 1rem;
  }
}
.post-actions {
  /* display: flex; */
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
}
@media screen and (max-width: 768px) {
  .post-actions {
    display: block;
  }
}
.form-control_input {
  padding: 2 rem;
  border: none;
  border-radius: 1rem;
  background: #5c5c6c85;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: #4e516600;
}
.form-control_input::placeholder {
  color: #4e51665a;
}
.linkPost {
  margin: 0 4rem 0 4rem;
}
.linkItems {
  margin: 5px 0.5rem 0 2.5rem;
}
.linkComent {
  margin: 0 5rem 0 0;
}
@media screen and (max-width: 768px) {
  .menuPost {
    justify-content: space-between;
  }
  .linkPostDpd {
    margin: 0 0 0.5rem 0;
  }
  .linkPost {
    margin: 0 0 0.5rem 0;
  }
  .linkItems {
    margin: 0 0 0.8rem 0;
  }
  .linkComent {
    margin: 0;
  }
}
.displayComents {
  display: flex;
}

@media screen and (max-width: 393px) {
  .linksPost {
    flex-direction: column;
  }
  .likesPost {
    width: 100%;
    margin-bottom: 1rem;
  }
  .comentsPost {
    width: 100%;
  }
}
@media screen and (max-width: 280px) {
  .menuPost {
    flex-direction: column;
  }
  .linkPost {
    margin: 1rem auto;
  }
}
.likeButtons {
  display: flex;
  margin: auto;
}
.likes {
  display: flex;
}
.likeFlex {
  display: flex;
  margin: auto;
}
.linkLike {
  font-size: 1.2rem;
  font-weight: 500;
}
.likes {
  margin: auto 0.2em;
  color: blue;
}
.likes:hover {
  color: rgb(89, 165, 13);
}
.unLikeFlex {
  display: flex;
}
.unLike {
  margin: auto 0.2em;
  color: blue;
}
.unLike:hover {
  color: rgb(199, 16, 46);
}
.d-none {
  margin-bottom: 0;
  padding: 0 0 0 0.2rem;
}
.linkModal {
  display: flex;
}

.comentPost {
  margin: 1rem;
}
.comentUser {
  text-align: justify;
  color: #000;
  margin: 1rem;
}
.postForm {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
}
</style>