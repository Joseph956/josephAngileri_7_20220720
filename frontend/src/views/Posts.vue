<template>
  <div class="postForm">
    <!-- <navPosts /> -->
    <navProfil />
    <div class="form-control-input">
      <div class="post-card-wrap">
        <div class="containerRecent">
          <h1>Publication récentes</h1>
          <div class="post-cards">
            <!-- <h1>joseph</h1> -->
            <PostCards v-show="posts.length > 4" v-for="post in posts" v-bind:key="post.id" :post="post" />
            <routeur-link 
              v-bind:to="'/PostsCards/' + post.id" class="d-flex align-items-center text-muted mr-4">
              <button  @click="postsRecent()" class="postsRecents">Voir les posts récents
              </button>
            </routeur-link>
            </div>
        </div>
      </div>
      <div>
        <div class="publierForm">
          <!-- Formulaire de création d'un post-->
          <form class="formPublish" enctype="multipart/form-data">
            <div class="containerLogo">
              <div class="logoTransparentPost">
                <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
                  src="../assets/logo_transparent.png" alt="" />
              </div>
              <div class="titlePublish">
                <h1>Publier un post</h1>
              </div>
              <div>
                <div class="formGroup" v-if="mode == 'publishPost'">
                  <div>
                    <button type="button" class="btn  " @click="switchToPost()">
                      <img src="../assets/Icons/BiPenFill.svg" alt="Créer une publication">
                      <span v-if="status == 'loading'">publication....</span>
                      <span v-else></span>
                    </button>
                  </div>
                </div>
                <div class="formGroup" v-else>
                  <div>
                    <button type="button" class="btn  " @click="switchToNewPost()">
                      <img src="../assets/Icons/BiPenFill.svg" alt="Créer une publication">
                      <span v-if="status == 'loading'">Créer une publication....</span>
                      <span v-else></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Titre du post -->
            <div class="form-group" v-if="mode == 'publication'">
              <label for="title"></label>
              <input ref="firstfield" v-model="title" type="text" id="title" class="form-control"
                placeholder="Titre de votre message" />
            </div>
            <!-- Contenu du post -->
            <div class="form-group" v-if="mode == 'publication'">
              <label for="content"></label>
              <textarea v-model="content" type="text" id="content" class="form-control"
                placeholder="Contenu de votre message" />
            </div>
            <!-- Affichage de l'image du post avant publication-->
            <div class="formGroup publish" v-if="mode == 'publication'">
              <div class="formGroup">
                <div class="imgPostForm" v-if="image">
                  <img :src="image" class="w-50 rounded" />
                </div>
                <div v-else>
                  <img style="height: 15rem; width: 100%" x="0" y="0" height="100%" width="100%" class="avatarPost "
                    src="../assets/Icons/BiCardImg.svg" alt="">
                </div>
              </div>
            </div>
            <!-- Choix de l'image du post -->
            <div class="formGroup" v-if="mode == 'publication'">
              <label for="file"></label><br />
              <input class="formFilePublich" id="file" ref="file" type="file" name="image" accept="image/*"
                @change="onFileSelected()" />
            </div>
            <!-- Publier un post -->
            <div class="formGroup">
              <button type="button" class="btn btn-primary btnPublication" @click="postCreate()"
                :disabled="!validatedFields">
                <span v-if="status == 'loading'">Publication en cours....</span>
                <span v-else>Nouvelle publication</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Afficher la liste des posts-->
        <div class="col-md-8 col-xl-6 middle-wrapper">
          <div class="row">
            <div v-show="posts.length > 0" v-for="post in posts" :key="post.id" class="col-md-12 grid-margin">
              <div class="card rounded">
                <!-- Infos créateur du post -->
                <div class="card-header">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="ml-2 justify-content">
                        <div class="avatar" v-if="post.user.attachment">
                          <img style="height: 65px; width: 55px" x="0" y="0" height="100%" width="100%" class="imgUser"
                            alt="Image du profil" v-bind:src="post.user.attachment" loading="lazy" />
                        </div>
                        <div class="avatar" v-else>
                          <img style="height: 55px; width: 55px" x="0" y="0" height="100%" width="100%"
                            class="avatarProfil" src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
                        </div>

                        <div class="userPost">
                          <div>
                            <p class="datePost">{{ post.user.username }} <br> Posté le : {{ post.createdAt }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- id="dropdownMenuButton2"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" -->
                    <div class="linkPost">
                      <div class="dropdown" data-dropdown>
                        <button class="link" data-dropdown-button type="button">
                          <img data-dropdown-button src="../assets/Icons/ariaCircle.svg" alt="">

                        </button>
                        <div class="dropdown-menu information-grid">
                          <a class="dropdown-item d-flex align-items-center" href="#">
                            <img src="../assets/Icons/infollow.svg" alt="">
                            <span class="">Unfollow</span></a>
                          <a class="dropdown-item d-flex align-items-center" href="#">
                            <img src="../assets/Icons/gotopost.svg" alt="">
                            <span class="">Go to post</span></a>
                          <a class="dropdown-item d-flex align-items-center" href="#">
                            <img src="../assets/Icons/share.svg" alt="">
                            <span class="">Share</span></a>
                          <a class="dropdown-item d-flex align-items-center" href="#">
                            <img src="../assets/Icons/copylynk.svg" alt="">
                            <span class="">Copy link</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Affichage du post -->
                <div class="card-body">
                  <p class="mb-3 tx-14">
                    <!-- Animation du titre -->
                    <router-link class="external" v-bind:to="'/PostDetails/' + post.id">
                      <div class="infos">
                        <h6 class="aspect">Afficher les détails du post :</h6>
                        {{ post.title }}
                      </div>
                    </router-link>
                    <!-- Fin animation du titre -->
                  </p>
                  <!-- Texte du post -->
                  <div class="readMore">
                    <p class="mb-3 tx-14">{{ post.content }}</p>
                  </div>
                  <!-- Image du post -->
                  <div class="form-group">
                    <!-- <div v-if="post.attachment">
                      <img class="imgPost" style="height: 15rem; width: 20rem" x="0" y="0" height="100%" width="100%"
                        v-bind:src="post.attachment" alt="" />
                    </div>
                    <div v-else>
                      <img class="imgPost" style="height: 30rem; width: 30rem" x="0" y="0" height="100%" width="100%"
                        src="../assets/Icons/BiCardImg.svg" alt="avatar" />
                    </div> -->
                    <div v-if="post.attachment">
                      <!-- Fenêtre modale -->
                      <modale v-bind:revele="revele">
                        <div @click="toggleModale" :toggleModale="toggleModale" class="btn btn-success">
                          <div :src="post.attachment">
                            Modale photo
                          </div>
                        </div>
                      </modale>
                      <!-- Fin fenêtre modale -->
                      <a href="#">
                        <img @click="toggleModale" class="imgPost" :src="post.attachment" alt="Image du post" />
                      </a>
                    </div>
                    <div v-else>
                      <!-- Fenêtre modale -->
                      <modale v-bind:revele="revele">
                        <div @click="toggleModale" :toggleModale="toggleModale" class="btn btn-success">
                          <div :src="post.attachment">
                            Modale photo
                          </div>
                        </div>
                      </modale>
                      <!-- Fin fenêtre modale -->
                      <div>
                        <div>
                          <label for="file">Image de la publication</label>
                        </div>
                        <div>
                          <img @click="toggleModale" style="height: 85vh; width: 100%" x="0" y="0" height="100%"
                            width="100%" class="imgBottomPost" src="../assets/Icons/BiCardImg.svg"
                            alt="Image du post" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Gestion du post d-flex -->
                <div class="card-footer">
                  <div class=" post-actions">
                    <div class="menuPost">
                      <div class="linkPost">
                        <div class="likeButtons">
                          <div class="likes">
                            <routeur-link v-bind:to="'/PostLikes/' + post.id"
                              class="d-flex align-items-center text-muted mr-4">
                              <button type="button" class="btn btn-like" @click="postLikeCreate(post.id)">
                                <span v-if="status == 'loading'">Like ....</span>
                                <span v-else>
                                  <div class="likeFlex">

                                    <img class="like" style="height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%"
                                      width="100%" src="../assets/Icons/BiHandThumbsUpFill.svg" alt="">

                                    <div>
                                      <p class="d-none d-md-block ml-2">
                                        {{ post.likes.length }} <br />
                                      </p>
                                    </div>
                                  </div>
                                </span>
                              </button>
                            </routeur-link>
                            <!-- <routeur-link v-bind:to="'/PostUnLikes/' + postId"
                              class="d-flex align-items-center text-muted mr-4">
                              <button type="button" class="btn btn-like" @click="postUnlikeCreate(post.id)">
                                <span v-if="status == 'loading'">unLike ....</span>
                                <span v-else>
                                  <div class="unLikeFlex">
                                    <div>

                                      <img class="unLike" style=" height: 1.5rem; width: 1.5rem" x="0" y="0"
                                        height="100%" width="100%" src="../assets/Icons/BiHandThumbsDownFill.svg"
                                        alt="">
                                    </div>
                                    <div>
                                      <p class="d-none d-md-block ml-2">
                                        {{ post.unlikes.length }} <br />
                                      </p>
                                    </div>
                                  </div>
                                </span>
                              </button>
                            </routeur-link> -->
                          </div>
                        </div>
                      </div>
                      <div class="linkPost">
                        <router-link v-bind:to="'/ModalComent/' + postId">
                          <div class="linkModal">
                            <div class="linkItems">
                              <img src="../assets/Icons/coment.svg" alt="commentaires">
                            </div>
                            <div class="linkModal">
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
                            <img data-dropdown-button src="../assets/Icons/ariaCircle.svg" alt="menus">
                          </button>
                          <div class="dropdown-menu information-grid">
                            <div class="dropdown-heading"></div>
                            <div class="dropdown-links">
                              <!-- Supprimer un post -->
                              <a href="javascript:;" class="d-flex align-items-center text-muted">
                                <div class="flexMenu">
                                  <div>
                                    <button class="btn" data-dropdown-button @click="postDeleted(post.id)">
                                      <div class="trashBtn">
                                        <div class="iconDelete">
                                          <img src="../assets/Icons/BiTrash3Fill.svg" alt="">
                                        </div>
                                        <div class="btnDelete">
                                          <span v-if="status == 'loading'">Suppression en cours....</span>
                                          <span v-else>Supprimer</span>
                                        </div>
                                      </div>
                                    </button>
                                  </div>
                                  <!-- </div> -->
                                  <!-- Modifier un post -->
                                  <div class="btnFooter">
                                    <router-link v-bind:to="'/PostsUpdate/' + post.id">
                                      <button type="button" class="btn" @click="postModify()" :postId="post.id">
                                        <div class="modifyBtn">
                                          <div class="iconModify">
                                            <img src="../assets/Icons/BiPenFill.svg" alt="">
                                          </div>
                                          <div>
                                            <span v-if="status == 'loading'">Modification en cours....</span>
                                            <span v-else>Modifier</span>
                                          </div>
                                        </div>
                                      </button>
                                    </router-link>
                                  </div>
                                  <!-- <p class="d-none d-md-block ml-2">Supprimer</p> -->
                                  <!-- Details d'un post -->
                                  <div class="btnFooter">
                                    <router-link v-bind:to="'/PostDetails/' + post.id">
                                      <button type="button" class="btn" @click="postDetails()" :postId="post.id">
                                        <div class="detailedBtn">
                                          <div class="iconDetailed">
                                            <img src="../assets/Icons/BiArrowUpSquare.svg" alt="">
                                          </div>
                                          <div>
                                            <span v-if="status == 'loading'">Ouverture du formulaire en
                                              cours....</span>
                                            <span v-else>Post détaillé</span>
                                          </div>
                                        </div>
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
// import navPosts from "@/components/NavPosts.vue";
import navProfil from "@/components/NavProfil.vue";
//Les views
import postDetails from "@/views/PostDetails.vue";
import postsCards from "@/views/PostsCards.vue";
//Les components
import postsUpdate from "@/components/PostsUpdate.vue";
import postCardRecent from "@/components/PostCardRecent.vue";
import comentsCreate from "@/components/ComentsCreate.vue";
import comentsList from "@/components/ComentsList.vue";
import modalComent from "@/components/ModalComent.vue";
import Modale from "@/components/Modale.vue";

export default {
  name: "Posts",
  components: {
    navProfil,
    // navPosts,
    postsUpdate,
    postsCards,
    postCardRecent,
    postDetails,
    comentsCreate,
    comentsList,
    modalComent,
    modale: Modale,
  },
  // props: ["postlikes", "postUnlikes"],

  data: function () {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
        user: null,
        admin: null,
        likes: null,
        unlikes: null,
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
    };
  },
  beforeMount() {
    this.getPostList();
  },
  computed: {
    postCardRecent() {
      return this.$store.state.postCardRecent;
    },
    validatedFields: function () {
      if (this.mode == "publishPost") {
        if (
          this.title != "" && 
          this.content != "" && 
          this.attachment != "") {
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
      this.mode = 'publishPost';
    },
    switchToPost: function () {
      this.mode = 'publication';
    },
    toggleModale: function () {
      this.revele = !this.revele;
    },
    onFileSelected() {
      this.file = this.$refs.file.files[0];
      this.image = URL.createObjectURL(this.file);
    },
    getPostList() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    getPostOne() {
      console.log("tst");
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    postsRecent: function () {
      this.apiPosts
        .get("http://localhost:3000/api/posts")
        .then(() => {
          this.getPostList();
        })
        .catch(function () { });
    },
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
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getLikesList();
        })
        .catch(function () {});
    },
    postUnlikeCreate: function (postId) {
      if (post.likes.length == 1) {
        
      }
      this.apiPosts
        .put(
          `http://localhost:3000/api/posts/${postId}/unlike/${this.$store.state.user.userId}`,
          {
            postId: postId,
            userId: this.userId,
            likes: this.unlike,
          }
        )
        .then(() => {
          this.$router.push("/posts");
          window.location.reload();
          this.getLikesList();
        })
        .catch(function () {});
    },
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
    postDeleted: function (id) {
      if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        this.apiPosts
          .delete("http://localhost:3000/api/posts/" + id)
          .then(() => {
            window.location.reload();
            this.$router.push("/posts");
            this.getPostList();
          });
      }
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
  font-weight: 400;
  font-size: 35px;
  margin: 32px 0 32px 0;
  /* margin-bottom: 32px; */
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  /* @media (min-width: 800px) padding: 125px 25px; */
  display: block;
  flex-direction: row;
}
@media screen and (max-width: 768px) {
  .container {
      flex-direction: column;
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
  /* max-width: 425px; */
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
@media (min-width: 800px) {
    h2, .router-button {
    /* text-align: initial; */
    font-size: 40px;
  }
}
/***************************
fin Voir les posts recents 
***************************/

.containerRecent {
  box-shadow: 5px 5px 10px #FFD7D7, -5px -5px 10px #4e51665a;
  /* margin-left: 0.4rem;
  margin-right: 0.4rem; */
  border-radius: 1rem;
}

/***********************************
Formulaire de publication des posts
***********************************/
.publierForm {
  background-color: 4e5166;
  box-shadow: 0px 0px 10px #FFD7D7, -5px -5px 10px #4e51665a;
  margin-bottom: 2.2rem;
  border-radius: 1rem;
  outline: none;
}
.formPublish {
  background: #4e5166;
}
.containerLogo{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 1rem;
  padding: 1.5rem 0 1rem 0;
}
.logoTransparentPost {
  display: flex;
}
.titlePublish h1{
  display: flex;
  margin: 0 1rem 0 1rem;
}
.formGroup {
  display: flex;
  flex-direction: column-reverse;
  width: auto;
}
.form-group, .publish {
  width: 95%;
  margin: 1rem auto 1rem auto;
}
.form-control {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  /* box-shadow: 5px 5px 10px #cecdcd, -5px -5px 0 #4e51665a; */
  border: 0.5px solid #ffd6d6;
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
}
img {
  margin: auto;
}
/********************************
***********Card header***********
*********************************/
.card-header {
  box-shadow: 0px 0px 10px #FFD7D7, -5px -5px 10px #4e51665a;
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
@media screen and (max-width: 768px) {
  .ml-2 {
      display: flex;
      /* flex-direction: column; */
    }
}
.avatar {
  display: contents;
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
  margin: 1rem 0 0 1rem;
}
@media screen and (max-width: 768px) {
  .userPost {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
  }
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
  .datePost {
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
  }
}
.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  /* box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e516674; */
  box-shadow: 5px 5px 10px #FFD7D7, -5px -5px 10px #4e51665a;
  opacity: 0;
  transform: translate(-5rem, 10px);
}
/*******************************
***********Card body************
********************************/
.card-body {
  /* margin: 5px 0 -5px 0; */
box-shadow: 0px 10px 10px #FFD7D7, -5px -5px 10px #4e51665a;
}
/******************************
*******Animation du titre******
*******************************/
.external {
  position: relative;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
}
.infos {
  position: relative;
  font-size: 1rem;
}
.aspect {
  display: inline-block;
  width: auto;
  height: 20px;
  background-color: #fff;
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
  height: auto;
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
  height: auto;
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
  /* box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e51665a; */
  box-shadow: 0px 0px 10px #FFD7D7, -5px -5px 10px #4e51665a;
  padding: 2rem 2rem 1rem 2rem;
  background: #4e5166;
}
.post-actions {
  display: flex;
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
  /* color: #a3a2a2; */
  color: #4e51665a;
}
.menuPost {
  display: flex;
  align-items: center;
  align-content: center;
  margin: auto;
}
.linkPost {
  margin: 0 4rem 0 2rem;
}
/* @media screen and (max-width: 768px) {
  .linkPost {
      margin: auto;
    }
} */
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
.likes{
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
}
.linkModal {
  display: flex;
}
.linkItems {
  margin: 5px 0.5rem 0 0.5rem;
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
.dropdown.active>.link+.dropdown-menu {
  opacity: 1;
  /* transform: translateY(0); */
  transform: translateX(-5rem);
  pointer-events: auto;
}
.information-grid {
  /* display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 1rem; */
  display: flex;
  flex-direction: column;
}
.dropdown-links {
  display: flex;
  flex-direction: column;
}
.comentPost {
  margin: 1rem;
}
.comentUser {
  text-align: justify;
  color: #000;
}
.postForm {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
  /* flex-wrap: wrap; */
}

</style>