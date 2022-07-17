<template>
  <!-- Template affichage détails d'un post -->
  <div class="col-md-8 col-xl-6 middle-wrapper">
    <navPosts />
    <h1>Details du post</h1>
    <div class="row">
      <div class="col-md-12 grid-margin">
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
                    <img style="height: 55px; width: 55px" x="0" y="0" height="100%" width="100%" class="avatarProfil"
                      src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
                  </div>

                  <div class="userPost">
                    <div>
                      <p class="datePost">{{ post.user.username }} <br> Posté le : {{ post.createdAt }}</p>
                    </div>
                  </div>
                </div>
              </div>
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
              <router-link class="external" v-bind:to="'/Posts/'">
                <div class="infos">
                  <h6 class="aspect">Afficher les publications:</h6>
                  {{ post.title }}
                </div>
              </router-link>
              <!-- Fin animation du titre -->
            </p>
            <p class="mb-3 tx-14">{{ post.content }}</p>
            <!-- <img class="imgPost" :src="post.attachment" alt="" /> -->
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
                <a href="#">
                  <img @click="toggleModale" class="imgPost" src="../assets/Icons/BiCardImg.svg" alt="Image du post" />
                </a>
              </div>
            </div>
            <div class="alert alert-info text-danger">{{ mesgError }}</div>
          </div>
          <!-- Gestion du post  d-flex-->
          <div class="card-footer">
            <div class=" post-actions">
              <div class="menuPost">
                <div class="linkPost">
                  <div class="likeButtons">
                    <div class="likes">
                      <routeur-link v-bind:to="'/PostLikes/' + postId"
                        class="d-flex align-items-center text-muted mr-4">
                        <button type="button" class="btn btn-like" @click="postLikeCreate(post.id)"
                          :class="{ 'btn--disabled': !validatedFields }">
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
                    </div>
                  </div>
                </div>
                <router-link class="displayComents" @click="displayAllComents()" v-bind:to="`/ComentsList/${post.id}`">
                  <div class="linkItems">
                    <img src="../assets/Icons/coment.svg" alt="commentaires">
                  </div>
                  <div class="linkComent">
                    <p class="d-none d-md-block ml-2">
                      <span v-if="post.coments.length > 2"> - {{ post.coments.length }} - Commentaires
                        <br /></span>
                      <span v-else>{{ post.coments.length }} Commentaire <br /></span>
                    </p>
                  </div>
                </router-link>
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
                                  <div class="btnDelete"> <span v-if="status == 'loading'">Suppression en
                                      cours....</span>
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
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="alert text-danger">
                {{ mesgError }}
              </p>
            </div>
            <comentsCreate :postId="post.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navPosts from "@/components/NavPosts.vue";
import comentsCreate from "@/components/ComentsCreate.vue";
import Modale from "@/components/Modale.vue";

export default {
  name: "PostDetails",
  components: {
    navPosts,
    comentsCreate,
    Modale,
  },
  data: function () {
    return {
      msgError: "",
      post: {
        title: null,
        content: null,
        attachment: null,
        user: null,
        admin: null,
        likes: null,
        revele: false,
      },
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
    };
  },
  beforeMount() {
    this.getPostOne();
  },
  computed: {},
  methods: {
    toggleModale: function () {
      this.revele = !this.revele;
    },
    getPostOne() {
      console.log("tst");
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message)
          } else {
          this.post = response.data;
          console.log(this.post);
          }
        })
        .catch((error) => {
          alert(this.mesgError = error.response.data.message)
        });
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
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message)
          } else {
          window.location.reload();
          this.$router.push("/posts");
          this.getLikesList();
          }
        })
        .catch((error) => {
          alert(this.mesgError = error.response.data.message)
        });
    },
    postDeleted: function (postId) {
      if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        this.apiPosts
          .delete("http://localhost:3000/api/posts/" + postId)
          .then((response) => {  
            if (!response.data) {
              return (this.mesgError = error.response.data.message)
            } else {          
            window.location.reload();
            this.$router.push("/posts");
            this.getPostList();
            }
          }).catch((error) => {
            alert(this.mesgError = error.response.data.message)
          });
      }
    },
  },
};
</script>

<style>
.card-body {
  padding-right: 0;
  padding-left: 0;
}
.card-footer {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
.MenuPost {
  width: 100%;
}
.comentForm {
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}
.row {
  padding-left: 0;
  padding-right: 0;
}
</style>