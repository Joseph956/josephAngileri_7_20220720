<template>
  <div>
    <div>
      <div class="logoTransparent">
        <img
          style="height: 2.5rem; width: 2.5rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          src="../../assets/logo_transparent.png"
          alt=""
        />
      </div>
      <h1>Modérateur contrôle du compte utilisateur</h1>
      <profil />
    </div>
  </div>
</template>

<script>
import profil from "../../views/Profile.vue";

export default {
  name: "Compte",
  components: {
    profil,
  },
};
</script>

<style>
</style>