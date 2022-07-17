import { createStore } from 'vuex';
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Accept': "application/json",
    "Content-Type": "application/json",
  },
});

let state = {
  posts: [],
  user: {},
  token: '',

}

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
};
let post = localStorage.getItem('post');
if (!post) {
  post = {
    postId: -1,
    token: '',
  };
} else {
  try {
    post = JSON.parse(post);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    post = {
      postId: -1,
      token: '',
    };
  }
};
let coment = localStorage.getItem('coment');
if (!coment) {
  post = {
    comentId: -1,
    token: '',
  };
} else {
  try {
    coment = JSON.parse(coment);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    coment = {
      comentId: -1,
      token: '',
    };
  }
};
let like = localStorage.getItem('like');
if (!like) {
  post = {
    likeId: -1,
    token: '',
  };
} else {
  try {
    like = JSON.parse(like);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    like = {
      likeId: -1,
      token: '',
    };
  }
};
const store = createStore({
  state: {
    status: '',
  }
})

//Create a new store instance
export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      attachment: '',
      username: '',
      email: '',
    },
    user: user,
    apiPasswd: {
      oldPassword: '',
      newPassword: '',
      newPasswdConfirm: '',
    },
    post: post,
    apiPosts: {
      attachment: '',
      userId: '',
      postId: '',
      content: '',
    },
    coment: coment,
    apiComents: {
      comentId: '',
      coment: '',
    },
    like: like,
    apiLikes: {
      likeId: '',
      like: '',
    },
    // postCardRecent: {
    //   attachment: '',
    //   userId: '',
    //   postId: '',
    //   content: '',
    // },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    postInfos: function (state, postInfos) {
      state.postInfos = postInfos;
    },
    comentInfos: function (state, comentInfos) {
      state.comentInfos = comentInfos;
    },
    likeInfos: function (state, likeInfos) {
      state.likeInfos = likeInfos;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    //Creation du compte utlisateur
    login: ({ commit }, data) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('auth/login', data)
          .then(response => {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            commit('setStatus', 'error_login');
            reject(error);
            console.log(error);
          });
      });
    },
    createAccount: ({ commit }, data) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('auth/register', data)
          .then(function (response) {
            if (!response) {
              return (this.mesgError = error.response.data.message)
            } else {
              commit('setStatus', 'created');
              resolve(response);
              console.log(response);
            }
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
            console.log(error);
            alert(this.mesgError = error.response.data.message)
          });
      });
    },
    //Fin Creation de compte

    //Modification ou confirmation du mot de passe
    confirmPassword: ({ commit }, data) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.put('auth/newpasswd/:id', data)
          .then(response => {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            commit('setStatus', 'error_confirmPassword');
            reject(error);
            console.log(error);
          });
      });
    },
    createPassword: ({ commit }, data) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.put('auth/newpasswd/:id', data)
          .then(response => {
            commit('setStatus', 'created');
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            commit('setStatus', 'error_create');
            reject(error);
            console.log(error);
          });
      });
    },
    //Fin modification du mot de passe

    //Affichage des informations
    getUserInfos: ({ commit, state }, data) => {
      instance.get('/users/' + state.user.userId, data,
        {
          headers: {
            "Authorization": "BEARER " + state.user.token
          }
        }).then(response => {
          commit('userInfos', response.data);
        }).catch(function () { });
    },
    getPostInfos: ({ commit, state }) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.get('/posts', {
          headers: {
            "Authorization": "BEARER " + state.user.token
          }
        }).then(response => {
          commit('setStatus', 'postId', 'postInfos');
          resolve(response.data);
          console.log(response.data);
        }).catch(function () {
          reject(error);
          console.log(error);
        });
      });
    },
    getComentInfos: ({ commit, state }) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.get('/coments', {
          headers: {
            "Authorization": "BEARER " + state.user.token
          }
        }).then(response => {
          commit('setStatus', 'comentId');
          resolve(response.data);
          console.log(response.data);
        }).catch(function () {
          reject(error);
          console.log(error);
        });
      });
    },
    getLikeInfos: ({ commit, state }) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.get('/posts/:id/like/:userId', {
          headers: {
            "Authorization": "BEARER " + state.user.token
          }
        }).then(response => {
          commit('setStatus', 'likeId');
          resolve(response.data);
          console.log(response.data);
        }).catch(function () {
          reject(error);
          console.log(error);
        });
      });
    },
  },
  modules: {
  }
});


