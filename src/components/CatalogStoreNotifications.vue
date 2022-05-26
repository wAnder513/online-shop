<template>
  <div class="notifications">
      <transition-group name="transition-notifications">
        <div class="notifications_card" 
            :class="typeAlert"
            v-for="message in messages" 
            :key="message.id">
            <div class="notifications_text">
                <div class="notifications_name">{{message.name}}</div> 
                <div>add to card</div>
            </div>

            <i class="material-icons">
                {{typeAlert}}
            </i>
        </div>
      </transition-group>
  </div>
</template>

<script>
export default {
    props: {
        messages: {type: Array, default: () => []},
        typeAlert: {type: String, default: () => 'check_circle'},
    },
}
</script>

<style lang="scss" scoped>
.notifications {
    position: fixed;
    top: 100px;
    right: 10px;
    display: flex;
    flex-direction: column-reverse;
    z-index: 10;
}

.notifications_card {
    height: 50px;
    width: 200px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;

    &.error {
        background: red;
    }

    &.warning {
        background: orange;
    }

    &.check_circle {
        background: green;
    }
}

.notification_accept {
    margin-right: 5px;
}

.notifications_name {
    font-size: 24px;
}

.transition-notifications {
    &-enter {
        transform: translateX(120px);
        opacity: 0;
    }
    &-enter-active {
        transition: all .6s ease;
    }
    &-enter-to {
        opacity: 1;
    }

    &-leave {
        height: 50px;
        opacity: 1;
    }
    &-leave-active {
        transition: transform .6s ease, opacity .6s, height .6s .2s;
    }
    &-leave-to {
        height: 0;
        transform: translateX(120px);
        opacity: 0;
    }

    &-move {
        transition: transform .6s ease;
    }
}
</style>