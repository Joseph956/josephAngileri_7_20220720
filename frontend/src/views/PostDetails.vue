<template>
  <!-- Template affichage détails d'un post -->
  <div class="col-md-8 col-xl-6 middle-wrapper">
    <navPosts />
    <h1>Details du post</h1>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="card rounded">
          <!-- Infos créateur du post -->
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="ml-2 justify-content">
                  <div class="avatar" v-if="post.user.attachment">
                    <img
                      class="imgUser"
                      alt="Image du profil utilisateur"
                      v-bind:src="post.user.attachment"
                      loading="lazy"
                    />
                  </div>
                  <div v-else>
                    <img
                      class="avatarProfil"
                      src="../assets/Icons/user-alt-light.svg"
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <div class="userPost">
                      <p>{{ post.user.username }}</p>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <div class="dropdown">
                <button
                  class="btn p-0"
                  type="button"
                  id="dropdownMenuButton2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-more-horizontal icon-lg pb-3px"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
                <div
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-meh icon-sm mr-2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="15" x2="16" y2="15"></line>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                    <span class="">Unfollow</span></a
                  >
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-corner-right-up icon-sm mr-2"
                    >
                      <polyline points="10 9 15 4 20 9"></polyline>
                      <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
                    </svg>
                    <span class="">Go to post</span></a
                  >
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-share-2 icon-sm mr-2"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span class="">Share</span></a
                  >
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-copy icon-sm mr-2"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      ></path>
                    </svg>
                    <span class="">Copy link</span></a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Affichage du post -->
          <div class="card-body">
            <p class="mb-3 tx-14">{{ post.title }}</p>
            <p class="mb-3 tx-14">{{ post.content }}</p>
            <img class="imgPost" :src="post.attachment" alt="" />
            <div class="datePost">
              <p>Posté le : {{ post.createdAt }}</p>
            </div>
            <!-- <comentsCreate :postId="post.id" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
//Barre de navigation
import navPosts from "@/components/NavPosts.vue";
export default {
  name: "PostDetails",
  components: {
    navPosts,
  },
  data: function () {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
        user: null,
        admin: null,
      },

      //Lister tous les posts
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/" + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
    };
  },
  beforeMount() {
    //Je récupère la liste des posts
    this.getPostOne();
  },
  computed: {},
  methods: {
    //Afficher un post (Methode "get"(show id){})
    getPostOne() {
      console.log("tst");
      this.apiPosts
        .get("")
        .then((response) => {
          this.post = response.data;
          console.log(this.post);
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>