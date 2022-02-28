<template>
  <div>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link :to="{ name: 'Accueil' }" class="navbar-brand">
          <img
            class="imgAccueil"
            src="../assets/Icons/icon-left-font-monochrome-white.svg"
            alt=""
          />
        </router-link>
        <div class="collapse navbar-collapse">
          <ul v-show="!mobile" class="navbar-nav ml-auto">
            <router-link class="link" to="Profile">Profile</router-link>
            <router-link class="link" to="Blog">Blogs</router-link>
            <router-link class="link" to="Posts">Posts</router-link>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <menuIcon /> -->
    <!-- <transition name="mobile-nav">
    <ul class="mobile-nav">
            <router-link class="link" to="#">Accueil</router-link>
            <router-link class="link" to="#">Profile</router-link>
            <router-link class="link" to="#">Blogs</router-link>
            <router-link class="link" to="#">Posts</router-link>
          </ul>
    <transition/> -->
  </div>
</template>

<script>
// import menuIcon from "../assets/Icons/bars-regular.svg";
export default {
  name: "NavSignUp",
  components: {
    // menuIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
    };
  },
};
</script>

<style>
</style>