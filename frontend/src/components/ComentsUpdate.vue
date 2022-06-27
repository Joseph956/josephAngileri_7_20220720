<template>
  <div>
    <navProfil />
    <h1>modifier un commentaire</h1>
    <div>
      <div class="avatarComent">
        <div class="avatar" v-if="user.attachment">
          <div class="containerImgUser">
            <img
              style="height: 40px; width: 40px"
              x="0"
              y="0"
              height="100%"
              width="100%"
              id="imgProfile"
              v-bind:src="user.attachment"
              alt=""
            />
          </div>
        </div>
        <div class="avatar" v-else>
          <div class="containerImgUser">
            <img
              style="height: 40px; width: 40px"
              x="0"
              y="0"
              height="100%"
              width="100%"
              id="imgAvatar"
              src="../assets/Icons/user-alt-light.svg"
              alt="avatar"
            />
          </div>
        </div>
        <!-- TEMPLATE MODIFICATION D'UN COMMENTAIRE-->
        <h1>Modifier un commentaire</h1>
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
              autofocus
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navProfil from "@/components/NavProfil.vue";
export default {
  name: "ComentsUpdate",
  components: { navProfil },
  props: {
    postId: String,
    comentId: String,
  },
  data: function () {
    return {
      //Afficher les infos du commentaire à modifier
      apiComents: axios.create({
        baseURL: "http://localhost:3000/api/coments/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      coments: {
        coment: null,
      },
    };
  },
  beforeMount() {
    //Je récupère le coment choisi
    this.getComentOne();
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "publication") {
        if (this.coment != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    //Afficher un coment (Methode "get"(show id){})
    getComentOne() {
      this.apiComents
        .get("")
        .then((response) => {
          this.coments = response.data;
          console.log(this.coments);
        })
        .catch(function () {});
    },
    //Modifier un commentaire
    comentModify: function () {
      if (window.confirm("Voulez-vous vraiment modifier ce commentaire ?")) {
        const dataComent = new FormData();
        dataComent.append("coment", this.coments.coment);
        this.apiComents
          .put(
            "http://localhost:3000/api/coments/" + this.$route.params.id,
            dataComent
          )
          .then(() => {
            window.location.reload();
            this.$router.push("/posts");
            this.getComentOne();
          })
          .catch(function () {});
      }
    },
  },
};
</script>

<style>

#imgProfile {
  border-radius: 5rem ;
  object-fit: cover;
}
</style>