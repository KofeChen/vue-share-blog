import Vue from 'vue'
import Router from 'vue-router'
/*
import Login from '@/pages/Login/template.vue'
import Index from '@/pages/Index/template.vue'
import Create from '@/pages/Create/template.vue'
import Detail from '@/pages/Detail/template.vue'
import Edit from '@/pages/Edit/template.vue'
import My from '@/pages/My/template.vue'
import Register from '@/pages/Register/template.vue'
import User from '@/pages/User/template.vue'
*/

import store from '@/store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Index/template.vue')
    },
    {
      path: '/Login',
      component: () => import('@/pages/Login/template.vue')
    },
    {
      path: '/Create',
      component: () => import('@/pages/Create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Detail/:blogId',
      component: () => import('@/pages/Detail/template.vue')
    },
    {
      path: '/Edit/:blogId',
      component: () => import('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/My',
      component: () => import('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Register',
      component: () => import('@/pages/Register/template.vue')
    },
    {
      path: '/User/:userId',
      component: () => import('@/pages/User/template.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  to.matched.some(record => console.log(record.meta.requiresAuth))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin => {
      if(!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})


export default router