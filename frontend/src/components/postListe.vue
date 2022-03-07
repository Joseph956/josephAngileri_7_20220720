<template>
  <div>
    <div class="card bg-light my-3" v-for="post in posts" :key="post.id">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="post-content">
              <img
                src="https://via.placeholder.com/400x150/FFB6C1/000000"
                alt="post-image"
                class="img-responsive post-image"
              />
              <div class="post-container">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  alt="user"
                  class="profile-photo-md pull-left"
                />
                <div class="post-detail">
                  <div class="user-info">
                    <h5>
                      <a href="timeline.html" class="profile-link">{{
                        user.username
                      }}</a>
                      <span class="following">following</span>
                    </h5>
                    <p class="text-muted">Published a photo about 3 mins ago</p>
                  </div>
                  <div class="reaction">
                    <a class="btn text-green"
                      ><i class="fa fa-thumbs-up"></i> 13</a
                    >
                    <a class="btn text-red"
                      ><i class="fa fa-thumbs-down"></i> 0</a
                    >
                  </div>
                  <div class="line-divider"></div>
                  <div class="post-text">
                    <p>
                      {{ content }}
                      <i class="em em-anguished"></i>
                      <i class="em em-anguished"></i>
                      <i class="em em-anguished"></i>
                    </p>
                  </div>
                  <div class="line-divider"></div>
                  <div class="post-comment">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt=""
                      class="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" class="profile-link"
                        >{{ user.username }} </a
                      ><i class="em em-laughing"></i> {{ post.content }}
                    </p>
                  </div>
                  <div class="post-comment">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      class="profile-photo-sm"
                    />
                    <p>
                      <a href="timeline.html" class="profile-link">John</a>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud
                    </p>
                  </div>
                  <div class="post-comment">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      class="profile-photo-sm"
                    />
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Post a comment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "postListe",
  data() {
    return {
      // LA LISTE DES POSTE QUE TU VA INITIALISER PAR LA SUITE
      posts: [],
    };
  },
  methods: {
    listPost: function () {
      this.currentUserId = localStorage.getItem("userId");
      if (localStorage.getItem("refresh") === null) {
        localStorage.setItem("refresh", 0);
        location.reload();
      }
      // ICI ON A UTILISER UN LOCAL STORAGE POUR LE TOKEN, TOI TU VA UTILISER LE TOKEN QUI SE TROUVE DANS TON $STORE
      axios
        .get("http://localhost:3000/api/posts", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.posts = res.data.ListPosts;
        })
        .catch((error) => {
          const codeError = error.message.split("code ")[1];
          let messageError = "";
          switch (codeError) {
            case "400":
              messageError = "La liste des messages n'a pas été récupérée !";
              break;
          }
        });
    },
  },
  beforeMount() {},
};
</script>

<style>
img {
  height: 4vw;
  -o-object-fit: cover;
  object-fit: cover;
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: center;
}
</style>