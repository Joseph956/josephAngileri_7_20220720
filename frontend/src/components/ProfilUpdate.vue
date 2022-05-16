<template>
  <div>
    <navProfil />
    <!-- TEMPLATE MODIFICATION D'UN PROFIL-->
    <h1>Modifier votre profil utilisateur</h1>
    <form enctype="multipart/form-data">
      <!-- Identité de l'utilisateur -->
      <div class="form-group">
        <label for="username">Modifier votre Nom et Prenom</label>
        <input
          ref="firstfield"
          v-model="user.username"
          type="text"
          id="username"
          class="form-control"
          placeholder="Modifier votre nom et prénom"
        />
      </div>
      <!-- Email de l'utilisateur -->
      <div class="form-group">
        <label for="email">Modifier votre email</label>
        <input
          ref="firstfield"
          v-model="user.email"
          type="text"
          id="email"
          class="form-control"
          placeholder="Modifier votre email"
        />
      </div>
      <!-- Contenu de la bio utilisateur -->
      <!-- <div class="form-group">
        <label for="bioUser">Modifier le contenu de votre bio</label>
        <textarea
          v-model="user.bio"
          type="text"
          id="bioUser"
          class="form-control"
          placeholder="Modifier le contenu de votre bio"
        />
      </div> -->
      <!-- Affichage de l'image du profil utilisateur avant publication-->
      <div class="formGroup" v-if="user.attachment">
        <img
          style="height: 10rem; width: 10rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          v-bind:src="user.attachment"
          alt="Photo de profil utilisateur"
          class="w-40 rounded"
        />
      </div>
      <div v-else>
        <img
          style="height: 10rem; width: 10rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          src="../assets/Icons/user-alt-light.svg"
          alt="avatar"
        />
      </div>
      <!-- Choix de l'image du post -->
      <div class="formGroup">
        <label for="file"></label><br />
        <input
          class="fileFormCtrl"
          id="file"
          ref="file"
          type="file"
          name="image"
          accept="image/*"
          @change="onFileSelected()"
        />
      </div>
      <!-- Publier un post -->
      <div class="formGroup">
        <button
          type="button"
          class="btn btn-primary"
          @click="profilUpdate()"
          :class="{ 'btn--disabled': !validatedFields }"
        >
          <span v-if="status == 'loading'">Publication en cours....</span>
          <span v-else>Publier les modifications</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
export default {
  name: "ProfilUpdate",
  components: { navProfil },
  data: function () {
    return {
      //Afficher les infos utilisateur à modifier
      apiUser: axios.create({
        baseURL: "http://localhost:3000/api/users/" + this.$route.params.id,
        //$store.state.user.userId,
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
      },
    };
  },
  // mounted: function () {
  //   if (this.$store.state.user.userId != -1) {
  //     this.$router.push("/");
  //     return;
  //   }
  // },
  // mounted: function () {
  //   this.apiUser
  //     .get("")
  //     .then((response) => {
  //       this.user = response.data;
  //     })
  //     .catch(function () {});
  // },
  beforeMount() {
    //Je récupère la liste des posts
    this.getProfilOne();
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "publication") {
        if (this.username != "" && this.email != "" && this.attachment != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.username != "" && this.email != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState({
      user: "userInfos",
      status: "status",
    }),
  },
  methods: {
    //methode définition image
    onFileSelected() {
      this.file = this.$refs.file.files[0];
      this.user.attachment = URL.createObjectURL(this.file);
    },
    // Afficher un profil utilisateur (Methode "get"(show id){})
    getProfilOne() {
      console.log("tst");
      this.apiUser
        .get("")
        .then((response) => {
          this.user = response.data;
        })
        .catch(function () {});
    },
    //Modifier un profil (Methode "update"(id, data){})
    profilUpdate: function () {
      const dataProfil = new FormData();
      dataProfil.append("username", this.user.username);
      dataProfil.append("email", this.user.email);
      dataProfil.append("image", this.file);
      this.apiUser
        .put(
          "http://localhost:3000/api/users/" + this.$route.params.id,
          dataProfil
        )
        .then(() => {
          this.$router.push("/profile");
          window.location.reload();
          this.getProfilOne();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>