<template>
  <div id="nav">
    <a href=""
      ><router-link to="/accueil">
        <img
          class="homeLinkBig"
          id="nav_groupomania"
          src="../images/icon-left-font-monochrome-black.svg"
          alt="lien acceuil"
        />
      </router-link>
    </a>
    |

    <router-link to="/signup">Sign Up</router-link> |
    <router-link to="/login">Log In</router-link> |
    <router-link to="/profil"></router-link> |
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
