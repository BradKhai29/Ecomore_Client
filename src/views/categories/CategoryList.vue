<template>
    <section class="row g-4">
        <div v-for="category in categoryList"
            :key="category.name" class="col-lg-3 col-sm-6">
            <a href="#" class="cat-item d-block bg-light text-center rounded p-3">
                <div class="rounded p-4">
                    <div class="cat-item-image rounded mb-3 p-2">
                        <img
                            class="w-50 img-fluid rounded"
                            :src="category.imageUrl"
                            alt="Icon"
                        />
                    </div>
                    <h6>{{ category.name }}</h6>
                </div>
            </a>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            categoryList: [
                {
                    name: "Hạt thô",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717941508/Ecomore/Categories/nuts_qt1drr.png",
                },
                {
                    name: "Hạt qua chế biến",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717941508/Ecomore/Categories/processed_nuts_c5fbby.png",
                },
                {
                    name: "Sữa hạt",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717941508/Ecomore/Categories/nuts_milk_mvhnwp.png",
                },
                {
                    name: "Snack hạt",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717941508/Ecomore/Categories/snacks_w707k8.png",
                },
            ],
        }
    }
}
</script>