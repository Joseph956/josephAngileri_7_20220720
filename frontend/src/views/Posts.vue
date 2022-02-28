<template>
  <div class="formGroup">
    <div class="form-control_input">
      <div>
        <postCreate />
        <div class="col-md-8 col-xl-6 middle-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="card rounded">
                <div class="card-header">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        class="img-xs rounded-circle"
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        alt=""
                      />
                      <div class="ml-2">
                        <p>Mike Popescu</p>
                        <p class="tx-11 text-muted">1 min ago</p>
                      </div>
                    </div>
                    <div class="dropdown">
                      <button
                        class="btn p-0"
                        type="button"
                        id="dropdownMenuButton2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
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
                          class="feather feather-more-horizontal icon-lg pb-3px"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
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
                            class="feather feather-meh icon-sm mr-2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="8" y1="15" x2="16" y2="15"></line>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                          </svg>
                          <span class="">Unfollow</span></a
                        >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
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
                            class="feather feather-corner-right-up icon-sm mr-2"
                          >
                            <polyline points="10 9 15 4 20 9"></polyline>
                            <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
                          </svg>
                          <span class="">Go to post</span></a
                        >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
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
                            class="feather feather-share-2 icon-sm mr-2"
                          >
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line
                              x1="8.59"
                              y1="13.51"
                              x2="15.42"
                              y2="17.49"
                            ></line>
                            <line
                              x1="15.41"
                              y1="6.51"
                              x2="8.59"
                              y2="10.49"
                            ></line>
                          </svg>
                          <span class="">Share</span></a
                        >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
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
                            class="feather feather-copy icon-sm mr-2"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path
                              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                            ></path>
                          </svg>
                          <span class="">Copy link</span></a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <p class="mb-3 tx-14">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusamus minima delectus nemo unde quae recusandae
                    assumenda.
                  </p>
                  <img
                    class="img-fluid"
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt=""
                  />
                </div>
                <div class="card-footer">
                  <div class="d-flex post-actions">
                    <a
                      href="javascript:;"
                      class="d-flex align-items-center text-muted mr-4"
                    >
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
                      <p class="d-none d-md-block ml-2">Like</p>
                    </a>
                    <a
                      href="javascript:;"
                      class="d-flex align-items-center text-muted mr-4"
                    >
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
                        class="feather feather-message-square icon-md"
                      >
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        ></path>
                      </svg>
                      <p class="d-none d-md-block ml-2">Comment</p>
                    </a>
                    <a
                      href="javascript:;"
                      class="d-flex align-items-center text-muted"
                    >
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
                        class="feather feather-share icon-md"
                      >
                        <path
                          d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                        ></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                      </svg>
                      <p class="d-none d-md-block ml-2">Share</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <postListe />
        <postModify />
      </div>
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
    if (this.$store.state.UUID === -1) {
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
.col-md-8 {
  width: auto;
  display: flex;
}
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