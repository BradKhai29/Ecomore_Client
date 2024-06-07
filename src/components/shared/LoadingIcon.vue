<template>
    <div class="d-flex align-items-center">
        <span :style="[customSize]" :class="['loader', borderClass, extraClassList]"></span>
    </div>
</template>

<script>
export default {
    props: {
        isLight: Boolean,
        width: Number,
        height: Number,
    },
    computed: {
        borderClass() {
            return this.isLight ? "border-white" : "border-primary";
        },
        customSize() {
            if (this.width > 0 && this.height > 0) {
                console.log("HEllo");
                return `width:${this.width};height:${this.height}`;
            }

            return "";
        }
    }
}
</script>

<style scoped>
.loader {
    --size: 24px;
    width: var(--size);
    height: var(--size);
    border: 4px solid;
    border-bottom-color: transparent !important;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>