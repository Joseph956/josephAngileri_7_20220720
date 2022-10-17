<template>
  <div class="accueil">
    <div class="container">
      <form id="inscription" name="inscription" @submit.prevent="submit">
        <h1 class="nav-link-title" v-if="mode == 'login'">Login</h1>
        <h1 class="nav-link-title" v-else>Sign Up</h1>
        <p class="nav-link-subtitle" v-if="mode == 'login'">
          Vous n'avez pas encore de compte ?<br />
          <button type="button" class="btn btn-secondary">
            <span class="nav-link-action" @click="switchToCreateAccount()">
              <div class="containerCpteCreate">
                <div class="cpteCreate">
                  <img
                    style="height: 1.8rem; width: 1.8rem"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                    src="../assets/Icons/BiVectorPen.svg"
                    alt="inscription"
                  />
                </div>
                <div class="titleInscription">
                  <h1>Inscription</h1>
                </div>
              </div>
            </span>
          </button>
        </p>
        <p class="nav-link-subtitle" v-else>
          Vous avez déjà un compte ?<br />
          <button type="button" class="btn btn-secondary">
            <span class="nav-link-action" @click="switchToLogin()">
              <div class="containerCpteCreate">
                <div class="cpteCreate">
                  <img
                    style="height: 1.8rem; width: 1.8rem"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                    src="../assets/Icons/BiHouseDoorFill.svg"
                    alt="se connecter"
                  />
                </div>
                <div class="titleInscription">
                  <h1>Connexion</h1>
                </div>
              </div>
            </span>
          </button>
        </p>
        <div class="form-group" v-if="mode == 'create'">
          <div class="form-controlSignup">
            <label for="username">Pseudo</label>
            <div class="inputData">
              <input
                id="username"
                type="text"
                placeholder="Pseudo"
                v-model="username"
                class="form-control_input"
                name="username"
                required
                autocomplete="off"
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <p id="message">
              <small>{{ msgError }}</small>
            </p>
          </div>
        </div>
        <div class="form-group">
          <div class="form-controlSignup">
            <label for="email">E-mail</label>
            <div class="inputData">
              <input
                v-model="email"
                class="form-control_input"
                type="email"
                name="email"
                placeholder="E-mail"
                required
                autocomplete="off"
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>{{ error }}</small>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="form-controlSignup">
            <label for="password">Mot de passe</label>
            <div class="inputData">
              <input
                id="password"
                name="password"
                v-model="password"
                type="password"
                placeholder="Mot de passe"
                class="form-control_input"
                required
                autocomplete="off"
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <div class="eyePasswd">
                <!--  -->
                <div v-if="mode == 'text'">
                  <img
                    src="../assets/Icons/BiEyeSlash.svg"
                    id="eyeSlash"
                    @click="changer()"
                    alt=""
                  />
                </div>
                <div v-else>
                  <!-- style="display: none" -->
                  <img
                    src="../assets/Icons/BiEye.svg"
                    id="eyeSlash"
                    @click="changer()"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <small>{{ message }}</small>
          </div>
        </div>
        <div class="form-group" v-if="mode == 'create'">
          <div class="form-controlSignup">
            <label for="confirmPasswd">Confirmer le mot de passe</label>
            <div class="inputData">
              <input
                id="confirmPasswd"
                name="confirmPasswd"
                v-model="confirmPasswd"
                class="form-control_input"
                autocomplete="off"
                type="Password"
                placeholder="Confirmer le mot de passe"
                required
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <p id="message">
              <small>{{ msgError }}</small>
            </p>
          </div>
        </div>
        <p class="alert alert-info text-danger">
          {{ mesgError }} {{ message }}
        </p>

        <div class="form-group">
          <button
            class="btns btn-primary"
            aria-label="connexion"
            @click="login()"
            :disabled="!validatedFields"
            v-if="mode == 'login'"
          >
            <span v-if="status == 'loading'">Connexion en cours....</span>
            <span v-else>Connexion</span>
          </button>

          <button
            id="ValidInscription"
            type="submit"
            class="btns btn-primary"
            aria-label="inscription"
            @click="createAccount()"
            :disabled="!validatedFields"
            v-else
          >
            <span v-if="status == 'loading'">Création en cours....</span>
            <span v-else>Créer mon compte</span>
          </button>
          <br />
        </div>
      </form>
      <div>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Accueil",
  components: {},
  data: function () {
    return {
      e: false,
      error: "",
      message: "",
      mesgError: "",
      error_login: "",
      error_create: "",
      error_Password: "", //modifier
      error_confirmPasswd: "", //modifier

      mode: "login",
      username: "",
      email: "",
      password: "",
      confirmPasswd: "",
    };
  },

  mounted: function () {
    if (this.$store.state.user.userId !== -1) {
      this.$router.push("/");
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode === "create") {
        return (
          this.username !== "" &&
          this.email !== "" &&
          this.password !== "" &&
          this.confirmPasswd !== "" &&
          this.password === this.confirmPasswd &&
          this.validUsername(this.username)
        );
      } else {
        return this.email !== "" && this.password !== "";
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
        .then((response) => {
          if (!response) {
            this.mesgError = error.response.data.message;
          } else {
            self.$router.push("/profile");
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
        });
    },

    changer: function () {
      let e = true;
      if (e) {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eyeSlash").src =
          "../assets/Icons/BiEyeSlash.svg";
        e = true;
      } else {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eye").src = "../assets/Icons/BiEye.svg";
        e = true;
      }
    },
    validUsername: function (response) {
      if (!response) {
        this.mesgError = error.response.data.message;
        // message.textContent =
        //   "Ce champ est obligatoire (Chiffres et symboles ne sont pas autorisés. Ne pas dépasser 20 caractères, minimum 3 caractères";
      } else {
        return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(response);
      }
    },

    createAccount: function () {
      const self = this;
      let username = document.getElementById("username").value;
      // if (this.validUsername(username)) {
      //   message.textContent =
      //     "Ce champ est obligatoire (Chiffres et symboles ne sont pas autorisés. Ne pas dépasser 20 caractères, minimum 3 caractères";
      // }
      // let password = document.getElementById("password").value;
      // let confirmPasswd = document.getElementById("confirmPasswd").value;
      // if (password == confirmPasswd) {
      //   message.textContent = "Passwords match";
      // } else {
      //   message.textContent = "Confirmer votre mot de passe !";
      // }

      this.$store
        .dispatch("createAccount", {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPasswd: this.confirmPasswd,
        })
        .then(function (response) {
          if (!response) {
            this.mesgError = error.response.data.message;
          } else {
            self.login();
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
        });

      return {
        username,
        password,
        confirmPasswd,
      };
    },
  },
};
</script>

<style >
.nav-link-title {
  margin-top: 3rem;
  text-align: left;
  text-align: justify;
}
.nav-link-subtitle {
  text-align: left;
  text-align: justify;
}
.containerCpteCreate {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 1rem;
}
.cpteCreate {
  display: flex;
  margin: 0 1rem 0 1rem;
}
.titleInscription h1 {
  display: flex;
  margin: 0 1rem 0 1rem;
}
.btns {
  border: none;
  margin: 2.5rem 0 0 0;
  padding: 1rem 0 1rem 0;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 10px #ffd7d7, 0px 0px 0px #ffd7d7;
  cursor: pointer;
  transition: opacity 0.8s;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
  flex-wrap: wrap;
}
.form-controlSignup {
  border-radius: 1rem;
}
.form-controlSignup label {
  display: inline-block;
  margin-bottom: 5px;
}
.form-control_input::placeholder {
  color: #4e5166;
}
.inputData {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background: #f2f2f2;
  border-radius: 0.25rem;
}
.form-controlSignup {
  padding: 10px 0 20px 0;
  border: none;
}
.form-controlSignup img {
  height: 20px;
  cursor: pointer;
  vertical-align: middle;
}
.form-controlSignup input {
  position: relative;
  border: none;
  outline: none;
  background: none;
  font-weight: 500;
  display: block;
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  width: 100%;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-controlSignup input:focus {
  outline: 0;
  border-color: #777;
  filter: brightness(1.1);
}
.form-controlSignup.success input {
  border-color: #2ecc71;
}
.form-controlSignup.error input {
  border-color: #e74c3c;
}
.inputData img {
  height: 20px;
  cursor: pointer;
  vertical-align: middle;
}
.form-controlSignup i {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  visibility: hidden;
  position: absolute;
}
.form-controlSignup.success i.fa-check-circle {
  color: #2ecc71;
  visibility: visible;
  position: relative;
}
.form-controlSignup.error i.fa-exclamation-circle {
  color: #e74c3c;
  visibility: visible;
  position: relative;
}
.form-controlSignup input::placeholder {
  color: #4e516674;
}
.form-control input i {
  position: absolute;
  visibility: hidden;
  top: 40px;
  right: 18px;
}
.form-controlSignup small {
  color: #e74c3c;
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}
.form-controlSignup.error small {
  visibility: visible;
}
.form button {
  background-color: #8e44ad;
  border: 2px solid #8e44ad;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-family: inherit;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .containerCpteCreate {
    flex-direction: column;
    margin: 0 1rem 0 1rem;
  }
  .nav-link-subtitle {
    text-align: center;
  }
}
</style>