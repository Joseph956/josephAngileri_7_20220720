<template>
  <div class="card">
    <h1 @click="switchToSignup" v-if="mode == 'login'" class="card_title">
      Connexion
    </h1>
    <h1 class="card_title" v-else>Inscription</h1>
    <p class="card_subtitle" v-if="mode == 'signup'">
      Enregistrer un nouveau compte ?
      <span class="card_action" @click="switchToCreateAccount"
        >Créer un nouveau compte</span
      >
    </p>
    <p class="card_subtitle" v-else>
      Vous avez déjà un compte ?
      <span class="card_action" @click="switchToLogin">Se connecter</span>
    </p>
    <div class="form-row">
      <input class="form-row_input" type="text" placeholder="Adresse mail" />
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input class="form-row_input" type="text" placeholder="Prénom" />
      <input class="form-row_input" type="text" placeholder="Nom" />
    </div>
    <div class="form-row">
      <input class="form-row_input" type="text" placeholder="Mot de passe" />
    </div>
    <div class="form-row">
      <button class="button button--disabled" v-if="mode == 'login'">
        Connexion
      </button>
      <button class="button button--disabled" v-else>
        Créer un nouveau compte
      </button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "login",
  Data: function () {
    return {
      mode: "login",
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
  },
};
</script>

<style>
.formRow {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.formRow_input {
  padding-right: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
}
</style>