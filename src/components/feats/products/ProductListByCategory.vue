<template>
    <div v-if="!isLoading" class="row g-4">
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
    </div>
    <div v-if="isLoading" class="row g-4">
        <ProductPlaceholder v-for="item in placeholderList" :key="item">
        </ProductPlaceholder>
    </div>
</template>

<script>
import axios from "axios";
import ProductItem from "./ProductItem.vue";
import ProductPlaceholder from "./ProductPlaceholder.vue";
import { productApi } from "../../../shared/ApiUrls";

export default {
    components: { ProductItem, ProductPlaceholder },
    data() {
        return {
            isLoading: true,
            productList: [],
            placeholderList: [1, 2, 3, 4]
        };
    },
    props: {
        categoryId: String,
    },
    methods: {
        getProducts() {
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
        },
    },
    mounted() {
        this.getProducts();
    },
};
</script>