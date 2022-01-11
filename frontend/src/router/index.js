import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '@/views/Accueil.vue';
import Login from '@/components/Login.vue';
// import SignUp from '@/components/SignUp.vue';
import NavSignUp from '@/components/NavSignUp.vue';


const routes = [
  {
    path: '/',
    name: 'Accueil',
    components: Accueil,
    // meta: {
    //   requireAuth: true
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/signup',
  //   name: 'SignUp',
  //   component: SignUp
  // },
  {
    path: '/navsignup',
    name: 'NavSignUp',
    component: NavSignUp
  },
];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.PORT,
//   routes,
// });


const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

// Vue.createApp(App).use(router).mount('#app');
export default router;
