<template>
    <button class="btn btn-link p-0 nav-icon position-relative">
        <img class="w-100" src="../../assets/svgs/cart.svg" />
        <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
            >{{ itemCount }}</span
        >
    </button>
</template>

<script>
import { shoppingCart } from "@/shared/ShoppingCartManager";

export default {
    data() {
        return {
            itemCount: 1,
        };
    },
    mounted() {
        const randomCode = Math.floor(Math.random() * 100);
        shoppingCart.addCallback(`cart_button_${randomCode}`, this.updateCart);
        this.updateCart();
    },
    methods: {
        updateCart() {
            this.itemCount = shoppingCart.getItemCount();
        },
    },
};
</script>