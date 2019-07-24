import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import ArticleList from '../view/article/list.vue';
import LoginPage from '../login.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: '/login',
        component: LoginPage
      },
      {
        path: '/user',
        component: () => import('../view/user/index.vue')
      },
      {
        path: '/user/center',
        component: () => import('../view/user/center.vue')
      },
      {
        path: '/topic',
        component: () => import('../view/topic/index.vue')
      },
      {
        path: '/topic/:id',
        component: () => import('../view/topic/detail.vue')
      },
      {
        path: '/mine',
        component: () => import('../view/topic/mytopic.vue')
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/add',
        component: () => import('../view/write/index.vue')
      },
      {
        path: '/article/detail/:id',
        component: () => import('../view/article/detail.vue')
      },
      {
        path: '*', component: () => import('../view/notfound.vue')
      }
    ]
  });
}
