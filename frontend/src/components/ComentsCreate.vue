<template>
  <div class="form-control_input">
    <div>
      <div class="containerComent">
        <div class="avatarComent">

          <div class="avatar" v-if="user.attachment">
            <div class="imgUserComent">
              <img style="height: 50px; width: 40px" x="0" y="0" height="100%" width="100%" id="imgProfile"
                v-bind:src="user.attachment" alt="" />
            </div>
          </div>
          <div class="avatar" v-else>
            <div class="imgUserComent">
              <img style="height: 40px; width: 40px" x="0" y="0" height="100%" width="100%" id="imgAvatar"
                src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
            </div>
          </div>

          <form>
            <div class="form-groupComent">
              <label for="coment"></label>
              <textarea v-model="coment" type="text" id="coment" class="form-control" placeholder="Votre commentaire"
                autofocus />
            </div>
          </form>

          <button type="button" class="btn" @click="comentCreate()">
            <div class="newComentBtn">
              <div class="ComentBtn">
                <img src="../assets/Icons/envoyer.svg" alt="Envoyer votre commentaire">
              </div>
              <div class="ComentBtn">
                <span v-if="status == 'loading'">Publication en cours....</span>
                <span v-else></span>
              </div>
            </div>
          </button>


          <!-- v-if="length > 1 && !displayComents"  -->
          <!-- <button @click="allComents" class="displayComents btn btn-danger">
            Lister les commentaires -->
          <!-- v-if="length > 2" -->
          <!-- <span>Lister {{ post.coments.length - 1}} les autres commentaires.</span>
            <span>Lister {{ post.coments.length - 1}} autre commentaire.</span>
          </button> -->
        </div>
      </div>


      <!-- Message erreur création des commentaires  -->
      <p class="alet text-danger">{{ mesgError }}</p>

      <div class="col-md-8 col-xl-6 middle-wrapper">
        <div class="row">
          <!-- Gestion des commentaires du post-->
          <div class="col-md-12 grid-margin" v-for="coment in coments.slice(0,1)" v-bind:key="coment.id"
            :coment="coment">
            <div class="comentPost">
              <div>
                <!-- Modification des commentaires -->
                <div class="buttonModify">
                  <textarea v-bind:id="'inputComent-' + coment.id" v-model="coment.coment"
                    aria-label="Modifier le commentaire" style="display: none" class="form-control" button>
                  </textarea>
                  <button type="button" v-bind:id="'inputComentBtn-' + coment.id" style="display: none" class="btn"
                    @click="sentModify(coment.id)">
                    <div class="newComentBtn">
                      <div class="ComentBtn">
                        <img src="../assets/Icons/envoyer.svg" alt="Envoyer votre commentaire modifier">
                      </div>
                    </div>
                    <div class="ComentBtn">
                      <span v-if="status == 'loading'">Publication en cours....</span>
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
                  <img style="height: 45px; width: 35px" x="0" y="0" height="100%" width="100%" class="imgComent"
                    :src="coment.user.attachment" alt="" />
                </div>
                <div class="avatarComentUser" v-else>
                  <img style="height: 35px; width: 35px" x="0" y="0" height="100%" width="100%" class="avatarProfil"
                    src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
                </div>

                <div class="userComent">
                  <p class="textUserComent">
                    {{ coment.user.username }}
                  </p>
                  <div class="dateComent">
                    Posté le : {{ coment.createdAt }}
                  </div>
                </div>
                <!-- Fin informations de l'auteur du commentaire -->
              </div>
              <!-- Fin gestion des commentaires du post -->



              <!-- Lister tous les commentaires -->
              <router-link  v-bind:to="'/ComentsList/'">
                <button v-if="
                  coments.length > 1 " @click="allComents()" class="displayComents btn text-danger">
                  Voir tous les commentaires du post
                </button>
              </router-link>
            </div>




            <div class="containerBtnComent">
              <div class="btnFooter">
                <button type="button" class="btn" @click="comentDeleted(coment.id)">
                  <div class="trashBtn">
                    <div class="btnComent">
                      <img class="icon" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%" width="100%"
                        src="../assets/Icons/BiTrash3Fill.svg" alt="Supprimer votre commentaire">
                    </div>
                    <div class="btnComent">
                      <span v-if="status == 'loading'">Suppression en cours....</span>
                      <span v-else></span>
                    </div>
                  </div>
                </button>
              </div>
              <div class="btnFooter">
                <button v-if="role == admin" type="button" class="btn" @click="comentModify(coment.id)">
                  <img style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiPenFill.svg" alt="Modifier votre commentaire">
                  <span v-if="status == 'loading'">Modification en cours en cours....</span>
                  <span v-else></span>
                </button>
              </div>
            </div>
          </div>

        </div>
        <!-- <router-link v-bind:to="'/ComentsList/' + post.id">  -->
        <!-- <button type="button" class="btn" @click="allComents()"             :comentId="coment.id">
          </button> -->
        <!-- <button v-bind:to="'/ComentsList/' + post.id">
            <div class="col-md-12 grid-margin" v-for="coment in coments" v-bind:key="coment.id" :coment="coment">
            </div>

          </button> -->
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import comentsList from "@/components/ComentsList.vue";

