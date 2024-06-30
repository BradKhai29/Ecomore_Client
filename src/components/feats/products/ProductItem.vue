<template>
    <div class="col-lg-3 col-md-6">
        <div class="product-item rounded overflow-hidden">
            <header class="position-relative overflow-hidden product-image">
                <router-link :to="'/product/' + productId">
                    <img :src="imageUrlRef" alt="anh_san_pham" />
                </router-link>
                <div
                    class="bg-primary rounded text-white position-absolute start-0 top-0 m-3 py-1 px-3"
                >
                    {{ category }}
                </div>
            </header>
            <main class="p-3 pb-0 text-start">
                <router-link class="d-block h5 mb-2" :to="'/product/' + productId">
                    {{ productName }}
                </router-link>
                <h5 class="text-primary mb-3">{{ productPriceRef }} đ</h5>
            </main>
            <div class="p-3 d-flex border-top">
                <button
                    @click="addToCart"
                    :disabled="isProcessing"
                    class="btn btn-primary flex-fill py-2 d-flex justify-content-center"
                >
                    <span v-if="!isProcessing" class="fw-bold"
                        >Thêm vào giỏ hàng</span
                    >
                    <LoadingIcon v-if="isProcessing" :isLight="true"></LoadingIcon>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// Import dependencies.
import axios from "axios";
import moneyHelper from "@/shared/helpers/MoneyHelper";
import cookieHelper from "@/shared/helpers/CookieHelper";
import { shoppingCartApi } from "@/shared/ApiUrls.js";
import { ShoppingCartCookieName } from "@/shared/AppConstants";
import { CartItem, shoppingCart } from "@/shared/ShoppingCartManager";

// Import components.
import LoadingIcon from "@/components/shared/LoadingIcon.vue";

export default {
    components: {
        LoadingIcon
    },
    props: {
        productId: String,
        productName: String,
        productStatus: String,
        imageUrl: String,
        productPrice: Number,
        category: String,
    },
    data() {
        return {
            imageUrlRef: this.imageUrl
                ? this.imageUrl
                : "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1",
            productPriceRef: moneyHelper.format(this.productPrice),
            isProcessing: false,
        };
    },
    methods: {
        addToCart() {
            // Prevent user to click again the button when add-to-cart is on-processing.
            if (this.isProcessing) {
                return;
            }

            // Set is processing to true to process the add-to-cart operation.
            this.isProcessing = true;
            const shoppingCartCookie = cookieHelper.getCookieByName(
                ShoppingCartCookieName
            );

            axios({
                method: shoppingCartApi.add.method,
                url: shoppingCartApi.add.path,
                data: {
                    cartId: shoppingCartCookie.value,
                    productId: this.productId,
                    quantity: 1,
                },
            })
            .then(() => {
                const cartItem = new CartItem(this.productId, this.productName, this.productPrice, this.imageUrl, 1);

                shoppingCart.addItem(cartItem);
                shoppingCart.updateCart();

                setTimeout(() => {
                    this.isProcessing = false;
                }, 400);
            })
            .catch((err) => {
                this.isProcessing = false;
                console.log(err)
            });
        },
    },
};
</script>

<style scoped>
.product-image {
    height: 240px;
}

.product-image img {
    height: 100%;
    width: 100%;
}
</style>