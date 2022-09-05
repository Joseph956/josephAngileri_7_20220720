import { createRouter, createWebHistory } from 'vue-router';
window.axios = require('axios');

import Accueil from '@/views/Accueil.vue';
import Profile from '@/views/Profile.vue';
import Users from '@/views/Users.vue';
import Posts from '@/views/Posts.vue';
import PostDetails from '@/views/PostDetails.vue';
import PostsUpdate from '@/components/PostsUpdate.vue';
import ProfilUpdate from '@/components/ProfilUpdate.vue';
import ImgBottomUpdate from '@/components/ImgBottomUpdate.vue';
import PasswdUpdate from '@/components/PasswdUpdate.vue';
import NotFound from '@/views/NotFound.vue';

import ProfileUsers from '@/views/ProfileUsers.vue';

import Reset from '@/components/Reset.vue';
import Forgot from '@/components/Forgot.vue';


const routes = [
  //Cette route gère la création des comptes utilisateur,
  //et les login sur les comptes créés.
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
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
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
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
  //Routage du profile utilisateur
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/profileusers/:id',
    name: 'ProfileUsers',
    component: ProfileUsers,
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
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
