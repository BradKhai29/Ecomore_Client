<template>
    <section
        class="order-status d-flex flex-column p-3 bg-light rounded-1 mb-3"
    >
        <p class="m-0 text-center text-primary">TRẠNG THÁI ĐƠN HÀNG</p>
        <div class="separator"></div>
        <div class="mt-2 d-flex flex-row justify-content-around">
            <div class="text-center">
                <span :class="getIconClassList(1)" class="py-2 px-3 fw-bold circle my-shadow">
                    <span v-if="currentStatusRef >= 1">&#x2713;</span>
                    <span v-if="currentStatusRef < 1">&#x2716;</span>
                </span>
                <small :class="getTextClassList(1)" class="d-block pt-2">
                    Đã tiếp nhận
                </small>
            </div>
            <div class="text-center">
                <span :class="getIconClassList(2)" class="py-2 px-3 fw-bold circle my-shadow">
                    <span v-if="currentStatusRef >= 2">&#x2713;</span>
                    <span v-if="currentStatusRef < 2">&#x2716;</span>
                </span>
                <small :class="getTextClassList(2)" class="d-block pt-2">
                    Đang xử lý
                </small>
            </div>
            <div class="text-center">
                <span :class="getIconClassList(3)" class="py-2 px-3 fw-bold circle my-shadow">
                    <span v-if="currentStatusRef >= 3">&#x2713;</span>
                    <span v-if="currentStatusRef < 3">&#x2716;</span>
                </span>
                <small :class="getTextClassList(3)" class="d-block pt-2">
                    Đang giao hàng
                </small>
            </div>
            <div class="text-center">
                <span :class="getIconClassList(4)" class="py-2 px-3 fw-bold circle my-shadow">
                    <span v-if="currentStatusRef >= 4">&#x2713;</span>
                    <span v-if="currentStatusRef < 4">&#x2716;</span>
                </span>
                <small :class="getTextClassList(4)" class="d-block pt-2">
                    Hoàn thành
                </small>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        currentStatus: Number,
    },
    data() {
        return {
            completedIconClassList: "text-light bg-primary",
            completedTextClassList: "text-primary",
            notCompletedIconClassList: "text-dark bg-white",
            notCompletedTextClassList: "text-dark",
        };
    },
    computed: {
        currentStatusRef() {
            if (this.currentStatus == null) {
                return 1;
            }

            return this.currentStatus;
        },
    },
    methods: {
        getIconClassList(targetStatus) {
            return targetStatus <= this.currentStatusRef
                ? this.completedIconClassList
                : this.notCompletedIconClassList;
        },
        getTextClassList(targetStatus) {
            return targetStatus <= this.currentStatusRef
                ? this.completedTextClassList
                : this.notCompletedTextClassList;
        },
    },
};
</script>

<style scoped>
.circle {
    border-radius: 100%;
}
</style>