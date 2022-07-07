<template>
  <div>
    <navProfil />
    <div class="card">
      <h1 class="cardTitle">Profil utilisateur</h1>
      <h2 class="cardSubtitle">Informations personnelles</h2>
      <!-- Image de fond -->
      <div class="form-grouProfile" v-if="user.imgBottom">
        <img style="height: auto; width: 100%" x="0" y="0" height="100%" width="100%" id="imgBottomUser"
          v-bind:src="user.imgBottom" alt="Image de fond compte utilisateur" />
      </div>
      <div class="form-grouProfile" v-else>
        <img style="height: 25vw; width: 100%" x="0" y="0" height="100%" width="100%" id="imgBottomAvatar"
          src="../assets/Fond-Gris.jpg" alt="avatar" />
      </div>
      <!--Photo de profil  -->
      <div class="form-grouProfile">
        <div v-if="user.attachment">
          <img style="height: 10rem; width: 10rem" x="0" y="0" height="100%" width="100%" id="imgProfileUser"
            v-bind:src="user.attachment" alt="Photo de profil utilisateur" />
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
        <ul class="btnFooterProfil">
          <li class="liBtn">
            <router-link v-bind:to="'/ProfilUpdate/' + user.id">
              <button type="button" class="btnModify" @click="userModify()" :userId="user.id">
                <img style=" height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%" width="100%"
                  src="../assets/Icons/BiPenFill.svg" alt="modifier le profil">
                <span v-if=" status=='loading'">Ouverture du formulaire de modification en cours....</span>
                <span v-else></span>
              </button>
            </router-link>
          </li>
          <li class="liBtn">
            <router-link v-bind:to="'/PasswdUpdate/' + user.id">
              <button type="button" class="btnModify " @click="passwdModify()" :userId="user.id">
                <img style=" height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%" width="100%"
                  src="../assets/Icons/BiLockFill.svg" alt="modifier le mot de passe">
                <span v-if="status == 'loading'">Ouverture du formulaire de modification en cours....</span>
                <span v-else></span>
              </button>
            </router-link>
          </li>
          <li class="liBtn">
            <button class="btnTrash" data-dropdown-button @click="userDeleted(user.id)">
              <div class="btnModify">
                <div class="btnModify">
                  <img class="btnTrash" style=" height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiTrash3Fill.svg" alt="supprimer le compte utilisateur">
                </div>
                <div class="btnModify">
                  <span v-if="status == 'loading'">Suppression en cours....</span>
                  <span v-else></span>
                </div>
              </div>
            </button>
          </li>
          <li class="liBtn">
            <button type="button" class="btnModify" @click="logout()">
              <img style="height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%" width="100%"
                src="../assets/Icons/sign-out-alt-regular.svg" alt="deconnexion">
            </button>
          </li>
        </ul>

      </div>
      <div class="alert text-danger">{{ mesgError }} </div>
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
// import Profils from "./Users.vue";
import ProfilUpdate from "@/components/ProfilUpdate.vue";
import PasswdUpdate from "@/components/PasswdUpdate.vue";
export default {
  name: "Profile",
  components: {
    // Profils,
    navProfil,
    ProfilUpdate,
    PasswdUpdate,
  },
  data: function () {
    return {
      mesgError: "",
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
    getUserOne() {
      this.apiUser
        .get("")
        .then((response) => {
          this.user = response.data;
          window.location.reload();
        })
        .catch(function (error) { });
    },
    userDeleted: function (userId) {
      if (
        window.confirm("Voulez-vous vraiment supprimer ce compte utilisateur ?")
      ) {
        this.apiUser
          .delete("http://localhost:3000/api/users/" + userId)
          .then((response) => {
            if (!response) {
              this.mesgError = error.response.data.message
            } else {
              this.$store.commit("logout");
              this.$router.push("/");
            }
          }).catch((error) => {
            alert(this.mesgError = error.response.data.message)
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
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e51665a;
  border-radius: 1rem;
  background: #4e5166;
}


.cardSubtitle {
  font-size: 15px;
  margin-bottom: 32px;
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
  .cardSubtitle, h1 {
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
  margin: 6rem auto 0 auto;
}

.formRowProfile {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  /* margin: 1rem 0 0 0; */
}
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
    .btnFooterProfil, li {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      padding-left: 0;
    }
    .liBtn, li{
     margin: 1rem;
    }
}
</style>


