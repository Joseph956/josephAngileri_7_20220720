<template>
  <header>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Accueil' }">
          <img
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
                  btn
                  justify-content-center justify-content-lg-between
                  align-items-center
                "
                @click="toggleActions"
                aria-label="Menu du profil"
              >
                <div class="containerProfil">
                  <div class="avatar" v-if="user.attachment">
                    <div class="containerImgnav">
                      <img
                        style="height: 28px; width: 28px"
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
                      <h6>{{ user.username }}</h6>
                    </div>
                  </div>
                  <div class="menuProfile" v-else>
                    <div class="containerImgnav">
                      <img
                        style="height: 28px; width: 28px"
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
.btn {
  /* height: 2rem; */
}

.btn-nav {
  margin: 5px;
  border-radius: 4rem;
  height: 2rem;
}
.containerProfil {
  display: flex;
  width: auto;
  font-weight: 500;
  border: none;
  color: #000;
  top: 20px;
  right: 45px;
  height: 2rem;
  padding: 5px 5px 5px 10px;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 40px;
  z-index: 2;
}
.avatar {
  display: contents;
  width: 5rem;
}
.menuProfile {
  display: flex;
  height: 2rem;
}
.containerImgnav {
  margin: 0;
}
.imgNavProfil {
  border-radius: 5rem;
  margin: -3px 12px 0 1px;
}
.nameProfil {
  display: flex;
  /* align-items: center;
  align-content: center; */
}
</style>