<template>
  <div>
    <div class="accueil">
      <div class="container">
        <!-- <router-link to="/accueil"> -->
        <nav class="navbar navbar-expand navbar-light fixed-top">
          <div class="container">
            <a href="#" class="navbar-brand">Accueil</a>
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav ml-auto">
                <li class="nav-link"></li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
export default {
  name: "NavSignUp",
  components: {
    Login,
    SignUp,
  },
};
</script>

<style lang="css">
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
body {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: auto;
  min-height: 100vh;
  display: flex;

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
span {
  font-weight: 500;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
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
  text-align: center;
}
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.navbar-expand,
.navbar-collapse {
  justify-content: flex-end;
  font-weight: 400;
}
.auth-wrapper {
  display: flex;
  justify-content: center;
  text-align: left;
}
.auth-inner {
  width: 450px;
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