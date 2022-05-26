<template>
  <div class="modal modal_wrapper" ref="modal">
    <div class="modal_container">
      <div class="modal_header">
        <div class="modal_title">{{ modalTitle }}</div>
        <div class="material-icons modal-close" @click="closeModal">close</div>
      </div>

      <slot></slot>

      <div class="modal_footer">
        <button class="modal_close" @click="closeModal">Close</button>

        <button class="modal_submit" @click="getOrderConfirmed">
          {{ rightBtnTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "CatalogStoreCartModal",
  props: {
    modalTitle: {
      type: String,
      default: "",
    },
    rightBtnTitle: {
      type: String,
      default: "Ok",
    },
  },
  data() {
    return {
      orderConfirmed: false,
    };
  },
  methods: {
    ...mapActions([
      'deleteAllProductToCart',
    ]),
    rightBtnAction() {
      this.$emit("right-btn-action");
    },
    closeModal() {
      this.$emit("close-modal");
    },
    getOrderConfirmed() {
      this.deleteAllProductToCart()
      this.$emit("get-confirmed-order");
      this.closeModal();
    },
  },
  mounted() {
    document.addEventListener("click", (item) => {
      if (item.target === this.$refs["modal"]) {
        this.closeModal();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.modal_wrapper {
  background: rgba(64, 64, 64, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.modal_title {
  display: flex;
  justify-content: center;
  width: 100%;
}

.modal_header {
  display: flex;
  justify-content: space-between;
}

.modal_container {
  padding: 15px;
  position: fixed;
  top: 50px;
  width: 400px;
  background: #ffffff;
  z-index: 10;
}

.modal_footer {
  display: flex;
  justify-content: space-between;
}

.modal-close {
  cursor: pointer;
}

.modal_submit,
.modal_close {
  width: 40%;
  padding: 10px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
}

.modal_submit {
  background: #26ae68;

  &:hover,
  &:focus {
    background: #1f9357;
  }
}

.modal_close {
  background: red;

  &:hover,
  &:focus {
    background: rgb(109, 1, 1);
  }
}
</style>
