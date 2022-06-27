<template>
  <div>
    <navProfil />
    <div class="card">
      <h1 class="cardTitle">Profil utilisateur</h1>
      <h2 class="cardSubtitle">Informations personnelles</h2>




      <!-- Image de fond -->
      <div class="form-grouProfile" v-if="user.imgBottom">
        <img id="imgBottomUser"
          v-bind:src="user.imgBottom" alt="Image de fond compte utilisateur" />
      </div>
      <div class="form-grouProfile" v-else>
        <img style="height: 20rem; width: 40rem" x="0" y="0" height="100%" width="100%" id="imgBottomAvatar"
          src="../assets/Fond-Gris.jpg" alt="avatar" />
      </div>


      <!--Photo de profil  -->
      <div class="form-grouProfile">
        <div v-if="user.attachment">
          <img style="height: 10rem; width: 10rem" x="0" y="0" height="100%" width="100%" id="imgProfileUser"
            v-bind:src="user.attachment" alt="Photo de profil utilisateur" />
          <!-- <h3>{{ user.username }}</h3> -->
        </div>
        <div class="form-grouProfile" v-else>
          <img style="height: 10rem; width: 10rem" x="0" y="0" height="100%" width="100%" id="imgAvatarUser"
            src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
        </div>
      </div>
      <div class="infosUserProfile">
        <h3>{{ user.username }}</h3>
        <h1>{{ user.email }}</h1>
      </div>
      <div class="formRowProfile">
        <router-link v-bind:to="'/ProfilUpdate/' + user.id">
          <button type="button" class="btn btn-primary" @click="userModify()" :userId="user.id">
            <span v-if=" status=='loading'">Ouverture du formulaire de modification en cours....</span>
            <span v-else>Modifier le profil</span>
          </button>
        </router-link>

        <router-link v-bind:to="'/PasswdUpdate/' + user.id">
          <button type="button" class="btn btn-primary" @click="passwdModify()" :userId="user.id">
            <span v-if="status == 'loading'">Ouverture du formulaire de modification en cours....</span>
            <span v-else>Modifier le mot de passe</span>
          </button>
        </router-link>



        <!-- Rendu conditionnel du bouton supprimer -->
        <div>
          <div v-if="mode == 'isAdmin'">
            <button class="btn" data-dropdown-button @click="userDeleted()">
              <div class="trashBtn">
                <div class="btnComent">
                  <img src="../assets/Icons/BiTrash3Fill.svg" alt="">
                </div>
                <div class="btnComent">
                  <span v-if="status == 'loading'">Suppression en cours....</span>
                  <span v-else>Supprimer</span>
                </div>
              </div>
            </button>
          </div>
          <div v-else>
            <button class="btn" data-dropdown-button @click="userDeleted()">
              <div class="trashBtn">
                <div class="btnComent">
                  <img src="../assets/Icons/BiTrash3Fill.svg" alt="">
                </div>
                <div class="btnComent">
                  <span v-if="status == 'loading'">Suppression en cours....</span>
                  <span v-else>Supprimer</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <!-- Fin rendu conditionnel -->
        <button type="button" class="btn btn-primary" @click="logout()">
          Déconnexion
        </button>
      </div>
    </div>
    <div class="logoTransparent">
      <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
        src="../assets/logo_transparent.png" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
import Profils from "./Users.vue";
import ProfilUpdate from "@/components/ProfilUpdate.vue";
import PasswdUpdate from "@/components/PasswdUpdate.vue";
export default {
  name: "Profile",
  components: {
    Profils,
    navProfil,
    ProfilUpdate,
    PasswdUpdate,
  },
  data: function () {
    return {
      user: {
        usermame: this.username,
        email: this.email,
        attachment: this.attachment,
        imgBottom: this.imgBottom,
      },
      mode: "isAdmin",
      role: "",
      apiUser: axios.create({
        baseURL:
          "http://localhost:3000/api/users/" + this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
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
  computed: {
    validatedFields: function () {
      if (this.mode == "isAdmin") {
        if (
          this.role != "" &&
          this.role == "admin") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.role != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    //Supprimer un profil avec ses posts et coments
    userDeleted: function (id) {
      console.log("------->CONTENU USER: id");
      console.log(id);
      if (
        window.confirm("Voulez-vous vraiment supprimer ce compte utilisateur ?")
      ) {
        this.apiUser
          .delete("http://localhost:3000/api/users/" + id)
          .then(() => {
            this.$store.commit("logout");
            this.$router.push("/");
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






.form-grouProfile {
  position: relative;
  border: none;
  outline: none;
}
#imgBottomUser {
  width: 100%;
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
  margin: 6rem auto 0 auto;
}

.formRowProfile {
  display: flex;
  margin: 1rem 0 0 0;
}
@media screen and (max-width: 740px) {
  .formRowProfile {
     flex-direction: column;
     align-items: center;
     align-content: center;
    }
}
</style>


