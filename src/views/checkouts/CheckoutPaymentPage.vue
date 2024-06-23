<template>
    <section class="container mt-5">
        <div class="row">
            <!-- If the process is not finish, display this section -->
            <div v-if="isProcessing"  class="mx-auto col-6">
                <section class="p-3 rounded my-shadow">
                    <h5 class="btn btn-primary w-100 mb-5">Hệ thống đang xử lý.</h5>
                    <LoadingIcon :width="40" :height="40"></LoadingIcon>
                </section>
            </div>
            <!-- If the process is not finish, display this section -->

            <div v-if="!isProcessing" class="mx-auto col-6">
                <!-- If the order is cancel, display this -->
                <section v-if="isCancel" class="p-3 rounded my-shadow">
                    <h5 class="btn btn-primary mb-5">
                        {{ isSuccess ? "Hủy đơn hàng thành công" : "Đã có lỗi xảy ra khi xử lý" }}
                    </h5>
                    <div class="d-flex">
                        <button @click="goToHome" class="btn btn-light border-light border-2">Trở về trang chủ</button>
                    </div>
                </section>
                <!-- If the order is cancel, display this -->

                <!-- If the order is confirm, display this -->
                <section v-if="!isCancel" class="p-3 rounded my-shadow">
                    <h5 class="btn btn-primary w-100 mb-5">
                        {{ isSuccess ? "Đơn hàng đã được ghi nhận thành công" : "Đã có lỗi xảy ra khi xử lý" }}
                    </h5>
                    <div class="d-flex">
                        <button @click="goToHistoryPage" class="btn btn-light border-light border-2" v-if="isSuccess">Xem danh sách đơn hàng</button>
                        <button @click="goToHome" class="btn btn-light border-light border-2" v-if="!isSuccess">Trở về trang chủ</button>
                    </div>
                </section>
                <!-- If the order is confirm, display this -->
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { orderApi } from "@/shared/ApiUrls";
import CookieHelper from "@/shared/helpers/CookieHelper";
import { StateCodeCookieName } from "@/shared/AppConstants";
import LoadingIcon from '@/components/shared/LoadingIcon.vue';

export default {
    components: {
        LoadingIcon
    },
    data() {
        return {
            isProcessing: true,
            isCancel: false,
            isSuccess: false,
        };
    },
    created() {
        // Get query parameters for payment details.
        const queryParams = this.$route.query;
        this.isCancel = this.$route.path.includes("cancel");
        // Rewrite the url.
        this.$router.push("/checkout/payment");

        const stateCodeCookie =
            CookieHelper.getCookieByName(StateCodeCookieName);

        if (!stateCodeCookie.isExisted) {
            this.goToHome();
            return;
        }

        // Set api endpoint for suitable path.
        const apiEndpoint = this.isCancel ? orderApi.cancel : orderApi.confirm;

        axios({
            url: apiEndpoint.path,
            method: apiEndpoint.method,
            data: {
                code: queryParams.code,
                id: queryParams.id,
                status: queryParams.status,
                orderCode: queryParams.orderCode,
                stateCode: stateCodeCookie.value,
            },
        })
        .then(() => {
            this.isProcessing = false;
            this.isSuccess = true;
        })
        .catch(() => {
            this.isProcessing = false;
            this.isSuccess = false;
        })
        .finally(() => CookieHelper.removeCookie(StateCodeCookieName));
    },
    methods: {
        goToHome() {
            this.$router.push("/");
        },
        goToHistoryPage() {
            this.$router.push("/order");
        }
    }
};
</script>