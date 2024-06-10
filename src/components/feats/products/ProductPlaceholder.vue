<template>
    <div class="col-lg-3 col-md-6">
        <div class="product-item rounded overflow-hidden">
            <header class="position-relative overflow-hidden product-image">
                <figure class="animated-background">
                </figure>
                <div
                    class="bg-secondary rounded text-secondary position-absolute start-0 top-0 m-3 py-1 px-3"
                >
                    category
                </div>
            </header>
            <main class="p-3 pb-0 text-start mb-3">
                <button class="btn btn-secondary py-1 w-50">
                    <span></span>
                </button>
            </main>
            <div class="p-3 d-flex border-top">
                <button
                    class="btn btn-secondary flex-fill py-2 d-flex justify-content-center"
                >
                    <span class="fw-bold">&#8203;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-image {
    height: 240px;
}

.product-image img {
    height: 100%;
    width: 100%;
}

@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

.animated-background {
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: darkgray;
    background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: 100%;
    position: relative;
}
</style>