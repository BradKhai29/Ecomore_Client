<template>
    <BaseLayout>
        <div class="auth-form row mt-5 align-items-center justify-content-center">
            <!-- Forgot Password Input Start -->
            <section
                v-if="!showSuccessPopup"
                class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white"
            >
                <div class="form-block mx-auto">
                    <div class="d-flex align-items-center mb-5">
                        <h4 class="m-0">Quên mật khẩu</h4>
                    </div>
                    <form
                        @submit.prevent=""
                        class="text-start d-flex flex-column"
                    >
                        <section class="form-group first mb-3">
                            <label for="forgot-password-email">
                                Nhập email để lấy link<span class="text-danger"
                                    >*</span
                                >
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="your-email@gmail.com"
                                id="forgot-password-email"
                            />
                        </section>

                        <button
                            class="btn btn-block py-2 btn-primary flex-fill"
                        >
                            Nhận link qua email
                        </button>

                        <div class="d-flex justify-content-center mt-4 mb-2">
                            <span class="me-2">Nhớ mật khẩu?</span>
                            <router-link
                                to="/login"
                                class="text-primary fw-bold"
                            >
                                Đăng nhập ngay
                            </router-link>
                        </div>
                    </form>
                </div>
            </section>
            <!-- Forgot Password Input End -->

            <!-- Popup Forgot Password Success Start -->
            <section
                v-if="showSuccessPopup"
                class="col-md-4 my-shadow rounded py-3 bg-white"
            >
                <div class="form-block">
                    <div class="text-center">
                        <h3 class="bg-primary py-4 rounded">
                            <img
                                src="@/assets/icons/mail.png"
                                alt=""
                                srcset=""
                            />
                        </h3>
                    </div>

                    <footer class="d-flex flex-column">
                        <p class="fw-bold my-3">
                            Vui lòng kiểm tra mail để lấy link đặt lại mật khẩu
                        </p>
                        <section class="d-flex mb-4 my-shadow rounded">
                            <div
                                class="d-flex flex-fill align-items-center btn py-2"
                            >
                                <span class="flex-fill text-start">
                                    Chưa nhận được mail
                                </span>
                                <button class="btn btn-primary">Gửi lại</button>
                            </div>
                        </section>
                        <div class="d-flex justify-content-center">
                            <span class="me-1">Quay lại</span>
                            <router-link
                                to="/login"
                                class="text-primary fw-bold"
                            >
                                đăng nhập
                            </router-link>
                        </div>
                    </footer>
                </div>
            </section>
            <!-- Popup Forgot Password Success End -->
        </div>
    </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
    components: {
        BaseLayout,
    },
    data() {
        return {
            showSuccessPopup: false,
        };
    },
    methods: {},
};
</script>