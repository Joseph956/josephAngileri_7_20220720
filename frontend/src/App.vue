<template>
  <div>
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
  background: url("./assets/Fond-Gris.jpg") no-repeat center fixed;
  background-position: center;
  background-size: cover;
  margin: auto;
  font-weight: 400;
  font-family: "lato", sans-serif;
  font-size: large;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
p,
.nav-item,
#transition,
footer {
  margin-bottom: 0;
  font-weight: 500;
  color: black;
  font-size: large;
  font-family: "lato", sans-serif;
}
.imgAccueil {
  height: 2vw;
  object-fit: contain;
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}
html,
#root,
.auth-wrapper {
  width: 100%;
  height: 100vh;
  margin: auto;
}
#app {
  height: 100vh;
  margin: auto;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  outline: none;
  align-items: center;
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
  justify-content: space-between;
  margin: 0;
}
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}
.navbar-expand,
.navbar-collapse {
  justify-content: center;
  font-weight: 400;
}
.auth-wrapper {
  display: flex;
  justify-content: center;
}
.auth-inner {
  width: 1000px;
  margin: auto;
  background: #4e5166;
  box-shadow: 0px 14px 80px rgba(26, 8, 11, 0.7);
  padding: 2.5rem 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
  outline: none;
}
.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 5px;
  font-size: xx-large;
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
/************************************
*********Medias Queries**************
*************************************/
@media screen and (max-width: 768px) {
  .auth-wrapper {
    width: auto;
  }
  .navbar-expand,
  .navbar-collapse {
    justify-content: space-between;
  }
  .auth-inner {
    width: auto;
  }
  .auth-wrapper h3 {
    font-size: larger;
  }
}
@media screen and (max-width: 280px) {
  .auth-inner {
    width: auto;
  }
}
</style>