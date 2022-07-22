import { createRouter, createWebHistory } from 'vue-router';
window.axios = require('axios');

import Accueil from '@/views/Accueil.vue';
import Forgot from '@/components/Forgot.vue';
import Reset from '@/components/Reset.vue';
import Profile from '@/views/Profile.vue';
import Users from '@/views/Users.vue';
import Posts from '@/views/Posts.vue';
import PostDetails from '@/views/PostDetails.vue';
import PostsUpdate from '@/components/PostsUpdate.vue';
import ProfilUpdate from '@/components/ProfilUpdate.vue';
import ImgBottomUpdate from '@/components/ImgBottomUpdate.vue';
import PasswdUpdate from '@/components/PasswdUpdate.vue';
import NotFound from '@/views/NotFound.vue';



import Admin from '@/views/Admin/Moderateur.vue';
import Dashboard from '@/views/Admin/Dashboard.vue';
import Compte from '@/views/Admin/Compte.vue';


const routes = [
  //Cette route gère la création des comptes utilisateur,
  //et les login sur les comptes créés.
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },

  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
  },
  {
    path: '/reset/:token',
    name: 'Reset',
    component: Reset,
  },
  //Routage gestion des posts
  //Route parent (posts)
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  //Enfants PostsUpdate, PostsDetails, ComentCreate.
  {
    path: '/postsupdate/:id',
    name: 'PostsUpdate',
    component: PostsUpdate,
  },
  {
    path: '/postdetails/:id',
    name: 'PostDetails',
    component: PostDetails,
  },
  {
    path: '/comentscreate',
    name: 'ComentsCreate',
    component: () => import('@/components/ComentsCreate.vue')
  },
  {
    path: '/comentslist/:id',
    name: 'ComentsList',
    component: () => import('@/components/ComentsList.vue')
  },

  //Fin routage gestion des posts

  //Routage du profile utilisateur
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/compte/:id/admin',
    name: 'Compte',
    component: Compte,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/profilupdate/:id',
    name: 'ProfilUpdate',
    component: ProfilUpdate,
  },
  {
    path: '/imgbottomupdate/:id',
    name: 'ImgBottomUpdate',
    component: ImgBottomUpdate,
  },
  {
    path: '/passwdupdate/:id',
    name: 'PasswdUpdate',
    component: PasswdUpdate,
  },
  //Fin routage profil utilisateur
  {
    path: '/:pathMatch(.*)*', component: NotFound
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
