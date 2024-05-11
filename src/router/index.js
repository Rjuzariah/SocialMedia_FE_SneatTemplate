import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/post' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'post',
          name: 'Post',
          component: () => import('../pages/post.vue'),
        },
        {
          path: 'account-settings',
          name: 'Account Settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'list-user',
          name: 'List User',
          component: () => import('../pages/list-user.vue'),
        },
        {
          path: 'create-user',
          name: 'Create User',
          component: () => import('../pages/create-edit-user.vue'),
          props: {
            contextType:"create"
          },
        },
        {
          path: 'edit-user/:userId',
          name: 'Edit User',
          component: () => import('../pages/create-edit-user.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
