<template>
  <div class="shop">
    <div class="shop_basket">
      <router-link
        :to="{ name: 'cart' }"
      >
        <button class="shop_button" @click="changePage">
          <span class="shop_cart">Cart</span>
          <span v-if="numberInCart">
            {{ numberInCart }}
          </span>
        </button>
      </router-link>
    </div>

    <catalog-store-notifications 
      :messages="messages" 
      :type-alert="typeAlert"
    >
    </catalog-store-notifications>

    <h1 class="shop_title">Catalog</h1>

    <div class="shop_search">
      <input
        class="shop_input"
        :value="getSearchCatalog"
        @keyup.enter="setSearchValue"
        @change="getSearchValue"
      />
      <button class="shop_loupe" @click="setSearchValue">search</button>
    </div>

    <h2 v-if="getFetching">Catalog is loading</h2>

    <div v-if="hasProducts" class="shop_cards">
      <catalog-store-items
        class="shop_card"
        :class="activeGood(product)"
        v-for="product in getVisibleProducts"
        :key="product.id"
        :product="product"
        @create-notification="createNotification"
      >
      </catalog-store-items>
    </div>

    <h2 v-else-if="!hasProducts && getServerErrors">
      Catalog is empty, try to reload page
    </h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CatalogStoreItems from "./CatalogStoreItems.vue";
import CatalogStoreNotifications from "./CatalogStoreNotifications.vue";

export default {
  components: {
    CatalogStoreItems,
    CatalogStoreNotifications,
  },
  name: "CatalogStore",
  data() {
    return {
      messages: [],
      typeAlert: "check_circle",
    };
  },
  mounted() {
    // window.addEventListener('scroll', function() {
    //   let header = document.querySelector('.shop_basket')
    //   let posTop = window.pageYOffset;
    //   if (posTop !== 0) {
    //     header.style.opacity = 0.5
    //   } else {
    //     header.style.opacity = 1
    //   }
    // });
  },
  computed: {
    ...mapGetters([
      "getProducts",
      "getServerErrors",
      "getFetching",
      "getProductsInCart",
      "getSearchCatalog",
      "getVisibleProducts",
    ]),
    hasProducts() {
      return this.getVisibleProducts && this.getVisibleProducts.length > 0;
    },
    numberInCart() {
      let productInCart = 0;
      this.getProductsInCart.forEach((product) => {
        productInCart += product.quantity;
      });
      return productInCart;
    },
  },
  methods: {
    ...mapActions([
      "setSearch",
      "addVisibaleProducts",
      "clearVisibalProducts",
      "reloadPage",
    ]),
    activeGood(card) {
      return card.quantity > 0 ? "active-good" : "";
    },
    setSearchValue() {
      if (this.getSearchValue.length) {
        this.clearVisibalProducts();
        this.getProducts.forEach((product) => {
          if (
            product.name
              .toLowerCase()
              .includes(this.getSearchCatalog.toLowerCase())
          ) {
            this.addVisibaleProducts(product);
          }
        });
      }
    },
    changePage() {
      this.reloadPage();
    },
    getSearchValue(e) {
      this.setSearch(e.target.value);
    },
    createNotification(product) {
      this.messages.push({
        name: product.name,
        id: Date.now().toLocaleString(),
      });

      this.deleteNotification(product);
    },
    deleteNotification() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.shop_basket {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: flex-end;
  z-index: 10;
  background-color: #ccf1f1;
  width: 100%;
}

.shop_button {
  padding: 10px;
  margin-right: 10px;
  font-size: 20px;
}

.shop_title {
  display: flex;
  justify-content: center;
  margin: 100px 0 40px;
}

.shop_cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.shop_search {
  display: flex;
  justify-content: right;
  margin-bottom: 40px;

  .shop_input {
    margin-right: 5px;
    padding: 5px;
  }
}

.shop_card {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  background-color: aliceblue;
  margin: 0 10px 20px;
}

.active-good {
  outline: 3px solid green;
  outline-offset: -3px;
}

.shop_cart {
  margin-right: 5px;
}
</style>
