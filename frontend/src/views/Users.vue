<template>
  <div>
    <navPosts />
    <div>
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
            <h1>Lister les profils utilisateurs</h1>
            <div class="separatorUser"></div>
          </div>
        </div>
        <br />
        <p class="alert alert-info text-danger">
          {{ msgError }}
        </p>

        <div class="row">
          <div class="wrapUsers">
            <div v-show="users.length > 0" v-for="user in users" :key="user.id">
              <div
                v-bind:id="'mesgError-' + user.id"
                class="alert alert-info text-danger"
              >
                <div v-if="$store.state.user.userId == user.id">
                  {{ mesgError }}
                </div>
              </div>
              <div class="cardUsers rounded">
                <div class="cardUser">
                  <div class="listInfosUsers" v-if="user.attachment">
                    <div>
                      <router-link v-bind:to="`/ProfileUsers/${user.id}`">
                        <img
                          style="height: 3rem; width: 3rem"
                          x="0"
                          y="0"
                          height="100%"
                          width="100%"
                          id="imgProfile"
                          v-bind:src="user.attachment"
                          alt="Photo de profil utilisateur"
                        />
                      </router-link>
                    </div>
                    <div class="listInfosUser">
                      <div class="infoUser">
                        <div class="infosHeader">
                          <h3 class="infosTitle">
                            Pseudo : {{ user.username }}
                          </h3>
                          <p class="infosDescription">
                            Email : {{ user.email }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        v-if="
                          isAdmin == true ||
                          $store.state.user.userId == user.userId
                        "
                        class="positionTrash"
                      >
                        <button
                          block
                          class="btn"
                          data-dropdown-button
                          @click="userDeleted(user.id)"
                        >
                          <div class="trashBtn">
                            <div class="btnComent">
                              <img
                                style="height: 1.2rem; width: 1.2rem"
                                x="0"
                                y="0"
                                height="100%"
                                width="100%"
                                src="../assets/Icons/BiTrash3Fill.svg"
                                alt="supprimer le profil"
                              />
                            </div>
                            <div class="btnComent">
                              <span v-if="status == 'loading'"
                                >Suppression en cours....</span
                              >
                              <span v-else></span>
                            </div>
                          </div>
                        </button>
                      </div>
                      <div v-else>
                        <div class="trashBtn">
                          <div class="btnComent">
                            <img
                              style="height: 1.2rem; width: 1.2rem"
                              x="0"
                              y="0"
                              height="100%"
                              width="100%"
                              src="../assets/Icons/BiTrash3Fill.svg"
                              alt="supprimer le profil"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="listInfosUsers" v-else>
                    <div>
                      <router-link v-bind:to="`/ProfileUsers/${user.id}`">
                        <img
                          style="height: 3rem; width: 3rem"
                          x="0"
                          y="0"
                          height="100%"
                          width="100%"
                          id="imgAvatar"
                          src="../assets/Icons/BiPersonCircle.svg"
                          alt="avatar"
                          class="imgAvatarUser"
                        />
                      </router-link>
                    </div>

                    <div class="listInfosUser">
                      <div class="infoUser">
                        <div class="infosHeader">
                          <h3 class="infosTitle">
                            Pseudo : {{ user.username }}
                          </h3>
                          <p class="infosDescription">
                            Email : {{ user.email }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        v-if="
                          isAdmin == true ||
                          $store.state.user.userId == user.userId
                        "
                        class="positionTrash"
                      >
                        <button
                          class="btn"
                          data-dropdown-button
                          @click="userDeleted(user.id)"
                        >
                          <div class="trashBtn">
                            <div class="btnComent">
                              <img
                                style="height: 1.2rem; width: 1.2rem"
                                x="0"
                                y="0"
                                height="100%"
                                width="100%"
                                src="../assets/Icons/BiTrash3Fill.svg"
                                alt="supprimer le profil"
                              />
                            </div>
                            <div class="btnComent">
                              <span v-if="status == 'loading'"
                                >Suppression en cours....</span
                              >
                              <span v-else></span>
                            </div>
                          </div>
                        </button>
                      </div>
                      <div v-else>
                        <div class="trashBtn">
                          <div class="btnComent">
                            <img
                              style="height: 1.2rem; width: 1.2rem"
                              x="0"
                              y="0"
                              height="100%"
                              width="100%"
                              src="../assets/Icons/BiTrash3Fill.svg"
                              alt="supprimer le profil"
                            />
                          </div>
                        </div>
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
      </div>
    </div>
    <button type="button" class="btnUp" @click="switchToUp()">
      <a class="bloc-button btn btn-d scrollToTop" @click="switchToUp('1')">
        <span class="fa fa-chevron-up"></span>
      </a>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";
import profileUsers from "@/views/ProfileUsers.vue";

export default {
  name: "Users",
  components: { navPosts, profileUsers },
  props: ["profile"],
  data: function () {
    return {
      mesgError: "",
      msgError: "",
      isAdmin: false,
      instance: axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      users: [],
    };
  },
  beforeMount() {
    if (this.$store.state.user.role.role == "admin") {
      this.isAdmin = true;
    }
  },
  mounted: function () {
    this.instance
      .get("users/")
      .then((response) => {
        if (!response.data) {
          this.msgError = error.response.data.message;
        } else {
          this.users = response.data;
        }
      })
      .catch((error) => {
        this.msgError = error.response.data.message;
      });
  },
  
  computed: {
    ...mapState(["status"]),
  },
  methods: {
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
    userDeleted: function (userId) {
      if (
        window.confirm(
          "Attention cette action est irreverssible, toutes les données, de cet utlisateur ainsi que ses publications, ses commentaires, et ses likes vont être supprimées !!!"
        )
      ) {
        this.instance
          .delete("users/" + userId)
          .then((response) => {
            if (!response.data) {
              this.mesgError = error.response.data.message;
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            this.mesgError = error.response.data.message;
          });
      }
    },
  },
};
</script>

<style scoped>
.wrapUsers {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
/* .col-md-8 {
  background: #4e5166;
  border-radius: 2rem;
} */
.containerTitre,
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 1rem 0 1rem;
}

.logoTransparentUser {
  display: flex;
  margin-top: 0.6rem;
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
  background: #75758585;
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
  padding: 5px 0 5px 10px;
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
/************************************
*********Media queries***************
************************************/
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
  .cardUser {
    margin: 1rem 0 1rem 0;
  }
  .cardTitleUser {
    margin: 1rem 0 0 0;
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
}
</style>