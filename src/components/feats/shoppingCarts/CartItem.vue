<template>
    <li class="d-flex p-0 my-shadow rounded mb-3 p-2">
        <div class="col-2">
            <figure class="cart-item-image rounded m-0">
                <img
                    class="w-100 h-100 rounded"
                    :src="imageUrl"
                    :alt="`anh_san_pham_${productId}`"
                />
            </figure>
        </div>
        <div class="col-7 ps-2 d-flex flex-column">
            <h5>{{ productName }}</h5>
            <section class="d-flex mt-auto">
                <button
                    @click="decreaseQuantity"
                    class="cart-item-button bg-primary text-light"
                    :disabled="isProcessing"
                >
                    <span v-if="!waitingToDecrease">&minus;</span>
                    <LoadingIcon v-if="waitingToDecrease"></LoadingIcon>
                </button>
                <span class="cart-item-quantity">{{ quantityRef }}</span>
                <button
                    @click="increaseQuantity"
                    class="cart-item-button bg-primary text-light"
                    :disabled="isProcessing"
                >
                    <span v-if="!waitingToIncrease">+</span>
                    <LoadingIcon v-if="waitingToIncrease"></LoadingIcon>
                </button>
            </section>
        </div>
        <div class="col-3 d-flex flex-column">
            <p class="ms-auto mb-2">Đơn giá: {{ unitPriceRef }}đ</p>
            <button
                @click="removeItem"
                class="btn btn-link p-0 ms-auto text-danger text-decoration-underline"
            >
                Xóa khỏi giỏ
            </button>
        </div>
    </li>
</template>

<script>
// Import dependencies.
import axios from "axios";
import { shoppingCartApi } from "@/shared/ApiUrls";
import moneyHelper from "@/shared/helpers/MoneyHelper";
import { shoppingCart } from "@/shared/ShoppingCartManager";

// Import components.
import LoadingIcon from "@/components/shared/LoadingIcon.vue";

export default {
    mounted() {
        shoppingCart.addCallback(this.productId, this.updateCartItem);
    },
    props: {
        cartId: String,
        productId: String,
        productName: String,
        unitPrice: Number,
        imageUrl: String,
        quantity: Number,
    },
    components: {
        LoadingIcon,
    },
    data() {
        return {
            quantityRef: this.quantity,
            unitPriceRef: moneyHelper.format(this.unitPrice),
            waitingToIncrease: false,
            waitingToDecrease: false,
        };
    },
    computed: {
        isProcessing() {
            return this.waitingToDecrease || this.waitingToIncrease;
        },
    },
    methods: {
        increaseQuantity() {
            // Prevent user to click again the button when add-to-cart is on-processing.
            if (this.isProcessing) {
                return;
            }

            // Set waiting to increase to true to process the increase-item operation.
            this.waitingToIncrease = true;

            axios({
                method: shoppingCartApi.add.method,
                url: shoppingCartApi.add.path,
                data: {
                    cartId: this.cartId,
                    productId: this.productId,
                    quantity: 1,
                },
            })
            .then(() => {
                // Update the state of the shopping cart.
                shoppingCart.updateItemQuantity(this.productId, 1);
                shoppingCart.updateCart();

                this.waitingToIncrease = false;
            })
            .catch((err) => {
                this.waitingToIncrease = false;
                console.log(err);
            });
        },
        decreaseQuantity() {
            // Prevent user to click again the button when add-to-cart is on-processing.
            if (this.isProcessing) {
                return;
            }

            // Prevent user to decrease quantity to 0.
            if (this.quantityRef - 1 <= 0) {
                return;
            }

            // Set waiting to decrease to true to process the increase-item operation.
            this.waitingToDecrease = true;

            axios({
                method: shoppingCartApi.reduce.method,
                url: shoppingCartApi.reduce.path,
                data: {
                    cartId: this.cartId,
                    productId: this.productId,
                    quantity: 1,
                },
            })
            .then(() => {
                // Update the state of the shopping cart.
                shoppingCart.updateItemQuantity(this.productId, -1);
                shoppingCart.updateCart();

                this.waitingToDecrease = false;
            })
            .catch((err) => {
                this.waitingToDecrease = false;
                console.log(err);
            });
        },
        removeItem() {
            axios({
                url: `${shoppingCartApi.remove.path}/${this.cartId}/${this.productId}`,
                method: shoppingCartApi.remove.method,
            }).then(() => {
                // Remove item & callback from the shopping cart manager.
                shoppingCart.removeItem(this.productId);
                shoppingCart.removeCallbackById(this.productId);
                shoppingCart.updateCart();

                // Remove item from DOM.
                this.$el.parentNode.removeChild(this.$el);
            });
        },
        updateCartItem() {
            const cartItem = shoppingCart.getCartItemByProductId(
                this.productId
            );

            this.quantityRef = cartItem.quantity;
        },
    },
};
</script>

<style scoped>
.cart-item-image {
    width: 100%;
    height: 100px;
}

.cart-item-quantity {
    min-width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-item-button {
    padding: 2px 10px;
    border-radius: 4px;
}
</style>