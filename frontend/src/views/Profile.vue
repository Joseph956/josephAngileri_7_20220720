<template>
  <div>
    <navProfil />
    <div class="card">
      <h1 class="cardTitle">Profil utilisateur</h1>
      <h2 class="cardSubtitle">Informations personnelles</h2>
      <div class="form-group" v-if="user.attachment">
        <h3>{{ user.username }}</h3>
        <img v-bind:src="user.attachment" alt="Photo de profil utilisateur" />
      </div>
      <div v-else>
        <h3>{{ user.username }}</h3>
        <img src="../assets/Icons/user-alt-light.svg" alt="avatar" />
      </div>
      <h1>{{ user.email }}</h1>
      <div class="formRow">
        <router-link v-bind:to="'/ProfilUpdate/' + user.id">
          <button
            type="button"
            class="btn btn-primary"
            @click="userModify()"
            :userId="user.id"
            :class="{
              'btn--disabled': !validatedFields,
            }"
          >
            <span v-if="status == 'loading'"
              >Ouverture du formulaire de modification en cours....</span
            >
            <span v-else>Modifier le profil</span>
          </button>
        </router-link>
        <router-link v-bind:to="'/PasswdUpdate/' + user.id">
          <button
            type="button"
            class="btn btn-primary"
            @click="passwdModify()"
            :userId="user.id"
            :class="{
              'btn--disabled': !validatedFields,
            }"
          >
            <span v-if="status == 'loading'"
              >Ouverture du formulaire de modification en cours....</span
            >
            <span v-else>Modifier le mot de passe</span>
          </button>
        </router-link>
        <button @click="logout()" class="btn">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
import ProfilUpdate from "@/components/ProfilUpdate.vue";
import PasswdUpdate from "@/components/PasswdUpdate.vue";
export default {
  name: "Profile",
  components: {
    navProfil,
    ProfilUpdate,
    PasswdUpdate,
  },
  data: function () {
    return {
      user: {
        usermame: this.username,
        email: this.email,
        attachment: this.attachment,
      },
      //Lister tous les users
      apiUser: axios.create({
        baseURL:
          "http://localhost:3000/api/users/" + this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
    };
  },
  mounted: function () {
    this.apiUser
      .get("")
      .then((response) => {
        this.user = response.data;
      })
      .catch(function () {});
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    //Modifier les infos du profil
    profilModify: function () {},

    //Desactivation du profil !!? (a voir)
    profilDesactivated: function () {},
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>


