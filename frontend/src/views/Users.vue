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
            alt=""
          />
        </div>
        <div class="cardTitle">
          <h1>Lister tous les profils utilisateurs</h1>
        </div>
      </div>
      <br />

      <p class="alert alert-info text-danger">
        {{ mesgError }}
      </p>
      <div class="row">
        <div v-show="users.length > 0" v-for="user in users" :key="user.id">
          <div class="cardUsers rounded">
            <div class="cardUser">
              <div class="listInfosUsers" v-if="user.attachment">
                <div>
                  <router-link v-bind:to="'/Profile/'">
                    <img
                      style="height: 10rem; width: 10rem"
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
                  <div>
                    <div>
                      <h3>{{ user.username }}</h3>
                    </div>
                    <div>
                      <h3>{{ user.email }}</h3>
                    </div>
                  </div>
                  <div class="positionTrash">
                    <button
                      class="btn"
                      data-dropdown-button
                      @click="userDeleted(user.id)"
                      :class="{
                        'btn--disabled': !validatedFields,
                      }"
                    >
                      <div class="trashBtn">
                        <div class="btnComent">
                          <img
                            style="height: 1.5rem; width: 1.5rem"
                            x="0"
                            y="0"
                            height="100%"
                            width="100%"
                            src="../assets/Icons/BiTrash3Fill.svg"
                            alt=""
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
                </div>
              </div>
              <div class="listInfosUsers" v-else>
                <div>
                  <router-link v-bind:to="'/Profile/'">
                    <img
                      style="height: 10rem; width: 10rem"
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
                  <div>
                    <div>
                      <h3>{{ user.username }}</h3>
                    </div>
                    <div>
                      <h3>{{ user.email }}</h3>
                    </div>
                  </div>
                  <div class="positionTrash">
                    <button
                      class="btn"
                      data-dropdown-button
                      @click="userDeleted(user.id)"
                      :class="{
                        'btn--disabled': !validatedFields,
                      }"
                    >
                      <div class="trashBtn">
                        <div class="btnTrashUser">
                          <img
                            style="height: 1.5rem; width: 1.5rem"
                            x="0"
                            y="0"
                            height="100%"
                            width="100%"
                            src="../assets/Icons/BiTrash3Fill.svg"
                            alt=""
                          />
                        </div>
                        <div class="btnTrashUser">
                          <span v-if="status == 'loading'"
                            >Suppression en cours....</span
                          >
                          <span v-else></span>
                        </div>
                      </div>
                    </button>
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
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";
export default {
  name: "Users",
  components: { navPosts },
  data: function () {
    return {
      mesgError: "",
      apiUser: axios.create({
        baseURL: "http://localhost:3000/api/users/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      users: [],
    };
  },
  mounted: function () {
    this.apiUser
      .get("/")
      .then((response) => {
        this.users = response.data;
      })
      .catch(function () {});
  },
  beforeMount() {
    this.getUserList();
  },
  computed: {
    ...mapState(["status"]),
    ...mapState({ user: "userInfos" }),
  },
  methods: {
    getUserList() {
      this.apiUser
        .get("/")
        .then((response) => {
          this.users = response.data;
        })
        .catch(function (error) {});
    },
    //Supprimer un profil avec ses posts et coments
    userDeleted: function (userId) {
      if (
        window.confirm("Voulez-vous vraiment supprimer ce compte utilisateur ?")
      ) {
        this.apiUser
          .delete("http://localhost:3000/api/users/" + userId)
          .then((response) => {
            if (!response.data) {
              return (this.mesgError = error.response.data.message);
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            alert((this.mesgError = error.response.data.message));
          });
      }
    },
  },
};
</script>

<style scoped>
.col-md-8 {
  background: #4e5166;
  padding: 2rem;
  border-radius: 2rem;
}
.containerTitre,
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 1rem;
}
@media screen and (max-width: 768px) {
  .containerTitre,
  h1 {
    display: flex;
    flex-direction: column;
    font-size: larger;
  }
}
.logoTransparentUser {
  display: flex;
}
.alert-info {
  background: #5c5c6c85;
  border-color: #5c5c6c85;
  border-radius: 1rem;
  padding: 0;
}
.cardTitle {
  display: flex;
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
  padding: 0.5rem;
  background: #5c5c6c85;
}
#imgProfile {
  border-radius: 5rem;
  object-fit: cover;
}
@media screen and (max-width: 768px) {
  .listInfosUsers {
    flex-direction: column;
  }
}
.listInfosUser {
  display: flex;
  margin: 0 5rem 0 7rem;
}
@media screen and (max-width: 768px) {
  .listInfosUser {
    flex-direction: column;
    margin: 1rem;
  }
}
.imgAvatarUser {
  margin: 0 auto 0 auto;
}
.positionTrash {
  display: flex;
  align-items: center;
  margin: 0 0rem 0 5rem;
}
@media screen and (max-width: 768px) {
  .positionTrash {
    justify-content: center;
    margin: auto;
  }
}
.btnTrashUser {
  font-size: 2rem;
}
</style>