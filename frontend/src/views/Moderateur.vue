<template>
  <div>
    <v-container>
      <div class="logoTransparent">
        <img
          style="height: 2.5rem; width: 2.5rem"
          x="0"
          y="0"
          height="100%"
          width="100%"
          src="../assets/logo_transparent.png"
          alt=""
        />
      </div>
      <h1>Modérateur contrôle du compte utilisateur</h1>
      <div class="flex-table">
        <!-- <div>Avatar</div> -->
        <div>Name</div>
        <div>Email</div>
        <div>Actions</div>
      </div>
      <div v-for="user in users" :key="user.id" class="flex-table">
        <!-- <div :key="user.id" class="flex-table"> -->
        <!-- <div>{{ user.attachment }}</div> -->
        <div>{{ user.username }}</div>
        <div>{{ user.email }}</div>
        <div class="actions">
          <!-- <router-link :to="{ name: 'users', params: { id: user.id } }"
            >Show</router-link
          > -->
          <v-btn @click="getProfilOne(user.id)">edit</v-btn>
          <v-btn @click="deleteUser(user)">delete</v-btn>
        </div>
      </div>
      <!-- <profile :key="user.id" :roleId="'admin'" /> -->
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Moderateur",
  data: function () {
    return {
      mesgError: "",
      apiUser: axios.create({
        baseURL: "http://localhost:3000/api/users/",
        // + this.$route.params.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "BEARER " + this.$store.state.user.token,
        },
      }),
      users: [],
    };
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
  beforeMount() {
    this.getProfilOne();
  },
  computed: {
    ...mapState({
      user: "userInfos",
      status: "status",
    }),
  },
  methods: {
    getProfilOne: function () {
      console.log("tst");
      this.apiUser
        .get(`${this.$route.params.id}/admin`)
        .then((response) => {
          if (!response) {
            this.mesgError = error.response.data.message;
          } else {
            this.user = response.data;
            console.log("--------->CONTENU front-profilUpdate : response.data");
            console.log(response.data);
          }
        })
        .catch((error) => {
          alert((this.mesgError = error.response.data.message));
        });
    },
    deleteUser(user) {
      this.$store.dispatch("deleteUser", user);
    },
  },
};
</script>

<style>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 10px;
  border-bottom: 1px black solid;
}
.actions {
  padding-right: 10px;
}
</style>