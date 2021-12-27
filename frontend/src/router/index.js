// import Accueil from '../components/Accueil.vue'
// import Login from '../components/Login.vue';
import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Signup from '../views/Signup.vue'
// const SignUp = () => import('../views/SignUp.vue');


const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   name: 'Accueil',
  //   components: Accueil,
  //   path: '/'
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/',
  //   name: 'Accueil',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../components/Accueil.vue')
  // },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup,
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/profil',
  //   name: 'Profil',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/Profil.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
