<template>
  <div>
    <div class="shop_basket">
      <router-link
        :to="{ name: 'basket', params: { itemsInCart: itemsInCart } }"
      >
        <button class="shop_basket-button">
          <span class="shop_basket-cart">Cart</span>
          <span v-if="numberInCart" class="shop_basket-counter">
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
</template>

<script>
export default {
  components: {},
  name: 'CatalogStore',
  data () {
    return {
      itemsInCart: [],
      products: [
        {
          id: 1,
          name: 'Product 1',
          picture:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fironbymironova.com%2Fcatalog%2Fverkhnyaya_odezhda%2F&psig=AOvVaw1pcCjnvVPMQ5yiWdDujjio&ust=1649861713053000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPC8iYDkjvcCFQAAAAAdAAAAABAQ',
          description: 'This is an incredibly awesome product',
          price: 2350,
          quantity: 0
        },
        {
          id: 2,
          name: 'Product 2',
          picture:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fironbymironova.com%2Fcatalog%2Fverkhnyaya_odezhda%2F&psig=AOvVaw1pcCjnvVPMQ5yiWdDujjio&ust=1649861713053000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPC8iYDkjvcCFQAAAAAdAAAAABAQ',
          description: 'This is an incredibly awesome product',
          price: 2300,
          quantity: 0
        },
        {
          id: 3,
          name: 'Product 3',
          picture:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fironbymironova.com%2Fcatalog%2Fverkhnyaya_odezhda%2F&psig=AOvVaw1pcCjnvVPMQ5yiWdDujjio&ust=1649861713053000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPC8iYDkjvcCFQAAAAAdAAAAABAQ',
          description: 'This is an incredibly awesome product',
          price: 1000,
          quantity: 0
        },
        {
          id: 4,
          name: 'Product 4',
          picture:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fironbymironova.com%2Fcatalog%2Fverkhnyaya_odezhda%2F&psig=AOvVaw1pcCjnvVPMQ5yiWdDujjio&ust=1649861713053000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPC8iYDkjvcCFQAAAAAdAAAAABAQ',
          description: 'This is an incredibly awesome product',
          price: 250,
          quantity: 0
        },
        {
          id: 5,
          name: 'Product 5',
          picture:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fironbymironova.com%2Fcatalog%2Fverkhnyaya_odezhda%2F&psig=AOvVaw1pcCjnvVPMQ5yiWdDujjio&ust=1649861713053000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPC8iYDkjvcCFQAAAAAdAAAAABAQ',
          description: 'This is an incredibly awesome product',
          price: 5500,
          quantity: 0
        },
        {
          id: 6,
          name: 'Product 6',
          picture:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fironbymironova.com%2Fcatalog%2Fverkhnyaya_odezhda%2F&psig=AOvVaw1pcCjnvVPMQ5yiWdDujjio&ust=1649861713053000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPC8iYDkjvcCFQAAAAAdAAAAABAQ',
          description: 'This is an incredibly awesome product',
          price: 3800,
          quantity: 0
        }
      ]
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

<style scoped>
.shop_basket {
  display: flex;
  align-items: center;
  padding: 20px 20px 0 0;
  margin-bottom: 100px;
  justify-content: flex-end;
}

.shop_basket-button {
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
  justify-content: center;
  min-height: 100%;
}

.shop_card {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  background-color: aliceblue;
  margin: 20px 10px 0 0;
  padding: 10px;
}

/* .shop_card:not(nth-child(3)) {
} */

.shop_picture {
  width: calc(100% + 10px);
  height: 150px;
  flex-shrink: 0;
  margin: -10px -10px 0;
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
  cursor: pointer;
}

.shop_btn-add {
  background-color: green;
}

.shop_btn-add:hover {
  background-color: rgb(2, 88, 2);
}

.shop_btn-delete {
  background-color: darkRed;
}

.shop_btn-delete:hover {
  background-color: rgb(107, 1, 1);
}

.active-good {
  outline: 3px solid green;
  outline-offset: -3px;
}

.shop_basket-cart {
  margin-right: 5px;
}
</style>
