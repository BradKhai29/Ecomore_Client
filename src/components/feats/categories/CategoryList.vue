<template>
    <section class="row g-4">
        <div
            v-for="category in categoryList"
            :key="category.name"
            class="col-lg-3 col-sm-6"
        >
            <router-link
                :to="`/product/category/${category.id}`"
                class="cat-item d-block bg-light text-center rounded p-3"
            >
                <div class="rounded p-4">
                    <div class="cat-item-image rounded mb-3 p-2">
                        <img
                            class="w-50 img-fluid rounded"
                            :src="category.imageUrl"
                            alt="Icon"
                        />
                    </div>
                    <h6>{{ category.name }}</h6>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { categoryApi } from "@/shared/ApiUrls";

export default {
    data() {
        return {
            categoryList: [],
        };
    },
    mounted() {
        axios({
            url: categoryApi.getAll.path,
            method: categoryApi.getAll.method,
        })
        .then((response) => {
            const categories = response.data.body;

            for (const category of categories) {
                this.categoryList.push(category);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },
};
</script>