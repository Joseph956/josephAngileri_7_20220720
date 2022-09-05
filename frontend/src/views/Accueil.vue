<template>
  <div class="accueil">
    <div class="container">
      <form id="inscription" name="inscription">
        <!-- novalidate -->
        <h1 class="nav-link-title" v-if="mode == 'login'">123</h1>
        <h1 class="nav-link-title" v-else>456</h1>
        <p class="nav-link-subtitle" v-if="mode == 'login'">
          Vous n'avez pas encore de compte ?<br />
          <button type="button" class="btn btn-warning">
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
          <button type="button" class="btn btn-warning">
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
            <label class="formContact" for="username">Nom prénom</label>
            <div class="inputData">
              <input
                id="username"
                type="text"
                v-model="username"
                class="form-control_input"
                name="username"
                placeholder="Nom prénom"
                required
                minlength="3"
                autocomplete="off"
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <small>{{ mesgError }}</small>
          </div>
        </div>

        <div class="form-group">
          <div class="form-controlSignup">
            <label class="formContact" for="email">E-mail</label>
            <div class="inputData">
              <!-- id="text" -->
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
              <small>{{ error_create }}</small>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="form-controlSignup">
            <label for="password">Mot de passe</label>
            <div class="inputData">
              <input
                id="password"
                type="password"
                name="password"
                v-model="password"
                placeholder="Mot de passe"
                class="form-control_input"
                required
                autocomplete="off"
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>

              <!-- <div class="eyePasswd" v-if="mode == 'hiddenPasswd'">
                <div>
                  <button class="btn" id="btn" @click="switchToEyeSlash()">
                    <img
                      style="height: 25px; width: 25px"
                      x="0"
                      y="0"
                      height="100%"
                      width="100%"
                      src="../assets/Icons/BiEyeSlash.svg"
                      id="hiddenPasswd"
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div class="eyePasswd" v-else>
                <div>
                  <button class="btn" id="btn" @click="switchToEye()">
                    <img
                      style="height: 25px; width: 25px"
                      x="0"
                      y="0"
                      height="100%"
                      width="100%"
                      src="../assets/Icons/BiEye.svg"
                      id="eye"
                      alt=""
                    />
                  </button>
                </div>
              </div> -->
            </div>

            <small>{{ mesgError }}</small>
          </div>
        </div>
        <div class="form-group" v-if="mode == 'create'">
          <!-- <div> -->
          <!-- <p id="messAlert" class="alert alert-info text-danger">
            <strong>{{ mesgError }}</strong>
          </p>
          <p id="mesSuccess" class="alert alert-info text-success">
            <strong>{{ mesgError }}</strong>
          </p> -->
          <!-- </div> -->

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
          </div>
        </div>

        <!-- <div class="form-group">
          <div
            class="alert alert-info text-danger"
            v-if="mode === 'login' && status == 'error_login'"
          >
            Adresse mail et/ou mot de passe invalide !
            {{ error_login }}
          </div>
        </div> -->
        <!-- <div class="alert alert-info text-danger" v-if="mode === 'create'">
          {{ mesgError }}
        </div>
        <p class="alert alert-info text-danger" v-if="mode === 'login'">
          {{ mesgError }}
        </p> -->
        <p class="alert alert-info text-danger">
          {{ mesgError }}
        </p>

        <div class="form-group">
          <div
            class="alert alert-info text-danger"
            v-if="mode == 'create' && status == 'error_create'"
          >
            Adresse email déjà utilisée !
            {{ error_create }}
          </div>
        </div>

        <!-- Mode connexion ou création de compte -->
        <div class="form-group">
          <button
            @click="login()"
            :disabled="!validatedFields"
            class="btns btn-primary"
            aria-label="connexion"
            v-if="mode == 'login'"
          >
            <span v-if="status == 'loading'">Connexion en cours....</span>
            <span v-else>Connexion</span>
          </button>
          <button
            @click="createAccount()"
            :disabled="!validatedFields"
            class="btns btn-primary"
            aria-label="inscription"
            v-else
          >
            <span v-if="status == 'loading'">Création en cours....</span>
            <span v-else>Créer mon compte</span>
          </button>
          <br />

          <!-- Accès administrateur -->
          <p class="credential">
            <router-link v-if="mode == 'login'" to="admin" text-right
              >Modérateur du site
            </router-link>
          </p>

          <!-- Mot de passe oublié -->
          <p class="forgotPasswd">
            <router-link v-if="mode == 'login'" to="Forgot" text-right
              >Mot de passe oublié ?
            </router-link>
          </p>
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
import Error from "./Error.vue";
export default {
  name: "Accueil",
  components: {
    Error,
  },
  data: function () {
    return {
      // status: "",
      error: "",
      message: "",
      messAlert: "",
      mesgError: "",
      mesSuccess: "",
      error_login: "",
      error_create: "",
      error_Password: "", //modifier
      error_confirmPasswd: "", //modifier
      mode: "seenPasswd",
      // mode: "passwdAlert",

      mode: "login",
      username: "",
      email: "",
      password: "",
      confirmPasswd: "", //modifier

      // mode: "password",
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
          this.username != "" &&
          this.email != "" &&
          this.password != "" &&
          this.confirmPasswd != "" &&
          this.password === this.confirmPasswd
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
    ...mapState({ user: "userInfos" }),
  },
  methods: {
    // async createAccount() {
    //   try {
    //     await axios.post("login", {
    //       email: this.email,
    //       password: this.password,
    //     });
    //     localStorage.setItem("token", response.data.token);
    //     this.$store.dispatch("user", response.data.user);
    //     this.$router.push("/");
    //   } catch (e) {
    //     this.error = `${"error"}`;
    //     this.error = "Adresse mail et/ou mot de passe invalide !";
    //     this.message = "Adresse mail et mot de passe valide !";
    //   }
    // },
    // passwdAlert: function () {
    //   this.mode = "";
    // },
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
            return (this.mesgError = error.response.data.message);
          } else {
            self.$router.push("/profile");
            // document.getElementById("login").reset();
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
          // alert(this.mesgError + " " + error.response.status);
        });
    },
    switchToEyeSlash: function () {
      this.mode = "hiddenPasswd";
    },
    switchToEye: function () {
      this.mode = "seenPasswd";
    },
    switchToEyeSlash: function () {
      let e = true;
      if (e) {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("seenPasswd").src = "../assets/Icons/BiEye.svg";
        e = true;
      } else {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("hiddenPasswd").src =
          "../assets/Icons/BiEyeSlash.svg";
        e = true;
      }
    },
    switchToEye: function () {
      let e = true;
      if (e) {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("seenPasswd").src = "../assets/Icons/BiEye.svg";
        e = true;
      } else {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("hiddenPasswd").src =
          "../assets/Icons/BiEyeSlash.svg";
        e = true;
      }
    },

    createAccount: function () {
      console.log(this.username, this.email, this.password, this.confirmPasswd);
      const self = this;
      // let password = document.getElementById("password").value;
      // let confirmPasswd = document.getElementById("confirmPasswd").value;

      // if (password === confirmPasswd) {
      //   mesSuccess.textContent = "Confirmation du mot de passe valide !";
      // } else if (password != confirmPasswd) {
      //   messAlert.textContent = "Confirmer votre mot de passe !";
      // }
      this.$store
        .dispatch("createAccount", {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPasswd: this.confirmPasswd,
        })
        .then((response) => {
          if (!response) {
            this.mesgError = error.response.data.message;
            alert(this.mesgError);
          } else {
            self.login();
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    // validate: function () {
    //   let mail = document.getElementById("text").value;
    //   if (isEmail.text(mail)) {
    //     alert("vous avez fourni un identifiant de messagerie valide !!!");
    //     return true;
    //   } else {
    //     alert("Désolé !!! Adresse e-mail incorrecte. ");
    //     return false;
    //   }
    // },
  },
};
</script>

<style >
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
@media screen and (max-width: 768px) {
  .containerCpteCreate {
    flex-direction: column;
    margin: 0 1rem 0 1rem;
  }
  .nav-link-subtitle {
    text-align: center;
  }
}
.cpteCreate {
  display: flex;
  margin: 0 1rem 0 1rem;
}
.titleInscription h1 {
  display: flex;
  margin: 0 1rem 0 1rem;
}
.btn-warning {
  margin: 10px 0 0 0;
  border: none;
}
.btns {
  border: none;
  margin: 2.5rem 0.5rem 0 0.5rem;
  padding: 1rem 0 1rem 0;
  border-radius: 1rem;
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
  /* color: #a3a2a2; */
  color: #4e5166;
}
.inputData {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background: #f2f2f2;
}
.form-controlSignup {
  padding: 8px;
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
  /* color: #a3a2a2; */
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
</style>