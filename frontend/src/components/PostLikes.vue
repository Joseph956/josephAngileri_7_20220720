<template>
  <div>
    <!-- Créer un like -->
    <div>
      <div class="d-flex align-items-center text-muted mr-4">
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
          class="feather feather-heart icon-md"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
        <button
          type="button"
          class="btn btn-primary"
          @click="postLikeCreate()"
          :postId="post.id"
          :class="{ 'btn--disabled': !validatedFields }"
        >
          <span v-if="status == 'loading'"
            >Ouverture du formulaire en cours....</span
          >
          <span v-else>J'aime</span>
          <p class="d-none d-md-block ml-2">
            {{ post.likes.length }}
          </p>
        </button>
      </div>
    </div>
    <!-- Lister les likes -->

    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "PostLikes",
  props: ["likes", "likesCount"],
  data: function () {
    return {
      like: {
        likes: null,
        userId: null,
        postId: null,
      },

      //Lister tous les posts
      apiLikes: axios.create({
        baseURL: "http://localhost:3000/api/posts",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      likes: [],
    };
  },

  mounted: function () {},
  beforeMount() {
    this.getLikesList();
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    //Lister les likes
    getLikesList() {
      this.apiLikes
        // .get("")
        .get(
          `/${this.$route.params.post.id}/like/${this.$store.state.user.userId}`
        )
        .then((response) => {
          this.like = response.data;
        })
        .catch(function () {});
    },
    postLikeCreate: function () {
      this.apiLikes
        .put(
          `http://localhost:3000/api/posts/${this.$route.params.id}/like/${this.$store.state.user.userId}`,
          {
            postId: this.postId,
            postId: this.post.id,
            userId: this.userId,
            likes: this.like,
          }
        )
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getLikesList();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>