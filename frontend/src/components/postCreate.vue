<template>
  <div>
    <form @submit.prevent="submit">
      <h1 class="nav-link-title" v-if="mode == 'publier'">Publication</h1>
      <h1 class="nav-link-title" v-else>Suppression</h1>
      <p class="nav-link-subtitle" v-if="mode == 'supprimer'">
        <br />
        <button>
          <span class="nav-link-action" @click="switchToCreatePost()"
            >Publier un post
          </span>
        </button>
      </p>
      <p class="nav-link-subtitle" v-else>
        <br />
        <button>
          <span class="nav-link-action" @click="switchToSuppPost()"
            >Supprimer un post
          </span>
        </button>
      </p>

      <div class="formGroup">
        <label for="id"></label>
        <input
          ref="firstField"
          type="text"
          v-model="id"
          id="titre"
          placeholder="Titre"
        />
      </div>

      <div class="formGroup">
        <label for="content"></label>
        <textarea v-model="content" id="content"> </textarea>
      </div>

      <div class="formGroup">
        <label class="labelFile">Ajouter une image à votre post</label><br />
        <input
          ref="postImage"
          type="file"
          name="postImage"
          id="imageInput"
          accept="image/*"
          @change="onFileSelected"
        />
      </div>

      <div class="form-group">
        <button
          @click="publier()"
          class="btn btn-primary"
          :class="{ 'btn--disabled': !validatedFields }"
          v-if="mode == 'publier'"
        >
          <span v-if="status == 'loading'">Publication en cours....</span>
          <span v-else>Publier</span>
        </button>
        <button
          class="btn btn-primary"
          @click="supprimer()"
          :class="{ 'btn--disabled': !validatedFields }"
          v-else
        >
          <span v-if="status == 'loading'">Suppression en cours....</span>
          <span v-else>Supprimer</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "postCreate",

  data: function () {
    return {
      mode: "publier",
      posts: [],
      content: "",
      attachment: "",
    };
  },
  mounted: function () {
    if (this.$store.state.postId === -1) {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "supprimer") {
        if (this.post != "" && this.content != "" && this.attachment != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.attachment != "" && this.content != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState({
      post: "postInfos",
    }),
  },

  methods: {
    switchToCreatePost: function () {
      this.mode = "publier";
    },
    switchToSuppPost: function () {
      this.mode = "supprimer";
    },
    publier: function () {
      const self = this;
      this.$store
        .dispatch("publier", {
          content: this.content,
          attachment: this.attachment,
        })
        .then(
          function () {
            self.$router.push("/posts");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    supprimer: function () {
      const self = this;
      this.$store
        .dispatch("supprimer", {
          content: this.content,
          attachment: this.attachment,
        })
        .then(
          function () {
            self.supprimer();
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style>
</style>