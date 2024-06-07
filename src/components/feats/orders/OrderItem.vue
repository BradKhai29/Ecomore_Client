<template>
    <li
        class="p-3 my-shadow border-primary border border-2 rounded-1 d-flex flex-column"
    >
        <section class="order-header d-flex flex-column flex-md-row text-dark">
            <p class="m-0">
                Mã đơn hàng:
                <span class="text-primary">mã đơn 1241141412412412 </span>
            </p>
            <p class="m-0 ms-0 ms-md-auto">
                Thanh toán lúc:
                <span class="text-primary">20/12/2024</span>
            </p>
        </section>
        <section class="order-total text-dark mt-2">
            <p>
                Tổng thanh toán:
                <span class="text-primary">1,000,000đ</span>
            </p>
        </section>
        <OrderStatus :currentStatus="4"></OrderStatus>
        <div class="d-flex">
            <button
                class="text-uppercase flex-fill rounded-1 my-shadow btn btn-primary"
            >
                Xem chi tiết
            </button>
        </div>
    </li>
</template>

<script>
import OrderStatus from "./OrderStatus.vue";

export default {
    components: {
        OrderStatus
    }
};
</script>