<template>
  <div class="alert-order" ref="order" tabindex="-1">
    <div class="alert-order_container">
      <div class="alert-order_text"> 
        Your order has been confirmed and&nbsp;is awaiting shipment
      </div>

      <i class="material-icons icon">check_circle</i>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.addEventListener('click', (item) => {
      if (item.target === this.$refs['order']) {
        this.$emit('close-alert')
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.alert-order {
  background: rgba(64, 64, 64, 0.4);
  position: fixed;   
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.alert-order_container {
  width: 400px;
  height: 100px;
  padding: 20px;
  display: flex;
  top: 50px;
  background: chartreuse;
  border: 5px solid grey;
  border-radius: 5px;
  align-items: center;
}

.alert-order_text {
  color: #fff;
  font-size: 24px;
  margin-right: 10px;
}

.icon {
  color: #fff;
  font-size: 40px;
}

</style>