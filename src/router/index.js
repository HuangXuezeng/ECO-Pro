import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/complaintIndex'
    },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: () => import('@/views/index/index'),
    //   meta: { keepAlive: true }
    // },
    // {
    //   path: '/past',
    //   name: 'past',
    //   component: () => import('@/views/past/past')
    // },
    // {
    //   path: '/pastMag',
    //   name: 'pastMag',
    //   component: () => import('@/views/past/pastMag/pastMag')
    // },
    // {
    //   path: '/me',
    //   name: 'me',
    //   component: () => import('@/views/me/me')
    // },
    // {
    //   path: '/avatar',
    //   name: 'avatar',
    //   component: () => import('@/views/me/avatar/avatar')
    // },
    // {
    //   path: '/name',
    //   name: 'name',
    //   component: () => import('@/views/me/name/name')
    // },
    // {
    //   path: '/info',
    //   name: 'news',
    //   component: () => import('@/views/news/news')
    // },
    {
      path:'/complaintIndex',
      name:'complaintIndex',
      component: () => import('@/views/complaintIndex/complaintIndex')
    },
    {
      path:'/complaintsNotice',
      name:'complaintsNotice',
      component: () => import('@/views/complaintsNotice/complaintsNotice')
    },
    {
      path:'/complaintsEdit',
      name:'complaintsEdit',
      component: () => import('@/views/complaintsEdit/complaintsEdit')
    },
    {
      path:'/complaintCase',
      name:'complaintCase',
      component: () => import('@/views/complaintCase/complaintCase')
    },
    {
      path:'/complaintsEmail',
      name:'complaintsEmail',
      component: () => import('@/views/complaintsEmail/complaintsEmail')
    },
    {
      path:'/caseInfo',
      name:'caseInfo',
      component: () => import('@/views/complaintCase/caseInfo')
    },
  ]
})
