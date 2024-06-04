<template>
    <!-- Call to Action Start -->
    <div class="container-xxl py-5">
        <div class="container">
            <div class="bg-light rounded p-3">
                <div
                    class="bg-white rounded p-4"
                    style="border: 1px dashed rgba(0, 185, 142, 0.3)"
                >
                    <div class="row g-5 align-items-center">
                        <div class="col-md-8 text-start">
                            <div class="mb-4">
                                <h1 class="mb-3">
                                    Cung cấp các sản phẩm hạt giàu dinh dưỡng
                                </h1>
                                <p>
                                    <span class="text-primary fw-bold"
                                        >Ecomorɘ</span
                                    >
                                    mang đến cho bạn những sản phẩm từ hạt hấp
                                    dẫn.
                                </p>
                            </div>
                            <a href="" class="btn btn-primary p-2 me-2"
                                ><i class="fa fa-phone-alt me-2"></i>Khám phá
                                ngay</a
                            >
                            <a href="" class="btn btn-dark p-2"
                                ><i class="fa fa-calendar-alt me-2"></i>Về chúng
                                tôi</a
                            >
                        </div>
                        <div class="col-md-4">
                            <img
                                class="img-fluid rounded w-100"
                                src="../assets/logo.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Call to Action End -->

    <!-- Category Start -->
    <section class="container mt-4">
        <section
            class="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style="max-width: 600px"
        >
            <h4 class="mb-3">
                HÔM NAY MUA GÌ <span class="text-primary">?</span>
            </h4>
        </section>
        <section class="row g-4">
            <div
                v-for="category in categoryList"
                :key="category.name"
                class="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.1s"
            >
                <a
                    class="cat-item d-block bg-light text-center rounded p-3"
                    href="#"
                >
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
    </section>
    <!-- Category End -->

    <!-- Product List Start -->
    <section class="container py-5">
        <div class="row g-0 gx-5 align-items-end">
            <div class="col-lg-6">
                <div class="text-start mx-auto mb-5">
                    <h1 class="mb-3">Có thể bạn quan tâm</h1>
                    <p class="fw-bold">
                        Danh sách các sản phẩm bán chạy nhất
                        <span class="text-primary">Ecomorɘ</span>
                    </p>
                </div>
            </div>
            <section class="col-lg-6 text-start text-lg-end">
                <ul
                    class="nav nav-pills d-inline-flex justify-content-end mb-5"
                >
                    <li class="nav-item me-2">
                        <a class="btn btn-outline-primary active" href="#tab-1"
                            >Bán chạy</a
                        >
                    </li>
                    <li class="nav-item me-2">
                        <a class="btn btn-outline-primary" href="#tab-2"
                            >Sản phẩm mới</a
                        >
                    </li>
                </ul>
            </section>
        </div>
        <TopProductList
            :totalNumberOfProducts="totalNumberOfProducts"
        ></TopProductList>
        <div class="mt-5 text-center d-flex">
            <a class="btn btn-dark flex-fill py-2 px-4" href="#">
                Xem tất cả sản phẩm
            </a>
        </div>
    </section>
    <!-- Product List End -->
</template>

<script>
import TopProductList from "../components/feats/products/TopProductList.vue";

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
            totalNumberOfProducts: 4,
        };
    },
    components: {
        TopProductList,
    },
};
</script>