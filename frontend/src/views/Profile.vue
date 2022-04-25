<template>
  <div>
    <navProfil />
    <div class="card">
      <h1 class="cardTitle">Profil utilisateur</h1>
      <h2 class="cardSubtitle">Informations personnelles</h2>
      <div class="form-group">
        <label for="">
          <h2>Nom d'utilisateur</h2>
        </label>
        <img v-bind:src="user.attachment" />
        <h3>{{ user.username }}</h3>
      </div>
      <h1>{{ user.email }}</h1>
      <div class="formRow">
        <button @click="logout()" class="btn">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";

export default {
  name: "Profile",
  components: {
    navProfil,
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
  // mounted: function () {
  //   if (this.$store.state.UUID === -1) {
  //     this.$router.push("/profile");
  //     return;
  //   }
  //   this.$store.dispatch("getUserInfos");
  // },
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


