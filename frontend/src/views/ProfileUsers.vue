<template>
  <div>
    <navPosts />
    <profile :userId="user.id" />

    <!-- <div>
      <div>
        <h3>{{ user.username }}</h3>
      </div>
      <div>
        <h3>{{ user.email }}</h3>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import navPosts from "@/components/NavPosts.vue";
import profile from "@/views/Profile.vue";
export default {
  name: "ProfileUsers",
  components: { navPosts, profile },
  data: function () {
    return {
      mesgError: "",
      isAdmin: false,
      user: {
        imgBottom: this.imgBottom,
        attachment: this.attachment,
        usermame: this.username,
        email: this.email,
      },
      apiUser: axios.create({
        baseURL:
          "http://localhost:3000/api/users/" + +this.$store.state.user.userId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      users: [],
    };
  },
  computed: {
    ...mapState(["status"]),
    ...mapState({ user: "userInfos" }),
  },
  mounted: function () {
    this.apiUser
      .get("/")
      .then((response) => {
        if (!response.data) {
          return (this.mesgError = error.response.data.message);
        } else {
          this.users = response.data;
        }
      })
      .catch((error) => {
        this.mesgError = error.response.data.message;
        alert(this.mesgError);
      });
  },
  methods: {
    getUserOne() {
      this.apiUser
        .get(`/profileusers/${this.$route.params.id}`)
        .then((response) => {
          if (!response.data) {
            return (this.mesgError = error.response.data.message);
          } else {
            this.post = response.data;
          }
        })
        .catch(function (error) {
          this.mesgError = error.response.data.message;
          alert(this.mesgError);
        });
    },
  },
};
</script>

<style>
</style>