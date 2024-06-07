<template>
    <li class="w-100 bg-white d-flex p-0 mb-3">
        <div class="col-md-2 col-4">
            <figure class="w-100 border-primary cart-item-image rounded m-0">
                <img
                    class="w-100 h-100 rounded"
                    :src="imageUrl"
                    alt="anh_san_pham"
                />
            </figure>
        </div>
        <div class="col-md-10 col-8 ps-2 d-flex flex-column">
            <h5>{{ productName }}</h5>
            <p class="mb-2">Đơn giá: {{ unitPriceRef }}đ</p>
            <section class="d-flex mt-auto">
                <section class="d-flex bg-light my-btn-group text-primary">
                    <button
                    @click="decreaseQuantity"
                    class="btn-square"
                    :disabled="isProcessing"
                >
                    <span v-if="!waitingToDecrease">&minus;</span>
                    <LoadingIcon v-if="waitingToDecrease"></LoadingIcon>
                </button>
                <span class="cart-item-quantity">{{ quantityRef }}</span>
                <button
                    @click="increaseQuantity"
                    class="btn-square"
                    :disabled="isProcessing"
                >
                    <span v-if="!waitingToIncrease">+</span>
                    <LoadingIcon v-if="waitingToIncrease"></LoadingIcon>
                </button>
                </section>
                <button
                    @click="showRemoveModal"
                    class="my-btn-group bg-light ms-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
                </button>
            </section>
        </div>

        <!-- Remove modal start -->
        <section v-if="showModal" class="remove-modal pt-5 container-fluid">
            <div class="row pt-5 justify-content-center">
                <div class="col-12 col-md-4 p-3 mt-5 bg-white rounded d-flex flex-column">
                    <h5 class="d-flex align-items-center">
                        <span>Thông báo</span>
                        <button @click="showModal = false" class="ms-auto btn btn-light">&#10005;</button>
                    </h5>
                    <p class="py-3">Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?</p>
                    <button @click="removeItem" class="btn btn-danger flex-fill">Đồng ý</button>
                </div>
            </div>
        </section>
        <!-- Remove modal end -->
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
    beforeMount() {
        this.callbackId = `checkout_cart_item_${this.productId}`;
        shoppingCart.addCallback(this.callbackId, this.updateCheckoutCartItem);
    },
    beforeUnmount() {
        shoppingCart.removeCallbackById(this.callbackId);
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
            callbackId: String,
            quantityRef: this.quantity,
            unitPriceRef: moneyHelper.format(this.unitPrice),
            waitingToIncrease: false,
            waitingToDecrease: false,
            showModal: false,
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
        showRemoveModal() {
            this.showModal = true;
        },
        removeItem() {
            this.showModal = false;

            axios({
                url: `${shoppingCartApi.remove.path}/${this.cartId}/${this.productId}`,
                method: shoppingCartApi.remove.method,
            }).then(() => {
                // Remove item & callback from the shopping cart manager.
                shoppingCart.removeItem(this.productId);
                shoppingCart.removeCallbackById(this.callbackId);

                // Remove item from DOM.
                this.$el.parentNode.removeChild(this.$el);
                shoppingCart.updateCart();
            });
        },
        updateCheckoutCartItem() {
            const cartItem = shoppingCart.getCartItemByProductId(
                this.productId
            );

            if (cartItem) {
                this.quantityRef = cartItem.quantity;
            }
        },
    },
};
</script>

<style scoped>
.cart-item-image {
    height: 120px;
    border: dashed 1px;
}

.cart-item-quantity {
    min-width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-item-button {
    padding: 2px 10px;
    border-radius: 4px;
}

.remove-modal {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(122, 121, 121, 0.5);
}
</style>