<template>
    <BaseLayout>
        <section class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div
                        class="d-flex my-shadow border-primary border border-2 rounded-1 px-3 py-2 m-0"
                    >
                        <router-link
                            to="/order"
                            class="btn m-0 me-auto bg-primary d-flex align-item-center fw-bold text-light px-1 py-0 rounded-1 my-shadow"
                        >
                            <span class="fw-bold me-1">&#8592;</span>
                            <span>Lịch sử</span>
                        </router-link>
                        <p class="m-0 text-end">
                            Mã đơn <span class="d-none d-sm-inline">hàng</span>:
                            <span class="text-danger">{{ order.orderCode }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <section class="row mt-4">
                <div class="col-12">
                    <section
                        class="p-3 my-shadow border-primary border border-2 rounded-1 d-flex flex-column"
                    >
                        <section class="order-header text-dark">
                            <p class="m-0">
                                Thanh toán lúc:
                                <span class="text-primary">{{
                                    order.createdAt
                                }}</span>
                            </p>
                            <p>
                                Tổng thanh toán:
                                <span class="text-primary"
                                    >{{ totalPriceRef }}đ</span
                                >
                            </p>
                        </section>
                        <OrderStatus
                            :currentStatus="order.orderStatus"
                        ></OrderStatus>
                        <section class="order-header text-dark table-responsive">
                            <p class="m-0 mb-2">
                                Số lượng sản phẩm:
                                <span class="text-primary">{{
                                    orderItems.length
                                }}</span>
                            </p>
                            <table
                                class="mb-1 table table-hover border border-2 border-primary my-shadow rounded-3"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="orderItem in orderItems"
                                        :key="orderItem.productId"
                                    >
                                        <td scope="col">
                                            <router-link
                                                :to="`/product/${orderItem.productId}`"
                                            >
                                                {{ orderItem.productName }}
                                            </router-link>
                                        </td>
                                        <td class="text-danger" scope="col">
                                            {{
                                                formatMoney(orderItem.sellingPrice)
                                            }}đ
                                        </td>
                                        <td scope="col">
                                            {{ orderItem.sellingQuantity }}
                                        </td>
                                        <td class="text-danger" scope="col">
                                            {{ formatMoney(orderItem.subTotal) }}đ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </section>
                </div>
            </section>
        </section>
    </BaseLayout>
</template>

<script>
import moneyHelper from "@/shared/helpers/MoneyHelper";
import axios from "axios";
import { orderApi } from "@/shared/ApiUrls";

// Import components.
import OrderStatus from "@/components/feats/orders/OrderStatus.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
    components: {
        BaseLayout,
        OrderStatus,
    },
    data() {
        return {
            order: Object,
            orderItems: [],
            isNotFound: true,
        };
    },
    computed: {
        totalPriceRef() {
            return moneyHelper.format(this.order.totalPrice);
        },
    },
    mounted() {
        const orderId = this.$route.params.orderId;

        if (orderId == null || orderId.length < 36) {
            this.isNotFound = true;
        } else {
            axios({
                url: orderApi.getByIdForDetailDisplay.path + `/${orderId}`,
                method: orderApi.getByIdForDetailDisplay.method,
            })
            .then((response) => {
                this.order = response.data.body;
                this.orderItems = this.order.orderItems;
                this.isNotFound = false;
            })
            .catch((err) => console.log(err));
        }
    },
    methods: {
        formatMoney(money) {
            return moneyHelper.format(money);
        },
    },
};
</script>