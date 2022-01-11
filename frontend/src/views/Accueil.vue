<template>
  <div class="accueil">
    <div class="container">
      <form>
        <h1 class="nav-link-title" v-if="mode == 'login'">Login</h1>
        <h1 class="nav-link-title" v-else>Sign Up</h1>
        <p class="nav-link-subtitle" v-if="mode == 'login'">
          Vous n'avez pas encore de compte ?<br />
          <!-- <a href="#" -->
          <router-link to="/register">
            <span
              class="nav-link-action"
              v-on:click.native="switchToCreateAccount()"
              >Créer un compte
            </span>
          </router-link>
          <!-- </a> -->
        </p>
        <p class="nav-link-subtitle" v-else>
          Vous avez déjà un compte ?<br />
          <router-link to="/Login">
            <span class="nav-link-action" v-on:click.native="switchToLogin()"
              >Se connecter
            </span>
          </router-link>
        </p>

        <div class="form-group" v-if="mode == 'create'">
          <label>Username</label>
          <input
            v-model="username"
            class="form-control"
            type="text"
            placeholder="Username"
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            class="form-control"
            type="text"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input
            v-model="password"
            class="form-control"
            type="password"
            placeholder="Mot de passe"
          />
        </div>

        <button class="btn btn-primary btn--disable" v-if="mode == 'login'">
          Connexion
        </button>
        <button
          @click="register()"
          class="btn btn-primary"
          :class="{ 'btn--disable': !validatedFields }"
          v-else
        >
          Créer mon compte
        </button>
      </form>
    </div>
    <router-view></router-view>
    <NavSignUp />
  </div>
</template>

<script>
import NavSignUp from "@/components/NavSignUp.vue";
// import Login from "@/components/Login.vue";
export default {
  name: "Accueil",
  components: {
    NavSignUp,
    // Login,
  },
  data: function () {
    return {
      mode: "login",
      email: "",
      username: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (this.email != "" && this.username != "" && this.password != "") {
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
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    register: function () {
      console.log(this.username, this.email, this.password);
      this.store.dispatch("register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="css">
</style>