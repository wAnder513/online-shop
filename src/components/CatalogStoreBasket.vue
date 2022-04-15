<template>
  <div>
    <div class="basket-store">
      <router-link :to="{ name: 'catalog' }">
        <button>Back to catalog</button>
      </router-link>
    </div>

    <div v-if="hasItemsCart" class="basket-store_cards">
      <div class="basket-store_card" v-for="item in itemsInCart" :key="item.id">
        <img class="basket-store_picture" :src="item.name" />
        <div class="basket-store_content">
          <div class="basket-store_title">
            {{ item.name }}
          </div>

          <div class="basket-store_description">
            {{ item.description }}
          </div>

          <div class="basket-store_metrics">
            <div>Number of things: {{ item.quantity }}</div>
            <div>Price: {{ item.price }} rub.</div>
          </div>
        </div>

        <catalog-store-basket-modal
          v-if="isModalSubmit"
          class="basket-store_modal modal-content"
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

          <div class="modal-content_total">Total price: {{ totalPrice }}</div>
        </catalog-store-basket-modal>
      </div>
    </div>
    <div class="basket-store_purchase">
      <button
        class="basket-store_button"
        :disabled="!hasItemsCart"
        @click="showModalSubmit"
      >
        Buy
      </button>
    </div>
  </div>
</template>

<script>
import CatalogStoreBasketModal from './CatalogStoreBasketModal.vue'

export default {
  components: { CatalogStoreBasketModal },
  name: 'CatalogStoreBasket',
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
      return 'Confirmation of purchase'
    },
    rightBtnTitle () {
      return 'Buy'
    },
    hasItemsInCart () {
      return this.itemsInCart && this.itemsInCart.length > 0
    },
    hasItemsCart () {
      return this.itemsInCart && this.itemsInCart.length > 0
    },
    totalPrice () {
      let totalPrice = 0

      this.itemsInCart.forEach(item => {
        let finalyRuslult = item.quantity * item.price
        totalPrice += finalyRuslult
      })

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

<style scoped>
.basket-store {
  margin-left: auto;
  padding: 20px 20px 0 0;
  margin-bottom: 100px;
}

.basket-store_modal {
  font-size: 24px;
}

.basket-store_cards {
  margin-bottom: 10px;
  border: 1px solid black;
}

.basket-store_title {
  font-size: 28px;
  margin-bottom: 15px;
}

.basket-store_description {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  margin-bottom: 10px;
}

.basket-store_purchase {
  display: flex;
  justify-content: center;
}

.basket-store_picture {
  flex-shrink: 0;
  width: 150px;
  height: 200px;
  margin-bottom: -15px;
}

.basket-store_card {
  display: flex;
  margin-bottom: 15px;
}

.basket-store_metrics {
  display: flex;
  font-size: 28px;
  justify-content: space-between;
}

.basket-store_content {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 15px;
  font-size: 20px;
  text-align: center;
}

.basket-store_button:disabled {
  background-color: rgb(76, 76, 76);
}

.basket-store_button:hover:disabled {
  cursor: auto;
  background-color: rgb(62, 62, 62);
}

.basket-store_button {
  width: 150px;
  font-size: 20px;
  padding: 10px;
  color: #ffffff;
  background-color: rgb(7, 234, 7);
  cursor: pointer;
}

.basket-store_button:hover {
  background-color: rgb(7, 169, 7);
}

.modal-content_container {
  display: flex;
}

.modal-content_title,
.modal-content_quantity,
.modal-content_total {
  margin-bottom: 10px;
}
</style>
