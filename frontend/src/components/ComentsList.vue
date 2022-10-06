<template>
  <div>
    <navPosts />
    <div class="fleche">
      <a href="/posts">
        <button
          type="button"
          class="btn btn-like"
          @click="postDetailReturn(postId)"
        >
          <img
            class="returnPg"
            style="height: 45px; width: 35px"
            x="0"
            y="0"
            height="100%"
            width="100%"
            src="../assets/Icons/MdiArrowLeft.svg"
            alt=""
          />
        </button>
      </a>
      <div class="containTitleComent">
        <div class="logoTransparentComent">
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
        <div class="flexTitle">
          <div class="cardTitleComent">
            <h1>Commentaires des publications</h1>
            <div class="separatorComent"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8 col-xl-6 middle-wrapper">
      <div class="rowList">
        <div
          v-for="coment in coments"
          :key="coment.id"
          :coment="coment"
          :post="post"
          class="col-md-12 grid-margin"
        >
          <!-- Modification des commentaires -->
          <div>
            <div
              v-bind:id="'mesgError-' + coment.id"
              class="alert alert-info text-danger"
            >
              {{ mesgError }}
            </div>
            <div class="buttonModify">
              <textarea
                v-bind:id="'inputComent-' + coment.id"
                v-model="coment.coment"
                aria-label="Modifier le commentaire"
                style="display: none"
                class="form-control"
                button
              >
              </textarea>
              <button
                type="button"
                v-bind:id="'inputComentBtn-' + coment.id"
                style="display: none"
                class="btn"
                @click="sentModify(coment.id)"
              >
                <div class="newComentBtn">
                  <div class="ComentBtn">
                    <img
                      src="../assets/Icons/envoyer.svg"
                      alt="Envoyer votre commentaire modifier"
                    />
                  </div>
                </div>
                <div class="ComentBtn">
                  <span v-if="status == 'loading'"
                    >Publication en cours....</span
                  >
                  <span v-else></span>
                </div>
              </button>
            </div>
          </div>

          <!-- Contenu des commentaires -->
          <div class="comentPost">
            <p class="comentUser">
              {{ coment.coment }}
            </p>
          </div>
          <!-- Informations de l'auteur du commentaire -->
          <div class="infosUser">
            <div class="avatarComentUser" v-if="coment.user.attachment">
              <img
                style="height: 45px; width: 35px"
                x="0"
                y="0"
                height="100%"
                width="100%"
                class="imgComent"
                :src="coment.user.attachment"
                alt=""
              />
            </div>
            <div class="avatarComentUser" v-else>
              <img
                style="height: 35px; width: 35px"
                x="0"
                y="0"
                height="100%"
                width="100%"
                class="avatarProfil"
                src="../assets/Icons/BiPersonCircle.svg"
                alt="avatar"
              />
            </div>

            <div class="userComent">
              <p class="textUserComent">
                {{ coment.user.username }}
              </p>
              <div class="dateComent">Posté le : {{ coment.createdAt }}</div>
            </div>
          </div>
          <!-- Boutons supprimer/modifier -->
          <div class="containerBtnComent">
            <div class="btnFooter">
              <button
                v-if="
                  isAdmin == true || $store.state.user.userId == coment.userId
                "
                block
                class="btn d-block"
                type="button"
                @click="comentDeleted(coment.id)"
              >
                <div class="trashBtn">
                  <div class="btnComent">
                    <img
                      class="icon"
                      style="height: 1.2rem; width: 1.2rem"
                      x="0"
                      y="0"
                      height="100%"
                      width="100%"
                      src="../assets/Icons/BiTrash3Fill.svg"
                      alt="Supprimer votre commentaire"
                    />
                  </div>
                  <div class="btnComent">
                    <span v-if="status == 'loading'"
                      >Suppression en cours....</span
                    >
                    <span v-else>Supprimer</span>
                  </div>
                </div>
              </button>
            </div>
            <div class="btnFooter">
              <button
                v-if="
                  isAdmin == true || $store.state.user.userId == coment.userId
                "
                block
                class="btn d-block"
                type="button"
                @click="comentModify(coment.id)"
              >
                <div class="trashBtn">
                  <div class="btnComent">
                    <img
                      class="icon"
                      style="height: 1.2rem; width: 1.2rem"
                      x="0"
                      y="0"
                      height="100%"
                      width="100%"
                      src="../assets/Icons/BiPenFill.svg"
                      alt="Modifier votre commentaire"
                    />
                  </div>
                  <div class="btnComent">
                    <span v-if="status == 'loading'"
                      >Modification en cours en cours....</span
                    >
                    <span v-else>Modifier</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navPosts from "@/components/NavPosts.vue";
