<template>
    <section class="container cart-section toggleCart">
        <div class="row justify-content-center shopping-cart toggleCart">
            <section class="col-sm-8 my-shadow rounded px-3 py-2 m-0 bg-white">
                <h5 class="d-flex align-items-center">
                    <span class="me-auto">Giỏ hàng ({{ itemCount }} sản phẩm)</span>
                    <span class="toggleCart btn btn-white bg-light border border-2 border-dark">
                        &#x2716;
                    </span>
                </h5>
                <ul v-show="!isCartEmpty" class="d-flex flex-column p-0 m-0 cart-items">
                    <CartItemComponent v-for="cartItem in cartItems" :key="cartItem.productId" :cartId="cartId"
                        :productId="cartItem.productId" :productName="cartItem.productName"
                        :category="cartItem.category" :imageUrl="cartItem.imageUrl" :unitPrice="cartItem.unitPrice"
                        :quantity="cartItem.quantity">
                    </CartItemComponent>
                </ul>
                <div v-if="isCartEmpty">
                    <figure class="d-flex justify-content-center">
                        <img class="img-fluid empty-cart " src="../../../assets/icons/empty-cart.png" alt="" srcset="">
                        <a class="d-none" href="https://www.flaticon.com/free-icons/empty-cart" title="empty cart icons">Empty cart icons created by kerismaker - Flaticon</a>
                    </figure>
                </div>
            </section>
            <section v-if="!isCartEmpty" class="col-sm-8 my-shadow rounded px-3 pb-3 mt-2 bg-white">
                <p class="mt-3 mb-2 d-flex">
                    <span class="text-dark me-auto">Tạm tính:</span>
                    <span class="text-dark">{{ totalPriceRef }}đ</span>
                </p>
                <div class="d-flex toggleCart" @click="hideCart">
                    <button @click="goToCheckoutPage" class="flex-fill ms-auto btn btn-primary my-shadow rounded-1">
                        Đi đến thanh toán
                    </button>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
// Import dependencies.
import axios from "axios";
import cookieHelper from "@/shared/helpers/CookieHelper";

// Shopping cart dependencies section.
import { shoppingCartApi } from "@/shared/ApiUrls";
import { ShoppingCartCookieName } from "@/shared/AppConstants";
import { shoppingCart, CartItem } from "@/shared/ShoppingCartManager";

// Import component.
import CartItemComponent from "./CartItem.vue";
import moneyHelper from '@/shared/helpers/MoneyHelper';
const toggleCartEvent = "toggle-cart";

export default {
    components: {
        CartItemComponent,
    },
    data() {
        return {
            cartId: null,
            totalPrice: null,
            itemCount: 0,
            cartItems: [],
            isCartEmpty: true,
        };
    },
    computed: {
        totalPriceRef() {
            return moneyHelper.format(this.totalPrice);
        },
    },
    emits: [toggleCartEvent],
    created() {
        const shoppingCartCookie = cookieHelper.getCookieByName(
            ShoppingCartCookieName
        );

        if (shoppingCartCookie.isExisted) {
            this.cartId = shoppingCartCookie.value;
        }
    },
    mounted() {
        if (shoppingCart.isLoadFromApi) {
            this.reloadCart();
            this.setUpCallback();
            return;
        }

        axios({
            url: `${shoppingCartApi.get.path}/${this.cartId}`,
            method: shoppingCartApi.get.method,
        })
        .then((response) => {
            const shoppingCartDto = response.data.body;
            const cartItems = shoppingCartDto.cartItems;

            // Set data for this shopping cart component.
            this.totalPrice = shoppingCartDto.totalPrice;
            this.itemCount = cartItems.length;

            for (const item of cartItems) {
                const cartItem = new CartItem(
                    item.productId,
                    item.productName,
                    item.unitPrice,
                    item.imageUrl,
                    item.quantity);

                shoppingCart.addItem(cartItem);
            }

            shoppingCart.isLoadFromApi = true;
            this.cartItems = shoppingCart.cartItems;
            this.isCartEmpty = cartItems.length == 0;
            shoppingCart.updateCart();
        })
        .catch((err) => {
            console.log(err);
            this.initShoppingCart();
        })
        .finally(() => {
            // Set up the callback to detected changes of shopping cart.
            this.setUpCallback();
        });
    },
    methods: {
        hideCart(event) {
            if (event.target.classList.contains("toggleCart")) {
                this.$emit(toggleCartEvent);
            }
        },
        reloadCart() {
            this.cartItems = shoppingCart.cartItems;
            this.totalPrice = shoppingCart.totalPrice;
            this.itemCount = shoppingCart.getItemCount();
            this.isCartEmpty = this.cartItems.length == 0;
        },
        initShoppingCart() {
            axios({
                url: shoppingCartApi.init.path,
                method: shoppingCartApi.init.method,
            })
            .then((response) => {
                this.cartId = response.data.body.cartId;
                const liveDays = 30;

                cookieHelper.setCookie(
                    ShoppingCartCookieName,
                    this.cartId,
                    liveDays
                );
            })
            .catch((error) => console.log(error));
        },
        goToCheckoutPage() {
            this.$emit(toggleCartEvent);
            this.$router.push("/checkout");
        },
        setUpCallback() {
            shoppingCart.addCallback(
                `shopping_cart_${this.cartId}`,
                this.reloadCart
            );
        },
    }
};
</script>

<style scoped>
.cart-section {
    height: 100%;
}

.empty-cart {
    width: 20rem;
}

.shopping-cart {
    position: sticky;
    top: 4rem;
}

.cart-items {
    max-height: 60vh;
    -ms-overflow-style: none;
    scrollbar-width: 2px;
    overflow-y: auto;
    overflow-x: auto;
}
</style>