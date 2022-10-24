import { createStore } from 'vuex';
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Accept': "application/json",
    "Content-Type": "application/json",
  },
});
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
//Create a new store instance
export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      imgBottom: '',
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
    apiPosts: {
      likeId: '',
      like: '',
    },
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
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    },
    DELETE_USER(state, userId) {
      let user = state.user.filter(user => user.id != userId)
      state.user = user;
    }
  },
  actions: {
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
            commit('setStatus', 'mesgError');
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, data) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('auth/register', data)
          .then(function (response) {
            commit('setStatus', 'created');
            resolve(response);
            console.log(response);
          })
          .catch(function (error) {
            commit('setStatus', 'mesgError');
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit, state }, data) => {
      instance.get('/users/' + state.user.userId, data,
        {
          headers: {
            "Authorization": "BEARER " + state.user.token
          }
        }).then(response => {
          commit('userInfos', response.data);
          resolve(response);
          console.log(response);
        }).catch(function (error) {
          commit('userInfos', 'mesgError');
          reject(error);
        });
    },
  },
  modules: {
  }
});


