<template>
  <form>
    <h3>Login</h3>
    <div class="form-group">
      <label>Email</label>
      <input class="form-control" type="email" placeholder="Email" />
    </div>

    <div class="form-group">
      <label>password</label>
      <input class="form-control" type="password" placeholder="Password" />
    </div>

    <button class="btn btn-primary btn-block">Login</button>

    <Login />
  </form>
</template>

<script>
export default {
  name: "Login",
  component: Login,
};
</script>

<style>
</style>