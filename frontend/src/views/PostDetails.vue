<template>
  <div>
    <navPosts />
    <!-- Template affichage détails d'un post -->
    <div class="col-md-8 col-xl-6 middle-wrapper">
      <div class="containTitle">
        <div class="logoTransparentDetaledUser">
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
          <h1>Details du post</h1>
          <div class="separatorUser"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 grid-margin">
          <div class="card rounded">
            <!-- Infos créateur du post -->
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between">
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
                        @click="created()"
                        data-dropdown-button
                        src="../assets/Icons/ariaCircle.svg"
                        alt=""
                      />infos
                    </button>
                    <div class="dropdown-menu information-grid">
                      <div>
                        <div class="dropdown-heading">Free Tutorials</div>
                        <div class="dropdown-links"></div>
                        <a href="#" class="link">All</a>
                        <a href="#" class="link">Latest</a>
                        <a href="#" class="link">Popular</a>
                      </div>
                      <div>
                        <div class="dropdown-heading">Courses</div>
                        <div class="dropdown-links"></div>
                        <a href="#" class="link">JavaScrit</a>
                        <a href="#" class="link">Css</a>
                        <a href="#" class="link">React</a>
                      </div>
                      <div>
                        <div class="dropdown-heading">Blog</div>
                        <div class="dropdown-links"></div>
                        <a href="#" class="link">All</a>
                        <a href="#" class="link">Latest</a>
                        <a href="#" class="link">Popular</a>
                      </div>
                      <div>
                        <div class="dropdown-heading">Other</div>
                        <div class="dropdown-links"></div>
                        <a href="#" class="link">Twiter</a>
                        <a href="#" class="link">Newsletter</a>
                        <a href="#" class="link">Discord</a>
                      </div>
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
              <!-- Image du post -->
              <div class="form-group">
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
                <div class="flexMenu">
                  <div class="btnDelPost">
                    <button
                      v-if="
                        isAdmin == true ||
                        $store.state.user.userId == post.userId
                      "
                      block
                      class="btn d-block"
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
                          <span v-else>Supprimer la publication</span>
                        </div>
                      </div>
                    </button>
                  </div>
                  <!-- Modifier un post -->
                  <div class="btnModifyPost">
                    <router-link v-bind:to="'/PostsUpdate/' + post.id">
                      <button
                        v-if="
                          isAdmin == true ||
                          $store.state.user.userId == post.userId
                        "
                        block
                        type="button"
                        class="btn d-block"
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
                          <div class="labelModify">
                            <!-- <span v-if="status == 'loading'"
                              >Modification en cours....</span
                            > -->
                            <span class="textBtn">Modifier la publication</span>
                          </div>
                        </div>
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Gestion du post -->
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
                        <span v-else
                          >- {{ post.coments.length }} - Commentaires <br
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
</template>

<script>
import axios from "axios";
import navPosts from "@/components/NavPosts.vue";
import comentsCreate from "@/components/ComentsCreate.vue";

export default {
  name: "PostDetails",
  components: {
    navPosts,
    comentsCreate,
  },
  props: ["userAdmin", "userCreate"],
  data: function () {
    return {
      mesgError: "",
      isAdmin: false,
      menusVisible: false,
      role: "",
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
      posts: [],
    };
  },
  beforeMount() {
    if (this.$store.state.user.role.role == "admin") {
      this.isAdmin = true;
    }
    console.log("mess post details" + this.isAdmin);

    this.getPostOne();
  },
  computed: {},
  created: function () {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  //test menus déroulants
  created: function () {
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
  methods: {
    toggleMenus() {
      this.menusVisible = !this.menusVisible;
    },
    toggleModale: function () {
      this.revele = !this.revele;
    },
    getPostOne() {
      this.apiPosts
        .get("/")
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.post = response.data;
          }
        })
        .catch(function (error) {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
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
    postDeleted: function (postId) {
      if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
        this.apiPosts
          .delete("http://localhost:3000/api/posts/" + postId)
          .then((response) => {
            if (!response.data) {
              return (this.mesgError = error.response.data.message);
            } else {
              this.$router.push("/posts");
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
.containTitle,
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 1rem;
}
@media screen and (max-width: 768px) {
  .containTitle,
  h1 {
    display: flex;
    flex-direction: column;
    font-size: larger;
  }
}
.logoTransparentDetaledUser {
  display: flex;
  margin: 0.5rem 0 0 0;
}
.cardTitle {
  display: flex;
  margin: 2rem 0 1rem 1rem;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .cardTitle {
    margin: 0 0 1rem 0;
  }
  .logoTransparentDetaledUser {
    margin: 1.5rem 0 0 0;
  }
}
.separatorUser {
  width: 6rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 0 0 0.5rem 0rem;
}
.card-body {
  padding-right: 0;
  padding-left: 0;
  padding-bottom: 1.5rem;
}
.flexMenu {
  display: flex;
  justify-content: space-around;
}
.modifyBtn {
  display: flex;
  text-decoration: none;
}
.labelModify {
  text-decoration: underline;
}
.textBtn {
  text-decoration-line: underline;
}
.card-footer {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
.linksPost {
  display: flex;
  margin-bottom: 1rem;
}
.likesPost {
  width: 50%;
  display: flex;
  justify-content: center;
}
.displayComents {
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .likeFlex {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .like {
    margin-bottom: 1rem;
  }
  .linkItems {
    margin: 0;
  }
  .displayComents {
    flex-direction: column;
    margin-top: 0;
  }
}

.comentsPost {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comentForm {
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}
.grid-margin {
  padding-left: 0;
  padding-right: 0;
}
</style>