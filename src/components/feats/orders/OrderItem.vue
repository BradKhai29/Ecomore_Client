<template>
    <li
        class="p-3 my-shadow border-primary border border-2 rounded-1 d-flex flex-column"
    >
        <section class="order-header d-flex flex-column flex-md-row text-dark">
            <p class="m-0">
                Mã đơn hàng:
                <span class="text-primary">{{ orderCode }}</span>
            </p>
            <p class="m-0 ms-0 ms-md-auto">
                Thanh toán lúc:
                <span class="text-primary">{{ createdAt }}</span>
            </p>
        </section>
        <section class="order-total text-dark mt-2">
            <p>
                Tổng thanh toán:
                <span class="text-primary">{{ totalPriceRef }}đ</span>
            </p>
        </section>
        <OrderStatus :currentStatus="orderStatus"></OrderStatus>
        <div class="d-flex">
            <button @click="viewDetail"
                class="text-uppercase flex-fill rounded-1 my-shadow btn btn-primary">
                Xem chi tiết
            </button>
        </div>
    </li>
</template>

<script>
import OrderStatus from "./OrderStatus.vue";
import moneyHelper from "@/shared/helpers/MoneyHelper";

export default {
    components: {
        OrderStatus,
    },
    props: {
        orderId: String,
        orderCode: Number,
        orderStatus: Number,
        totalPrice: Number,
        createdAt: String,
    },
    computed: {
        totalPriceRef() {
            return moneyHelper.format(this.totalPrice);
        },
    },
    methods: {
        viewDetail() {

        }
    }
};
</script>