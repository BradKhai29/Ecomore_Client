<template>
    <div class="row g-4">
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
</template>

<script>
import axios from "axios";
import ProductItem from "./ProductItem.vue";
import { productApi } from "../../../shared/ApiUrls";

export default {
    components: { ProductItem },
    data() {
        return {
            productList: [],
        };
    },
    props: {
        totalNumberOfProducts: Number,
    },
    methods: {
        getProducts() {
            axios({
                url: `${productApi.getAll.path}/${this.totalNumberOfProducts}`,
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
    },
    mounted() {
        this.getProducts();
    },
};
</script>