<template>
  <header>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Accueil' }">
          <img class="imgAccueil" style="height: 2rem; width: 12rem" x="0" y="0" height="100%" width="100%"
            src="../assets/icon-left-font.svg" alt="" />
        </router-link>
      </div>

      <div class="toggle" toggle @click="toggle()">
        <img style="height: 2rem; width: 4rem" x="0" y="0" height="100%" width="100%" class="open"
          src="../assets/Icons/bars-regular.svg" alt="ouvrir le menu">

        <img style="height: 2rem; width: 4rem" x="0" y="0" height="100%" width="100%" class="close"
          src="../assets/Icons/BiXCircle.svg" alt="fermer le menu">
      </div>
      <!-- -->
      <div class="iconsMenuAccueil">
        <ul class="menuAccueil">
          <li class="formRow">
            <router-link class="navbar-brand" id="link" :to="{ name: 'Posts' }">
              <img class="iconPeople" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%" width="100%"
                src="../assets/Icons/BiHouseDoorFill.svg" alt="">
            </router-link>
          </li>
          <li class="formRow">
            <router-link class="navbar-brand" id="link" :to="{ name: 'Users' }">
              <img class="iconPeople" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%" width="100%"
                src="../assets/Icons/MdiAccountGroup.svg" alt="">
            </router-link>
          </li>
          <li class="formRow">
            <router-link class="navbar-brand" id="link" :to="{ name: 'Users' }">
              <img class="iconPeople" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%" width="100%"
                src="../assets/Icons/BiPeopleFill.svg" alt="">
            </router-link>
          </li>
          <li class="formRow">

            <button type="button" class="btn" data-dropdown-button @click="showOrReloadPage('Profile')"
              :userId="user.id">
              <div class="containerImgProfil">
                <div class="menuProfile" v-if="user.attachment">
                  <div class="containerImgUser">
                    <img style="height: 50px; width: 45px" x="0" y="0" height="100%" width="100%" class="imgNavProfil"
                      v-bind:src="user.attachment" alt="Photo de profil utilisateur" loading="lazy" />
                  </div>
                </div>
                <div class="avatar" v-else>
                  <div class="containerImgUser">
                    <img style="height: 30px; width: 30px" x="0" y="0" height="100%" width="100%" class="imgNavAvatar"
                      src="../assets/Icons/BiPersonCircle.svg" alt="avatar" />
                  </div>
                </div>
              </div>
            </button>

          </li>
          <li class="formRow">
            <button type="button" @click="logout()" class="btn">
              <img style="height: 1.5rem; width: 1.5rem" x="0" y="0" height="100%" width="100%"
                src="../assets/Icons/sign-out-alt-regular.svg" alt="">
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// import {liens} from "@/service/liens";

export default {
  name: "NavPosts",
  components: {},
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
    mode: "openMenu",
    };
  },
  // mounted: function () {
  //   this.apiUser
  //     .get("")
  //     .then((response) => {
  //       this.user = response.data;
  //     })
  //     .catch(function () {});
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
    toggle() {
      let toggle = document.querySelector('.toggle');
      let body = document.querySelector('body');

      toggle.addEventListener('click', function () {
        body.classList.toggle('openMenu');
      })
    },
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
  position: absolute;
  width: 100%;
  background-color: #fff;
  padding: 0 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  margin: 0 0 0 1.5rem;
  color: #fff;
}

nav {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}
.navbar {
  background: #4e5166;
}
.toggle {
  display: none;
}
.iconsMenuAccueil ul {
  display: flex;
  align-content: center;
  align-items: center;
  margin: 0;
 
}
.menuAccueil {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  margin-bottom: 0;
  width: 55rem;
}
.menuAccueil li {
  display: flex;
  color: #fff;
  text-decoration: none;
  margin: 0 2rem 0 2rem;
}
@media screen and (max-width: 1332px) {
.menuAccueil {
  width: 44rem;
}
}
@media screen and (max-width: 991px) {
  
    .toggle {
      display: block;
      font-size: 2rem;
      cursor: pointer;
      position: relative;
      z-index: 20;
    }
    .imgAccueil {
      position: relative;
      z-index: 20;
    }
         .open {
           display: block;
         }
    
         .close {
           display: none;
         }
    
         .openMenu .open {
           display: none;
         }
    
         .openMenu .close {
           display: block;
         }
        .menuAccueil {
          position: absolute;
            top: 0;
            left: 0;
            width: 5%;
            height: 100vh;
            background: #4e5166;
            flex-direction: column;
            padding: 2rem;
            justify-content: space-around;
            transform: translateX(-100%);
            transition: transform 1s;
        }

        .menuAccueil {
          font-size: 4rem;
        }
                .openMenu .menuAccueil {
                  transform: translateX(0);
                }
}

h5 {
  margin-bottom: 0;
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
*********Button profile**********
*******************************/
.containerImgProfil {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 393px) {
.containerImgProfil {
  margin: 0 0 0 0;
}
}
.imgNavProfil {
  border-radius: 5rem;
  object-fit: cover;
  margin: 0;
}
.menuProfile {
  display: flex;
  align-items: center;
  align-content: center;
}
.formRow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgUser {
  display: contents;
  object-fit: cover;
}
.avatar {
  display: flex;
  object-fit: cover;
}
.nameProfil {
  display: flex;
  align-items: center;
  align-content: center;
  margin: 0 0.3rem 0 0.5rem;
}


body {
  margin: 0;
}

.header {
  background-color: f3f3f3;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.linkDropdown {
  display: flex;
  align-content: center;
  align-items: center; 
  background: none;
  border: none;
  text-decoration: none;
  color: #777;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s color ease;
}
</style>