<template>
    <section class="container checkout-container rounded checkout py-5 mt-5">
        <CheckoutStep :currentStep="currentStep"></CheckoutStep>

        <div class="row flex-column flex-md-row">
            <section class="col-12 col-md-8 p">
                <!-- Form section -->
                <div class="bg-white my-shadow rounded p-3 d-flex flex-column">
                    <section class="d-flex mb-3">
                        <h5 class="text-uppercase">thông tin giao hàng</h5>
                    </section>
                    <form class="d-flex flex-column" @submit.prevent="">
                        <section
                            id="customerName"
                            class="mb-4 d-flex flex-column flex-md-row"
                        >
                            <CheckoutInput
                                @input-update="(value) => (firstName = value)"
                                @validate-input="addFormValidationCallback"
                                inputId="firstName"
                                :inputValue="firstName"
                                inputLabel="Họ"
                                inputType="text"
                                :isRequired="true"
                                placeholder="Nhập họ của bạn"
                            >
                            </CheckoutInput>
                            <CheckoutInput
                                @input-update="(value) => (lastName = value)"
                                @validate-input="addFormValidationCallback"
                                inputId="test"
                                :inputValue="lastName"
                                inputLabel="Tên"
                                inputType="text"
                                :isRequired="true"
                                placeholder="Nhập tên của bạn"
                            >
                            </CheckoutInput>
                        </section>
                        <section
                            id="customerContacts"
                            class="mb-3 d-flex flex-column flex-md-row"
                        >
                            <CheckoutInput
                                @input-update="(value) => (email = value)"
                                @validate-input="addFormValidationCallback"
                                inputId="email"
                                :inputValue="email"
                                inputLabel="Email"
                                inputType="email"
                                :isRequired="true"
                                placeholder="Nhập email của bạn"
                                inputErrorMessage="Vui lòng nhập email hợp lệ"
                            >
                            </CheckoutInput>
                            <CheckoutInput
                                @input-update="(value) => (phoneNumber = value)"
                                @validate-input="addFormValidationCallback"
                                inputId="phoneNumber"
                                :inputValue="phoneNumber"
                                inputLabel="SĐT"
                                inputType="tel"
                                :isRequired="true"
                                placeholder="Nhập số điện thoại của bạn"
                                inputErrorMessage="Vui lòng nhập SĐT hợp lệ"
                            >
                            </CheckoutInput>
                        </section>
                        <section
                            id="customerAddress"
                            class="mb-3 d-flex flex-column"
                        >
                            <CheckoutInput
                                @input-update="
                                    (value) => (deliveryAddress = value)
                                "
                                @validate-input="addFormValidationCallback"
                                inputId="deliveryAddress"
                                :inputValue="deliveryAddress"
                                inputLabel="Địa chỉ giao hàng"
                                inputType="text"
                                :isRequired="true"
                                placeholder="Nhập địa chỉ đơn hàng sẽ được giao"
                            >
                            </CheckoutInput>
                        </section>
                        <section id="customerNotes" class="d-flex flex-column">
                            <div class="form-group flex-fill">
                                <label for="orderNote">Ghi chú</label>
                                <textarea
                                    v-model="orderNote"
                                    type="text"
                                    rows="4"
                                    class="mt-1 form-control"
                                    id="orderNote"
                                    placeholder="Nhập ghi chú của bạn"
                                ></textarea>
                            </div>
                        </section>
                        <section
                            id="otherAction"
                            class="mt-3 d-flex flex-column"
                        >
                            <div class="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label
                                    class="form-check-label"
                                    for="exampleCheck1"
                                    >Ghi nhớ thông tin giao hàng</label
                                >
                            </div>
                        </section>
                    </form>
                </div>
                <!-- Form section -->
                <div
                    class="d-flex bg-white rounded my-shadow mt-3 p-3 align-items-center"
                >
                    <h5 class="m-0 text-uppercase text-primary">giỏ hàng</h5>
                    <span class="ms-2">({{ itemCount }} sản phẩm)</span>
                </div>

                <ul
                    class="d-flex flex-column rounded my-shadow p-3 mt-3 bg-white"
                >
                    <CheckoutItem
                        v-for="checkoutItem in checkoutItems"
                        :key="checkoutItem.productId"
                        :productName="checkoutItem.productName"
                        :imageUrl="checkoutItem.imageUrl"
                        :unitPrice="checkoutItem.unitPrice"
                        :quantity="checkoutItem.quantity"
                    >
                    </CheckoutItem>
                </ul>
            </section>
            <section class="mt-3 mt-sm-0 col-12 col-md-4">
                <section class="rounded bg-white my-shadow p-3">
                    <h5 class="mb-3 text-uppercase text-primary">đơn hàng</h5>
                    <div class="separator"></div>
                    <!-- <div class="d-flex align-items-center">
                        <span class="fs-6 me-auto">Tạm tính</span>
                        <span class="text-danger fw-bold fs-5">
                            {{ 1000000 }}đ
                        </span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="fs-6 me-auto">Phí vận chuyển</span>
                        <span class="text-danger fw-bold fs-5">
                            {{ 1000000 }}đ
                        </span>
                    </div> -->
                    <div class="d-flex align-items-center">
                        <span class="fs-6 me-auto">Tổng thanh toán</span>
                        <span class="text-danger fw-bold fs-5">
                            {{ totalPriceRef }}đ
                        </span>
                    </div>
                    <div class="separator"></div>
                    <button @click="goToPayment" class="w-100 btn btn-danger">
                        Đặt hàng ngay
                    </button>
                </section>
            </section>
        </div>
    </section>
