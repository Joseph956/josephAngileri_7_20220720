<template>
  <div>
    <div class="form-controlInput">
      <div>
        <div class="containerComent">
          <div class="avatarComent">
            <div class="avatar" v-if="user.attachment">
              <div class="imgUserComent">
                <img
                  style="height: 50px; width: 40px"
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  id="imgProfile"
                  v-bind:src="user.attachment"
                  alt=""
                />
              </div>
            </div>
            <div class="avatar" v-else>
              <div class="imgUserComent">
                <img
                  style="height: 40px; width: 40px"
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  id="imgAvatar"
                  src="../assets/Icons/BiPersonCircle.svg"
                  alt="avatar"
                />
              </div>
            </div>
            <form>
              <div class="form-groupComent">
                <label for="coment"></label>
                <textarea
                  v-model="coment"
                  type="text"
                  id="coment"
                  class="form-control"
                  placeholder="Votre commentaire"
                  autofocus
                >
                </textarea>
              </div>
            </form>
            <button type="button" class="btn" @click="comentCreate()">
              <div class="newComentBtn">
                <div class="ComentBtn">
                  <img
                    src="../assets/Icons/envoyer.svg"
                    alt="Envoyer votre commentaire"
                  />
                </div>
                <div class="ComentBtn">
                  <span v-if="status == 'loading'"
                    >Publication en cours....</span
                  >
                  <span v-else></span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="col-md-8 col-xl-6 middle-wrapper">
          <div class="row">
            <div class="alert alert-info text-danger">
              {{ mesgError }}
            </div>
            <!-- Gestion des commentaires du post-->
            <div
              class="col-md-12 grid-margin"
              v-for="coment in coments.slice(0, 1)"
              v-bind:key="coment.id"
              :coment="coment"
            >
              <div class="comentPost">
                <div>
                  <!-- Modification des commentaires -->
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
                      class="btn"
                      type="button"
                      v-bind:id="'inputComentBtn-' + coment.id"
                      style="display: none"
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
                  <!-- Fin modification des commentaires -->

                  <!-- Affichage du commentaire -->
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
                    <div class="dateComent">
                      <p class="textUserComent">
                        Auteur : {{ coment.user.username }} <br />
                        Posté le :
                        {{ dayjs(coment.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="containerBtnComent">
                  <!-- Supprimer un commentaire -->
                  <div class="btnFooter">
                    <button
                      v-if="
                        isAdmin == true ||
                        $store.state.user.userId == coment.userId
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
                  <!-- Modifier un commentaire  -->
                  <div class="btnFooter">
                    <button
                      v-if="
                        isAdmin == true ||
                        $store.state.user.userId == coment.userId
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import comentsList from "@/components/ComentsList.vue";
import * as dayjs from "dayjs";
import "dayjs/locale/fr";
import fr from "dayjs/locale/fr";

export default {
  name: "ComentsCreate",
  components: {
    comentsList,
    dayjs,
    fr,
  },
  props: {
    postId: String,
    comentId: String,
  },
  data: function () {
    return {
      mesgError: "",
      isAdmin: false,
      user: {
        username: this.username,
        email: this.email,
        attachment: this.attachment,
        role: this.role,
      },
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/coments",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
      error: "",
      message: "",
      length: null,
      displayComents: true,
      apiUser: axios.create({
        baseURL:
          "http://localhost:3000/api/users/" + this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      users: [],
      user: {
        username: null,
        email: null,
        attachment: null,
        role: null,
      },
    };
  },
  mounted: function () {
    this.apiUser
      .get("")
      .then((response) => {
        this.user = response.data;
      })
      .catch(function () {});
  },
  beforeMount() {
    if (this.$store.state.user.role.role == "admin") {
      this.isAdmin = true;
    }
    this.getComentList();
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    getProfilOne() {
      this.apiUser
        .get("/users/userId/" + this.userId)
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
    getComentList() {
      if (this.coments > 1) {
      } else {
        this.apiComents
          .get("/postId/" + this.postId)
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
      }
    },
    comentCreate: function () {
      this.apiComents
        .post("http://localhost:3000/api/coments", {
          userId: this.$store.state.user.userId,
          postId: this.postId,
          coment: this.coment,
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
    dayjs: function (createdAt) {
      const Date = dayjs(createdAt)
        .locale("fr")
        .format("DD-MMMM-YYYY à HH:mm ");
      return Date;
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
  },
};
</script>

<style>
.containerComent {
  margin: 0 1rem 0 1rem;
  padding: 2rem 0 0 0;
}
.alert-info {
  background: #5c5c6c85;
  border-color: #5c5c6c85;
  border-radius: 1rem;
  padding: 0;
  margin: 1rem auto;
}
.avatarComent {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 61px 1fr 1fr;
}
.ComentBtn {
  align-content: center;
}
.ComentBtn:hover {
  border: transparent;
  opacity: 2;
}
.comentPost {
  border-top: none;
}
.buttonModify {
  display: flex;
  margin: 0 0 1rem 0;
  border-top: none;
}
.comentModify {
  width: 100%;
  height: 10vh;
  border: 1px solid;
  padding: 0.5rem 1rem;
  text-align: justify;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}
.avatarComentUser {
  display: flex;
}
.userComent {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  margin: 0rem 0 0 1rem;
}
.textUserComent {
  font-size: small;
  margin: 0;
  color: black;
}
.dateComent {
  text-align: left;
  margin: 0.2rem 0 0 0;
}
.infosUser {
  display: flex;
  margin-left: 1rem;
}
.imgUser {
  display: flex;
  align-items: center;
  align-content: center;
}
.imgUserComent {
  display: flex;
  align-items: stretch;
  margin: 0 1rem 0 1rem;
}
#imgProfile {
  border-radius: 5rem;
  object-fit: cover;
}
.dateComent {
  font-size: small;
  color: black;
}
.imgComent {
  border-radius: 5rem;
  object-fit: cover;
}
.form-groupComent {
  display: flex;
  gap: none;
  align-content: center;
  align-items: center;
  margin: 0.7rem 1rem;
}
#coment {
  width: 100%;
  height: 1.6rem;
  background-color: #5c5c6c85;
}
.containerBtnComent {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid grey;
  width: 90%;
  margin: 1rem auto 0.5rem auto;
}
.trashBtn {
  display: flex;
  align-items: center;
  margin: 0.5rem;
}
.iconDelete {
  margin: 0 0.5rem 0 0;
}
.btn .btn-primary {
  outline: none;
  border: none;
}
.modifyBtn {
  display: flex;
  align-items: center;
}
.iconModify {
  margin: 0 0.5rem 0 0;
}
.detailedBtn {
  display: flex;
  align-items: center;
}
.iconDetailed {
  margin: 0 0.5rem 0 0;
}
.trashBtn:hover {
  display: flex;
  color: rgb(199, 16, 46);
}
.btnComent {
  display: contents;
  margin: 0.5rem 0.3rem;
}
.btnComent:hover {
  color: rgb(199, 16, 46);
  margin: 0 0.3rem;
}
/************************************
**********Media queries**************
*************************************/
@media screen and (max-width: 902px) {
  #coment {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .newComentBtn {
    flex-direction: column;
  }
  .avatarComent {
    display: flex;
    flex-direction: column;
  }
  .comentPost {
    margin: 0;
  }
  .buttonModify {
    flex-direction: column;
  }
  .comentModify {
    flex-direction: column;
    border-radius: 1rem;
  }
  .userComent {
    align-content: center;
  }
  .textUserComent {
    margin: 0;
  }
  #coment {
    width: 100%;
  }
  .trashBtn {
    flex-direction: column;
  }
  .modifyBtn {
    flex-direction: column;
  }
  .iconDelete {
    margin-bottom: 1rem;
  }
  .iconModify {
    margin-bottom: 1rem;
  }
}
@media screen and (max-width: 372px) {
  .containerComent {
    margin: 0 auto 0 auto;
  }
  .dateComent {
    text-align: center;
    margin-bottom: 0;
  }
  .infosUser {
    flex-direction: column;
    margin: auto;
  }
  .userComent {
    display: contents;
    align-content: center;
  }
  .textUserComent {
    margin: 0;
  }
  .containerBtnComent {
    flex-direction: column;
  }
  #coment {
    height: auto;
  }
}
@media screen and (max-width: 280px) {
  .containerComent {
    margin: 0 auto 0 auto;
  }
  .btnFooter {
    display: flex;
  }
  .containerBtnComent {
    flex-direction: column;
  }
  #coment {
    height: auto;
  }
}
</style>