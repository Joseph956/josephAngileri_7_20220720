<template>
  <div>
    <navPosts />
    <div class="containTitle">
      <div class="logoTransparentUpdateProfile">
        <img
          style="height: 2.5rem; width: 2.5rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          src="../assets/logo_transparent.png"
          alt="logo"
        />
      </div>
      <div class="cardTitle">
        <h1>Modifier votre profil</h1>
        <div class="separatorUpdateUser"></div>
      </div>
    </div>
    <div class="imgBottom">
      <form enctype="multipart/form-data">
        <ImgBottomUpdate :userId="user.id" />

        <div class="form-group">
          <label for="username" class="legend">Modifier vos informations</label>
          <input
            ref="firstfield"
            v-model="user.username"
            type="text"
            id="username"
            class="form-controlProfil"
            placeholder="Modifier votre nom et prénom"
          />
        </div>
        <div class="form-group">
          <label for="email"></label>
          <input
            ref="firstfield"
            v-model="user.email"
            type="text"
            id="email"
            class="form-controlProfil"
            placeholder="Modifier votre email"
          />
        </div>
        <div class="formGroup" v-if="user.attachment">
          <img
            style="height: 5rem; width: 5rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            id="imgNavProfil"
            v-bind:src="user.attachment"
            alt="Photo de profil utilisateur"
          />
          <label for="file">Changer la photo de profil</label>
        </div>
        <div class="formGroup" v-else>
          <img
            style="height: 5rem; width: 5rem"
            x="0"
            y="0"
            height="100%"
            width="100%"
            id="imgNavAvatar"
            src="../assets/Icons/BiPersonCircle.svg"
            alt="avatar"
          />
          <label for="file">Changer la photo de profil</label>
        </div>

        <div class="selectBottom">
          <div class="formGroup">
            <input
              class="formFilePublich"
              id="fileProfil"
              ref="fileProfil"
              type="file"
              name="fileProfil"
              accept="image/*"
              @change="onFileSelected()"
            />
            <button
              v-if="isAdmin == true || $store.state.user.userId == user.userId"
              class="btnFile"
              type="button"
              @click="profilUpdate()"
            >
              <span v-if="status == 'loading'">Publication en cours....</span>
              <span v-else>
                <img
                  style="height: 40px; width: 40px"
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  src="../assets/Icons/BiCameraFill.svg"
                  alt="Modifier le profil"
                />
              </span>
            </button>
          </div>
        </div>
        <div class="alert alert-info text-danger">{{ mesgError }}</div>
      </form>
    </div>
    <div class="logoTransparent">
      <img
        style="height: 2.5rem; width: 2.5rem"
        x="0"
        y="0"
        height="100%"
        width="100%"
        src="../assets/logo_transparent.png"
        alt="logo groupomania"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ImgBottomUpdate from "@/components/ImgBottomUpdate.vue";
import navPosts from "@/components/NavPosts.vue";
export default {
  name: "ProfilUpdate",
  components: {
    ImgBottomUpdate,
    navPosts,
  },
  data: function () {
    return {
      mesgError: "",
      isAdmin: false,
      apiUser: axios.create({
        baseURL: "http://localhost:3000/api/users/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      user: {
        username: null,
        email: null,
        attachment: null,
        imgBottom: null,
      },
    };
  },
  beforeMount() {
    if (this.$store.state.user.role.role == "admin") {
      this.isAdmin = true;
      this.getProfilOne();
    }
    if (this.$store.state.user.role.role == "user") {
      this.isAdmin = true;
      this.getProfilOne();
    }
  },
  computed: {
    ...mapState({
      user: "userInfos",
      status: "status",
    }),
  },
  methods: {
    onFileSelected() {
      this.fileProfil = this.$refs.fileProfil.files[0];
      this.user.attachment = URL.createObjectURL(this.fileProfil);
    },
    getProfilOne: function () {
      this.apiUser
        .get("/")
        .then((response) => {
          if (!response) {
            this.mesgError = error.response.data.message;
          } else {
            this.user = response.data;
          }
        })
        .catch((error) => {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
    profilUpdate: function () {
      if (
        window.confirm(
          "Voulez-vous vraiment modifier les informations de votre profil ?"
        )
      ) {
        const dataProfil = new FormData();
        dataProfil.append("username", this.user.username);
        dataProfil.append("email", this.user.email);
        dataProfil.append("image", this.fileProfil);
        this.apiUser
          .put(
            `http://localhost:3000/api/users/${this.$route.params.id}/profile`,
            dataProfil
          )
          .then((response) => {
            if (!response) {
              this.mesgError = error.response.data.message;
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            this.mesgError = error.response.data.message;
            alert(this.mesgError);
          });
      }
    },
  },
};
</script>

<style>
.logoTransparentUpdateProfile {
  display: flex;
  margin: -0.5rem 0 0 0;
}
.cardTitle {
  display: flex;
  margin: 0 0 0.8rem 1rem;
  text-decoration: none;
  flex-direction: column;
}
.separatorUpdateUser {
  width: 6rem;
  height: 4px;
  background-color: #ffd7d7;
  margin: 0 0 1.5rem 0;
}
.bottomProfil {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e51665a;
  border-radius: 1rem;
  background: #4e5166;
  margin: 0.5rem;
  padding: 1rem;
}
#imgNavProfil {
  border-radius: 200px;
  object-fit: cover;
}
#imgNavAvatar {
  border-radius: 200px;
  object-fit: cover;
}
.form-controlProfil {
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: auto;
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 0 #4e51665a;
  border: 0.5px solid #ffd6d6;
  /* border-radius: 1rem; */
}
.btnFile {
  background: #4e5166;
}
.formFilePublich {
  background: #4e5166;
  /* width: 100%; */
}
.logoTransparent {
  margin: 3rem 0 0 0;
}
@media screen and (max-width: 768px) {
  .logoTransparentUpdateProfile {
    margin: -2.8rem 1rem 0 0;
  }
  .containTitle {
    margin: 2rem auto 0 auto;
  }
  .separatorUser {
    display: flex;
    align-items: center;
    width: 4rem;
    margin: 1rem 0 0.5rem 1rem;
  }
}
@media screen and (max-width: 393px) {
  .containTitle {
    flex-direction: column;
  }
  .logoTransparentUpdateProfile {
    margin: 1.2rem 0 0 0;
  }
  .separatorUpdateUser {
    margin: 0 auto 1.5rem auto;
  }
}
</style>