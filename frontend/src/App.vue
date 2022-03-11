<template>
  <div id="app">
    <NavSignUp />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavSignUp from "@/components/NavSignUp.vue";

export default {
  name: "App",
  components: {
    NavSignUp,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  vertical-align: baseline;
  list-style: none;
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  background: url("./assets/icon.png") no-repeat 50% 50%;
  background-position: center;
  background-size: cover;
  margin: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span,
.nav-item,
#transition,
footer {
  text-align: center;
  text-shadow: -3px 3px 2px #f7d1d0;
  font-weight: 500;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.imgAccueil {
  height: 3vw;
  object-fit: cover;
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: center;
}
body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
}
.container {
  width: 100%;
}
.navbar-container {
  display: none;
}
.navbar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}
.navbar-expand {
  margin: auto;
}
.navbar-collapse {
  justify-content: flex-end;
  font-weight: 400;
  margin: auto;
}
.auth-wrapper {
  display: flex;
  justify-content: center;
  text-align: left;
}
.auth-inner {
  width: 700px;
  /* margin: 7rem auto auto auto; */
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
.custom-control-label {
  font-weight: 400;
}
.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}
.forgot-password a {
  color: #167bff;
}
</style>