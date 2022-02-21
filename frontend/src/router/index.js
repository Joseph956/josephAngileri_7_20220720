import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import Profile from '@/views/Profile.vue';
import Posts from '@/views/Posts.vue';
import Blog from '@/views/Blog.vue';
import NavSignUp from '@/components/NavSignUp.vue';

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
    name: 'blog',
    path: '/blog',
    component: Blog,
  },
  {
    name: 'posts',
    path: '/posts',
    component: Posts,
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
  },
  {
    name: 'NavSignUp',
    path: '/navsignup',
    component: NavSignUp
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
