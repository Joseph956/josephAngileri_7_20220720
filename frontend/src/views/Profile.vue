<template>
  <div>
    <navPosts />
    <div class="card">
      <!-- Image de fond -->
      <div></div>
      <div class="form-grouProfile" v-if="user.imgBottom">
        <img
          style="width: 100%"
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
              <button type="button" class="btnModify" :userId="user.id">
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
          <h1 class="cardTitleProfil">Votre profil {{ user.username }}</h1>
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
              <button type="button" class="btnModify" :userId="user.id">
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
      <div class="alert alert-info text-danger">{{ mesgErrorProfil }}</div>
      <div class="dateCreateProfil">
        <h5>
          Date de création de votre profil {{ user.username }} :
          {{ dayjs(user.createdAt) }}
        </h5>
      </div>
    </div>
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
            Details de vos publications {{ user.username }}
          </h1>
          <div class="separatorPostUser"></div>
        </div>
      </div>
    </div>
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
    <!-- ScrollToTop button -->
    <button type="button" class="btnUp" @click="switchToUp()">
      <a class="bloc-button btn btn-d scrollToTop" @click="switchToUp('1')">
        <span class="fa fa-chevron-up"></span>
      </a>
    </button>
    <!-- ScrollToTop button end-->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";
import ProfilUpdate from "@/components/ProfilUpdate.vue";
import PasswdUpdate from "@/components/PasswdUpdate.vue";
import * as dayjs from "dayjs";
import "dayjs/locale/fr";
import fr from "dayjs/locale/fr";

