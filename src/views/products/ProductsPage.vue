<template>
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
                <section class="d-flex align-items-center">
                    <span class="me-3">Sắp xếp theo</span>
                    <div class="dropdown">
                        <!-- Filter Dropdown Button Start -->
                        <div
                            @click="showDropdown = !showDropdown"
                            class="py-1 px-2 d-flex align-items-center border rounded"
                        >
                            <span class="filter-tag pe-2">{{
                                selectedSortingTag
                            }}</span>
                            <img
                                class="dropdown-icon"
                                src="../../assets/icons/dropdown.png"
                            />
                        </div>
                        <!-- Filter Dropdown Button End -->

                        <div
                            class="filter-tag my-dropdown-menu bg-white rounded py-2 my-shadow"
                            v-show="showDropdown"
                        >
                            <span
                                v-for="sortingTag in sortingTags"
                                :key="sortingTag.name"
                                class="dropdown-item"
                                :id="sortingTag.name"
                                @click="selectSortingTag"
                            >
                                {{ sortingTag.value }}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-12"></div>
            <div class="col-12"></div>
        </section>

        <section class="row g-4">
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
    </section>
    <!-- Product List End -->
</template>

<script>
import axios from "axios";
import CategoryList from "../categories/CategoryList.vue";
import ProductItem from "@/components/feats/products/ProductItem.vue";
import { productApi } from "@/shared/ApiUrls";

export default {
    components: {
        CategoryList,
        ProductItem,
    },
    mounted() {
        // for (let i = 0; i < 8; i++) {
        //     const product = {
        //         id: `product_${i + 1}`,
        //         name: `San pham [${i + 1}]`,
        //         category: "Processed Nut",
        //         unitPrice: 100_000,
        //         status: "Con hang",
        //         imageUrls: [],
        //     };

        //     this.productList.push(product);
        // }
        this.getProducts();
    },
    data() {
        return {
            showDropdown: false,
            productList: [],
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