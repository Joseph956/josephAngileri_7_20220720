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
            <li class="dropdownProfil">
              <button
                @click="toggleActions"
                class="
                  btnProfile
                  justify-content-center justify-content-lg-between
                  align-items-center
                "
                aria-label="Menu du profil"
              >
                <div class="containerImgProfil">
                  <div class="menuProfile" v-if="user.attachment">
                    <div class="containerImgUser">
                      <img
                        style="height: 40px; width: 45px"
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        class="imgNavProfil"
                        v-bind:src="user.attachment"
                        alt="Photo de profil utilisateur"
                        loading="lazy"
                      />
                    </div>
                    <div class="nameProfil">
                      <h5>{{ user.username }}</h5>
                    </div>
                  </div>
                  <div class="avatar" v-else>
                    <div class="containerImgUser">
                      <img
                        style="height: 40px; width: 45px"
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        class="imgNavAvatar"
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
                id="dropdownMenuProfil"
                v-bind:class="`collapsed mt-2 position-fixed ${
                  actionsVisible && 'visible'
                }`"
              >
                <div class="btnOne" @click="toggleActions">
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
            </li>
            <!-- <li class="link btn-primary btn-nav">
              <router-link to="/posts">Publier un post</router-link>
            </li> -->
            <li class="formRow">
              <button @click="logout()" class="btn">Log-Out</button>
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
  name: "NavPosts",
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
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    toggleActions() {
      this.actionsVisible = !this.actionsVisible;
    },
    showOrReloadPage(name) {
      if (name === this.$route.name) return window.location.reload();
      this.$router.push({ name });
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

<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}
h5 {
  margin-bottom: 0;
}
.link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}
.btn-nav {
  margin: 5px;
  border-radius: 5px;
}
.btn-nav a {
  color: #fff;
}
.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}

/*******************************
********Photo du profile********
*******************************/
/* .containerImgnav {
  width: 40px;
  height: 40px;
} */
/*******************************
******Menu déroulant profil*****
*******************************/
.dropdownProfil.active > .btnCollapsed,
.btnProfile:hover {
  color: black;
  /* opacity: 1; */
}
.dropdownProfil {
  position: relative;
  /* width: 8rem; */
}
.menuProfile {
  display: flex;
}
.dropdownMenuProfil {
  position: absolute;
  left: 0;
  top: calc(100% + 0.25rem);
  background-color: white;
  padding: 0.75rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
}
.dropdownProfil > .btnCollapsed + .dropdownMenuProfil {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.btnProfile {
  font-weight: 500;
  border: none;
  color: #000;
  /* top: 20px; */
  right: 45px;
  height: 3rem;
  padding: 5px 5px 5px 10px;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 40px;
  z-index: 2;
}
.btnProfile:hover {
  background-color: rgba(108, 117, 125, 0.2) !important;
}
.btnProfile:focus {
  outline: none;
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
  object-fit: cover;
}
.avatar {
  display: flex;
  height: 2rem;
  object-fit: cover;
}
.containerImgUser {
  margin: 0 0 2px auto;
}
.imgNavProfil {
  border-radius: 5rem;
  object-fit: cover;
  margin: -2px 10px -4px -4px;
}
.imgNavAvatar {
  margin: -5px 10px 0 0;
}
.nameProfil {
  display: flex;
  align-items: center;
  align-content: center;
  margin: 0 0.3rem 0 0.5rem;
}
/* .dropdown {
} */
/* #btnCollapseProfil {
  top: 62px;
  right: 44px;
  z-index: 1;
}
#btnCollapsed {
  font-weight: 500;
  color: #000;
  background-color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
}
#btnCollapsed:hover {
  background-color: rgba(108, 117, 125, 0.1);
  outline: none;
}
#btnCollapsed:focus {
  background-color: rgba(108, 117, 125, 0.1);
  outline: none;
}
#btnCollapsed:active {
  background-color: rgba(108, 117, 125, 0.1);
  outline: none;
} */
</style>