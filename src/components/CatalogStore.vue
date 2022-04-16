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

    <div v-if="hasProducts" class="shop_cards">
      <div
        class="shop_card"
        :class="isActiveGood(card)"
        v-for="card in products"
        :key="card.id"
      >
        <img class="shop_picture" :src="card.picture" />

        <div class="shop_container">
          <div class="shop_name">
            {{ card.name }}
          </div>

          <div class="shop_description">
            {{ card.description }}
          </div>

          <div class="shop_metrics">
            <div>Quantity in cart: {{ card.quantity }}</div>
            <div>Price: {{ card.price }} rub.</div>
          </div>

          <div class="shop_buttons shop_btn">
            <button class="shop_btn-add" @click="addToCart(card)">
              Add to cart
            </button>

            <button class="shop_btn-delete" @click="removeFromCart(card)">
              Delete to cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      Catalog is empty
    </div>
  </div>
</template>

<script>
import { products } from '../data'

export default {
  components: {},
  name: 'CatalogStore',
  data () {
    return {
      itemsInCart: [],
      products: products
    }
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
    addToCart (card) {
      if (card.quantity === 0) {
        this.itemsInCart.push(card)
      }
      if (card.quantity < 99) {
        card.quantity += 1
      }
    },
    removeFromCart (cart) {
      if (cart.quantity > 0) {
        if (cart.quantity === 1) {
          let items = [...this.itemsInCart]
          this.itemsInCart = items.filter(item => cart.id !== item.id)
        }
        cart.quantity -= 1
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

.shop_container {
  padding: 10px 10px 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
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

.shop_picture {
  width: 100%;
  height: 180px;
  flex-shrink: 0;
  margin-bottom: 10px;
}

.shop_metrics {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
}

.shop_name,
.shop_description {
  margin-bottom: 10px;
}

.shop_buttons {
  display: flex;
  justify-content: space-between;
}

.shop_btn-add,
.shop_btn-delete {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.shop_btn-add {
  background-color: green;

  &:hover,
  &:focus {
    background-color: rgb(2, 88, 2);
  }
}

.shop_btn-delete {
  background-color: darkRed;

  &:hover,
  &:focus {
    background-color: rgb(107, 1, 1);
  }
}

.active-good {
  outline: 3px solid green;
  outline-offset: -3px;
}

.shop_cart {
  margin-right: 5px;
}
</style>
