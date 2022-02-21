<template>
  <div id="app">
    <NavSignUp />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavSignUp from "@/components/NavSignUp.vue";

export default {
  name: "App",
  components: {
    NavSignUp,
  },
};
</script>

<style lang="scss">
</style>