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
            <div class="header">
              <div class="dropdownNav" data-dropdown>
                <button
                  class="link"
                  data-dropdown-button
                  @click="showOrReloadPage('Profile')"
                  :userId="user.id"
                >
                  <div class="containerImgProfil">
                    <div class="menuProfile" v-if="user.attachment">
                      <div class="containerImgUser">
                        <img
                          style="height: 30px; width: 25px"
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
                        <h6>{{ user.username }}</h6>
                      </div>
                    </div>
                    <div class="avatar" v-else>
                      <div class="containerImgUser">
                        <img
                          style="height: 30px; width: 30px"
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
              </div>
              <div class="dropdown" data-dropdown>
                <button class="link" data-dropdown-button>Menus</button>
                <div class="dropdown-menu information-grid">
                  <div>
                    <div class="dropdown-heading"></div>

                    <div class="dropdown-links">
                      <router-link
                        class="navbar-brand"
                        id="link"
                        :to="{ name: 'Posts' }"
                      >
                        Accueil
                      </router-link>
                      <!-- <a href="../Posts" class="link">Accueil<br /></a> -->
                      <a href="#" class="link">Latest<br /></a>
                      <a href="#" class="link">Popular<br /></a>
                    </div>
                  </div>
                  <div>
                    <div class="dropdown-heading">Courses</div>
                    <div class="dropdown-links"></div>
                    <a href="#" class="link">JavaScrit</a>
                    <a href="#" class="link">Css</a>
                    <a href="#" class="link">React</a>
                  </div>
                  <div>
                    <div class="dropdown-heading">Blog</div>
                    <div class="dropdown-links"></div>
                    <a href="#" class="link">All</a>
                    <a href="#" class="link">Latest</a>
                    <a href="#" class="link">Popular</a>
                  </div>
                  <div>
                    <div class="dropdown-heading">Other</div>
                    <div class="dropdown-links"></div>
                    <a href="#" class="link">Twiter</a>
                    <a href="#" class="link">Newsletter</a>
                    <a href="#" class="link">Discord</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- <li>
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
                        style="height: 30px; width: 30px"
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
                        style="height: 45px; width: 45px"
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
            </li> -->

            <!-- <li class="link btn-primary btn-nav">
              <router-link to="/posts/">Voir les Publication</router-link>
            </li> -->
            <!-- <li class="link btn-primary btn-nav">
              <router-link to="PostDetails">Détails du post</router-link>
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
  //test menus déroulants
  created() {
    document.addEventListener("click", (e) => {
      const isDropdownButton = e.target.matches("[data-dropdown-button]");
      if (!isDropdownButton && e.target.closest("[data-dropdown]") != null)
        return;

      let currentDropdown;
      if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
      }

      document
        .querySelectorAll("[data-dropdown].active")
        .forEach((dropdown) => {
          if (dropdown === currentDropdown) return;
          dropdown.classList.remove("active");
        });
    });
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

<style >
/*******************************
******Button profile*****
*******************************/
.menuProfile {
  display: flex;
  align-items: center;
  align-content: center;
}
/**log-out */
.formRow {
  display: flex;
  align-items: center;
}
/**Button Image user et nom */

.containerImgProfil {
  display: flex;
  align-items: center;
}
.containerImgUser {
  margin: 0 0 2px auto;
}
.imgNavProfil {
  border-radius: 5rem;
  object-fit: cover;
  margin: 0;
}
.imgNavAvatar {
  margin: 2px 5px 0px 7px;
}
.nameProfil {
  display: flex;
  align-items: center;
  align-content: center;
  margin: 0 0.3rem 0 0.5rem;
}
/**Fin button image user et nom */

/****************************
********menus déroulant******
****************************/
body {
  margin: 0;
}

.header {
  background-color: f3f3f3;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.link {
  background: none;
  border: none;
  text-decoration: none;
  color: #777;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0;
}

.dropdown.active > .link,
.link:hover {
  color: black;
}

.dropdownNav {
  position: relative;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  left: 0;
  background-color: white;
  padding: 5px 4px 0 6px;
  border-radius: 20rem;
  margin: auto;
}

.dropdown-menu {
  position: absolute;
  left: 0;
  top: calc(100% + 0.25rem);
  background-color: white;
  /* padding: 0.75rem; */
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
}

.dropdown.active > .link + .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.information-grid {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 2rem;
}

.dropdown-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>