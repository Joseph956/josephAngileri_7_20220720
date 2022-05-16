<template>
  <div>
    <navProfil />
    <div class="modPasswd">
      <div class="container">
        <form>
          <h1 class="nav-link-title" v-if="mode == 'confirmPassword'">
            Confirmer le mot de passe
          </h1>
          <h1 class="nav-link-title" v-else>Modifier le mot de passe</h1>
          <p class="nav-link-subtitle" v-if="mode == 'confirmPassword'">
            Vous voulez modifier votre mot de passe ?<br /><button
              type="button"
              class="btn btn-warning"
            >
              <span class="nav-link-action" @click="switchToModifyPasswd()"
                >Modifier votre mot de passe
              </span>
            </button>
          </p>
          <p class="nav-link-subtitle" v-else>
            Vous ne voulez pas modifier votre mot de passe ?<br />
            <button type="button" class="btn btn-warning">
              <span class="nav-link-action" @click="switchToPasswd()"
                >Confirmer
              </span>
            </button>
          </p>
          <!-- Email actuel -->
          <div class="form-group">
            <label>Email actuel</label>
            <input
              v-model="email"
              class="form-control_input"
              type="text"
              placeholder="Email actuel"
            />
          </div>
          <!-- Mot de passe actuel -->
          <div class="form-group">
            <label>Mot de passe actuel</label>
            <input
              id="oldPasswd"
              v-model="oldPassword"
              class="form-control_input"
              type="password"
              placeholder="Mot de passe actuel"
            />
          </div>
          <!-- Nouveau mot de passe  -->
          <div class="form-group" v-if="mode == 'createPasswd'">
            <label>Votre nouveau mot de passe</label>
            <input
              id="newPasswd"
              v-model="newPassword"
              class="form-control_input"
              type="password"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <!-- Confirmer le nouveau mot de passe -->
          <div class="form-group" v-if="mode == 'createPasswd'">
            <label>Confirmer votre mot de passe</label>
            <input
              id="confirmPasswd"
              v-model="newPasswdConfirm"
              class="form-control_input"
              type="password"
              placeholder="Confirmer votre nouveau mot de passe"
              required="Veuillez créer votre mot de passe '8 caractères , une majuscule, minimum'"
            />
          </div>

          <div class="form-group">
            <button
              @click="confirmPassword()"
              class="btn btn-primary"
              :class="{ 'btn--disabled': !validatedFields }"
              v-if="mode == 'confirmPassword'"
            >
              <span v-if="status == 'loading'">Confirmation en cours....</span>
              <span v-else>Confirmer</span>
            </button>
            <button
              class="btn btn-primary"
              @click="createPassword()"
              :class="{ 'btn--disabled': !validatedFields }"
              v-else
            >
              <span v-if="status == 'loading'">Création en cours....</span>
              <span v-else>Créer un nouveau mot de passe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
export default {
  name: "PasswdUpdate",
  newPwd: {
    oldPassword: null,
    newPassword: null,
    newPasswdConfirm: null,
  },
  components: {
    navProfil,
  },
  data: function () {
    return {
      //Modifier le mot de passe utilisateur.
      apiPasswd: axios.create({
        baseURL: "http://localhost:3000/api/auth/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      user: [],
      mode: "createPasswd",
      oldPassword: "",
      newPassword: "",
      newPasswdConfirm: "",
    };
  },
  // mounted: function () {
  //   if (this.$store.state.user.userId != -1) {
  //     this.$router.push("/passwdupdate/" + this.$route.params.id);
  //     return;
  //   }
  // },
  computed: {
    validatedFields: function () {
      if (this.mode == "createPasswd") {
        if (
          this.oldPassword != "" &&
          this.newPassword != "" &&
          this.PasswdConfirm !== ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.oldPassword != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToModifyPasswd: function () {
      this.mode = "createPasswd";
    },
    switchToPasswd: function () {
      this.mode = "confirmPassword";
    },
    getPasswd() {
      this.apiPasswd
        .get("")
        .then((response) => {
          this.profile = response.data;
        })
        .catch(function () {});
    },
  },
  confirmPassword: function () {
    const self = this;
    this.$store
      .dispatch("confirmPassword", {
        email: this.email,
        password: this.oldPassword,
      })
      .then(
        function () {
          self.$router.push("/profile");
        },
        function (error) {
          console.log(error);
        }
      );
  },
  createPassword: function () {
    // let password = document.getElementById("password").value;
    // let password = document.getElementById("passwdConfirm").value;
    // console.log(password, passwdConfirm);

    const newPwd = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      newPasswdConfirm: this.newPasswdConfirm,
    };
    // newPwd.oldPassword != "" &&
    //   newPwd.newPassword != "" &&
    //   newPwd.passwdConfirm != "";

    this.apiPasswd
      .put(
        "http://localhost:3000/api/auth/newpasswd/" + this.$route.params.id,
        newPwd
      )
      .then(() => {
        window.location.reload();
        this.$router.push("/profile/");
        this.getPasswd();
      })
      .catch(function () {});
  },
  // createPassword: function () {
  //   const self = this;
  //   this.$store
  //     .dispatch("createPasswd", {
  //       oldPassword: this.oldPassword,
  //       newPassword: this.newPassword,
  //       newPasswdConfirm: this.newPasswdConfirm,
  //     })
  //     .then(
  //       function () {
  //         self.confirmPassword();
  //         console.log(response.data);
  //       },
  //       function (error) {
  //         console.log(error);
  //       }
  //     );
  // },
};
</script>

<style>
</style>