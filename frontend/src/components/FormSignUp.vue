<template>
  <div>
    <h1>{{ SignUp }}</h1>
    <form v-on:submit.prevent="createUser">
      <label for="email"></label>
      <input
        type="text"
        v-model="email"
        placeholder="Enter your email"
        id="email"
        ref="firstField"
      /><br />

      <label for="firstName"></label>
      <input
        type="text"
        v-model="firstName"
        id="firstName"
        placeholder="Enter your first name"
      /><br />

      <label for="lastName"></label>
      <input
        type="text"
        v-model="lastName"
        id="lastName"
        placeholder="Enter your last name"
      /><br />

      <label for="password"></label>
      <input
        type="text"
        v-model="password"
        id="password"
        placeholder="Choose a password"
      /><br />

      <label for="account">Account</label><br />
      <select v-model="account" id="account">
        <option
          v-for="account in accountTypes"
          :value="account.value"
          :key="account.id"
        >
          {{ account.name }}
        </option></select
      ><br />

      <button :disabled="!isFormValid">Create account</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormSignUp",
  props: {
    SignUp: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
