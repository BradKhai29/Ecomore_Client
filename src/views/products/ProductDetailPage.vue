<template>
    <section class="container mt-4">
        <!-- Breadcrumb Start -->
        <nav
            v-if="isProductExisted"
            class="row my-shadow align-items-center rounded"
            aria-label="breadcrumb"
        >
            <ul class="breadcrumb mb-0 p-3">
                <li class="breadcrumb-item">
                    <router-link to="/products">Sản phẩm</router-link>
                </li>
                <li class="breadcrumb-item">
                    <a href="#">{{ categoryName }}</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ productName }}
                </li>
            </ul>
        </nav>
        <!-- Breadcrumb End -->

        <section v-if="isProductExisted" class="row mt-4 p-3 my-shadow">
            <div class="col-12 col-sm-6">
                <div class="row flex-column-reverse flex-md-row">
                    <section
                        class="col-12 col-md-2 p-md-0 d-flex flex-row flex-md-column"
                    >
                        <figure
                            v-for="imageUrl in imageUrls"
                            :key="imageUrl.length"
                            class="mx-1 mx-sm-0 w-100 rounded my-shadow"
                        >
                            <img
                                class="img-fluid rounded"
                                :src="imageUrl"
                                alt="anh_san_pham"
                            />
                        </figure>
                    </section>
                    <section class="col-12 col-md-10">
                        <figure class="w-100 rounded my-shadow">
                            <img
                                class="img-fluid rounded"
                                :src="imageUrls[0]"
                                alt="anh_san_pham"
                            />
                        </figure>
                    </section>
                </div>
            </div>
            <div class="col-12 col-sm-6 m-0 ps-sm-5">
                <section id="tags">
                    <span class="btn btn-danger">Ban chay</span>
                </section>
                <section id="product-description" class="mt-3">
                    <p class="fw-bold text-dark">{{ productName }}</p>
                    <p class="fst-italic text-muted">
                        {{ description }}
                    </p>
                </section>
                <section id="price" class="d-flex">
                    <span class="h4 text-primary me-auto">{{ unitPriceRef }} đ</span>
                    <span>{{ status }}</span>
                </section>
                <!-- Separator -->
                <div class="separator"></div>
                <!-- Separator -->
                <section id="quantity" class="d-flex mt-2 mb-4">
                    <span class="me-auto">CHỌN SỐ LƯỢNG</span>
                    <section class="d-flex bg-light my-btn-group text-primary">
                        <button @click="decreaseQuantity" class="btn-square">
                            &minus;
                        </button>
                        <span class="item-quantity">{{ quantity }}</span>
                        <button @click="increaseQuantity" class="btn-square">
                            +
                        </button>
                    </section>
                </section>
                <section id="button-group" class="d-flex">
                    <button
                        @click="addToCart"
                        class="btn btn-light border-2 text-dark flex-fill me-3"
                    >
                        Thêm giỏ hàng
                    </button>
                    <button class="btn btn-primary flex-fill">Mua ngay</button>
                </section>
            </div>
        </section>

        <section v-if="!isProductExisted" class="row mt-4 p-3 my-shadow">
            <div class="col-8">
                <h5 class="text-primary">Sản phẩm không tồn tại</h5>
                <router-link class="btn btn-primary" to="/home">Trở về trang chủ</router-link>
            </div>
            <div class="col-4">
                <figure class="w-100">
                    <img class="img-fluid" src="../../assets/icons/empty_product.png" alt="" srcset="">
                    <a class="d-none" href="https://www.flaticon.com/free-icons/empty" title="empty icons">Empty icons created by Ghozi Muhtarom - Flaticon</a>
                </figure>
            </div>
        </section>
    </section>
</template>

<script>
import axios from "axios";
import { CartItem, shoppingCart } from "@/shared/ShoppingCartManager";
import { productApi, shoppingCartApi } from "@/shared/ApiUrls";
import moneyHelper from '@/shared/helpers/MoneyHelper';
import cookieHelper from '@/shared/helpers/CookieHelper';
import { ShoppingCartCookieName } from '@/shared/AppConstants';

export default {
    mounted() {
        this.getProductDetail();
    },
    data() {
        return {
            productId: null,
            isProductExisted: false,
            quantity: 1,
            isProcessing: false,
            productName: String,
            imageUrls: Array,
            categoryId: String,
            categoryName: String,
            description: String,
            unitPrice: Number,
            status: String,
            isTopSell: Boolean,
        };
    },
    computed: {
        unitPriceRef() {
            return moneyHelper.format(this.unitPrice);
        }
    },
    methods: {
        getProductDetail() {
            const id = this.$route.params.id;
            console.log(id);
            if (id == null || id.length < 36) {
                this.isProductExisted = false;
            } else {
                this.productId = id;
                axios({
                    url: productApi.getById.path + `/${id}`,
                    method: productApi.getById.method,
                }).then((response) => {
                    const productDetail = response.data.body;
                    this.productName = productDetail.name;
                    this.unitPrice = productDetail.unitPrice;
                    this.description = productDetail.description;
                    this.status = productDetail.status;
                    this.categoryId = productDetail.category.id;
                    this.categoryName = productDetail.category.name;
                    this.imageUrls = productDetail.imageUrls;

                    this.isProductExisted = true;
                })
                .catch(err => console.log(err));
            }
        },
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity - 1 <= 0) {
                return;
            }

            this.quantity--;
        },
        async addToCart() {
            // Prevent user to click again the button when add-to-cart is on-processing.
            if (this.isProcessing) {
                return false;
            }

            // Set is processing to true to process the add-to-cart operation.
            this.isProcessing = true;
            const shoppingCartCookie = cookieHelper.getCookieByName(
                ShoppingCartCookieName
            );
            axios({
                url: shoppingCartApi.add.path,
                method: shoppingCartApi.add.method,
                data: {
                    cartId: shoppingCartCookie.value,
                    productId: this.productId,
                    quantity: this.quantity,
                },
            })
                .then(() => {
                    const cartItem = new CartItem(
                        this.productId,
                        this.productName,
                        this.unitPrice,
                        this.imageUrls[0],
                        this.quantity
                    );

                    shoppingCart.addItem(cartItem);
                    shoppingCart.updateCart();

                    this.isProcessing = false;
                    this.quantity = 1;
                    return true;
                })
                .catch(() => {
                    this.isProcessing = false;
                    return false;
                });
        },
        async addToCartAndPurchase() {
            const addSuccess = await this.addToCart();

            if (!addSuccess) {
                return;
            }

            this.$router.push("/checkout");
        },
    },
};
</script>