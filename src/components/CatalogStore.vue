<template>
  <div class="shop">
    <div class="shop_basket">
      <router-link :to="{ name: 'cart', params: { itemsInCart: itemsInCart } }">
        <button class="shop_button">
          <span class="shop_cart">Cart</span>
          <span v-if="numberInCart">
            {{ numberInCart }}
          </span>
        </button>
      </router-link>
    </div>

    <h1 class="shop_title">Catalog</h1>

    <h2 v-if="isFetching && !hasErrors">Catalog is loading</h2>

    <div v-if="hasProducts" class="shop_cards">
      <catalog-store-items
        class="shop_card"
        :class="isActiveGood(product)"
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart(product)"
        @remove-from-cart="removeFromCart(product)"
      >
      </catalog-store-items>
    </div>

    <h2 v-else-if="!isFetching && hasErrors">
      Catalog is empty, try to reload page
    </h2>
  </div>
</template>

<script>
import CatalogStoreItems from './CatalogStoreItems.vue'
import axios from 'axios'

export default {
  components: { CatalogStoreItems },
  name: 'CatalogStore',
  data () {
    return {
      itemsInCart: [],
      products: [],
      isFetching: false,
      hasErrors: false
    }
  },
  created () {
    this.getCatalog()
  },
  computed: {
    hasProducts () {
      return this.products && this.products.length > 0
    },
    numberInCart () {
      let numberItemsInCart = 0
      this.itemsInCart.forEach(item => {
        numberItemsInCart += item.quantity
      })
      return numberItemsInCart
    }
  },
  methods: {
    getCatalog () {
      this.isFetching = true

      axios
        .get('http://localhost:3000/products')
        .catch(() => {
          this.hasErrors = true
        })
        .then(products => {
          this.products = products.data
          this.isFetching = false
        })
    },
    addToCart (product) {
      if (product.quantity === 0) {
        this.itemsInCart.push(product)
      }
      if (product.quantity < 99) {
        product.quantity += 1
      }
    },
    removeFromCart (product) {
      if (product.quantity > 0) {
        if (product.quantity === 1) {
          let items = [...this.itemsInCart]
          this.itemsInCart = items.filter(item => product.id !== item.id)
        }
        product.quantity -= 1
      }
    },
    isActiveGood (card) {
      return card.quantity > 0 ? 'active-good' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.shop_basket {
  display: flex;
  align-items: center;
  padding: 20px 20px 0 0;
  margin-bottom: 100px;
  justify-content: flex-end;
}

.shop_button {
  padding: 10px;
  margin-right: 10px;
  font-size: 20px;
}

.shop_title {
  display: flex;
  justify-content: center;
}

.shop_cards {
  display: flex;
  flex-wrap: wrap;
}

.shop_card {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  background-color: aliceblue;
  margin: 0 10px 20px;
}

.active-good {
  outline: 3px solid green;
  outline-offset: -3px;
}

.shop_cart {
  margin-right: 5px;
}
</style>
