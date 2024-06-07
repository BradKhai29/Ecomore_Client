<template>
    <section class="row g-4">
        <div v-for="category in categoryList"
            :key="category.name" class="col-lg-3 col-sm-6">
            <a href="#" class="cat-item d-block bg-light text-center rounded p-3">
                <div class="rounded p-4">
                    <div class="rounded mb-3">
                        <img
                            class="img-fluid rounded"
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
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717317506/Ecomore/Categories/nut_d43zia.jpg",
                },
                {
                    name: "Hạt qua chế biến",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717317505/Ecomore/Categories/processed_nut_zbqexf.jpg",
                },
                {
                    name: "Sữa hạt",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717317505/Ecomore/Categories/milk_hbbbun.jpg",
                },
                {
                    name: "Snack hạt",
                    imageUrl:
                        "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1717317506/Ecomore/Categories/snack_jcvbg5.jpg",
                },
            ],
        }
    }
}
</script>