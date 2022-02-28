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
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/navsignup',
    name: 'NavSignUp',
    component: NavSignUp
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
