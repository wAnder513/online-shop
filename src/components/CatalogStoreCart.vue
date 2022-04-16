<template>
  <div>
    <div class="cart-store">
      <router-link :to="{ name: 'catalog' }">
        <button class="cart-store_catalog">Back to catalog</button>
      </router-link>
    </div>

    <div v-if="hasItemsCart" class="cart-store_cards">
      <div class="cart-store_card" v-for="item in itemsInCart" :key="item.id">
        <img class="cart-store_picture" :src="item.picture" />
        <div class="cart-store_content">
          <div class="cart-store_title">
            {{ item.name }}
          </div>

          <div class="cart-store_description">
            {{ item.description }}
          </div>

          <div class="cart-store_metrics">
            <div>Number of things: {{ item.quantity }}</div>
            <div>Price: {{ item.price }} rub.</div>
          </div>
        </div>

        <catalog-store-cart-modal
          v-if="isModalSubmit"
          class="cart-store_modal modal-content"
          :modal-title="modalTitle"
          :right-btn-title="rightBtnTitle"
          @close-modal="closeModalSubmit"
        >
          <div
            class="modal-content_container"
            v-for="(itemCart, index) in itemsInCart"
            :key="`${itemCart.id}-${index}`"
          >
            <div class="modal-content_title">{{ itemCart.name }}:&nbsp;</div>

            <div class="modal-content_quantity">
              {{ itemCart.quantity }} pc.
            </div>
          </div>

          <div class="modal-content_total">
            Total price: {{ totalPrice }} rub.
          </div>
        </catalog-store-cart-modal>
      </div>
    </div>

    <div class="cart-store_stopper" v-else>
      There are no goods in the cart yet
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
import CatalogStoreCartModal from './CatalogStoreCartModal.vue'

export default {
  components: { CatalogStoreCartModal },
  name: 'CatalogStoreCart',
  props: {
    itemsInCart: Array
  },
  data () {
    return {
      isModalSubmit: false
    }
  },
  computed: {
    modalTitle () {
      return 'Order confirmation'
    },
    rightBtnTitle () {
      return 'Buy'
    },
    hasItemsCart () {
      return this.itemsInCart && this.itemsInCart.length > 0
    },
    totalPrice () {
      let totalPrice = 0

      if (this.hasItemsCart) {
        this.itemsInCart.forEach(item => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-store {
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 0;
  margin-bottom: 100px;
}

.cart-store_catalog {
  padding: 10px;
}

.cart-store_modal {
  font-size: 24px;
}

.cart-store_cards {
  margin-bottom: 10px;
  border: 1px solid black;
}

.cart-store_card {
  display: flex;
  margin-bottom: 15px;
  padding: 10px 15px 15px;
}

.cart-store_title {
  margin-bottom: 15px;
}

.cart-store_description {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
}

.cart-store_purchase {
  display: flex;
  justify-content: center;
}

.cart-store_picture {
  width: 280px;
  height: 180px;
  margin-right: 15px;
  flex-shrink: 0;
}

.cart-store_metrics {
  display: flex;
  justify-content: space-between;
}

.cart-store_content {
  font-size: 20px;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.cart-store_button {
  width: 150px;
  font-size: 20px;
  padding: 10px;
  color: #ffffff;
  background-color: rgb(7, 234, 7);

  &:hover {
    background-color: rgb(7, 169, 7);

    &:disabled {
      cursor: auto;
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
  margin-bottom: 30px;
}

.modal-content_title,
.modal-content_total,
.modal-content_quantity,
.cart-store_description {
  margin-bottom: 10px;
}

.cart-store_title,
.cart-store_metrics,
.cart-store_stopper {
  font-size: 28px;
}
</style>
