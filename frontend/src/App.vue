<template>
  <div id="app">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <Accueil />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Accueil from "@/views/Accueil.vue";
export default {
  name: "App",
  components: {
    Accueil,
  },
};
</script>

<style>
</style>