<template>
  <div>
    <navPosts />
    <div class="modifPasswd">
      <div class="container">
        <h1>Modifier votre mot de passe</h1>
        <form @submit.prevent="handleSubmit">
          <!-- Saisir l'ancien mot de passe -->
          <div class="form-group">
            <div class="form-controlSignup">
              <label for="password">Mot de passe actuel</label>
              <div class="inputDataNewPasswd">
                <div class="iconNewPasswd">
                  <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiLockFill.svg" alt="saisir mot de passe actuel">
                </div>
                <input id="password" name="password" v-model="password" type="password" class="form-control_input"
                  placeholder="Saisir mot de passe actuel" required />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <small>{{message}}</small>
            </div>
          </div>
          <!-- Saisir le nouveau mot de passe -->
          <div class="form-group">
            <div class="form-controlSignup">
              <label for="password">Nouveau mot de passe</label>
              <div class="inputDataNewPasswd">
                <div>
                  <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiLockFill.svg" alt="Saisir le nouveau mot de passe">
                </div>
                <input id="newPasswd" name="newPasswd" v-model="newPasswd" type="password" class="form-control_input"
                  placeholder="Saisir le nouveau mot de passe" minlength="8" autofocus required />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <small>{{message}}</small>
            </div>
          </div>
          <!-- Confirmer le nouveau mot de passe -->
          <div class="form-group">
            <div class="form-controlSignup">
              <label for="confirmPasswd">Confirmer le mot de passe</label>
              <div class="inputDataNewPasswd">
                <div>
                  <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiLockFill.svg" alt="Confirmer le nouveau mot de passe">
                </div>
                <input id="newPasswdConfirm" name="newPasswdConfirm" v-model="newPasswdConfirm"
                  class="form-control_input" type="Password" placeholder="Confirmer votre nouveau mot de passe"
                  autofocus required />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <p id="message">
              <small>{{ message }}</small>
            </p>
          </div>

          <p id="message">
            <small>{{ message }}</small>
          </p>

          <div class="alert alert-info text-danger">
            {{ mesgError }}
          </div>

          <div class="form-group">
            <button class="btn btn-primary" @click="createPassword()" :disabled="!validatedFields">
              <span v-if="status == 'loading'">Création en cours....</span>
              <span v-else>Créer un nouveau mot de passe</span>
            </button>
          </div>
        </form>
        <div class="logoTransparent">
          <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
            src="../assets/logo_transparent.png" alt="Logo groupomania" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";
// import validatPasswd from "@/service/ValidatPasswd";
export default {
  name: "PasswdUpdate",
  newPwd: {
    password: null,
    newPasswd: null,
    newPasswdConfirm: null,
  },
  components: {
    navPosts,
    // validatPasswd,
  },
  data: function () {
    return {
      msgError: "",
      //Modifier le mot de passe utilisateur.
      apiPasswd: axios.create({
        baseURL: "http://localhost:3000/api/auth/" + this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      user: [],
      mode: "createPasswd",
      password: "",
      newPasswd: "",
      newPasswdConfirm: "",
      error: "",
      message: "",
      error_newPasswd: "",
      error_newPasswdConfirm: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "createPasswd") {
        if (
          this.password != "" &&
          this.newPasswd != "" &&
          this.newPasswdConfirm !== ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.password != "") {
          message("Le mot de passe actuel est incorrect bis  ! ");
          // return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    getPasswd() {
      this.apiPasswd
        .get("")
        .then((response) => {
          this.profile = response.data;
        })
        .catch(function () {});
    },
    createPassword: function () {
      const newPwd = {
        password: this.password,
        newPasswd: this.newPasswd,
        newPasswdConfirm: this.newPasswdConfirm,
      };
      if (
        this.password == this.password &&
        this.newPasswd == this.newPasswdConfirm &&
        this.newPasswd != "" &&
        this.newPasswdConfirm != ""
      ) {
        if (
          window.confirm("Voulez-vous vraiment modifier votre mot de passe ?")
        ) {
          this.apiPasswd
            .put(
              "http://localhost:3000/api/auth/newpasswd/" + this.$store.state.user.userId,
              newPwd
            ).then((response) => {
              if (!response) {
                return (this.mesgError = error.response.data.message)
              } else {
              this.getPasswd();
              this.$store.commit("logout");
              this.$router.push("/");
              }
            }).catch((error) => {
              alert(this.mesgError = error.response.data.message)
            });
        } else {
          message ("Le mot de passe actuel est incorrect ! ");
        }
      }
    },
  },
};
</script>

<style >
.inputDataNewPasswd {
  display: flex;
  align-items: center;
  background: #f2f2f2;
}
</style>