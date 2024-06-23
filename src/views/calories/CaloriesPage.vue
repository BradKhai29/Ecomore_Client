<template>
    <section class="container mt-5">
        <div class="row mb-3">
            <h5 class="text-center text-uppercase text-primary">
                Tính Calories và gợi ý sản phẩm
            </h5>
        </div>
        <!-- Input Data to calculate calories -->
        <div class="row">
            <div class="col-md-8 col-12">
                <section
                    class="p-3 my-shadow border border-2 border-primary rounded-2"
                >
                    <form class="d-flex flex-column" @submit.prevent="">
                        <!-- Age and Gender section -->
                        <section
                            class="age-and-gender mb-3 d-flex flex-md-row flex-column"
                        >
                            <div
                                class="form-group flex-fill me-0 me-md-3 mb-3 mb-md-0"
                            >
                                <label class="mb-1" for="age">
                                    Tuổi của bạn
                                    <span class="text-danger">*</span>
                                </label>
                                <input
                                    v-model="age"
                                    class="form-control"
                                    id="age"
                                    type="number"
                                    required="isRequired"
                                />
                            </div>
                            <div class="form-group flex-fill">
                                <label class="mb-1" for="gender">
                                    Giới tính
                                    <span class="text-danger">*</span>
                                </label>
                                <select
                                    v-model="gender"
                                    id="gender"
                                    class="form-select"
                                >
                                    <option :value="false" selected>---</option>
                                    <option :value="true">Nam</option>
                                    <option :value="false">Nữ</option>
                                </select>
                            </div>
                        </section>
                        <!-- Age and Gender section -->

                        <!-- Height and Weight section -->
                        <section
                            class="weight-and-height mb-3 d-flex flex-md-row flex-column"
                        >
                            <div
                                class="form-group flex-fill me-0 me-md-3 mb-3 mb-md-0"
                            >
                                <label for="height">
                                    Chiều cao của bạn
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <input
                                        v-model="heightInCentimeter"
                                        class="form-control"
                                        id="height"
                                        type="number"
                                        required="isRequired"
                                    />
                                    <span class="input-group-text">cm</span>
                                </div>
                            </div>
                            <div class="form-group flex-fill">
                                <label for="weight">
                                    Cân nặng của bạn
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <input
                                        v-model="weightInKg"
                                        class="form-control"
                                        id="weight"
                                        type="number"
                                        required="isRequired"
                                    />
                                    <span class="input-group-text">kg</span>
                                </div>
                            </div>
                        </section>
                        <!-- Height and Weight section -->

                        <section class="d-flex">
                            <button
                                @click="calculate"
                                class="w-100 btn btn-primary rounded-1 my-shadow"
                            >
                                <span v-if="!isProcessing"
                                    >Tính toán calories</span
                                >
                                <span v-if="isProcessing" class="d-flex justify-content-center">
                                    <LoadingIcon :isLight="true" class="me-2"></LoadingIcon>
                                    Đang xử lý
                                </span>
                            </button>
                        </section>
                    </form>
                </section>
            </div>
            <div class="mt-3 mt-md-0 col-md-4 col-12">
                <section
                    class="bg-white rounded border border-2 border-primary my-shadow p-3"
                >
                    <h5 class="mb-3 text-uppercase text-primary">Kết quả</h5>
                    <!-- If calculation success -->
                    <section v-if="calculationSuccess">
                        <div class="separator"></div>
                        <div class="d-flex align-items-center">
                            <span class="me-auto">Calories tính được</span>
                            <small class="text-primary">
                                {{
                                    calculationSuccess
                                        ? standardCalories
                                        : "---"
                                }}
                                (calories/ngày)
                            </small>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="me-auto">Calories khuyến nghị</span>
                            <small class="text-primary">
                                {{
                                    calculationSuccess
                                        ? recommendedCalories
                                        : "---"
                                }}
                                (calories/ngày)
                            </small>
                        </div>
                        <div class="separator"></div>
                        <div class="d-flex align-items-center">
                            <span class="me-auto">Lượng bổ sung thêm</span>
                            <small class="text-primary">
                                {{
                                    calculationSuccess
                                        ? recommendedCalories - standardCalories
                                        : "---"
                                }}
                                (calories/ngày)
                            </small>
                        </div>
                        <div class="separator"></div>
                        <button
                            @click="reset"
                            class="w-100 btn btn-primary my-shadow rounded-1"
                        >
                            Thử lại
                        </button>
                    </section>
                    <!-- If calculation success -->

                    <!-- If not calculation or not success -->
                    <section
                        v-if="!calculationSuccess"
                        class="p-2 mt-3 rounded border border-2 border-primary my-shadow"
                    >
                        <span>Kết quả tính sẽ hiển thị ở đây</span>
                    </section>
                    <!-- If not calculation or not success -->
                </section>
            </div>
        </div>
        <!-- Input Data to calculate calories -->

        <!-- Display recommendation section -->
        <section v-if="calculationSuccess" class="row mt-4">
            <div class="col-12">
                <div class="separator"></div>
            </div>
            <div class="col-12 text-center mb-3">
                <span
                    class="text-uppercase btn btn-light border border-2 border-light"
                >
                    đề xuất cho bạn
                </span>
            </div>

            <ul class="col-md-8 col-12 mx-auto d-flex flex-column">
                <li
                    v-for="product in recommendedProducts"
                    :key="product.id"
                    class="mb-3 d-flex flex-column my-shadow p-3 rounded-2">
                    <div class="d-flex mb-3">
                        <p
                            class="m-0 d-none d-md-flex align-items-center text-dark text-uppercase"
                        >
                            {{ product.name }}
                        </p>
                        <section class="d-flex ms-0 ms-md-auto">
                            <button
                                class="d-inline p-1 bg-primary text-light my-shadow rounded-1"
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                class="ms-2 d-inline p-1 bg-light text-dark my-shadow rounded-1"
                            >
                                Chọn đề xuất
                            </button>
                        </section>
                    </div>
                    <div class="row">
                        <div class="col-md-2 col-4">
                            <figure
                                class="w-100 m-0 rounded-1 overflow-hidden my-shadow border border-2 border-primary"
                            >
                                <img
                                    class="img-fluid"
                                    :src="product.imageUrls[0]"
                                    alt="anh_san_pham"
                                />
                            </figure>
                        </div>
                        <div class="col p-0">
                            <p
                                class="m-0 d-inline d-md-none text-dark text-uppercase"
                            >
                                {{ product.name }}
                            </p>
                            <section
                                class="d-flex flex-column my-2 my-md-0 mb-md-2"
                            >
                                <small>Thông tin dinh dưỡng:</small>
                                <div class="d-flex">
                                    <small class="border border-2 rounded p-1">
                                        <small class="p-1 rounded-1 bg-light"
                                            >379</small
                                        >
                                        Calories/100g
                                    </small>
                                </div>
                            </section>
                            <small>Đề xuất khẩu phần: 10 hạt/ngày</small>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <!-- Display recommendation section -->
    </section>
