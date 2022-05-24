import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productsInCart: [],
    visibleProducts: [],
    searchCatalog: '',
    hasServerErrors: false,
    isFetching: false,
  },
  getters: {
    getProducts(state) {
      return state.products
    },
    getProductsInCart(state) {
      return state.productsInCart
    },
    getSearchCatalog(state) {
      return state.searchCatalog
    },
    getServerErrors(state) {
      return state.hasServerErrors
    },
    getFetching(state) {
      return state.isFetching
    },
    getVisibleProducts(state) {
      return state.visibleProducts
    }
  },
  mutations: {
    SET_REACTION(state, products) {
      state.products = products
      state.visibleProducts = products
    },
    ADD_TO_CART(state, product) {
      if( product.quantity === 0) {
        state.productsInCart.push(product)
      }
      product.quantity += 1
    },
    ADD_VISIBALE_PRODUCTS(state, product) {
      state.visibleProducts.push(product) 
    },
    DELETE_TO_CART(state, product) {
      if(product.quantity > 0) {
      product.quantity -= 1
      }
      state.productsInCart = state.productsInCart.filter((prod) => prod.id !== product.id) 
    },
    SET_ERROR(state) {
      state.hasServerErrors = true
    },
    SET_FETCHING(state) {
      state.isFetching = !state.isFetching
    },
    SET_SEARCH(state, value) {
      state.searchCatalog = value
    },
    CLEAR_VISIBLE_PRODUCTS(state) {
      state.visibleProducts = []
    },
    RELOAD_PAGE(state) {
      state.visibleProducts = state.products
      state.searchCatalog = ''
    }
  },
  actions: {
    loadReactions({commit}) {
        commit('SET_FETCHING') 

        axios
        .get('http://localhost:3000/products')
        .catch(() => commit('SET_ERROR'))
        .then(res => commit('SET_REACTION', res.data))
        .finally(() => commit('SET_FETCHING'))
    },
    addToCart({commit}, product) {
      commit('ADD_TO_CART', product)
    },
    deleteToCart({commit}, product) {
      commit('DELETE_TO_CART', product)
    },
    setSearch({commit}, value) {
      commit('SET_SEARCH', value)
    },
    addVisibaleProducts({commit}, product) {
      commit('ADD_VISIBALE_PRODUCTS', product)
    },
    clearVisibalProducts({commit}) {
      commit('CLEAR_VISIBLE_PRODUCTS')
    },
    reloadPage({commit}) {
      commit('RELOAD_PAGE')
    }
  },
  modules: {
  }
})