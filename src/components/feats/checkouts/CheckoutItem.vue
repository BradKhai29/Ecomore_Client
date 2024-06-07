<template>
    <li class="bg-white d-flex p-0 mb-3">
        <div class="col-md-2 col-4">
            <figure class="w-100 border-primary cart-item-image rounded m-0">
                <img
                    class="w-100 h-100 rounded"
                    :src="imageUrl"
                    alt="anh_san_pham"
                />
            </figure>
        </div>
        <div class="col-md-10 col-8 ps-2">
            <div class="row flex-column flex-md-row">
                <h5 class="col-md-9 col-12">{{ productName }}</h5>
                <div class="col-md-3 col-12 ms-0 ms-md-auto text-md-end">
                    <p class=" mb-2">
                        Đơn giá: <span class="text-danger">{{ unitPriceRef }}đ</span>
                    </p>
                    <span class="cart-item-quantity">
                        Số lượng: <span class="text-danger">{{ quantity }}</span>
                    </span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import moneyHelper from "@/shared/helpers/MoneyHelper";

export default {
    props: {
        imageUrl: String,
        productName: String,
        unitPrice: Number,
        quantity: Number,
    },
    computed: {
        unitPriceRef() {
            return moneyHelper.format(this.unitPrice);
        },
    },
};
</script>