<template>
  <div>
    <navProfil />
    <div class="modifPasswd">
      <div class="container">
        <h1>Modifier votre mot de passe</h1>
        <form @submit.prevent="handleSubmit">
          <!-- Mot de passe actuel -->
          <div class="form-group">
            <label class="formPasswd" for="oldPasswd"
              >Mot de passe actuel</label
            >
            <span id="oldPasswdMissing" class="infosPasswdMissing"></span>
            <input
              id="oldPasswd"
              v-model="oldPasswd"
              class="form-control_input"
              type="password"
              placeholder="Mot de passe actuel"
              required
            />
          </div>
          <!-- Nouveau mot de passe  -->
          <div class="form-group">
            <label class="formPasswd" for="newPasswd"
              >Votre nouveau mot de passe</label
            >
            <span id="newPasswdMissing" class="infosPasswdMissing"></span>
            <input
              id="newPasswd"
              v-model="newPasswd"
              class="form-control_input"
              type="password"
              placeholder="Nouveau mot de passe"
              required
            />
          </div>
          <!-- Confirmer le nouveau mot de passe -->
          <div class="form-group">
            <label class="formPasswd" for="confirnNewPasswd"
              >Confirmer votre mot de passe</label
            >
            <span id="newPasswdMissing" class="infosPasswdMissing"></span>
            <input
              id="newPasswdConfirm"
              v-model="newPasswdConfirm"
              class="form-control_input"
              type="password"
              placeholder="Confirmer votre nouveau mot de passe"
              required
            />
          </div>

          <div class="form-group">
            <button
              class="btn btn-primary"
              @click="createPassword()"
              :class="{ 'btn--disabled': !validatedFields }"
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
    oldPasswd: null,
    newPasswd: null,
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
      oldPasswd: "",
      newPasswd: "",
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
          this.oldPasswd != "" &&
          this.newPasswd != "" &&
          this.newPasswdConfirm !== ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.oldPasswd != "") {
          return true;
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
        oldPasswd: this.oldPasswd,
        newPasswd: this.newPasswd,
        newPasswdConfirm: this.newPasswdConfirm,
        token: this.$route.params.token,
      };
      console.log("-------->CONTENU createPasswd : oldPasswd");
      console.log(oldPasswd);
      console.log("-------->CONTENU createPasswd : newPasswd");
      console.log(newPasswd);
      console.log("-------->CONTENU createPasswd : newPasswdConfirm");
      console.log(newPasswdConfirm);
      if (
        this.oldPasswd != "" &&
        this.newPasswd != "" &&
        this.newPasswdConfirm != "" &&
        this.oldPasswd == this.oldPasswd &&
        this.newPasswd == this.newPasswdConfirm
      ) {
        this.apiPasswd
          .put(
            "http://localhost:3000/api/auth/newpasswd/" + this.$route.params.id,
            newPwd
            // {
            //   newPasswd: this.newPasswdConfirm,
            // }
          )
          .then(() => {
            window.location.reload();
            this.$router.push("/");
            this.getPasswd();
          })
          .catch(function () {});
      }
    },
    // createPassword: function () {
    //   console.log("-------->CONTENU createPasswd : oldPasswd");
    //   console.log(oldPasswd);
    //   console.log("-------->CONTENU createPasswd : newPasswd");
    //   console.log(newPasswd);
    //   console.log("-------->CONTENU createPasswd : newPasswdConfirm");
    //   console.log(newPasswdConfirm);
    //   const self = this;
    //   this.$store
    //     .dispatch("createPasswd", {
    //       oldPasswd: this.oldPasswd,
    //       newPasswd: this.newPasswd,
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
  },
};
</script>

<style>
</style>