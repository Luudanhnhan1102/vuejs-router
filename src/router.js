import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'vue-school-active-class',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },

    {
      path: '/destination/:slug',
      name: 'DestinationDetails',
      props: true,
      component: () =>
        import(/* webpackChunkName: "DestinationDetails"*/ './views/DestinationDetails'),
      children: [
        {
          path: ':experienceSlug',
          name: 'experienceDetails',
          props: true,
          component: () =>
            import(/* webpackChunkName: "ExperienceDetails"*/ './views/ExperienceDetails')
        }
      ],
      beforeEnter: (to, from, next) => {
        const exists = store.destinations.find(destination => {
          console.log('to.params:', to)

          return destination.slug === to.params.slug
        })
        console.log('exists:', exists)
        if (exists) {
          next()
        } else {
          next({ name: 'notFound' })
        }
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "User" */ './views/User.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "Login" */
          './views/Login.vue'
        )
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import(/* webpackChunkName: "Invoices" */ './views/Invoices')
    },
    {
      path: '/404',
      alias: '*',
      name: 'notFound',
      component: () =>
        import(
          /* webpackChunkName: "NotFound" */
          './views/NotFound'
        )
    }
  ]
})
export default router
