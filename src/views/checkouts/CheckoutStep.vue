<template>
    <!-- Checkout steps -->
    <section class="row mb-5 justify-content-center">
        <div class="col col-md-3 d-flex justify-content-center">
            <div @click="goToReviewCartPage"
                :class="[getClassList(viewCartStep)]"
                class="p-1 rounded btn d-flex flex-column flex-md-row align-items-center justify-content-center">
                <figure class="checkout-icon mb-0">
                    <svg :class="['img-fluid', {'path-dark': !isCurrentStep(viewCartStep)}]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="#1C274C" stroke-width="1.5"/>
                        <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="#1C274C" stroke-width="1.5"/>
                    </svg>
                </figure>
                <span class="ms-md-2 mt-2 mt-md-0 text-uppercase">giỏ hàng</span>
            </div>
        </div>
        <div class="col col-md-3 d-flex justify-content-center">
            <div @click="goToCheckoutDetailPage"
                :class="[getClassList(detailStep)]"
                class="p-1 rounded btn d-flex flex-column flex-md-row align-items-center justify-content-center">
                <figure class="checkout-icon mb-0">
                    <img class="img-fluid" src="../../assets/icons/order.png" alt="" srcset="">
                </figure>
                <span class="ms-md-2 mt-2 mt-md-0 text-uppercase">đặt hàng</span>
            </div>
        </div>
        <div class="col col-md-3 d-flex justify-content-center">
            <div :class="[getClassList(finishStep)]"
                class="p-1 rounded btn d-flex flex-column flex-md-row align-items-center justify-content-center">
                <figure class="checkout-icon mb-0">
                    <img class="img-fluid" src="../../assets/icons/complete_order.png" alt="" srcset="">
                </figure>
                <span class="ms-md-2 mt-2 mt-md-0 text-uppercase text-center">
                    hoàn thành
                    <span class="d-none d-md-inline">đơn hàng</span>
                </span>
            </div>
        </div>
    </section>
    <!-- Checkout steps -->
</template>

<script>
export default {
    props: {
        currentStep: Number,
    },
    data() {
        return {
            selectedStepClassList: "btn-danger text-light ",
            notSelectedStepClassList: "btn-light",
            viewCartStep: 1,
            detailStep: 2,
            finishStep: 3
        }
    },
    methods: {
        getClassList(inputStep) {
            return inputStep === this.currentStep ? this.selectedStepClassList : this.notSelectedStepClassList;
        },
        isCurrentStep(inputStep) {
            return inputStep == this.currentStep;
        },
        goToReviewCartPage() {
            this.$router.push("/checkout");
        },
        goToCheckoutDetailPage() {
            this.$router.push("/checkout/detail");
        }
    }
}
</script>

<style scoped>
.checkout-icon {
    --size: 2rem;
    width: var(--size);
    height: var(--size);
}

.checkout-icon path {
    fill: none;
    stroke: white;
}

.checkout-icon .path-dark path {
    stroke: black!important;
}
</style>

