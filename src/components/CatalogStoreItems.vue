<template>
  <div>
    <img
      class="shop_picture"
      :src="require('../assets/img/' + product.picture)"
    />

    <div class="shop_container">
      <div class="shop_name">
        {{ product.name }}
      </div>

      <div class="shop_description">
        {{ product.description }}
      </div>

      <div class="shop_metrics">
        <div>Quantity in cart:&nbsp;{{ product.quantity }}</div>
        <div>Price: {{ product.price }}&nbsp;rub.</div>
      </div>

      <div class="shop_buttons shop_btn">
        <button class="shop_btn-add" @click="addToCartStore">
          Add to cart
        </button>

        <button class="shop_btn-delete" @click="removeToCartStore">
          Delete to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: {
    product: Object
  },  
  methods: {
    ...mapActions ([
      'addToCart',
      'deleteToCart'
    ]),
    addToCartStore () {
      this.addToCart(this.product)
      this.$emit('create-notification', this.product)
    },
    removeToCartStore () {
      this.deleteToCart(this.product)
    },
  }
}
</script>

<style lang="scss" scoped>
.shop_container {
  padding: 10px 10px 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.shop_picture {
  width: 265px;
  height: 190px;
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

.shop_description {
  font-size: 15px;
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
</style>
