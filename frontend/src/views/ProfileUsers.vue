<template>
  <div>
    <navPosts />
    <div class="col-md-8 col-xl-6 middle-wrapper">
      <div class="containerTitre">
        <div class="logoTransparentUser">
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
        <div class="cardTitleUser">
          <h1>La page de {{ user.username }}</h1>
          <div class="separatorUser"></div>
        </div>
      </div>
    </div>
    <br />
    <div class="card">
      <!-- Image de fond -->
      <div></div>
      <div class="form-grouProfile" v-if="user.imgBottom">
        <img
          style="height: 20vw; width: 100%"
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
          style="height: 20vw; width: 100%"
          x="0"
          y="0"
          height="100%"
          width="100%"
          id="imgBottomAvatar"
          src="../assets/Fond-Gris.jpg"
          alt="avatar"
        />
      </div>
      <div class="imgDelete">
        <button
          v-if="isAdmin == true || $store.state.user.userId == user.userId"
          class="btn btn-secondary btnImgDelete"
          type="button"
          @click="imgFondDelete(user.id)"
          :userId="user.id"
        >
          <span v-if="status == 'loading'">Suppression en cours....</span>
          <span v-else>
            <img
              style="height: 25px; width: 25px"
              x="0"
              y="0"
              height="100%"
              width="100%"
              src="../assets/Icons/BiTrash3Fill.svg"
              alt=""
            />
          </span>
          <div class="textImgBottom">Supprimer la photo de couverture</div>
        </button>
      </div>
      <!--Photo de profil  -->
      <div class="form-grouProfile">
        <div v-if="user.attachment">
          <img
            style="height: 6rem; width: 6rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            id="imgProfileUser"
            v-bind:src="user.attachment"
            alt="Photo de profil utilisateur"
          />
        </div>
        <div class="form-grouProfile" v-else>
          <img
            style="height: 6rem; width: 6rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            id="imgAvatarUser"
            src="../assets/Icons/BiPersonCircle.svg"
            alt="avatar"
          />
        </div>
      </div>
      <!-- Infos du profil -->
      <div class="infosUserProfile">
        <div>
          <!-- Modif profil  -->
          <li class="liBtn">
            <router-link v-bind:to="'/ProfilUpdate/' + user.id">
              <button
                v-if="
                  isAdmin == true || $store.state.user.userId == user.userId
                "
                type="button"
                class="btnModify"
                :userId="user.id"
              >
                <img
                  style="height: 1.5rem; width: 1.5rem"
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  src="../assets/Icons/BiPenFill.svg"
                  alt="modifier le profil"
                />
                <span v-if="status == 'loading'"
                  >Ouverture du formulaire de modification en cours....</span
                >
                <span v-else></span>
              </button>
            </router-link>
          </li>
        </div>
        <div class="gridBox">
          <h1 class="cardTitleProfil">Le profil de {{ user.username }}</h1>
          <div class="separatorProfilUser"></div>
          <div class="cardHeader">
            <h3>Pseudo : {{ user.username }}</h3>
          </div>
          <div>
            <h3>Email : {{ user.email }}</h3>
          </div>
        </div>
      </div>
      <div class="formRowProfile">
        <ul class="btnFooterProfil">
          <!-- Bouton Modification mdp -->
          <li class="liBtn">
            <router-link v-bind:to="'/PasswdUpdate/' + user.id">
              <button
                v-if="
                  isAdmin == true || $store.state.user.userId == user.userId
                "
                type="button"
                class="btnModify"
                :userId="user.id"
              >
                <img
                  style="height: 1.5rem; width: 1.5rem"
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  src="../assets/Icons/BiLockFill.svg"
                  alt="modifier le mot de passe"
                />
                <span v-if="status == 'loading'"
                  >Ouverture du formulaire de modification en cours....</span
                >
                <span v-else></span>
              </button>
            </router-link>
          </li>
          <!-- Bouton Suppression profil-->
          <li class="liBtn">
            <button
              v-if="isAdmin == true || $store.state.user.userId == user.userId"
              class="btnTrash"
              data-dropdown-button
              @click="userDeleted(user.id)"
            >
              <div class="btnModify">
                <div class="btnModify">
                  <img
                    class="btnTrash"
                    style="height: 1.5rem; width: 1.5rem"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                    src="../assets/Icons/BiTrash3Fill.svg"
                    alt="supprimer le compte utilisateur"
                  />
                </div>
                <div class="btnModify">
                  <span v-if="status == 'loading'"
                    >Suppression en cours....</span
                  >
                  <span v-else></span>
                </div>
              </div>
            </button>
          </li>
          <!-- Bouton Deconnexion profil -->
          <li class="liBtn">
            <button type="button" class="btnModify" @click="logout()">
              <img
                style="height: 1.5rem; width: 1.5rem"
                x="0"
                y="0"
                height="100%"
                width="100%"
                src="../assets/Icons/sign-out-alt-regular.svg"
                alt="deconnexion"
              />
            </button>
          </li>
        </ul>
      </div>

      <!-- Affichage des messages derreurs -->
      <div class="alert alert-info text-danger">{{ mesgError }}</div>
      <!-- <div class="dateCreateProfil">
        <h5>
          Date de création du profil de {{ user.username }} :
          {{ dayjs(user.createdAt) }}
        </h5>
      </div> -->
    </div>
    <v-container>
      <!-- Lister les publication de l'utilisateur -->
      <div class="col-md-8 col-xl-6 middle-wrapper">
        <div class="containTitleProfil">
          <div class="logoTransparentProfile">
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
          <div class="cardTitleProfile">
            <h1 class="titlePostUser">
              Les publications de {{ user.username }} <br />
            </h1>
            <div class="separatorPostUser"></div>
          </div>
        </div>
      </div>
    </v-container>
    <div class="row">
      <div
        v-show="posts.length > 0"
        v-for="post in posts"
        :key="post.id"
        class="col-md-12 grid-margin"
      >
        <div class="col-md-12 grid-margin">
          <div class="card">
            <!-- rounded -->
            <!-- Infos créateur du post -->
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="ml-2 justify-content">
                    <div class="avatar" v-if="user.attachment">
                      <img
                        style="height: 65px; width: 55px"
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        class="imgUser"
                        alt="Image du profil"
                        v-bind:src="user.attachment"
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
                        <p class="datePost">
                          Auteur : {{ post.user.username }} <br />
                          Posté le : {{ dayjs(post.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Affichage du post -->
            <div class="card-body">
              <!-- Animation du titre -->
              <p class="mb-3 tx-14">
                <router-link class="external" v-bind:to="'/Posts/'">
                  <div class="infos">
                    <p class="aspect">Forum des publications :</p>
                    {{ post.title }}
                  </div>
                </router-link>
                <!-- Fin animation du titre -->
              </p>
              <div class="separator"></div>
              <p class="mb-3 tx-14">{{ post.content }}</p>
              <!-- Image du post -->
              <div class="form-group">
                <div class="form-group">
                  <div v-if="post.attachment">
                    <img
                      class="imgProfil"
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
                      class="imgProfil"
                      style="width: auto"
                      x="0"
                      y="0"
                      height="100%"
                      width="100%"
                      src="../assets/Icons/BiCardImg.svg"
                      alt="avatar"
                    />
                  </div>
                  <div class="alert alert-info text-danger">
                    {{ mesgError }}
                  </div>
                </div>
              </div>
              <div class="flexMenu">
                <!-- Supprimer un post -->
                <div class="btnDelPost">
                  <button
                    v-if="
                      isAdmin == true || $store.state.user.userId == post.userId
                    "
                    block
                    class="btn d-block"
                    type="button"
                    data-dropdown-button
                    @click="postDeleted(post.id)"
                  >
                    <div class="trashBtn">
                      <div class="iconDelete">
                        <img
                          style="height: 1.5rem; width: 1.5rem"
                          x="0"
                          y="0"
                          height="100%"
                          src="../assets/Icons/BiTrash3Fill.svg"
                          alt="supprimer la publication"
                        />
                      </div>
                      <div class="btnDelete">
                        <span v-if="status == 'loading'"
                          >Suppression en cours....</span
                        >
                        <span v-else>Supprimer</span>
                      </div>
                    </div>
                  </button>
                </div>
                <!-- Modifier un post -->
                <div>
                  <router-link
                    class="btnModifyPost"
                    v-bind:to="'/PostsUpdate/' + post.id"
                  >
                    <button
                      v-if="
                        isAdmin == true ||
                        $store.state.user.userId == post.userId
                      "
                      block
                      class="btn d-block"
                      type="button"
                      :postId="post.id"
                    >
                      <div class="trashBtn">
                        <div class="iconModify">
                          <img
                            style="height: 1.5rem; width: 1.5rem"
                            x="0"
                            y="0"
                            height="100%"
                            src="../assets/Icons/BiPenFill.svg"
                            alt="modifier la publication"
                          />
                        </div>
                        <div>
                          <span class="labelModify" v-if="status == 'loading'"
                            >Modification en cours....</span
                          >
                          <span v-else>Modifier</span>
                        </div>
                      </div>
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Gestion du post  d-flex-->
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
                        <span v-if="status == 'loading'">Like ....</span>
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
                                <div class="d-md-block ml-2">
                                  <span v-if="post.likes.length < 2">
                                    - {{ post.likes.length }} - Like<br
                                  /></span>
                                  <span v-else>
                                    - {{ post.likes.length }} - likes<br
                                  /></span>
                                </div>
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
                      <div class="d-md-block ml-2">
                        <span v-if="post.coments.length < 2">
                          - {{ post.coments.length }} - Commentaire <br
                        /></span>
                        <span v-else>
                          - {{ post.coments.length }} - commentaires <br
                        /></span>
                      </div>
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
    <div>
      <!-- ScrollToTop button -->
      <button type="button" class="btnUp" @click="switchToUp()">
        <a class="bloc-button btn btn-d scrollToTop" @click="switchToUp('1')">
          <span class="fa fa-chevron-up"></span>
        </a>
      </button>
      <!-- ScrollToTop button end-->
    </div>
    <div class="logoTransparent">
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
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";
import * as dayjs from "dayjs";
import "dayjs/locale/fr";
import fr from "dayjs/locale/fr";

export default {
  name: "ProfileUsers",
  components: { navPosts, dayjs, fr },
  data: function () {
    return {
      mesgError: "",
      isAdmin: false,
      user: {
        imgBottom: this.imgBottom,
        attachment: this.attachment,
        usermame: this.username,
        email: this.email,
        createdAt: this.createdAt,
      },
      posts: {
        title: this.title,
        content: this.content,
        attachment: this.attachment,
      },
      coments: {
        coment: this.coment,
      },
      apiUser: axios.create({
        baseURL:
          "http://localhost:3000/api/users/" + this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      user: [],
      posts: [],
      coments: [],
      likes: [],
    };
  },
  computed: {
    ...mapState(["status"]),
  },
  mounted: function () {
    this.apiUser
      .get(
        `http://localhost:3000/api/users/${this.$route.params.userId}/publishProfil`
      )
      .then((response) => {
        if (!response.data) {
          return (this.mesgError = error.response.data.message);
        } else {
          this.user = response.data;
          this.getPostList();
        }
      })
      .catch((error) => {
        this.mesgError = error.response.data.message;
        alert(this.mesgError);
      });
  },
  beforeMount() {
    if (this.$store.state.user.role.role == "admin") {
      this.isAdmin = true;
    }
  },
  computed: {
    ...mapState(["status"]),
  },

  methods: {
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
    getPostList: function () {
      this.apiPosts
        .get(`http://localhost:3000/api/posts/postUser/${this.user.id}`)
        .then((response) => {
          if (!response) {
            this.mesgError = error.response.data.message;
          } else {
            this.posts = response.data;
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    dayjs: function (createdAt) {
      const Date = dayjs(createdAt)
        .locale("fr")
        .format("DD-MMMM-YYYY à HH:mm ");
      return Date;
    },
    userDeleted: function (userId) {
      if (
        window.confirm("Voulez-vous vraiment supprimer ce compte utilisateur ?")
      ) {
        this.apiUser
          .delete("http://localhost:3000/api/users/" + userId)
          .then((response) => {
            if (!response) {
              this.mesgError = error.response.data.message;
            } else {
              this.$store.commit("logout");
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.mesgError = error.response.data.message;
            alert(this.mesgError);
          });
      }
    },
    imgFondDelete: function () {
      if (
        window.confirm("Voulez-vous vraiment supprimer votre image de fond ?")
      ) {
        const dataImgBottom = new FormData();
        dataImgBottom.append("image", this.fileBottom);
        this.apiUser
          .delete(
            `http://localhost:3000/api/users/${this.user.id}/imgBottom`,
            dataImgBottom
          )
          .then((response) => {
            if (!response) {
              this.mesgError = error.response.data.message;
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            this.mesgError = error.response.data.message;
            alert(this.mesgError);
          });
      }
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
  },
};
</script>

<style scoped>
.wrapUsers {
  display: flex;
  justify-content: center;
}
.flexTab {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
}
.col-md-8 {
  background: #4e5166;
  /* padding: 2rem; */
  border-radius: 2rem;
}
.containerTitre,
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 1rem 0 1rem;
}

.logoTransparentUser {
  display: flex;
  margin: 1.2rem 0 0 0;
}
.gridBox {
  display: grid;
  justify-items: flex-start;
}
.cardTitleProfil {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 1rem 0.8rem 0;
}
.cardTitleProfile {
  display: flex;
  margin: 0 1.5rem 1rem 0;
  text-decoration: none;
  flex-direction: column;
}
.alert-info {
  background: #5c5c6c85;
  border-color: #5c5c6c85;
  border-radius: 1rem;
  padding: 0;
}
.cardTitleUser {
  display: flex;
  margin: 2rem 0 0 0;
  text-decoration: none;
  flex-direction: column;
  align-items: flex-start;
}
.separatorUser {
  width: 6rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 1rem 0 0.5rem 1rem;
}

.cardUser {
  margin: 1rem;
}

.listInfosUsers {
  display: flex;
  align-items: center;
  margin: auto;
  background: #f2f2f2;
  box-shadow: 0px 0px 10px #cecdcd, -5px -5px 10px #cfcece;
  border-radius: 5rem;
  padding: 0 0.5rem;
  background: #5c5c6c85;
  justify-content: space-between;
}
#imgProfile {
  border-radius: 5rem;
  object-fit: cover;
  margin: 5px auto 5px auto;
}
.listInfosUser {
  display: flex;
  margin: 0 0 0 1rem;
}
.infoUser {
  font-size: 1rem;
  padding: 5px 10px 5px 10px;
  text-align: center;
  overflow: hidden;
}
.infoUser .infosHeader h3 {
  justify-content: center;
}
.infoUser .infosHeader {
  text-align: center;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
}
.infoUser .infosTitle {
  font-weight: inherit;
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
}
.infoUser .infosDescription {
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

.imgAvatarUser {
  margin: 5px auto 5px auto;
}
.infoUser .positionTrash {
  display: flex;
  align-items: end;
  margin: 0 0 0 1rem;
}
.btnTrashUser {
  font-size: 2rem;
}
.separatorPostUser {
  margin: 1rem 1rem auto;
}
.flex-table {
  display: grid;
  /* grid-template-columns: repeat(1fr, 1fr, 33%); */
  grid-template-columns: repeat(auto-fill, 33%);
  grid-auto-rows: auto;
  padding: 10px;
  border-bottom: 1px black solid;
}
.actions {
  padding-right: 10px;
}
/************************************
*********Media queries***************
************************************/
@media screen and (max-width: 912px) {
  .separatorProfilUser {
    margin: 0 auto 1.5rem 0;
  }
}
@media screen and (max-width: 900px) {
  .separatorPostUser {
    margin: 1rem 1rem auto;
  }
}
@media screen and (max-width: 768px) {
  .col-md-8 {
    padding: 3rem 0 0 0;
  }
  .containerTitre,
  h1 {
    display: flex;
    font-size: 1.2rem;
  }
  .logoTransparentUser {
    margin: -0.8rem 0 0 0;
  }
  .cardTitleProfile {
    margin: 0 auto 1rem auto;
  }
  .cardUser {
    margin: 1rem 0 1rem 0;
  }
  .cardTitleUser {
    margin: 0;
  }
  .separatorUser {
    display: flex;
    align-items: center;
    width: 4rem;
  }
  .wrapUsers {
    display: flex;
    flex-direction: column;
  }
  .listInfosUser {
    display: contents;
    margin: 0 0 0 1rem;
  }
  .positionTrash {
    display: contents;
    justify-content: center;
    margin: auto;
  }
  .separatorProfilUser {
    width: 5rem;
    height: 4px;
    background-color: #ffd7d7;
    margin: 0 auto 1.5rem 0;
  }
  .separatorPostUser {
    margin: 1rem auto 1rem auto;
  }
}
@media screen and (max-width: 470px) {
  .containerTitre,
  h1 {
    flex-direction: column;
  }
  .separatorUser {
    margin: 1rem auto 0.5rem auto;
  }
}
@media screen and (max-width: 370px) {
  .containerTitre,
  h1 {
    flex-direction: column;
  }
  .logoTransparentUser {
    margin: 1.2rem 0 0 0;
  }
  .separatorUser {
    margin: 1rem auto 0.5rem auto;
  }
  .listInfosUsers {
    display: contents;
    flex-direction: column;
    margin: 0 0 0 -20px;
  }
}
@media screen and (max-width: 280px) {
  .logoTransparentUser {
    margin: 3.2rem 0 0 0;
  }
  .separatorProfilUser {
    margin: 1rem auto 1.5rem auto;
  }
}
</style>