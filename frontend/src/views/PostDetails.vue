<template>
  <div>
    <div class="post-card-wrap">
      <navProfil />
      <div class="posts-cards container">
        <h1>joseph</h1>
        <div class="toggle-edit">
          <span>Toggle Editing Post</span>
          <input type="checbox" v-model="editPost" />
          <PostCardRecent
            :post="post.id"
            v-for="post in postCardRecent"
            :key="post.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navProfil from "@/components/NavProfil.vue";
import postCardRecent from "@/components/PostCardRecent.vue";

export default {
  name: "PostDetails",
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