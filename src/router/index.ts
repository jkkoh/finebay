import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { items }  from '@/assets/items'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {requiresGuest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {requiresGuest: true}
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/auth/PaymentView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: () => import('../views/ItemPage.vue'),
      beforeEnter: (to, _, next) => {
        const { id } = to.params
  
        if (Array.isArray(id)){
          next ({ path: 'error'})
          return
        }
        // Is a valid index number
        const index = parseInt(id)
        if (index < 0 || index >= items.length) {
          next({ path: '/error'})
          return
        }
  
        next()
      }
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import('../components/Buy.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'PageNotFound',
        component: () => import('../views/PageNotFound.vue')
    },
    {
      path: '/swimwearAll',
      name: 'swimwearAll',
      component: () => import('../views/SwimwearAll.vue')
    },
    {
      path: '/swimwearTop',
      name: 'swimwearTop',
      component: () => import('../views/SwimwearTop.vue')
    },
    {
      path: '/swimwearBot',
      name: 'swimwearBot',
      component: () => import('../views/SwimwearBot.vue')
    },
    {
      path: '/swimwearMono',
      name: 'swimwearMono',
      component: () => import('../views/SwimwearMono.vue')
    },
    {
      path: '/beachwearAll',
      name: 'beachwearAll',
      component: () => import('../views/BeachwearAll.vue')
    },
    {
      path: '/beachwearTop',
      name: 'beachwearTop',
      component: () => import('../views/BeachwearTop.vue')
    },
    {
      path: '/beachwearBot',
      name: 'beachwearBot',
      component: () => import('../views/BeachwearBot.vue')
    },
    {
      path: '/sizeGuide',
      name: 'sizeGuide',
      component: () => import('../views/SizeGuide.vue')
    },
    {
      path: '/deliveryGuide',
      name: 'deliveryGuide',
      component: () => import('../views/DeliveryGuide.vue')
    },
    {
      path: '/aboutBrand',
      name: '/aboutBrand',
      component: () => import ('../views/AboutBrand.vue')
    },
    {
      path: '/cart',
      name: '/cart',
      component: () => import('../components/Cart.vue')
    }
  ]
})

router.beforeResolve(async (to, from, next)=>{
  const authStore = useAuthStore()

  if(to.meta.requiresAuth && !authStore.isAuthenticated){   
    return next({name: 'login', query: {redirect: to.fullPath}})
  }else if(to.meta.requiresGuest && authStore.isAuthenticated){
    return next({name: 'home'})
  }else{
    return next()
  }
})

export default router