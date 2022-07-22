<template>
  <div>
    <navPosts />
    <div class="card">
      <!-- Image de fond -->
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
          id="imgBottomAvatar"
          src="../assets/Fond-Gris.jpg"
          alt="avatar"
        />
      </div>
      <!--Photo de profil  -->
      <div class="form-grouProfile">
        <div v-if="user.attachment">
          <img
            style="height: 10rem; width: 10rem"
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
            style="height: 10rem; width: 10rem"
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
      <div class="infosUserProfile">
        <h1 class="cardTitle">Profil utilisateur</h1>
        <h3 class="cardSubtitle">Informations personnelles</h3>
        <h3>{{ user.username }}</h3>
        <h3>{{ user.email }}</h3>
      </div>
      <div class="formRowProfile">
        <ul class="btnFooterProfil">
          <li class="liBtn">
            <router-link v-bind:to="'/ProfilUpdate/' + user.id">
              <button
                type="button"
                class="btnModify"
                @click="userModify()"
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
          <li class="liBtn">
            <router-link v-bind:to="'/PasswdUpdate/' + user.id">
              <button
                type="button"
                class="btnModify"
                @click="passwdModify()"
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
        <!-- Lister les publication de l'utilisateur -->
      </div>
      <div class="alert alert-info text-danger">{{ mesgError }}</div>
      <!-- Template affichage détails d'un post -->
      <div class="col-md-8 col-xl-6 middle-wrapper">
        <navPosts />
        <h1>Details des publications de l'utilisateur</h1>
        <div class="row">
          <div
            v-show="posts.length > 0"
            v-for="post in posts"
            :key="post.id"
            class="col-md-12 grid-margin"
          >
            <div class="col-md-12 grid-margin">
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
                            <p class="datePost">
                              {{ post.user.username }} <br />
                              Posté le : {{ post.createdAt }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="linkPost">
                      <div class="dropdown" data-dropdown>
                        <button class="link" data-dropdown-button type="button">
                          <img
                            data-dropdown-button
                            src="../assets/Icons/ariaCircle.svg"
                            alt=""
                          />
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
                    <router-link class="external" v-bind:to="'/Posts/'">
                      <div class="infos">
                        <p class="aspect">Afficher les publications:</p>
                        {{ post.title }}
                      </div>
                    </router-link>
                    <!-- Fin animation du titre -->
                  </p>
                  <p class="mb-3 tx-14">{{ post.content }}</p>
                  <!-- Image du post -->
                  <div class="form-group">
                    <div class="form-group">
                      <div v-if="post.attachment">
                        <img
                          class="imgPost"
                          style="height: 70vh; width: 100%"
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
                          style="height: 30rem; width: 30rem"
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
                    <div class="btnDelPost">
                      <button
                        class="btn"
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
                            <span v-else>Supprimer votre publication</span>
                          </div>
                        </div>
                      </button>
                    </div>
                    <!-- Modifier un post -->
                    <div class="btnModifyPost">
                      <router-link v-bind:to="'/PostsUpdate/' + post.id">
                        <button
                          type="button"
                          class="btn"
                          @click="postModify()"
                          :postId="post.id"
                        >
                          <div class="modifyBtn">
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
                              <span v-if="status == 'loading'"
                                >Modification en cours....</span
                              >
                              <span v-else>Modifier votre publication</span>
                            </div>
                          </div>
                        </button>
                      </router-link>
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
                                        <p class="d-none d-md-block ml-2">
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
                              <p class="d-none d-md-block ml-2">
                                <span v-if="post.coments.length < 2">
                                  - {{ post.coments.length }} - Commentaire <br
                                /></span>
                                <span v-else>
                                  - {{ post.coments.length }} - commentaires
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
import ProfilUpdate from "@/components/ProfilUpdate.vue";
import PasswdUpdate from "@/components/PasswdUpdate.vue";

export default {
  name: "Profile",
  components: {
    navPosts,
    ProfilUpdate,
    PasswdUpdate,
  },
  data: function () {
    return {
      mesgError: "",
      user: {
        imgBottom: this.imgBottom,
        attachment: this.attachment,
        usermame: this.username,
        email: this.email,
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
    this.apiUser
      .get("/")
      .then((response) => {
        if (!response) {
          this.mesgError = error.response.data.message;
        } else {
          this.user = response.data;
          console.log("apiUser");
          this.getPostList();
        }
      })
      .catch((error) => {
        alert((this.mesgError = error.response.data.message));
      });
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    displayAllComents: function () {
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.coments = response.data;
            console.log(this.coments);
          }
        })
        .catch(function (message) {
          console.log(message);
        });
    },
    getPostList: function () {
      console.log("getPostList");
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
          alert((this.mesgError = error.response.data.message));
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
            alert((this.mesgError = error.response.data.message));
          });
      }
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
}
.cardSubtitle {
  font-size: 15px;
  margin-bottom: 32px;
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
#imgBottomUser {
  width: 100%;
}
@media screen and (max-width: 768px) {
  .cardSubtitle,
  h1 {
    font-size: 15px;
    margin: 0 0 17px 0;
  }
  #imgBottomAvatar {
    width: auto;
    height: 10rem;
  }
  h1 {
    font-size: 17px;
  }
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
  margin: 6rem auto 2rem auto;
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
}
/**************************
*****Fin anim titre********
***************************/
.btnFooterProfil {
  display: flex;
}
.liBtn {
  margin: 0 3rem;
}
@media screen and (max-width: 768px) {
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
}
</style>