export default {
  name: "Profile",
  components: {
    dayjs,
    fr,
    navPosts,
    ProfilUpdate,
    PasswdUpdate,
  },
  data: function () {
    return {
      mesgError: "",
      mesgErrorPost: "",
      mesgErrorProfil: "",
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
      posts: [],
      coments: [],
      like: [],
    };
  },
  mounted: function () {
    // let idToFined =
    //   this.$route.params.id != undefined
    //     ? this.$route.params.id
    //     : this.$store.state.user.userId;
    this.apiUser
      .get("/") //+ idToFined
      .then((response) => {
        if (!response) {
          this.mesgError = error.response.data.message;
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
    displayAllComents: function () {
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response.data) {
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
              this.mesgErrorProfil = error.response.data.message;
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            this.mesgErrorProfil = error.response.data.message;
          });
      }
    },
    postDeleted: function (postId) {
      if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
        this.apiPosts
          .delete("http://localhost:3000/api/posts/" + postId)
          .then((response) => {
            if (!response.data) {
              return (this.mesgErrorPost = error.response.data.message);
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            this.mesgErrorPost = error.response.data.message;
            alert(this.mesgErrorPost);
          });
      }
    },
    dayjs: function (createdAt) {
      const Date = dayjs(createdAt)
        .locale("fr")
        .format("DD-MMMM-YYYY à HH:mm ");
      return Date;
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
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.card {
  box-shadow: 0px 0px 10px #cecdcd, 5px 5px 2px #4e51665a;
  border-radius: 1rem;
  background: #4e5166;
  margin-bottom: 1rem;
}
.rounded {
  border-radius: none;
}
.cardSubtitle {
  font-size: 15px;
  margin-bottom: 32px;
}
#imgBottomUser {
  position: relative;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}
#imgBottomAvatarGpm {
  position: relative;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
#imgBottomAvatar {
  position: relative;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.imgDelete {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.btnImgDelete {
  position: absolute;
  display: flex;
  align-items: center;
  margin: 1rem;
  border-radius: 0.5rem;
}
.alert-info {
  background: #5c5c6c85;
  border-color: #5c5c6c85;
  border-radius: 1rem;
  padding: 0;
  width: 90%;
  margin: auto;
}
.form-grouProfile {
  position: relative;
  border: none;
  outline: none;
}
.form-grouProfilePost {
  margin: 0 0.8rem 1.2rem 0.8rem;
}
#imgBottomUser {
  height: 20vw;
  object-fit: cover;
}
.imgProfil {
  height: 20vw;
  object-fit: cover;
}
.labelModify {
  text-decoration: none;
}
.btnModify,
.btnComent,
.btnTrash {
  background: 0;
}
#imgProfileUser {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  bottom: 0;
  margin: auto;
  object-fit: cover;
  border-radius: 10rem;
}
#imgAvatarUser {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  bottom: 0;
  margin: auto;
  object-fit: cover;
  border-radius: 10rem;
}
.infosUserProfile {
  margin: 5rem auto 2rem auto;
}
.gridBox {
  display: grid;
  justify-items: flex-start;
}
.containTitleProfil {
  display: flex;
  justify-content: center;
  font-size: larger;
}
.logoTransparentProfile {
  display: flex;
  margin: -1rem 0 0 0;
}
.cardTitleProfile {
  display: flex;
  margin: 0 1.5rem 1rem 1rem;
  text-decoration: none;
  flex-direction: column;
}
.separatorProfilUser {
  width: 5rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 0 auto 1.5rem 0;
}
.cardText {
  font-size: 22px;
}
.separatorPostUser {
  width: 6rem;
  height: 4px;
  background-color: #ffd7d7;
}
.formRowProfile {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  margin: 1rem 0 0 0;
}
/***************************
*****Animation du titre*****
****************************/
.aspect {
  font-size: 1.5rem;
  height: 35px;
}
/**************************
*****Fin anim titre********
***************************/
.btnFooterProfil {
  display: flex;
  padding-left: 0;
}
.liBtn {
  margin: 0 3rem;
}
.dateCreateProfil {
  margin: 0 auto 1rem auto;
}
/**************************************
*********Media Queries*****************
**************************************/
@media screen and (max-width: 912px) {
  .separatorProfilUser {
    margin: 0 auto 1.5rem 0;
  }
}
@media screen and (max-width: 900px) {
  .cardTitleProfile {
    margin: 0 1rem 0 0;
  }
  .titlePostUser {
    font-size: 25px;
  }
  .separatorProfilUser {
    margin: 0 auto 1.5rem 0;
  }
  .separatorPostUser {
    margin: 0rem 1rem 1rem 0.2rem;
  }
}
@media screen and (max-width: 768px) {
  .textImgBottom {
    display: none;
  }
  .cardSubtitle,
  h1 {
    font-size: 15px;
    margin: 0 0 17px 0;
  }
  .btnImgDelete {
    margin: 0.5rem;
  }
  h1 {
    font-size: 17px;
  }
  .containTitleProfil {
    flex-direction: column;
    margin: 0 auto 0 auto;
  }
  .logoTransparentProfile {
    margin: 1rem 0 0 0;
  }
  .cardTitle {
    margin: 0 auto 0.8rem 0;
    font-size: 18px;
  }
  .cardTitleProfile {
    margin: 0 auto 1rem 0;
    font-size: 20px;
  }
  .titlePostUser {
    font-size: 22px;
  }
  .separatorProfilUser {
    margin: 0 auto 1.5rem 0;
  }
  .separatorPostUser {
    margin: 0rem auto 1rem auto;
  }
  .formRowProfile {
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: space-between;
  }
  .btnFooterProfil,
  li {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding-left: 0;
  }
  .liBtn,
  li {
    margin: 1rem;
  }
  @media screen and (max-width: 393px) {
    .containTitleProfil {
      flex-direction: column;
      margin: 0 auto 0 auto;
    }
    .logoTransparentProfile {
      margin: 1rem 0 0 0;
    }
    .cardTitleProfile {
      margin: 0 auto 1.5rem auto;
      font-size: 20px;
    }
    .btnImgDelete {
      margin: 0.3rem;
    }
    .titlePostUser {
      font-size: 20px;
    }
    .separatorProfilUser {
      margin: 0 auto 1.5rem 0;
    }
    .separatorPostUser {
      margin: 0rem auto 1rem auto;
    }
    .dateCreateProfil,
    h5 {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 280px) {
    .auth-wrapper h3 {
      font-size: 16px;
    }
    .containTitleProfil {
      flex-direction: column;
      margin: 0 auto 0 auto;
    }
    .logoTransparentProfile {
      margin: 0;
    }
    .cardTitle {
      font-size: 16px;
    }
    .cardTitleProfile {
      margin: 0 auto 1.5rem auto;
    }
    .btnImgDelete {
      margin: 0.1rem;
    }
    .separatorProfilUser {
      margin: 1rem auto 1.5rem auto;
    }
    .separatorPostUser {
      margin: 0rem auto 1rem auto;
    }
    .dateCreateProfil,
    h5 {
      font-size: 14px;
    }
  }
}
</style>


