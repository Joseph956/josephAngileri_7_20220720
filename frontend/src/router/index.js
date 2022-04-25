import { createRouter, createWebHistory } from 'vue-router';
window.axios = require('axios');
import Accueil from '@/views/Accueil.vue';
import Profile from '@/views/Profile.vue';
import Posts from '@/views/Posts.vue';
import PostDetails from '@/views/PostDetails.vue';
import PostsUpdate from '@/components/PostsUpdate.vue';
import PostCardRecent from '@/components/PostCardRecent.vue';

const routes = [
  {
    //Cette route gère la création des comptes utilisateur,
    //et les login sur les comptes créés.
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/comentscreate',
    name: 'ComentsCreate',
    component: () => import('@/components/ComentsCreate.vue')
  },
  {
    path: '/postcardrecent',
    name: 'PostCardRecent',
    component: PostCardRecent,
  },
  {
    path: '/postsupdate',
    name: 'PostsUpdate',
    component: PostsUpdate,
  },
  {
    path: '/postdetails',
    name: 'PostDetails',
    component: PostDetails,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
