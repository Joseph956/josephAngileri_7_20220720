<template>
  <div>
    <!-- Template créer un commentaire -->
    <form>
      <!-- Contenu du commentaire -->
      <div class="form-group">
        <label for="coment"></label>
        <textarea
          v-model="coment"
          type="text"
          id="coment"
          class="form-control"
          placeholder="Coment"
        />
      </div>
      <!-- Publier un commentaire -->
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary"
          @click="comentCreate()"
          :class="{ 'btn--disabled': !validatedFields }"
        >
          <span v-if="status == 'loading'">Publication en cours....</span>
          <span v-else>Nouveau commentaire</span>
        </button>
      </div>
    </form>
    <!-- Lister les commentaires -->
    <div
      v-for="coment in coments"
      :key="coment.id"
      class="col-md-12 grid-margin"
    >
      <div class="comentPost">
        <p>{{ coment.coment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "ComentsCreate",
  data: function () {
    return {
      ComentsCreate: {
        userId: null,
        postId: null,
        coment: null,
      },
      //Lister tous les posts
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/coments",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      // coments: [], //Permet l'affichage des posts sur le front.
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId === -1) {
      this.$router.push("/coments");
      return;
    }
  },
  beforeMount() {
    //Je récupère la liste des posts
    this.getComentsList();
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "publication") {
        if (this.title != "" && this.content != "" && this.attachment != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.title != "" && this.content != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    //Lister tous les coments
    getComentsList() {
      this.apiComents
        .get("")
        .then((response) => {
          this.coments = response.data;
        })
        .catch(function () {});
    },
    //Créer un nouveau post
    comentCreate: function () {
      console.log(dataComent);
      const dataComent = new FormData();
      dataComent.append("userId", this.$store.state.user.userId);
      dataComent.append("postId", this.postId);
      dataComent.append("coment", this.coment);
      this.apiComents
        .post("http://localhost:3000/api/coments", dataComent)
        .then(() => {
          this.getComentsList();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>