</template>

<script>
// Import external dependencies.
import axios from "axios";
import { orderApi } from "@/shared/ApiUrls";

// Import custom helpers.
import moneyHelper from "@/shared/helpers/MoneyHelper";
import CookieHelper from "@/shared/helpers/CookieHelper";

import { shoppingCart } from "@/shared/ShoppingCartManager";
import { ShoppingCartCookieName, StateCodeCookieName } from "@/shared/AppConstants";

// Import components.
import CheckoutStep from "./CheckoutStep.vue";
import CheckoutItem from "../../components/feats/checkouts/CheckoutItem.vue";
import CheckoutInput from "@/components/feats/checkouts/CheckoutInput.vue";

export default {
    components: {
        CheckoutStep,
        CheckoutItem,
        CheckoutInput,
    },
    created() {
        if (shoppingCart.cartItems.length == 0) {
            // this.$router.push("/");
        }
    },
    mounted() {
        this.checkoutItems = shoppingCart.cartItems;
        this.itemCount = shoppingCart.getItemCount();
        this.totalPrice = shoppingCart.totalPrice;

        const shoppingCartCookie = CookieHelper.getCookieByName(
            ShoppingCartCookieName
        );

        if (shoppingCartCookie.isExisted) {
            this.cartId = shoppingCartCookie.value;
        }
    },
    data() {
        return {
            cartId: null,
            currentStep: 2,
            itemCount: Number,
            totalPrice: Number,
            checkoutItems: [],
            formValidationCallbacks: [],
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            deliveryAddress: null,
            orderNote: null,
        };
    },
    computed: {
        totalPriceRef() {
            return moneyHelper.format(this.totalPrice);
        },
    },
    methods: {
        addFormValidationCallback(validationCallback) {
            this.formValidationCallbacks.push(validationCallback);
        },
        goToPayment() {
            let isValid = true;
            for (const validationCallback of this.formValidationCallbacks) {
                isValid &= validationCallback();
            }

            if (!isValid) {
                return;
            }

            axios({
                url: orderApi.checkout.path,
                method: orderApi.checkout.method,
                data: {
                    cartId: this.cartId,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    deliveryAddress: this.deliveryAddress,
                    orderNote: this.orderNote,
                },
            })
            .then((response) => {
                const checkoutResponse = response.data.body;

                // Get response contains checkout information.
                const stateCode = checkoutResponse.stateCode;
                const checkoutUrl = checkoutResponse.checkoutUrl;

                // Save state code for later checkout operation.
                CookieHelper.setCookie(StateCodeCookieName, stateCode, 1);

                window.location.replace(checkoutUrl);
            })
            .catch((err) => console.log(err));
        },
    },
};
</script>