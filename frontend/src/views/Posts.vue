<template>
  <div class="formGroup">
    <div class="form-control_input">
      <postCreate />
      <postListe />
      <postModify />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostApiRoutage from "@/apiroutage/posts";
import postCreate from "@/components/postCreate";
import postListe from "@/components/postListe";
import postModify from "@/components/postModify";

export default {
  name: "Posts",
  components: {
    PostApiRoutage,
    postCreate,
    postListe,
    postModify,
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        attachment: "",
      },
      allPosts: [],
    };
  },
  mounted: function () {
    console.log(this.$store.state.postId);
    if (this.$store.state.UUID == -1) {
      this.$router.push("/posts");
      return;
    }
    this.$store.dispatch("getPostInfos");
  },
  computed: {
    ...mapState({
      post: "PostInfos",
    }),
  },
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    },
  },
};
</script>

<style>
.form-group {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-control_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-control_input::placeholder {
  color: #a3a2a2;
}
</style>