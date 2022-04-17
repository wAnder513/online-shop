<template>
  <div class="cart-store">
    <img
      class="cart-store_picture"
      :src="require('../assets/img/' + product.picture)"
      alt="picture"
    />
    <div class="cart-store_content">
      <div class="cart-store_title">
        {{ product.name }}
      </div>

      <div class="cart-store_description">
        {{ product.description }}
      </div>

      <div class="cart-store_metrics">
        <div>Number of things: {{ product.quantity }}</div>
        <div>Price: {{ product.price }} rub.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    product: Object
  }
}
</script>

<style lang="scss" scoped>
.cart-store_modal {
  font-size: 24px;
}

.cart-store_description {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  margin-bottom: 10px;
}

.cart-store_title {
  font-size: 28px;
  margin-bottom: 15px;
}

.cart-store_picture {
  width: 280px;
  height: 180px;
  margin-right: 15px;
  flex-shrink: 0;
}

.cart-store_metrics {
  font-size: 28px;
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
</style>
