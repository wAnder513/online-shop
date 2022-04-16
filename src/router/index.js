import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: () => import('../components/CatalogStore'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/CatalogStoreCart'),
    props: true,
  },
]

const router = new VueRouter({
  routes,
})

export default router
