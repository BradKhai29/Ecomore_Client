<template>
    <div
        @click="toggleAuth"
        class="row align-items-center justify-content-center toggleAuth"
    >
        <!-- Forgot Password Input Start -->
        <section v-if="!showSuccessPopup" class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white">
            <div class="form-block mx-auto">
                <div class="d-flex align-items-center mb-5">
                    <h4 class="m-0">
                        Quên mật khẩu
                    </h4>
                    <img
                        class="toggleAuth ms-auto btn btn-white"
                        src="../../../assets/cross_icon.png"
                    />
                </div>
                <form @submit.prevent="" class="text-start d-flex flex-column">
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

                    <button class="btn btn-block py-2 btn-primary flex-fill">
                        Nhận link qua email
                    </button>

                    <div class="d-flex justify-content-center mt-4 mb-2">
                        <span class="me-2">Quay lại đăng nhập?</span>
                        <a @click="changeToLogin" href="#" class="text-primary fw-bold"
                            >Đăng nhập ngay</a
                        >
                    </div>
                </form>
            </div>
        </section>
        <!-- Forgot Password Input End -->

        <!-- Popup Forgot Password Success Start -->
        <section v-if="showSuccessPopup" class="col-md-4 my-shadow rounded py-3 bg-white">
            <div class="form-block">
                <div class="text-center">
                    <h3 class="bg-primary py-4 rounded">
                        <img src="../../../assets/mail.png" alt="" srcset="" />
                    </h3>
                </div>

                <footer class="d-flex flex-column">
                    <p class="fw-bold my-3">
                        Vui lòng kiểm tra mail để lấy link đặt lại mật khẩu
                    </p>
                    <section class="d-flex mb-4 my-shadow rounded">
                        <div
                            href="#"
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
                        <a
                            @click="changeToLogin"
                            href="#"
                            class="text-primary fw-bold"
                            >đăng nhập</a
                        >
                    </div>
                </footer>
            </div>
        </section>
        <!-- Popup Forgot Password Success End -->
    </div>
</template>

<script>
const toggleAuthEmitEvent = "toggle-auth";
const toLoginEmitEvent = "to-login";

export default {
    emits: [toggleAuthEmitEvent, toLoginEmitEvent],
    data() {
        return {
            showSuccessPopup: false,
        };
    },
    methods: {
        toggleAuth(event) {
            if (event.target.classList.contains("toggleAuth")) {
                this.$emit(toggleAuthEmitEvent);
            }
        },
        changeToLogin() {
            this.$emit(toLoginEmitEvent);
        },
    },
};
</script>