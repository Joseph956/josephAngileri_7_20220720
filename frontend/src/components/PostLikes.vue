<template>
  <div>Liker</div>
</template>

<script>
export default {
  name: "PostLikes",
  data: function () {
    return {
      likes: {
        likes: this.post.likes,
        userId: this.userId.user.id,
        postId: this.postId.post.id,
        comentId: this.comentId.coment.id,
      },

      //Lister tous les posts
      apiPosts: axios.create({
        baseURL: "http://localhost:3000/api/posts/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      likes: [],
    };
  },
  beforeMount() {
    //Je récupère la liste des posts
    this.getPostOne();
  },
  methods: {
    //Afficher un post (Methode "get"(show id){})
    getPostOne() {
      this.apiPosts
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch(function () {});
    },
    postLikeCreate: function () {
      const likePost = new FormData();
      likePost.append("likes", this.post.likes);
      likePost.append("postId", this.post.post.id);
      likePost.append("comentId", this.post.coment.id);
      likePost.append("userId", this.$store.state.user.userId);
      this.apiPosts
        .put(
          `http://localhost:3000/api/posts/${this.$route.params.id}/like`,
          likePost
        )
        .then(() => {
          window.location.reload();
          this.$router.push("/posts");
          this.getPostList();
        })
        .catch(function () {});
    },
  },
};
</script>

<style>
</style>