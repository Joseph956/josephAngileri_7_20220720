<template>
  <div>
    <h1>Enregistrer un nouveau compte</h1>
    <FormSignUp />
  </div>
</template>

<script>
import FormSignUp from "../components/FormSignUp.vue";
export default {
  name: "SignUp",
  components: {
    FormSignUp,
  },
};
</script>

<style>
</style>