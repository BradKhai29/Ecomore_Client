<template>
    <BaseLayout>
    <!-- Category List section Start -->
        <section class="container mt-4">
            <section class="text-center mx-auto mb-5">
                <h4 class="mb-3 text-primary pb-4">DANH MỤC BÁN CHẠY</h4>
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
import CategoryList from "@/components/feats/categories/CategoryList.vue";
import ProductItem from "@/components/feats/products/ProductItem.vue";
import ProductPlaceholder from "@/components/feats/products/ProductPlaceholder.vue";

export default {
    components: {
        BaseLayout,
        CategoryList,
        ProductItem,
        ProductPlaceholder,
    },
    mounted() {
        this.getProducts();
    },
    data() {
        return {
            isLoading: true,
            showDropdown: false,
            productList: [],
            placeholderList: [1, 2, 3, 4],
            currentSortingTag: null,
            sortingTags: [
                { name: "default", value: "Mặc định (A - Z)" },
                { name: "best-sell", value: "Bán chạy" },
                { name: "new", value: "Mới nhất" },
            ],
        };
    },
    methods: {
        getProducts() {
            axios({
                url: `${productApi.getAll.path}/0`,
                method: productApi.getAll.method,
            })
            .then((response) => {
                const body = response.data.body;

                for (const productItem of body) {
                    this.productList.push(productItem);
                }
                this.isLoading = false;
            })
            .catch((err) => console.log(err));
        },
        selectSortingTag(event) {
            const selectedTag = event.target;

            const foundTag = this.sortingTags.find(
                (item) => item.name == selectedTag.id
            );

            if (foundTag) {
                this.currentSortingTag = foundTag.value;
                this.showDropdown = false;
            }
        },
    },
    computed: {
        selectedSortingTag() {
            return this.currentSortingTag
                ? this.currentSortingTag
                : this.sortingTags[0].value;
        },
    },
};
</script>

<style scoped>
.filter-tag {
    width: 10rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-icon {
    height: 24px;
}

.my-dropdown-menu {
    position: absolute;
    right: 0;
    z-index: 900;
}
</style>