<template>
  <div id="app" class="shop_wrapper">
    <nav></nav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped language="scss">
* {
  box-sizing: border-box;
  font-weight: normal;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  font-size: 14px;
}

.shop_wrapper {
  width: 900px;
  background-color: aquamarine;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 20px;
}
</style>
