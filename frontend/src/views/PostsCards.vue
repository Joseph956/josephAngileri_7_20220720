<template>
  <div>
    <div class="post-card-wrap">
      <navProfil />
      <div class="posts-cards container">
        <h1>Voir les posts recents</h1>
        <h2>{{post.title}}</h2>
        <PostCardRecent v-for="post in posts" :key="post.id" :postId="post.id" />
          <div v-show="posts.length > 0" v-for="post in posts" :key="post.id" class="col-md-12 grid-margin">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import navProfil from "@/components/NavProfil.vue";
import postCardRecent from "@/components/PostCardRecent.vue";

export default {
  name: "PostsCards",
  components: { postCardRecent, navProfil },
  data: function () {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
        user: null,
        admin: null,
        likes: null,
      },
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      posts: [],
    };
  },
  beforeMount() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () { });
    },
  },
  // computed: {
  //   postCardRecent() {
  //     return this.$store.state.postCardRecent;
  //   },
  //   editPost: {
  //     get() {
  //       return this.$store.state.editPost;
  //     },
  //     set(payload) {
  //       this.$store.commit("toggleEditPost", payload);
  //     },
  //   },
  // },
};
</script>

<style>
</style>