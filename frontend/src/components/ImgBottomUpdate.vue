<template>
  <div class="imgBottomUpdate">
    <form enctype="multipart/form-data">
      <!-- Image de fond du profil utilisateur  -->
      <div class="formGroup" v-if="user.imgBottom">
        <img
          style="height: 25vw; width: 90%"
          x="0"
          y="0"
          height="100%"
          width="100%"
          id="imgFondAvatar"
          v-bind:src="user.imgBottom"
          alt="Image de fond compte utilisateur"
        />
      </div>
      <div v-else>
        <img
          style="height: auto; width: 30%"
          x="0"
          y="0"
          height="100%"
          width="100%"
          id="imgFondAvatar"
          src="../assets/Icons/BiCardImg.svg"
          alt="avatar"
        />
        <label for="file" class="legend">Changer la photo de couverture</label>
      </div>
      <div class="selectBottom">
        <div class="formGroup">
          <input
            class="formFilePublich"
            id="fileBottom"
            ref="fileBottom"
            type="file"
            name="fileBottom"
            accept="image/*"
            @change="onFileSelected()"
          />
          <button
            v-if="isAdmin == true || $store.state.user.userId == user.userId"
            class="btnFile"
            type="button"
            @click="imgFondUpdate()"
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
                alt=""
              />
            </span>
          </button>
        </div>
      </div>
    </form>
    <div class="alert alert-info text-danger">{{ mesgError }}</div>
  </div>
</template>

<script>
export default {
  name: "ImgBottomUpdate",
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
        imgBottom: null,
      },
    };
  },
  beforeMount() {
    if (this.$store.state.user.role.role == "admin") {
      this.isAdmin = true;
    }
    if (this.$store.state.user.role.role == "user") {
      this.isAdmin = true;
    }
  },
  methods: {
    onFileSelected() {
      this.fileBottom = this.$refs.fileBottom.files[0];
      this.user.imgBottom = URL.createObjectURL(this.fileBottom);
    },
    imgFondUpdate: function () {
      if (
        window.confirm("Voulez-vous vraiment modifier votre image de fond ?")
      ) {
        const dataImgBottom = new FormData();
        dataImgBottom.append("image", this.fileBottom);
        this.apiUser
          .put(
            `http://localhost:3000/api/users/${this.$route.params.id}/imgBottom`,
            dataImgBottom
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
.imgBottomUpdate {
  box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e51665a;
  border-radius: 1rem;
  background: #5c5c6c85;
  margin: 0.5rem 0 1rem 0;
  padding: 1rem;
}
.legend,
label {
  margin: 1rem 0 1rem 0;
  font-size: 1.5rem;
  text-decoration-line: underline;
}
.selectBottom {
  display: flex;
  align-items: center;
  margin: 1rem;
  align-content: space-between;
  justify-content: space-evenly;
  flex-direction: row-reverse;
}
 .btnFile {
   background: #627565;
 }
@media screen and (max-width: 768px) {
  .auth-wrapper {
    display: block;
  }
  .imgFondAvatar {
    width: auto;
    height: 10rem;
  }
  .formFilePublich {
    width: 100%;
  }
  .selectBottom {
    flex-direction: column-reverse;
  }
  .imgBottom {
    font-size: 1.1rem;
  }
}
@media screen and (max-width: 768px) {
  .imgBottom {
    font-size: 0.5rem;
  }
}
@media screen and (max-width: 393px) {
  .legend,
  label {
    font-size: 1.2rem;
  }
}
</style>