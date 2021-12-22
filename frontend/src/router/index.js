import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Accueil from '../views/Accueil.vue'
// import SignUp from '../views/SignUp.vue'


const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/',
  //   name: 'Accueil',
  //   component: Accueil
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Accueil',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Accueil.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Profil.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
