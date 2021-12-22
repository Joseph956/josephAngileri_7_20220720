<template>
  <div class="card">
    <h1 class="card_title">Enregistrer un nouveau compte</h1>
    <FormSignUp />
  </div>
</template>

<script>
import FormSignUp from "@/components/FormSignUp.vue";
export default {
  name: "SignUp",
  components: {
    FormSignUp,
  },
};
</script>

<style>
</style>