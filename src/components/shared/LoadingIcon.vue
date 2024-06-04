<template>
    <div class="d-inline">
        <span class="loader"></span>
    </div>
</template>

<style scoped>
.loader {
    --size: 24px;
    width: var(--size);
    height: var(--size);
    border: 4px solid #fff;
    border-bottom-color: transparent;
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