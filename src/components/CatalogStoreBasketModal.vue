<template>
  <div class="modal modal_wrapper" ref="modal">
    <div class="modal_container">
      <div class="modal_header">
        <div class="modal_title">{{ modalTitle }}</div>
        <div class="material-icons modal-close" @click="closeModal">
          close
        </div>
      </div>
      <div class="modal_content">
        <slot></slot>
      </div>
      <div class="modal_footer">
        <button class="modal_close" @click="closeModal">Close</button>
        <button class="modal_submit">
          {{ rightBtnTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogStoreBasketModal',
  props: {
    modalTitle: {
      type: String,
      default: ''
    },
    rightBtnTitle: {
      type: String,
      default: 'Ok'
    }
  },
  data () {
    return {}
  },
  methods: {
    rightBtnAction () {
      this.$emit('right-btn-action')
    },
    closeModal () {
      this.$emit('close-modal')
    }
  },
  mounted () {
    let vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['modal']) {
        vm.closeModal()
      }
    })
  }
}
</script>

<style scoped>
.modal_wrapper {
  background: rgba(64, 64, 64, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
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

.modal-close {
  cursor: pointer;
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

.modal_submit,
.modal_close {
  width: 40%;
  cursor: pointer;
}

.modal_submit {
  padding: 10px;
  color: #ffffff;
  background: #26ae68;
}
.modal_close {
  padding: 10px;
  color: #ffffff;
  background: red;
}
</style>
