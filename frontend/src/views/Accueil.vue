<template>
  <div class="accueil">
    <div class="container">
      <form id="inscription" name="inscription" @submit.prevent="submit">
        <div class="containTitleInscript">
          <div class="logoTransparentInscript">
            <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
              src="../assets/logo_transparent.png" alt="logo" />
          </div>
          <div class="cardInscriptTitre">
            <h1 class="nav-link-title" v-if="mode == 'login'">Connexion</h1>
            <h1 class="nav-link-title" v-else>Créer mon compte</h1>
            <div class="separatorTitleInscript"></div>
          </div>
        </div>

        <div class="nav-link-subtitle" v-if="mode == 'login'">
          <button type="button" class="btn btn-secondary">
            <span class="nav-link-action" @click="switchToCreateAccount()">
              <div class="containerCpteCreate">
                <div class="cpteCreate">
                  <img style="height: 1.8rem; width: 1.8rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiVectorPen.svg" alt="inscription" />
                </div>
                <div class="titleInscription">
                  <h1>Inscription</h1>
                </div>
              </div>
            </span>
          </button>
          <p id="message" class="alert alert-info text-danger">
            <small>{{ msgError }}</small>
          </p>
        </div>
        <div class="nav-link-subtitle" v-else>
          <button type="button" class="btn btn-secondary">
            <span class="nav-link-action" @click="switchToLogin()">
              <div class="containerCpteCreate">
                <div class="cpteCreate">
                  <img style="height: 1.8rem; width: 1.8rem" x="0" y="0" height="100%" width="100%"
                    src="../assets/Icons/BiHouseDoorFill.svg" alt="se connecter" />
                </div>
                <div class="titleInscription">
                  <h1>Connexion</h1>
                </div>
              </div>
            </span>
          </button>
        </div>
        <div class="form-group" v-if="mode == 'create'">
          <div class="form-controlSignup">
            <p id="message" class="alert alert-info text-danger">
              <small>{{ msgError }}</small>
            </p>
            <div class="inputData">
              <input id="username" type="text" placeholder="Pseudo" v-model="username" class="form-control_input"
                name="username" required autocomplete="off" />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <!-- <p id="message" class="alert alert-info text-danger">
              <small>{{ msgError }}</small>
            </p> -->
          </div>
        </div>
        <div class="form-group">
          <div class="form-controlSignup">
            <div class="inputData">
              <input v-model="email" class="form-control_input" type="email" name="email" placeholder="E-mail" required
                autocomplete="off" />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="form-controlSignup">
            <div class="inputData">
              <input id="password" name="password" v-model="password" type="password" placeholder="Mot de passe"
                class="form-control_input" required autocomplete="off" />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="mode == 'create'">
          <div class="form-controlSignup">
            <div class="inputData">
              <input id="confirmPasswd" name="confirmPasswd" v-model="confirmPasswd" class="form-control_input"
                autocomplete="off" type="Password" placeholder="Confirmer le mot de passe" required />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
            </div>
          </div>
        </div>
        <p class="alert alert-info text-danger">
          {{ mesgError }}
        </p>

        <div class="form-group">
          <button class="btns btn-secondary" aria-label="connexion" @click="login()" :disabled="!validatedFields"
            v-if="mode == 'login'">
            <span v-if="status == 'loading'">
              <div class="loader-container" >
                <div class="dot d1" ></div>
                <div class="dot d2" ></div>
                <div class="dot d3" ></div>
              </div>            
            </span>
            <span v-else>Connexion</span>
          </button>

          <button id="ValidInscription" type="submit" class="btns btn-secondary" aria-label="inscription"
            @click="createAccount()" :disabled="!validatedFields" v-else>
            <span v-if="status == 'loading'">Création en cours....</span>
            <span v-else>Envoyer</span>
          </button>
          <br />
        </div>
      </form>
      <div  class="logoTransparent">
        <img style="height: 2.5rem; width: 2.5rem" x="0" y="0" height="100%" width="100%"
          src="../assets/logo_transparent.png" alt="" />
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
      mesgError: "",
      msgError: "",
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
      this.mesgError = "";
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
    validUsername: function (response) {
      return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(response);
    },
    createAccount: function () {
      const self = this;
      let username = document.getElementById("username").value;
      if (this.validUsername(username)) {
        message.textContent =
          "Le pseudonyme est compris entre 3 et 20 caractères maximum, Chiffres et symboles ne sont pas autorisés.  ";
      }

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
    },
  },
};
</script>

<style>
.accueil {
  box-shadow: 0px 0px 20px #cecdcd, 20px 20px 40px #4e51665b;
  background-color: #7d7e8b;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 1rem;
}

.nav-link-title {
  margin: 3rem auto 0.3rem 0;
  text-align: left;
  text-align: justify;
  font-size: 28px;
}

.nav-link-subtitle {
  text-align: left;
  text-align: justify;
}

.containerCpteCreate {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 1rem 0.5rem 1rem;
}

.cpteCreate {
  display: flex;
  margin: 0 1rem 0 1rem;
}

.containTitleInscript {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoTransparentInscript {
  display: flex;
  margin: 0 0.5rem 0 0;
  box-shadow: 0px 0px 20px #7f7d7d, 20px 20px 40px #1010215a;
}

.cardInscriptTitre {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.separatorTitleInscript {
  width: 2.5rem;
  height: 4px;
  background-color: #ffd7d7;
  margin-bottom: 1.3rem;
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
  box-shadow: 0px 0px 10px #7f7d7d, 20px 20px 40px #1010215a;
  cursor: pointer;
  transition: opacity 0.8s;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  box-shadow: 0px 0px 10px #7f7d7d, 20px 20px 40px #1010215a;
}
.loader-container {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot {
  width: 25px;
  height: 25px;
  background: #000;
  border-radius: 50%;
  margin: 0 15px;
  animation: dot 1.5s infinite;
}
.dot:nth-child(2) {
  animation-delay: 0.5s;
}
.dot:nth-child(3) {
  animation-delay: 1s;
}
@keyframes dot {
  0% {
    transform: scale(1.2);  
  }
  50% {
    transform: scale(1.8);
  }
  100% {
    transform: scale(1.2);
  }
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
#message {
  font-size: medium;
}

.alert-info {
  margin-top: 0.5rem auto 0;
}

.form-controlSignup label {
  display: flex;
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
  box-shadow: 0px 0px 20px #7f7d7d, 20px 20px 40px #1010215a;
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
  border-radius: 5px;
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
  border: 5px solid transparent;
  cursor: pointer;
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