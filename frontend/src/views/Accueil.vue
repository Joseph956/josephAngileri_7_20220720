<template>
  <div class="accueil">
    <h1 class="accueil_titre">Groupomania</h1>
    <img alt="profil_photo" src="../assets/icon-above-font.png" />
    <FormAccueil
      msg="Vous êtes sur la page d'accueil de notre réseau social d'entreprise"
    />
  </div>
</template>

<script>
import FormAccueil from "@/components/FormAccueil.vue";
export default {
  name: "accueil",
  components: {
    FormAccueil,
  },
};
</script>

<style>
img {
  background-image: url("../assets/icon-above-font.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 15vw;
  position: relative;
}
</style>