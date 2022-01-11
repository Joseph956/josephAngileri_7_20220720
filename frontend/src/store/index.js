import { createStore } from 'vuex'
// import 'es6-promise/auto'
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

//Create a new store instance
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    register: ({ commit }, userInfos) => {
      // return new Promise((resolve, reject) => {
      commit;
      instance.post('/auth/register', userInfos)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
      // });
    }
  },
  modules: {
  }
});


