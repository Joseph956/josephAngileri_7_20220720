<template>
  <header>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Accueil' }">
          <img
            class="imgAccueil"
            src="../assets/Icons/icon-left-font-monochrome-white.svg"
            alt=""
          />
        </router-link>
        <div class="collapse navbar-collapse">
          <ul v-show="!mobile" class="navbar-nav ml-auto">
            <li class="link btn-primary btn-nav">
              <router-link to="profile">Modifier photo de profil</router-link>
            </li>
            <li class="link btn-primary btn-nav">
              <router-link to="posts">Voir les Publication</router-link>
            </li>
            <li class="link btn-primary btn-nav">
              <router-link to="PostDetails">Détails du post</router-link>
            </li>
            <li class="formRow">
              <button @click="logout()" class="btn">Log-Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" /> -->
    <!-- <transition name="mobile-nav">
    <ul class="mobile-nav">
    <router-link class="link" to="#">Profile</router-link>
    <router-link class="link" to="#">Blogs</router-link>
    <router-link class="link" to="#">Posts</router-link>
    </ul>
    <transition /> -->
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";

export default {
  name: "NavProfil",
  components: {
    menuIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windounWidth = window.innerWidth;
      if (this.windownWidth == 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<style>
</style>