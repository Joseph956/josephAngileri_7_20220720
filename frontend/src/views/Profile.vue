<template>
  <div>
    <navProfil />
    <div class="card">
      <h1 class="cardTitle">Profil utilisateur</h1>
      <p class="cardSubtitle">Espace profil utilisateur</p>
      <h1>{{ user.username }} {{ user.email }}</h1>
      <img v-bind:src="user.attachment" />
      <div class="formRow">
        <button @click="logout()" class="btn">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "../components/NavProfil.vue";

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
    };
  },
  mounted: function () {
    if (this.$store.state.UUID === -1) {
      this.$router.push("/profile");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    profilModify: function () {},
    //Desactivation du profil !!? (a voir)
    profilDeleted: function () {},
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>


