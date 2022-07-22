<template>
  <div>
    <navPosts />
    <div class="fleche">
      <a href="/posts">
        <button
          type="button"
          class="btn btn-like"
          @click="postDetailReturn(post.id)"
        >
          <img
            class="returnPg"
            style="height: 45px; width: 35px"
            x="0"
            y="0"
            height="100%"
            width="100%"
            src="../assets/Icons/MdiArrowLeft.svg"
            alt=""
          />
        </button>
      </a>
      <h1>lister les commentaires de la publication</h1>
    </div>
    <div class="col-md-8 col-xl-6 middle-wrapper">
      <div class="rowList">
        <div
          v-for="coment in coments"
          :key="coment.id"
          :coment="coment"
          :post="post"
          class="col-md-12 grid-margin"
        >
          <div class="comentPost">
            <p class="comentUser">
              {{ coment.coment }}
            </p>
          </div>
          <!-- Informations de l'auteur du commentaire -->
          <div class="infosUser">
            <div class="avatarComentUser" v-if="coment.user.attachment">
              <img
                style="height: 45px; width: 35px"
                x="0"
                y="0"
                height="100%"
                width="100%"
                class="imgComent"
                :src="coment.user.attachment"
                alt=""
              />
            </div>
            <div class="avatarComentUser" v-else>
              <img
                style="height: 35px; width: 35px"
                x="0"
                y="0"
                height="100%"
                width="100%"
                class="avatarProfil"
                src="../assets/Icons/BiPersonCircle.svg"
                alt="avatar"
              />
            </div>

            <div class="userComent">
              <p class="textUserComent">
                {{ coment.user.username }}
              </p>
              <div class="dateComent">Posté le : {{ coment.createdAt }}</div>
            </div>
          </div>
          <!-- Fin informations de l'auteur du commentaire -->
        </div>
      </div>
      <p class="alert alert-info text-danger">
        {{ mesgError }}
      </p>
    </div>
  </div>
</template>

<script>
import navPosts from "@/components/NavPosts.vue";
export default {
  name: "ComentsList",
  components: {
    navPosts,
  },
  data: function () {
    return {
      msgError: "",
      apiComents: axios.create({
        baseURL:
          "http://localhost:3000/api/coments/postId/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
    };
  },
  mounted: function () {
    this.apiComents
      .get("/")
      .then((response) => {
        if (!response.data) {
          return (this.mesgError = error.response.data.message);
        } else {
          this.user = response.data;
        }
      })
      .catch((error) => {
        alert((this.mesgError = error.response.data.message));
      });
  },
  beforeMount() {
    this.getComentList();
  },

  methods: {
    getComentList() {
      this.apiComents
        .get("/")
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.coments = response.data;
            console.log(this.coments);
          }
        })
        .catch(function (error) {
          alert((this.mesgError = error.response.data.message));
        });
    },
    postDetailReturn: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.fleche {
  display: flex;
}
.returnPg {
  margin: 2rem 5rem 0 3rem;
}

.rowList {
  padding: 1rem;
  background: #5c5c6c85;
  border-radius: 1.5rem;
}
.comentPost {
  margin: 1rem;
  border-top: 1px solid grey;
}
</style>