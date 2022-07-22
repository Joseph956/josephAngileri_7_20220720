<template>
  <div>
    <navPosts />
    <h1>Modifier votre profil utilisateur</h1>
    <form enctype="multipart/form-data">
      <ImgBottomUpdate :userId="user.id" />
      <!-- Image de fond du profil utilisateur -->
      <!-- <div class="bottomProfil"> -->
      <div class="form-group">
        <label for="username">Modifier votre Nom et Prenom</label>
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
        <label for="email">Modifier votre email</label>
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
          style="height: 10rem; width: 10rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          id="imgNavProfil"
          v-bind:src="user.attachment"
          alt="Photo de profil utilisateur"
        />
        <label for="file">Photo de profil</label>
      </div>
      <div class="formGroup" v-else>
        <img
          style="height: 10rem; width: 10rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          id="imgNavAvatar"
          src="../assets/Icons/BiPersonCircle.svg"
          alt="avatar"
        />
        <label for="file">Photo de profil</label>
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
          <button class="btnFile" type="button" @click="profilUpdate()">
            <span v-if="status == 'loading'">Publication en cours....</span>
            <span v-else>
              <img
                style="height: 40px; width: 40px"
                x="0"
                y="0"
                height="100%"
                width="100%"
                src="../assets/Icons/BiCameraFill.svg"
                alt=""
              />
            </span>
          </button>
        </div>
      </div>
      <div class="alert alert-info text-danger">{{ mesgError }}</div>
    </form>
    <div class="logoTransparent">
      <img
        style="height: 2.5rem; width: 2.5rem"
        x="0"
        y="0"
        height="100%"
        width="100%"
        src="../assets/logo_transparent.png"
        alt=""
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
    this.getProfilOne();
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
      console.log("tst");
      this.apiUser
        .get("/")
        .then((response) => {
          if (!response) {
            this.mesgError = error.response.data.message;
          } else {
            this.user = response.data;
            console.log("--------->CONTENU front-profilUpdate : response.data");
            console.log(response.data);
          }
        })
        .catch((error) => {
          alert((this.mesgError = error.response.data.message));
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
              this.$router.push("/profile");
              this.getProfilOne();
            }
          })
          .catch((error) => {
            alert((this.mesgError = error.response.data.message));
          });
      }
    },
  },
};
</script>

<style>
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
  width: 100%;
}
.logoTransparent {
  margin: 3rem 0 0 0;
}
</style>