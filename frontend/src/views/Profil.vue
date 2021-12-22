<template>
  <div class="profil">
    <h1 class="profil_titre">Votre profil personnel</h1>
    <img alt="profil_photo" src="../assets/icon-above-font.png" />
    <FormProfil msg="Vous êtes sur votre profil personnel" />
    <div class="form-ligne">
      <button class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FormProfil from "@/components/FormProfil.vue";

export default {
  name: "profil",
  components: {
    FormProfil,
  },
};
</script>

<style lang="scss">
img {
  width: 16rem;
  height: 16rem;
}
</style>
