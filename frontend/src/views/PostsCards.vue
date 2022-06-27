<template>
  <div>
    <div class="post-card-wrap">
      <navProfil />

      <div class="posts-cards container">
        <h1>joseph</h1>
        <!-- <div class="toggle-edit">
          <router-link class="navbar-brand" id="link" :to="{ name: 'Users' }">
            <img class="iconPeople" style="height: 1.2rem; width: 1.2rem" x="0" y="0" height="100%" width="100%"
              src="../assets/Icons/BiCardImg.svg" alt="">
            Lister les utilisateurs
          </router-link>
          <span>Toggle Editing Post</span>
          <input type="checbox" v-model="editPost" /> -->
          <PostCardRecent v-for="post in posts" :key="post.id" :postId="post.id" />
        <!-- </div> -->
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
  computed: {
    postCardRecent() {
      return this.$store.state.postCardRecent;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
  },
};
</script>

<style>
</style>