export default {
  name: "ComentsCreate",
  components: { 
    comentsList,
  },
  props: {
    postId: String,
    comentId: String,
  },
  data: function () {
    return {
      user: {
        username: this.username,
        email: this.email,
        attachment: this.attachment,
        role: this.role,
      },
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
      mesgError: "",
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
  mounted: function () {
    this.apiComents
      .get("")
      .then((response) => {
        this.user = response.data;
      })
      .catch(function () {});
  },
  beforeMount() {
    this.getComentList();
  },
  computed: {
    ...mapState(["status"]),
    ...mapState({ user: "userInfos" }),
  },
  methods: {
    getProfilOne() {
      this.apiUser
        .get("/users/userId/" + this.userId)
        .then((response) => {
          this.user = response.data;
        })
        .catch(function () {});
    },
    getComentList() {
      if (this.coments > 1) {

      }else{
        this.apiComents
          .get("/coments/postId/" + this.postId)
          .then((response) => {
            this.coments = response.data;
            console.log(this.coments);
          })
          .catch(function (message) {
            console.log(message);
          });
      }
    },
    comentCreate: function () {
      if (this.coment !== null) {
        this.apiComents
          .post("http://localhost:3000/api/coments", {
            userId: this.$store.state.user.userId,
            postId: this.postId,
            coment: this.coment,
          })
          .then((response) => {
            if (!response.data) {
              return (this.mesgError = error.response.data.message)
            } else {
            window.location.reload();
            this.$router.push("/posts");
            this.getComentOne();
            }
          })
          .catch((error) => {
            alert(this.mesgError = error.response.data.message)
            alert("Oops ! Un problème est survenue avec vos saisies");
          });
      }
    },
    allComents: function () {
      this.apiComents
      .get("http://localhost:3000/api/coments")
        .then((response) => {
          this.coments = response.data;
          console.log(this.coments);
        })
        .catch(function (message) {
          console.log(message);
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
      this.apiComents
        .put("http://localhost:3000/api/coments/" + comentId, {
          coment: comentModify.value,
        })
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getComentList();
        })
        .catch(function () {});
    },
    comentDeleted: function (id) {
      if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
        this.apiComents
          .delete("http://localhost:3000/api/coments/" + id)
          .then(() => {
            window.location.reload();
            this.$router.push("/posts");
            this.getComentList();
          })
          .catch(function () {});
      }
    },
  },
};
</script>

<style>


.containerComent {
  /* display: flex;
  flex-direction: column; */
  margin: 1rem;
}
.avatarComent {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 61px 1fr 1fr;
  padding: 1rem 0 0 0;
}
/* @media screen and (max-width: 902px) {
  .avatarComent {
      flex-direction: column;
  }
}
@media screen and (max-width: 768px) {
  .avatarComent {
      flex-direction: column;
      padding: 1rem 0 0 0;
  }
} */
/* .newComentBtn { */
  /* display: flex;
  flex-direction: row-reverse;
  align-items: center; */
  /* margin: 13px;
} */
@media screen and (max-width: 768px) {
  .newComentBtn {
    flex-direction: column;
  }
}
.ComentBtn {
  align-content: center;
  /* margin: 0 1rem 0 0; */
}
.ComentBtn:hover {
  border: transparent;
  opacity: 2;
}
@media screen and (max-width: 768px) {
  .comentPost {
    margin: 0;
  }
}
.buttonModify {
  display: flex;
  margin: 0 0 1rem 0
}
@media screen and (max-width: 768px) {
.buttonModify {
    flex-direction: column;
  }
}
.comentModify {
  width: 100%;
  height: 10vh;
  border: 1px solid;
  padding: 0.5rem 1rem;
  text-align: justify;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
}

@media screen and (max-width: 768px) {
  .comentModify {
    flex-direction: column;
    border-radius: 1rem;
  }
}
.infosUser {
  display: flex;
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
@media screen and (max-width: 768px) {
  .form-groupComent {
      display: flex;
      margin: 10px 0;
    }
}
#coment {
  width: 100%;
  height: 1.6rem;
  background-color: #5c5c6c85;
}
@media screen and (max-width: 902px) {
  #coment {
      width: 100%;
    }
}
@media screen and (max-width: 768px) {
  #coment {
      width: 100%;
    }
}

.containerBtnComent {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid grey;
  width: 90%;
  margin: auto;
}
.trashBtn {
  display: flex;
  align-items: center;
}
.iconDelete {
  margin: 0 0.5rem 0 0;
}
.btn .btn-primary {
  outline: none;
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
  margin: 0 0.3rem;
}
.btnComent:hover {
  color: rgb(199, 16, 46);
  margin: 0 0.3rem;
}
</style>