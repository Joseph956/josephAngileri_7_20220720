import { createStore } from 'vuex';
// import post from '../../../backend/models/post';
import apiPosts from '@/apiroutage/posts';

import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
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
    status: '',
    apiPosts: {
      postId: '',
      content: '',
      attachment: '',
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
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    postInfos: function (state, postInfos) {
      state.postInfos = postInfos;
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

    //Lister tous les posts
    getPostInfos: ({ commit, state }) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.get('/posts', {
          headers: {
            "Authorization": "BEARER " + state.user.token
          }
        }).then(response => {
          commit('setStatus', 'postId');
          resolve(response.data);
          console.log(response.data);
        }).catch(function () {
          reject(error);
          console.log(error);
        });
      });
    },
    // getPostInfos: ({ commit, state }) => {
    //   commit;
    //   instance.get('/posts' + state.post.postId, {
    //     headers: {
    //       "Authorization": "BEARER " + state.user.token
    //     }
    //   }).then(response => {
    //     commit('postInfos', response.data);
    //     console.log(response.data);
    //   }).catch(function () { });
    // },
    // async listerAllPosts() {
    //   const res = await postServices.getAllPosts(state.token);
    //   if (res.status === 200) {
    //     commit('setStatus', res.data.posts);
    //   }
    // }
  },


  modules: {
  }
});


