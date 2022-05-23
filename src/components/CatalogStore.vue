<template>
  <div class="shop">
    <div class="shop_basket">
      <router-link :to="{ name: 'cart'}">
        <button class="shop_button">
          <span class="shop_cart">Cart</span>
          <span v-if="numberInCart">
            {{ numberInCart }}
          </span>
        </button>
      </router-link>
    </div>

    <h1 class="shop_title">Catalog</h1>

    <h2 v-if="getFetching">Catalog is loading</h2>

    <div v-if="hasProducts" class="shop_cards">
      <catalog-store-items
        class="shop_card"
        :class="isActiveGood(product)"
        v-for="product in getProducts"
        :key="product.id"
        :product="product"
      >
      </catalog-store-items>
    </div>

    <h2 v-else-if="!hasProducts && getServerErrors">
      Catalog is empty, try to reload page
    </h2>
  </div>
</template>

<script>
import CatalogStoreItems from './CatalogStoreItems.vue'
import { mapGetters } from 'vuex'

export default {
  components: { CatalogStoreItems },
  name: 'CatalogStore',
  data () {
    return {
      isFetching: false,
    }
  },
  mounted() {
    // window.addEventListener('scroll', function() {
    //   let header = document.querySelector('.shop_basket')
    //   let posTop = window.pageYOffset;

    //   if (posTop !== 0) {
    //     header.style.opacity = 0.5
    //   } else {
    //     header.style.opacity = 1
    //   }
    // });
  },
  computed: {
    ...mapGetters([
      'getProducts',
      'getServerErrors',
      'getFetching',
      'getProductsInCart',
    ]),
    hasProducts () {
      return this.getProducts && this.getProducts.length > 0
    },
    numberInCart () {
      let productInCart = 0
      this.getProductsInCart.forEach((product) => {
        productInCart += product.quantity
      })
      return productInCart
    },
  },
  methods: {
    isActiveGood (card) {
      return card.quantity > 0 ? 'active-good' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.shop_basket {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 0;
  justify-content: flex-end;
  z-index: 999;
  background-color: #ccf1f1;
  width: 100%;
}

.shop_button {
  padding: 10px;
  margin-right: 10px;
  font-size: 20px;
}

.shop_title {
  display: flex;
  justify-content: center;
  margin: 100px 0 40px;
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
