import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import Profile from '@/views/Profile.vue';
import Posts from '@/views/Posts.vue';
import Blog from '@/views/Blog.vue';
import Coments from '@/components/Coments.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/coments',
    name: 'Coments',
    component: Coments,
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
