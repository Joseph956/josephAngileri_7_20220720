<template>
  <div class="card">
    <h1 class="cardTitle">Profil utilisateur</h1>
    <p class="cardSubtitle">Espace profil utilisateur</p>
    <h1>{{ user.username }} {{ user.email }}</h1>
    <img v-bind:src="user.attachment" />
    <div class="formRow">
      <button @click="logout()" class="btn">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",

  mounted: function () {
    if (this.$store.state.userId === -1) {
      this.$router.push("/");
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
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>