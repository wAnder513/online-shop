<template>
  <div class="cart-item">
    <img
      class="cart-item_picture"
      :src="require('../assets/img/' + product.picture)"
      alt="picture"
    />
    <div class="cart-item_content">
      <div class="cart-item_title">
        {{ product.name }}
      </div>

      <div class="cart-item_description">
        {{ product.description }}
      </div>

      <div class="cart-item_metrics">
        <div>Number of things: {{ product.quantity }}</div>
        <div>Price: {{ productsPrice }} rub.</div>
      </div>
    </div>

    <i class="material-icons icon" @click="deleteProduct">
      delete
    </i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    product: Object
  },
  computed: {
    productsPrice() {
      return this.product.price * this.product.quantity  
    }
  },
  methods: {
    ...mapActions([
      'deleteAllProductsOneCategory',
    ]), 
    deleteProduct() {
      this.deleteAllProductsOneCategory(this.product);
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-item_modal {
  font-size: 24px;
}

.cart-item_description {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  margin-bottom: 10px;
}

.cart-item_title {
  font-size: 28px;
  margin-bottom: 15px;
}

.cart-item_picture {
  width: 280px;
  height: 180px;
  margin-right: 15px;
  flex-shrink: 0;
}

.cart-item_metrics {
  font-size: 28px;
  display: flex;
  justify-content: space-between;
}

.cart-item_content {
  font-size: 20px;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.icon {
  cursor: pointer;
}
</style>
