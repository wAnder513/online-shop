<template>
  <div>
    <div class="cart-store">
      <router-link :to="{ name: 'catalog' }">
        <button class="cart-store_catalog">Back to catalog</button>
      </router-link>
    </div>

    <order-confirmed v-if="isOrderConfirmed"
                     @close-alert="closeAlert">
    </order-confirmed>

    <div class="cart-store_content">
      <div v-if="hasItemsCart" class="cart-store_cards">
        <catalog-store-cart-items
          class="cart-store_card"
          v-for="product in getProductsInCart"
          :key="product.id"
          :product="product"
        >
        </catalog-store-cart-items>

        <catalog-store-cart-modal
          v-if="isModalSubmit"
          class="cart-store_modal modal-content"
          :modal-title="modalTitle"
          :right-btn-title="rightBtnTitle"
          @close-modal="closeModalSubmit"
          @get-confirmed-order="getConfirmedOrder"
        >
          <div
            class="modal-content_container"
            v-for="(product, index) in getProductsInCart"
            :key="`${product.id}-${index}`"
          >
            <div class="modal-content_title">{{ product.name }}:&nbsp;</div>

            <div class="modal-content_quantity">{{ product.quantity }} pc.</div>
          </div>

          <div class="modal-content_total">
            Total price: {{ totalPrice }} rub.
          </div>
        </catalog-store-cart-modal>
      </div>

      <div v-else class="cart-store_stopper">
        There are no goods in the cart yet
      </div>
    </div>

    <div class="cart-store_purchase">
      <button
        class="cart-store_button"
        :disabled="!hasItemsCart"
        @click="showModalSubmit"
      >
        Buy
        <span v-if="totalPrice > 0">{{ totalPrice }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CatalogStoreCartItems from './CatalogStoreCartItems.vue'
import CatalogStoreCartModal from './CatalogStoreCartModal.vue'
import OrderConfirmed from './alert/OrderConfirmed.vue'

export default {
  components: { 
    CatalogStoreCartItems,
    CatalogStoreCartModal,
    OrderConfirmed 
  },
  name: 'CatalogStoreCart',
  data () {
    return {
      isModalSubmit: false,
      isOrderConfirmed: false,
    }
  },
  computed: {
    ...mapGetters([
      'getProductsInCart'
    ]),
    modalTitle () {
      return 'Order confirmation'
    },
    rightBtnTitle () {
      return 'Buy'
    },
    hasItemsCart () {
      return this.getProductsInCart && this.getProductsInCart.length > 0
    },
    totalPrice () {
      let totalPrice = 0

      if (this.hasItemsCart) {
        this.getProductsInCart.forEach(item => {
          let finalyRuslult = item.quantity * item.price
          totalPrice += finalyRuslult
        })
      }

      return totalPrice
    }
  },
  methods: {
    showModalSubmit () {
      this.isModalSubmit = true
    },
    closeModalSubmit () {
      this.isModalSubmit = false
    },
    getConfirmedOrder() {
      this.isOrderConfirmed = true

      this.setTimeoutalertConfirmedOrder() 
    },
    setTimeoutalertConfirmedOrder() {
      setTimeout(() => {
        this.isOrderConfirmed = false
      }, 3000)
    },
    closeAlert() {
       this.isOrderConfirmed = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-store {
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  justify-content: flex-end;
  padding: 20px 20px 20px 0;
  z-index: 10;
  margin-bottom: 40px;
  background-color: #ccf1f1;
}

.cart-store_catalog {
  padding: 10px;
  margin-right: 10px;
}

.cart-store_cards {
margin: 100px 0 40px;

  margin-bottom: 10px;
  border: 1px solid black;
}

.cart-store_card {
  display: flex;
  margin-bottom: 15px;
  padding: 10px 15px 15px;
}

.cart-store_purchase {
  display: flex;
  justify-content: center;
}

.cart-store_button {
  width: 150px;
  font-size: 20px;
  padding: 10px;
  color: #ffffff;
  background-color: rgb(7, 234, 7);
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: rgb(7, 169, 7);

    &:disabled {
      cursor: not-allowed;
      background-color: rgb(62, 62, 62);
    }
  }

  &:disabled {
    background-color: rgb(76, 76, 76);
  }
}

.modal-content_container {
  display: flex;
}

.cart-store_stopper {
  display: flex;
  justify-content: center;
}

.modal-content_title,
.modal-content_total,
.modal-content_quantity {
  margin-bottom: 10px;
}

.cart-store_stopper {
  font-size: 28px;
}

.cart-store_content {
  margin: 100px 0 40px;
}

.cart-store_modal {
  z-index: 999;
}
</style>
