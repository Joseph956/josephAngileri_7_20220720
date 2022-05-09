<template>
  <div>
    <navProfil />
    <div class="modPasswd">
      <div class="container">
        <form action="">
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
          <div class="form-group">
            <label>Mot de passe actuel</label>
            <input
              v-model="oldPassword"
              class="form-control_input"
              type="text"
              placeholder="oldPassword"
            />
          </div>

          <div class="form-group" v-if="mode == 'createPasswd'">
            <label>Votre nouveau mot de passe</label>
            <input
              v-model="newPassword"
              class="form-control_input"
              type="password"
              placeholder="newPassword"
            />
          </div>

          <div class="form-group">
            <label>Confirmer votre mot de passe</label>
            <input
              v-model="PasswdConfirm"
              class="form-control_input"
              type="password"
              placeholder="PasswdConfirm"
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
// import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
export default {
  name: "PasswdUpdate",
  components: {
    navProfil,
  },
  data: function () {
    return {
      //Modifier le mot de passe utilisateur.
      apiPasswd: axios.create({
        baseURL:
          "http://localhost:3000/api/auth/newpasswd/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      mode: "createPasswd",
      oldPassword: "",
      newPassword: "",
      newPasswdConfirm: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "createPasswd") {
        if (
          this.oldPassword != "" &&
          this.newPassword != "" &&
          this.newPasswdConfirm !== ""
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
  },
  confirmPassword: function () {
    const self = this;
    this.$store
      .dispatch("confirmPassword", {
        email: this.email,
        password: this.password,
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
    const self = this;
    this.$store
      .dispatch("createPasswd", {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        newPasswdConfirm: this.newPasswdConfirm,
      })
      .then(
        function () {
          self.confirmPassword();
          console.log(response.data);
        },
        function (error) {
          console.log(error);
        }
      );
  },
};
</script>

<style>
</style>