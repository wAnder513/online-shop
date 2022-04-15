import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogStore from '../components/CatalogStore'
import CatalogStoreBasket from '../components/CatalogStoreBasket'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView,
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
//   },
// ]

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogStore,
    props: true,
  },
  {
    path: '/basket',
    name: 'basket',
    component: CatalogStoreBasket,
    props: true,
  },
]

const router = new VueRouter({
  routes,
})

export default router
