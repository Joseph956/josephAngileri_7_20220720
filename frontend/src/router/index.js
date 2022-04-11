import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import Profile from '@/views/Profile.vue';
import Posts from '@/views/Posts.vue';
import PostDetails from '@/views/PostDetails.vue';
// import PostsCreate from '@/components/PostsCreate.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  // {
  //   path: '/posts',
  //   name: 'PostsCreate',
  //   component: () => import('@/components/PostsCreate.vue')
  // },
  // {
  //   path: '/posts',
  //   name: 'Posts',
  //   component: Posts,
  // },
  {
    path: '/posts/:id',
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
