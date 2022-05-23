<template>
  <header>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Accueil' }">
          <img
            style="height: auto; width: 12rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            class="imgAccueil"
            src="../assets/Icons/icon-left-font-monochrome-white.svg"
            alt=""
          />
        </router-link>

        <div class="collapse navbar-collapse">
          <ul v-show="!mobile" class="navbar-nav ml-auto">
            <li>
              <button
                class="
                  btnProfile
                  position-fixed
                  d-flex
                  justify-content-center justify-content-lg-between
                  align-items-center
                "
                @click="toggleActions"
                aria-label="Menu du profil"
              >
                <div class="containerImgProfil">
                  <div class="imgUser" v-if="user.attachment">
                    <div class="containerImgUser">
                      <img
                        style="height: 40px; width: 40px"
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        class="imgNavProfil"
                        v-bind:src="user.attachment"
                        alt="Photo de profil utilisateur"
                      />
                    </div>
                    <div class="nameProfil">
                      <h5>{{ user.username }}</h5>
                    </div>
                  </div>
                  <div class="avatar" v-else>
                    <div class="containerImgUser">
                      <img
                        style="height: 40px; width: 40px"
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        class="imgNavProfil"
                        src="../assets/Icons/user-alt-light.svg"
                        alt="avatar"
                      />
                    </div>
                    <div class="nameProfil">
                      <h6>{{ user.username }}</h6>
                    </div>
                  </div>
                </div>
              </button>
              <div
                id="menuProfilcollapsed"
                style="display: none"
                v-bind:class="`collapse collapsed mt-2 position-fixed visible ${
                  actionsVisible && 'visible'
                }`"
              >
                <div class="card">
                  <div class="card-body" @click="toggleActions">
                    <p class="textCard">
                      <button
                        class="btnCollapsed btn-block text-left"
                        @click="showOrReloadPage('Profile')"
                        :userId="user.id"
                        aria-label="Voir mon profil utilisateur"
                      >
                        Voir mon profil
                      </button>
                    </p>
                    <p class="textCard">
                      <button
                        class="btnCollapsed btn-block text-left"
                        @click="showOrReloadPage('Posts')"
                        aria-label="Voir la page publication"
                      >
                        Voir les publications
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <!-- <li class="link btn-primary btn-nav">
              <router-link to="/posts/">Voir les Publication</router-link>
            </li> -->
            <!-- <li class="link btn-primary btn-nav">
              <router-link to="PostDetails">Détails du post</router-link>
            </li> -->
            <li class="formRow">
              <button @click="logout()" class="btn btn-primary btn-nav">
                Log-Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" /> -->
    <!-- <transition name="mobile-nav">
    <ul class="mobile-nav">
    <router-link class="link" to="#">Profile</router-link>
    <router-link class="link" to="#">Blogs</router-link>
    <router-link class="link" to="#">Posts</router-link>
    </ul>
    <transition /> -->
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";

export default {
  name: "NavProfil",
  components: {
    menuIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
      user: {
        usermame: this.username,
      },
      //Lister tous les users
      apiUser: axios.create({
        baseURL:
          "http://localhost:3000/api/users/" + this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      actionsVisible: false,
    };
  },
  mounted: function () {
    this.apiUser
      .get("")
      .then((response) => {
        this.user = response.data;
      })
      .catch(function () {});
  },
  // computed: {
  //   ...mapState({
  //     user: "userInfos",
  //   }),
  // },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    toggleActions() {
      this.actionsVisible = !this.actionsVisible;
    },
    checkScreen() {
      this.windounWidth = window.innerWidth;
      if (this.windownWidth == 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<style >
/********************************
****Menu du profil utilisateur****
*********************************/
/**Button Image user et nom */
.btnProfile {
  font-weight: 500;
  border: none;
  color: #000;
  top: 20px;
  right: 45px;
  /* Hauteur de l'image navbar*/
  height: 3rem;
  padding: 5px 5px 5px 10px;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 40px;
  z-index: 2;
}
.btnProfile:focus {
  outline: none;
}
.btnProfile:hover {
  background-color: rgba(108, 117, 125, 0.2) !important;
}
.btnProfile:visited {
  background-color: rgba(108, 117, 125, 0.2) !important;
}

.containerImgProfil {
  display: flex;
  width: auto;
  top: 62px;
  right: 44px;
  z-index: 1;
}
.imgUser {
  display: contents;
  width: 5rem;
}
.avatar {
  display: flex;
  height: 2rem;
}
.containerImgUser {
  margin: 0;
}
.imgNavProfil {
  border-radius: 5rem;
  margin: -3px 12px 0 1px;
}
.nameProfil {
  display: flex;
  align-items: center;
  align-content: center;
}
/**Fin button image user et nom */

/**Début menu collapsed */
#menuProfilcollapsed {
  top: 62px;
  right: 44px;
  z-index: 1;
}
.collapse:not(.show) {
  display: none;
}
.visible {
  visibility: visible;
  opacity: 1;
  transform: scaleY(1);
}
.btnCollapsed {
  /* visibility: hidden;
  display: block !important;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.1s, opacity 0.5s ease-in-out;
  opacity: 0; */
}
.visible {
  visibility: visible !important;
}
.card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
/**Fin menu collapsed */
/********************************
*Fin menu du profil utilisateur**
*********************************/

/**************************
btn-logout 
****************************/
/* .btn-nav {
  margin: 5px;
  border-radius: 4rem;
  height: 2rem;
} */
</style>