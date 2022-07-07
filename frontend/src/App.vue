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
  background: url("./assets/icon.png") no-repeat center fixed;
  background-position: center;
  background-size: cover;
  margin: auto;
  /* min-height: 100vh; */
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
span,
.nav-item,
#transition,
footer {
  margin-bottom: 0;
  text-align: center;
  text-shadow: -3px 3px 4px #f7d1d0;
  font-weight: 500;
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

/* body, */
html,
/* #app, */
#root,
.auth-wrapper {
  width: 100%;
  height: 100vh;
  margin: auto;
}

/* @media screen and (max-width: 900px) {
  .auth-wrapper {
      width: auto;
    
    }
} */
#app {
  /* display: flex; */
  margin: auto;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  outline: none;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .auth-wrapper {
    width: auto;
  }
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
  justify-content: flex-start;
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
  justify-content: flex-end;
  font-weight: 400;
}

@media screen and (max-width: 768px) {

  .navbar-expand,
  .navbar-collapse {
    justify-content: flex-start;
  }
}

.auth-wrapper {
  display: flex;
  margin: 7rem auto;
  justify-content: center;
  /* text-align: left; */
}

.auth-inner {
  width: 900px;
  margin: auto;
  background: #4E5166;
  box-shadow: 0px 14px 80px rgba(26, 8, 11, 0.7);
  padding: 2.5rem 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
  outline: none;
}

/* @media screen and (max-width: 900px) {
  .auth-inner {
      width: 100%;
  }
}*/
/* @media screen and (max-width: 768px) {
  .auth-inner {
    width: auto;
  }
} */

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
  font-size: xx-large;
}

@media screen and (max-width: 768px) {
  .auth-wrapper h3 {
    font-size: larger;
  }
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

.btn {
  border: none;
}

/* .post-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
}
@media (min-width: 500px) {
  padding: 100px 16px;
}

.post-cards {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
} */
</style>