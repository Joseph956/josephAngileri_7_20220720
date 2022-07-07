<template>
  <header>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Accueil' }">
          <img style="height: 2rem; width: 12rem" x="0" y="0" height="100%" width="100%" class="imgAccueil"
            src="../assets/icon-left-font.svg" alt="" />
        </router-link>

        <div class="collapse navbar-collapse">
          <ul v-show="!mobile" class="navbar-nav ml-auto">
            <div class="header">
              <div class="dropDownNav" data-dropdown>
                <button class="link" data-dropdown-button @click="showOrReloadPage('Profile')" :userId="user.id">
                  <div class="containerImgProfil">
                    <div class="menuProfile" v-if="user.attachment">
                      <div class="containerImgUser">
                        <img style="height: 55px; width: 45px" x="0" y="0" height="100%" width="100%"
                          class="imgNavProfil" v-bind:src="user.attachment" alt="Photo de profil utilisateur"
                          loading="lazy" />
                      </div>
                      <div class="nameProfil">
                        <h6>{{ user.username }}</h6>
                      </div>
                    </div>
                    <div class="avatar" v-else>
                      <div class="containerImgUser">
                        <img style="height: 30px; width: 30px" x="0" y="0" height="100%" width="100%"
                          class="imgNavAvatar" src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
                      </div>
                      <div class="nameProfil">
                        <h6>{{ user.username }}</h6>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div class="dropdown" data-dropdown>
                <button class="link" data-dropdown-button>
                  Menus</button>
                <div class="dropdown-menu information-grid">
                  <div>
                    <div class="dropdown-heading"></div>
                    <div class="dropdown-links">
                      <router-link class="navbar-brand" id="link" :to="{ name: 'Posts' }">
                        <img class="iconPeople" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%"
                          width="100%" src="../assets/Icons/BiFilePost.svg" alt="">
                        Publications
                      </router-link>
                      <router-link class="navbar-brand" id="link" :to="{ name: 'Users' }">
                        <img class="iconPeople" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%"
                          width="100%" src="../assets/Icons/BiPeopleFill.svg" alt="">
                        Comptes
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <li class="formRow">
              <button @click="logout()" class="btn">
                <img style="height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%" width="100%"
                  src="../assets/Icons/sign-out-alt-regular.svg" alt="">
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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



@media screen and (max-width: 768px) {
  .imgAccueil {
    background: url("../assets/icon.png") no-repeat center fixed;
  }
}
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
/* @media screen and (max-width: 902px){
  .formRow {
    flex-direction: column;
  }
} */
/**************************
Button Image user et nom 
**************************/

.containerImgProfil {
  display: flex;
  align-items: center;
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
/***************************
Fin button image user et nom 
****************************/

/****************************
********menus déroulant******
****************************/
body {
  margin: 0;
  display: flex;
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
  padding: 0px 0px 3px;
}

.dropdown.active > .link,
.link:hover {
  color: black;
}

.dropDownNav {
  position: relative;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #cfcece;
  left: 0;
  background-color: white;
  padding: 7px 4px 0 6px;
  border-radius: 20rem;
  margin: auto;
}

.dropdown-menu {
  position: absolute;
  left: 0;
  top: calc(100% + 0.25rem);
  background-color: white;
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
@media screen and (max-width: 768px) {
  .dropdown.active>.link+.dropdown-menu {
      opacity: 1;
      transform: translateX(-12rem);
      pointer-events: auto;
    }
}
.information-grid {
  display: flex;
  flex-direction: column;
  transform: translateX(-100px, 10px);
}

.dropdown-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.iconPeople {
  margin: 0 1rem 0 1rem;
}
</style>