export default {
  name: "ComentsList",
  components: {
    navPosts,
  },
  data: function () {
    return {
      mesgError: "",
      isAdmin: false,
      apiComents: axios.create({
        baseURL:
          "http://localhost:3000/api/coments/postId/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
    };
  },
  mounted: function () {
    this.apiComents
      .get("/")
      .then((response) => {
        if (!response.data) {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        } else {
          this.user = response.data;
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
    this.getComentList();
  },

  methods: {
    getComentList() {
      this.apiComents
        .get("/")
        .then((response) => {
          if (!response.data) {
            this.mesgError = error.response.data.message;
            alert(this.mesgError);
          } else {
            this.coments = response.data;
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    comentModify: function (comentId) {
      let comentUser = document.getElementById("inputComent-" + comentId);
      comentUser.style.display = "block";

      let inputComent = document.getElementById("inputComentBtn-" + comentId);
      inputComent.style.display = "block";
    },
    sentModify: function (comentId) {
      let comentModify = document.getElementById("inputComent-" + comentId);
      if (window.confirm("Voulez-vous vraiment modifier ce commentaire ?")) {
        this.apiComents
          .put("http://localhost:3000/api/coments/" + comentId, {
            coment: comentModify.value,
          })
          .then((response) => {
            if (!response.data) {
              this.mesgError = error.response.data.message;
              alert(this.mesgError);
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
    comentDeleted: function (comentId) {
      if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
        this.apiComents
          .delete("http://localhost:3000/api/coments/" + comentId)
          .then((response) => {
            if (!response.data) {
              this.mesgError = error.response.data.message;
              alert(this.mesgError);
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
    postDetailReturn: function () {
      this.$router.push("/posts");
    },
  },
};
</script>

<style>
.fleche {
  display: flex;
  align-items: center;
}
.containTitleComent {
  display: flex;
  align-items: center;
}
.logoTransparentComent {
  margin: 2.3rem 0;
}
.flexTitle {
  display: flex;
  flex-direction: column;
}
.cardTitleComent {
  margin: 2.3rem 0 1rem 1rem;
}
.separatorComent {
  width: 5rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 0rem 0 1.5rem 0rem;
}
.returnPg {
  margin: 0 5rem 0 3rem;
}

.rowList {
  padding: 1rem;
  background: #5c5c6c85;
  border-radius: 1.5rem;
}
.comentPost {
  margin: 1rem;
  border-top: 1px solid grey;
}
/**************************************
**********Media queries****************
***************************************/
@media screen and (max-width: 966px) {
  .cardTitleComent h1 {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  .fleche {
    justify-content: flex-end;
  }
  .containTitleComent {
    flex-direction: column;
  }
  .logoTransparentComent {
    margin: 3rem 0 0 0;
  }
  .cardTitleComent {
    margin: 0;
  }
  .cardTitleComent h1 {
    font-size: 1.5rem;
  }
  .separatorComent {
    margin: 1rem auto 1rem auto;
  }
  .btnFooter {
    display: flex;
    justify-content: center;
  }
}
@media screen and (max-width: 393px) {
  .fleche {
    flex-direction: column;
  }
  .returnPg {
    margin: 3rem 3rem 0 3rem;
  }
  .btnFooter {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 280px) {
  .btnFooter {
    display: flex;
    justify-content: center;
  }
}
</style>