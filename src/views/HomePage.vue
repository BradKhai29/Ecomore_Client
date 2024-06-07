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
                            <router-link to="/products" class="btn btn-primary p-2 me-2">
                                Khám phá ngay
                            </router-link>
                            <router-link to="/" class="btn btn-dark p-2">
                                Về chúng tôi
                            </router-link>
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
        <section class="text-center mx-auto mb-5">
            <h4 class="mb-3 text-primary">
                HÔM NAY MUA GÌ ?
            </h4>
            <CategoryList></CategoryList>
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
                        Danh sách các sản phẩm bán chạy của
                        <span class="text-primary fw-bold h5">Ecomorɘ</span>
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
            <router-link class="btn btn-dark flex-fill py-2 px-4" to="/products">
                Xem tất cả sản phẩm
            </router-link>
        </div>
    </section>
    <!-- Product List End -->
</template>

<script>
import TopProductList from "../components/feats/products/TopProductList.vue";
import CategoryList from './categories/CategoryList.vue';

export default {
    data() {
        return {
            totalNumberOfProducts: 4,
        };
    },
    components: {
        TopProductList,
        CategoryList
    },
};
</script>