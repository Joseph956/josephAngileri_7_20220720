<template>
  <div class="accueil">
    <div class="container">
      <!-- empêche le rafraîchissement de la page  (@submit.prevent="submit") -->
      <form @submit.prevent="submit">
        <h1 class="nav-link-title" v-if="mode == 'login'">Login</h1>
        <h1 class="nav-link-title" v-else>Sign Up</h1>
        <p class="nav-link-subtitle" v-if="mode == 'login'">
          Vous n'avez pas encore de compte ?<br />
          <button type="button" class="btn btn-warning">
            <span class="nav-link-action" @click="switchToCreateAccount()"
              >Créer un compte
            </span>
          </button>
        </p>
        <p class="nav-link-subtitle" v-else>
          Vous avez déjà un compte ?<br />
          <button type="button" class="btn btn-warning">
            <span class="nav-link-action" @click="switchToLogin()"
              >Se connecter
            </span>
          </button>
        </p>

        <div class="form-group" v-if="mode == 'create'">
          <label>Username</label>
          <input
            v-model="username"
            class="form-control_input"
            type="text"
            placeholder="Username"
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            class="form-control_input"
            type="text"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            v-model="password"
            class="form-control_input"
            required="Veuillez créer votre mot de passe '8 caractères , une majuscule, minimum'"
          />
        </div>

        <div class="form-group" v-if="mode == 'create'">
          <label for="confirmPasswd">Confirmer le mot de passe</label>
          <input
            type="Password"
            id="confirmPasswd"
            placeholder="Confirmer le mot de passe"
            v-model="confirmPasswd"
            class="form-control_input"
            required="Veuillez confirmer votre mot de passe !..."
          />
          <p id="message"></p>
          <input type="button" @click="checkPasswd()" value="SUBMIT" />
        </div>

        <div
          class="form-group"
          v-if="mode == 'login' && status == 'error_login'"
        >
          Adresse mail et/ou mot de passe invalide !
        </div>

        <div
          class="form-group"
          v-if="mode == 'create' && status == 'error_create'"
        >
          Adresse email déjà utilisée !
        </div>

        <div
          class="form-group"
          v-if="mode == 'Password' && status == 'error_confirmPassword'"
        >
          Confirmer votre mot de passe !
        </div>

        <div class="form-group">
          <button
            @click="login()"
            class="btn btn-primary"
            :class="{ 'btn--disabled': !validatedFields }"
            v-if="mode == 'login'"
          >
            <span v-if="status == 'loading'">Connexion en cours....</span>
            <span v-else>Connexion</span>
          </button>
          <button
            class="btn btn-primary"
            @click="createAccount()"
            :class="{ 'btn--disabled': !validatedFields }"
            v-else
          >
            <span v-if="status == 'loading'">Création en cours....</span>
            <span v-else>Créer mon compte</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Accueil",
  components: {},
  data: function () {
    return {
      mode: "login",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.username != "" &&
          this.password != "" &&
          this.confirmPassword !== ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/posts");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    createAccount: function () {
      const self = this;
      if (password.length != 0) {
        let password = document.getElementById("password").value;
        let confirmPasswd = document.getElementById("password").value;
        if (password == confirmPasswd) {
          this.$store
            .dispatch("createAccount", {
              username: this.username,
              email: this.email,
              password: this.password,
              confirmPasswd: this.confirmPasswd,
            })
            .then(
              function () {
                self.login();
                console.log(response.data);
              },
              function (error) {
                console.log(error);
              }
            )
            .catch({});
        } else {
          message.textContent = "Passwords don't match";
        }
      }
    },
    checkPasswd: function () {
      let password = document.getElementById("password").value;
      let confirmPasswd = document.getElementById("password").value;
      console.log("----->CONTENU : password");
      console.log(password);
      console.log("----->CONTENU : confirmPasswd");
      console.log(confirmPasswd);
      if (password.length != 0) {
        if (password == confirmPasswd) {
          message.textContent = "Passwords match";
        } else {
          message.textContent = "Passwords don't match";
        }
      }
    },
    // createAccount: function () {
    //   const self = this;
    //   this.$store
    //     .dispatch("createAccount", {
    //       username: this.username,
    //       email: this.email,
    //       password: this.password,
    //       confirmPassword: this.confirmPassword,
    //     })
    //     .then(
    //       function () {
    //         self.login();
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
.form-group {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-control_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-control_input::placeholder {
  color: #a3a2a2;
}
</style>