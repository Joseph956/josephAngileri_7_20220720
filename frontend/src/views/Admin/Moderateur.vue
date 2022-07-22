<template>
  <div>
    <div class="container">
      <h1>Moderateur intranet Groupomania</h1>
      <div class="form-group">
        <div class="form-controlSignup">
          <label class="formContact" for="email">E-mail</label>
          <div class="inputData">
            <input
              v-model="email"
              class="form-control_input"
              type="email"
              name="email"
              placeholder="E-mail admin"
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
              type="password"
              name="password"
              v-model="password"
              placeholder="Mot de passe admin"
              class="form-control_input"
              required
              autocomplete="off"
            />
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <small>{{ message }}</small>
        </div>
      </div>
      <p class="alert alert-info text-danger">
        {{ mesgError }}
      </p>
      <div class="form-group">
        <button @click="login()" class="btn btn-primary">
          <span v-if="status == 'loading'">Connexion en cours....</span>
          <span v-else>Connexion</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Moderateur",
  data: function () {
    return {
      error: null,
      mesgError: "",
      error_login: "",
      error_Password: "", //modifier
      error_confirmPasswd: "", //modifier

      mode: "login",
      username: "",
      email: "",
      password: "",
      confirmPasswd: "", //modifier
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/");
      return;
    }
  },
  ...mapState(["status"]),
  ...mapState({ user: "userInfos" }),
  methods: {
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
            self.$router.push("/dashboard");
            document.getElementById("login").reset();
          }
        })
        .catch((error) => {
          alert((this.msgError = error.response.data.message));
        });
    },
  },
};
</script>

<style>
</style>