</template>

<script>
import axios from "axios";
import { caloriesApi } from "@/shared/ApiUrls";
import LoadingIcon from "@/components/shared/LoadingIcon.vue";

export default {
    components: {
        LoadingIcon,
    },
    data() {
        return {
            gender: false,
            age: null,
            heightInCentimeter: null,
            weightInKg: null,
            exerciseIntensity: 1,
            standardCalories: Number,
            recommendedCalories: Number,
            calculationSuccess: false,
            isProcessing: false,
            recommendedProducts: [],
        };
    },
    methods: {
        calculate() {
            this.isProcessing = true;

            axios({
                url: caloriesApi.calculate.path,
                method: caloriesApi.calculate.method,
                data: {
                    gender: this.gender,
                    age: this.age,
                    heightInCentimeter: this.heightInCentimeter,
                    weightInKg: this.weightInKg,
                    intensity: this.exerciseIntensity,
                },
            })
            .then((response) => {
                const calculationResult = response.data.body;

                this.standardCalories = calculationResult.standardCalories;
                this.recommendedCalories =
                    calculationResult.recommendedCalories;
                this.recommendedProducts = calculationResult.products;

                // Update UI section.
                this.calculationSuccess = true;
                this.isProcessing = false;
            })
            .catch((err) => console.log(err));
        },
        reset() {
            this.calculationSuccess = false;
        },
    },
};
</script>