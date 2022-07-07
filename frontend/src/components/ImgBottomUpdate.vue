<template>
    <div class="imgBottom">
        <form enctype="multipart/form-data">
            <!-- Image de fond du profil utilisateur  -->
            <div class="formGroup" v-if="user.imgBottom ">
                <img style="height: auto; width: 100%" x="0" y="0" height="100%" width="100%" id="imgFondAvatar"
                    v-bind:src="user.imgBottom" alt="Image de fond compte utilisateur" />
            </div>
            <div class="formGroup" v-else>
                <img style="height: auto; width: 100%" x="0" y="0" height="100%" width="100%" id="imgFondAvatar"
                    src="../assets/Icons/BiCardImg.svg" alt="avatar" />
                <label for="file" class="legend">Image de fond</label>
            </div>
            <div class="selectBottom">
                <div class="formGroup">
                    <input class="formFilePublich" id="fileBottom" ref="fileBottom" type="file" name="fileBottom"
                        accept="image/*" @change="onFileSelected()" />
                    <button class="btnFile" type="button" @click="imgFondUpdate()">
                        <span v-if="status == 'loading'">Publication en cours....</span>
                        <span v-else>
                            <img style="height: 40px; width: 40px" x="0" y="0" height="100%" width="100%"
                                src="../assets/Icons/BiCameraFill.svg" alt="">
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ImgBottomUpdate',
    data: function () {
        return {
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
    methods: {
    onFileSelected() {
      this.fileBottom = this.$refs.fileBottom.files[0];
      this.user.imgBottom = URL.createObjectURL(this.fileBottom);
    },
    imgFondUpdate: function () {
      const dataImgBottom = new FormData();
      dataImgBottom.append("image", this.fileBottom);
      this.apiUser
        .put(
          `http://localhost:3000/api/users/${this.$route.params.id}/imgBottom`,
          dataImgBottom
        )
        .then(() => {
          window.location.reload();
          this.$router.push("/profile");
          this.getProfilOne();
        })
        .catch(function () { });
    },
    }

}
</script>

<style>
.imgBottom {
    box-shadow: 5px 5px 10px #cecdcd, -5px -5px 10px #4e51665a;
    border-radius: 1rem;
    background: #4e5166;
    margin: 0.5rem;
    padding: 1rem;
}
.legend, label {
    margin-top: 1rem;
    font-size: 1.5rem;
}
.selectBottom {
    display: flex;
    align-items: center;
    margin: 1rem;
    align-content: space-between;
    justify-content: space-evenly;
    flex-direction: row-reverse;
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
        width: 20rem;
    }
    .selectBottom {
       flex-direction: column;
    }
}
</style>