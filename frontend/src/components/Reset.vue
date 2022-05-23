<template>
  <form @submit.prevent="handleSubmit">
    <h3>Modifier le mot de passe !</h3>
    <div class="form-group">
      <label for="">Nouveau mot de passe</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        placeholder="Password"
        required
      />
    </div>
    <div class="form-group">
      <label for="">Confirmer le mot de passe</label>
      <input
        type="password"
        v-model="password_confirm"
        class="form-control"
        placeholder="Password Confirm"
        required
      />
    </div>
    <button class="btn btn-primary btn-block">Soumettre</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Reset",
  data() {
    return {
      password: "",
      password_confirm: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("reset", {
        password: this.password,
        password_confirm: this.password_confirm,
        token: this.$route.params.token,
      });
      console.log(response);
      this.$route.push("/login");
    },
  },
};
</script>

<style>
</style>