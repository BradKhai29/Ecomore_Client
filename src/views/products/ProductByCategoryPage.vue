<template>
    <BaseLayout>
    <!-- Category List section Start -->
       <section class="container mt-4">
            <section class="text-center mx-auto mb-5">
                <h4 class="mb-3 text-primary pb-4">DANH MỤC SẢN PHẨM</h4>
                <CategoryList></CategoryList>
            </section>
        </section>
        <!-- Category List section End -->

        <!-- Product List Start -->
        <section class="container my-5">
            <section class="row mb-4">
                <div class="col-12 d-flex align-items-center">
                    <span class="text-primary h4 me-auto">Danh sách sản phẩm</span>
                </div>
            </section>

            <section v-if="!isLoading" class="row g-4">
                <ProductItem
                    v-for="product in productList"
                    :key="product.id"
                    :productId="product.id"
                    :productName="product.name"
                    :imageUrl="product.imageUrls[0]"
                    :category="product.category"
                    :productPrice="product.unitPrice"
                    :productStatus="product.status"
                ></ProductItem>
            </section>

            <section v-if="isLoading" class="row g-4">
                <ProductPlaceholder v-for="item in placeholderList" :key="item">
                </ProductPlaceholder>
            </section>
        </section>
        <!-- Product List End -->
    </BaseLayout>
</template>

<script>
import axios from "axios";
import { productApi } from "@/shared/ApiUrls";

// Import components.
import BaseLayout from '@/layouts/BaseLayout.vue';
import ProductItem from "@/components/feats/products/ProductItem.vue";
import ProductPlaceholder from "@/components/feats/products/ProductPlaceholder.vue";
import CategoryList from "@/components/feats/categories/CategoryList.vue";

export default {
    components: {
        BaseLayout,
        CategoryList,
        ProductItem,
        ProductPlaceholder,
    },
    mounted() {
        console.log("Mounted");
        this.getProducts();
    },
    data() {
        return {
            isLoading: true,
            showDropdown: false,
            productList: [],
            placeholderList: [1, 2, 3, 4],
            categoryId: null,
        };
    },
    methods: {
        getProducts() {
            this.productList.splice(0, this.productList.length);
            this.categoryId = this.$route.params.id;

            axios({
                url: `${productApi.getByCategoryId.path}/${this.categoryId}`,
                method: productApi.getByCategoryId.method,
            })
            .then((response) => {
                const body = response.data.body;

                for (const productItem of body) {
                    this.productList.push(productItem);
                }
                this.isLoading = false;
            })
            .catch((err) => console.log(err));
        }
    },
    watch: {
        $route: function(from, to) {
            this.getProducts(from, to);
        }
    }
};
</script>