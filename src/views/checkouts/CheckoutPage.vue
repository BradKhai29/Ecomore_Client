<template>
    <BaseLayout>
        <section class="container py-5 rounded checkout-container mt-5">
            <CheckoutStep v-if="!isCartEmpty" :currentStep="currentStep"></CheckoutStep>

            <!-- If cart is not empty -->
            <div v-if="!isCartEmpty" class="row flex-column flex-md-row">
                <section class="col-12 col-md-8">
                    <div class="d-flex bg-white rounded my-shadow p-3 align-items-center">
                        <h5 class="m-0 text-uppercase text-primary">giỏ hàng</h5>
                        <span class="ms-2">({{ itemCount }} sản phẩm)</span>
                    </div>

                    <div
                        v-if="showInfo"
                        class="d-flex bg-white rounded my-shadow p-3 py-2 mt-3 align-items-center"
                    >
                        <p class="m-0">
                            Quý khách có thể xem lại giỏ hàng trước khi tiếp tục
                            thanh toán.
                        </p>
                        <span @click="showInfo = false" class="ms-auto btn fw-bold"
                            >&#10005;</span
                        >
                    </div>
                    <!-- Display Cart start -->
                    <ul
                        :class="[
                            { 'd-flex': !isCartEmpty },
                            'flex-column rounded my-shadow p-3 mt-3 bg-white',
                        ]"
                    >
                        <CartItemComponent
                            v-for="cartItem in cartItems"
                            :key="cartItem.productId"
                            :cartId="cartId"
                            :productId="cartItem.productId"
                            :productName="cartItem.productName"
                            :imageUrl="cartItem.imageUrl"
                            :unitPrice="cartItem.unitPrice"
                            :quantity="cartItem.quantity"
                        >
                        </CartItemComponent>
                    </ul>
                    <!-- Display Cart end -->
                </section>
                <section class="mt-3 mt-sm-0 col-12 col-md-4">
                    <section class="rounded bg-white my-shadow p-3">
                        <h5 class="mb-3 text-uppercase text-primary">đơn hàng</h5>
                        <div class="separator"></div>
                        <div class="d-flex align-items-center">
                            <span class="fs-6 me-auto">Tổng tiền</span>
                            <span class="text-danger fw-bold fs-5"
                                >{{ totalPriceRef }}đ</span
                            >
                        </div>
                        <div class="separator"></div>
                        <button @click="goToCheckoutDetailPage" class="w-100 btn btn-danger">
                            Tiếp tục thanh toán
                        </button>
                    </section>
                </section>
            </div>
            <!-- If cart is not empty -->

            <!-- If cart is empty -->
            <section class="row flex-column" v-if="isCartEmpty">
                <div class="col-6 col-md-4 mx-auto">
                    <figure class="d-flex justify-content-center">
                        <img
                            class="img-fluid empty-cart"
                            src="../../assets/icons/empty-cart.png"
                            alt=""
                            srcset=""
                        />
                        <a
                            class="d-none"
                            href="https://www.flaticon.com/free-icons/empty-cart"
                            title="empty cart icons"
                            >Empty cart icons created by kerismaker - Flaticon</a
                        >
                    </figure>
                </div>
                <p class="text-center">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <div class="col-md-4 col-10 mx-auto">
                    <router-link to="/" class="btn btn-danger w-100"
                        >Tiếp tục mua sắm</router-link
                    >
                </div>
            </section>
            <!-- If cart is empty -->
        </section>
    </BaseLayout>
</template>

<script>
// Import dependencies.
import moneyHelper from "@/shared/helpers/MoneyHelper";
import cookieHelper from "@/shared/helpers/CookieHelper";

// Shopping cart dependencies section.
import { shoppingCart } from "@/shared/ShoppingCartManager";
import { ShoppingCartCookieName } from "@/shared/AppConstants";

// Import components
import BaseLayout from "@/layouts/BaseLayout.vue";
import CartItemComponent from "@/components/feats/checkouts/CartItem.vue";
import CheckoutStep from "./CheckoutStep.vue";

export default {
    components: {
        BaseLayout,
        CartItemComponent,
        CheckoutStep
    },
    data() {
        return {
            callbackId: String,
            cartId: String,
            currentStep: 1,
            totalPrice: 0,
            itemCount: 0,
            cartItems: [],
            isCartEmpty: true,
            showInfo: true,
        };
    },
    computed: {
        totalPriceRef() {
            return moneyHelper.format(this.totalPrice);
        },
    },
    mounted() {
        const shoppingCartCookie = cookieHelper.getCookieByName(
            ShoppingCartCookieName
        );

        if (!shoppingCartCookie.isExisted) {
            return;
        }

        this.cartId = shoppingCartCookie.value;
        this.cartItems = shoppingCart.cartItems;
        this.totalPrice = shoppingCart.totalPrice;
        this.itemCount = shoppingCart.itemCount;
        this.isCartEmpty = this.cartItems.length == 0;
        this.setUpCallback();
    },
    unmounted() {
        shoppingCart.removeCallbackById(this.callbackId);
    },
    methods: {
        goToCheckoutDetailPage() {
            this.$router.push("/checkout/detail");
        },
        updateCheckoutPage() {
            console.log("CheckoutPage: CartEmpty? " + this.isCartEmpty);
            this.cartItems = shoppingCart.cartItems;
            this.totalPrice = shoppingCart.totalPrice;
            this.itemCount = shoppingCart.getItemCount();
            this.isCartEmpty = this.cartItems.length == 0;
        },
        setUpCallback() {
            this.callbackId = `checkout_page_${this.cartId}`;
            shoppingCart.addCallback(this.callbackId, this.updateCheckoutPage);
        },
    },
};
</script>

<style >
.checkout-container {
    background-color: rgba(245, 245, 245, 0.7);
}

.cart-item-image {
    height: 120px;
    border: dashed 1px;
}
</style>
