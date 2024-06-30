<template>
    <BaseLayout>
        <!-- Call to Action Start -->
        <div class="container-fluid p-0">
            <div
                @click="hideToast"
                id="snackbar"
                :class="toastClassList"
                class="bg-primary my-shadow"
            >
                Xác nhận đăng ký thành công
            </div>
            <div class="row m-0 mt-2 mt-sm-0 align-items-center my-shadow">
                <div class="col-sm-6 text-start">
                    <section class="ms-0 ms-sm-5">
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
                        <section class="d-flex">
                            <router-link
                                to="/products"
                                class="bg-primary text-light p-2 me-2 d-flex align-items-center"
                            >
                                <span class="me-2">Khám phá ngay</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </router-link>
                            <!-- <router-link to="/" class="bg-dark text-light p-2">
                                Về chúng tôi
                            </router-link> -->
                        </section>
                    </section>
                </div>
                <div class="col-sm-6 mt-4 mt-sm-0 p-0 position-relative overflow-hidden">
                    <img
                        class="w-100"
                        src="@/assets/images/anh_bia.jpg"
                    />
                </div>
            </div>
        </div>
        <!-- Call to Action End -->

        <!-- Category Start -->
        <section class="container mt-5">
            <section class="text-center mx-auto mb-5">
                <h4 class="mb-4 text-primary">HÔM NAY MUA GÌ ?</h4>
                <CategoryList />
            </section>
        </section>
        <!-- Category End -->

        <!-- Product List Start -->
        <section class="container py-5">
            <div class="row g-0 gx-5 align-items-end">
                <div class="text-center mx-auto mb-5">
                    <h1 class="mb-3">Có thể bạn quan tâm</h1>
                    <p class="fw-bold">
                        Danh sách các sản phẩm bán chạy của
                        <span class="text-primary fw-bold h5">Ecomorɘ</span>
                    </p>
                </div>
            </div>
            <TopProductList :totalNumberOfProducts="totalNumberOfProducts"/>
            <div class="mt-5 text-center d-flex">
                <router-link
                    class="btn btn-dark flex-fill py-2 px-4"
                    to="/products"
                >
                    Xem tất cả sản phẩm
                </router-link>
            </div>
        </section>
        <!-- Product List End -->
        <!-- Product List Start -->
        <section class="container py-5" v-if="showProductListByCategory">
            <div class="row g-0 gx-5 align-items-end">
                <div class="text-center mx-auto mb-5">
                    <h1 class="mb-3">Sữa hạt Ecomorɘ</h1>
                </div>
            </div>
            <ProductListByCategory :categoryId="randomCategoryId"/>
        </section>
        <!-- Product List End -->
    </BaseLayout>
</template>

<script>
import axios from "axios";
import { authApi, productApi } from "@/shared/ApiUrls";
import BaseLayout from '@/layouts/BaseLayout.vue';
import TopProductList from "@/components/feats/products/TopProductList.vue";
import ProductListByCategory from "@/components/feats/products/ProductListByCategory.vue";
import CategoryList from "@/components/feats/categories/CategoryList.vue";

export default {
    components: {
        BaseLayout,
        TopProductList,
        ProductListByCategory,
        CategoryList,
    },
    data() {
        return {
            totalNumberOfProducts: 4,
            toastClassList: "",
            displayToastInSecond: 5,
            randomCategoryId: null,
            showProductListByCategory: false,
        };
    },
    mounted() {
        axios({
            url: productApi.getRandomCategoryId.path,
            method: productApi.getRandomCategoryId.method,
        })
        .then((response) => {
            this.randomCategoryId = response.data.body;
            this.showProductListByCategory = true;
        })
        .catch(err => {
            console.log(err);
        });

        // Get the token and reset the path.
        const token = this.$route.query.token;
        this.$router.push("/");

        const isValidToCallApi = token && token.length > 10;

        if (!isValidToCallApi) {
            return;
        }

        axios({
            url: authApi.registerConfirm.path + `?token=${token}`,
            method: authApi.registerConfirm.method,
        })
        .then(() => {
            this.showToast();
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        hideToast() {
            this.toastClassList = "";
        },
        showToast() {
            this.toastClassList = "show";

            setTimeout(() => {
                this.toastClassList = "";
            }, this.displayToastInSecond * 1000);
        },
    },
};
</script>

<style scoped>
/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
    visibility: hidden; /* Hidden by default. Visible on click */
    min-width: 250px; /* Set a default minimum width */
    height: min-content;
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #333; /* Black background color */
    color: #fff; /* White text color */
    text-align: center; /* Centered text */
    border-radius: 2px; /* Rounded borders */
    padding: 16px; /* Padding */
    position: fixed; /* Sit on top of the screen */
    z-index: 1000; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    top: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
    visibility: visible; /* Show the snackbar */
    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 30px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }
    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }
    to {
        bottom: 0;
        opacity: 0;
    }
}
</style>