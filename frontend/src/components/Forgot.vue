<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <div v-if="error">
        <error :error="error" />
      </div>
      <div v-else>
        <div v-if="message" class="alert alert-success" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
    <h3>Mot de passe oublié</h3>
    <div class="form-group">
      <label for="">E-mail</label>
      <input
        type="email"
        class="form-control"
        v-model="email"
        placeholder="E-mail"
        required
      />
    </div>
    <button class="btn btn-primary btn-block">Soumettre</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Forgot",
  data() {
    return {
      email: "",
      message: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post("forgot", {
          email: this.email,
        });
        this.message = "The email was send !";
        this.error = "";
      } catch (e) {
        this.error = "Error occured !";
        this.message = "";
      }
    },
  },
};
</script>

<style>
</style>