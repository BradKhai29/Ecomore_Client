<template>
    <section class="container mt-5">
        <div class="row">
            <div class="col-12">

                <div
                    class="d-flex bg-white border border-primary border-2 rounded my-shadow mt-3 mb-4 p-3 align-items-center"
                >
                    <h5 class="m-0 text-uppercase text-primary">danh sách đơn hàng</h5>
                    <span class="ms-auto">
                        <span>(</span>
                        <span class="text-primary">{{ 10 }} đơn hàng</span>
                        <span>)</span>
                    </span>
                </div>

                <!-- Order List start -->
                <ul class="p-0 d-flex flex-column">
                    <OrderItem></OrderItem>
                </ul>
                <!-- Order List end -->
            </div>
        </div>
    </section>
</template>

<script>
import OrderItem from "../../components/feats/orders/OrderItem.vue";

export default {
    components: {
        OrderItem
    }
}
</script>

