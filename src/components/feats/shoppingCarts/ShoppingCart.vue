<template>
    <section class="container cart-section">
        <div class="row justify-content-center shopping-cart">
            <div class="col-sm-8 my-shadow rounded p-3 m-0 bg-white">
                <h5 class="d-flex align-items-center">
                    <span class="me-auto">Giỏ hàng của bạn</span>
                    <img
                        class="toggleAuth ms-auto btn btn-white"
                        src="../../../assets/cross_icon.png"
                    />
                </h5>
                <ul class="d-flex flex-column p-0 m-0 cart-items">
                    <CartItem
                        v-for="cartItem in cartItems"
                        :key="cartItem.productId"
                        :cartId="cartId"
                        :productId="cartItem.productId"
                        :productName="cartItem.productName"
                        :category="cartItem.category"
                        :imageUrl="cartItem.imageUrl"
                        :unitPrice="cartItem.unitPrice"
                        :quantity="cartItem.quantity"
                    >
                    </CartItem>
                </ul>
                <p>Item Count: {{ itemCount }}</p>
                <p>Total: {{ totalPrice }}</p>
            </div>
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
import { shoppingCart } from "@/shared/ShoppingCartManager";

// Import component.
import CartItem from "./CartItem.vue";

export default {
    components: {
        CartItem,
    },
    data() {
        return {
            cartId: null,
            totalPrice: null,
            itemCount: 0,
            cartItems: null,
            isInitShoppingCart: false,
        };
    },
    created() {
        const shoppingCartCookie = cookieHelper.getCookieByName(
            ShoppingCartCookieName
        );

        if (shoppingCartCookie.isExisted) {
            this.cartId = shoppingCartCookie.value;
            console.log("CartId = " + this.cartId);
        } else {
            this.initShoppingCart();
        }
    },
    mounted() {
        // If the shopping cart is newly initialized,
        // then no need to call api to get the cart details.
        if (this.isInitShoppingCart) {
            this.cartItems = shoppingCart.cartItems;
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

            for (const cartItem of cartItems) {
                shoppingCart.addItem(cartItem);
            }

            this.cartItems = shoppingCart.cartItems;
        })
        .catch(() => {
            this.initShoppingCart();
        })
        .finally(() => {
            // Set up the callback to detected changes of shopping cart.
            this.setUpCallback();
        });
    },
    methods: {
        updateCart() {
            this.cartItems = shoppingCart.cartItems;
            this.totalPrice = shoppingCart.totalPrice;
            this.itemCount = shoppingCart.getItemCount();
        },
        initShoppingCart() {
            console.log("Init the shopping cart");

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

                    this.isInitShoppingCart = true;
                })
                .catch((error) => console.log(error));
        },
        setUpCallback() {
            shoppingCart.addCallback(
                `${this.cartId}_updateCart`,
                this.updateCart
            );
        },
    },
};
</script>

<style scoped>
.cart-section {
    height: 100%;
}

.shopping-cart {
    position: sticky;
    top: 4rem;
}

.cart-items {
    height: 64vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
}

.cart-items::-webkit-scrollbar {
  display: none;
}


</style>