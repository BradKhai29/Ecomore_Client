<template>
    <section class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div
                    v-if="!isEmpty"
                    class="d-flex bg-white border border-primary border-2 rounded my-shadow mt-3 mb-4 p-3 align-items-center"
                >
                    <h5 class="m-0 text-uppercase text-primary">
                        danh sách đơn hàng
                    </h5>
                    <span class="ms-auto">
                        <span>(</span>
                        <span class="text-primary"
                            >{{ orderItems.length }} đơn hàng</span
                        >
                        <span>)</span>
                    </span>
                </div>

                <!-- Order List start -->
                <ul v-if="!isEmpty" class="p-0 d-flex flex-column">
                    <OrderItem
                        v-for="orderItem in orderItems"
                        :key="orderItem.id"
                        :orderId="orderItem.id"
                        :orderCode="orderItem.orderCode"
                        :orderStatus="orderItem.orderStatus"
                        :createdAt="orderItem.createdAt"
                        :totalPrice="orderItem.totalPrice"
                    >
                    </OrderItem>
                </ul>
                <!-- Order List end -->

                <section v-if="isEmpty" class="row">
                    <div class="col-12">
                        <div
                            class="text-center p-3 bg-white border border-primary border-2 rounded my-shadow"
                        >
                            <figure class="col-md-2 col-4 mx-auto">
                                <img
                                    class="img-fluid"
                                    src="../../assets/icons/empty_product.png"
                                    alt="don_hang_trong"
                                />
                            </figure>
                            <p class="text-dark m-0 h5">
                                Bạn chưa có đơn hàng nào
                            </p>
                            <button
                                @click="goToProductPage"
                                class="w-100 mt-4 text-uppercase flex-fill rounded-1 my-shadow btn btn-primary"
                            >
                                tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { orderApi } from "@/shared/ApiUrls";
import OrderItem from "../../components/feats/orders/OrderItem.vue";
import CookieHelper from "@/shared/helpers/CookieHelper";
import {
    AccessTokenCookieName,
    ShoppingCartCookieName,
} from "@/shared/AppConstants";

export default {
    components: {
        OrderItem,
    },
    data() {
        return {
            orderItems: [],
            isEmpty: true,
        };
    },
    mounted() {
        const accessTokenCookie = CookieHelper.getCookieByName(
            AccessTokenCookieName
        );

        if (accessTokenCookie.isExisted) {
            this.getOrderHistoryForUser(accessTokenCookie.value);
        } else {
            const shoppingCartCookie = CookieHelper.getCookieByName(
                ShoppingCartCookieName
            );

            if (shoppingCartCookie.isExisted) {
                this.getOrderHistoryForGuest(shoppingCartCookie.value);
            }
        }
    },
    methods: {
        goToProductPage() {
            this.$router.push("/products");
        },
        getOrderHistoryForUser(accessToken) {
            axios({
                url: orderApi.getAllForUser.path,
                method: orderApi.getAllForUser.method,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            .then((response) => {
                this.displayOrderHistory(response);
            })
            .catch(() => {});
        },
        getOrderHistoryForGuest(guestId) {
            axios({
                url: orderApi.getAllForGuest.path + `/${guestId}`,
                method: orderApi.getAllForGuest.method,
            })
            .then((response) => {
                this.displayOrderHistory(response);
            })
            .catch(() => {});
        },
        /**
         * @param {AxiosResponse<any,any>} response
         */
        displayOrderHistory(response) {
            const orderHistoryItems = response.data.body;

            this.orderItems = orderHistoryItems;
            this.isEmpty = this.orderItems.length == 0;
        },
    },
};
</script>

