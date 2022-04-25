<template>
  <div class="comentForm">
    <div class="form-control_input">
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
              placeholder="Votre commentaire"
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
        <div class="col-md-8 col-xl-6 middle-wrapper">
          <div class="row">
            <div
              class="col-md-12 grid-margin"
              v-for="coment in coments"
              v-bind:key="coment.id"
              :coment="coment"
            >
              <div class="comentPost">
                <p>{{ coment.coment }}</p>
                <p>{{ coment.user.username }}</p>
                <span class="dateComent"
                  >Posté le : {{ coment.createdAt }}
                </span>
              </div>
              <!-- Supprimer un commentaire -->
              <div class="btnFooter">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="comentDeleted(coment.id)"
                  :class="{ 'btn--disabled': !validatedFields }"
                >
                  <span v-if="status == 'loading'"
                    >Suppression en cours....</span
                  >
                  <span v-else>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "ComentsCreate",
  props: {
    postId: String,
    comentId: String,
  },
  data: function () {
    return {
      coment: {
        userId: null,
        postId: null,
        coment: null,
      },
      //Lister tous les coments
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: [],
      coment: [],
    };
  },
  mounted: function () {
    console.log(this.postId);
    if (this.$store.state.user.userId === -1) {
      this.$router.push(`/coments/${id}`);
      return;
    }
  },
  beforeMount() {
    //Je récupère la liste des coments
    this.getComentList();
    //Je récupère un commentaire
    this.getComentsOne();
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
    // coment: "comentInfos",
  },
  methods: {
    //Lister les commentaires pour chaque post.
    getComentList() {
      this.apiComents
        .get("/coments")
        .then((response) => {
          this.coments = response.data;
        })
        .catch(function () {});
    },
    // Relier un coments à son post
    getComentsOne() {
      this.apiComents
        .get("/coments", { postId: this.postId })
        .then((response) => {
          this.coments = response.data;
        })
        .catch(function () {});
    },
    //Créer un nouveau coment
    comentCreate: function () {
      this.apiComents
        .post("http://localhost:3000/api/coments", {
          userId: this.$store.state.user.userId,
          postId: this.postId,
          coment: this.coment,
        })
        .then(() => {
          this.getComentsOne();
          this.$router.push("/posts");
        })
        .catch(function () {});
    },
    //Supprimer un commentaire (Methode "delete"(id){})
    comentDeleted: function (id) {
      this.apiComents
        .delete("http://localhost:3000/api/coments/" + id)
        .then(() => {
          window.location.reload();
          this.getComentList();
          this.$router.push("/posts");
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>